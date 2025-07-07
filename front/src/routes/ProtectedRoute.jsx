import { usePermissions } from "../modules/auth/hooks/usePermissions";
import { Navigate } from "react-router-dom";
import { CONSTANTS_ROUTES } from "../utils/constansRoutes";

const ProtectedRoute = ({ children, requiredPermissions = [], module, action, resource }) => {
    const { can, hasPermission } = usePermissions();

    // Verificar por módulo, acción y recurso específico
    if (module && action && resource) {
        if (!can(module, action, resource)) {
            return <Navigate to={CONSTANTS_ROUTES.HOME} replace />;
        }
    }

    // Verificar por claves de permisos específicas
    if (requiredPermissions.length > 0) {
        if (!hasPermission(requiredPermissions)) {
            return <Navigate to={CONSTANTS_ROUTES.HOME} replace />;
        }
    }

    return children;
};

export default ProtectedRoute;