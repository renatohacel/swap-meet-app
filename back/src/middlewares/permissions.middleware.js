import { checkPermission, hasPermission } from "../config/permissions.config.js";

export const authorize = (module, action, resource) => {
    return (req, res, next) => {
        const userPermissions = req.user?.niveles;

        if (!userPermissions) {
            return res.status(401).json({ 
                message: "Forbidden: No permissions assigned to user" 
            });
        }

        const hasAccess = checkPermission(userPermissions, module, action, resource);

        if (!hasAccess) {
            return res.status(401).json({ 
                message: "Forbidden: Insufficient permissions",
                required: { module, action, resource }
            });
        }

        next();
    };
};

export const authorizeByKey = (permissionKey) => {
    return (req, res, next) => {
        const userPermissions = req.user?.niveles;

        if (!userPermissions) {
            return res.status(401).json({ 
                message: "Forbidden: No permissions assigned to user" 
            });
        }

        const hasAccess = hasPermission(userPermissions, permissionKey);

        if (!hasAccess) {
            return res.status(401).json({ 
                message: "Forbidden: Insufficient permissions",
                required: { permissionKey }
            });
        }

        next();
    };
};

// Middleware para verificar múltiples permisos (cualquiera de ellos)
export const authorizeAny = (permissions) => {
    return (req, res, next) => {
        const userPermissions = req.user?.niveles;

        if (!userPermissions) {
            return res.status(401).json({ 
                message: "Forbidden: No permissions assigned to user" 
            });
        }

        const hasAccess = permissions.some(permission => {
            if (typeof permission === 'string') {
                return hasPermission(userPermissions, permission);
            } else if (typeof permission === 'object') {
                return checkPermission(userPermissions, permission.module, permission.action, permission.resource);
            }
            return false;
        });

        if (!hasAccess) {
            return res.status(401).json({ 
                message: "Forbidden: Insufficient permissions",
                required: permissions
            });
        }

        next();
    };
};