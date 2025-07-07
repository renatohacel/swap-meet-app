import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { checkPermission, hasPermission, PERMISSIONS_MAP } from '../utils/permissionsConfig';

export const usePermissions = () => {
  const { login } = useContext(AuthContext);
  const userPermissions = login?.user?.niveles;

  const can = (module, action, resource) => {
    return checkPermission(userPermissions, module, action, resource);
  };

  const hasKey = (permissionKey) => {
    return hasPermission(userPermissions, permissionKey);
  };

  const getUserPermissions = () => {
    if (!userPermissions) return [];
    return userPermissions.split(',').map(p => p.trim());
  };

  const getPermissionDescription = (permissionKey) => {
    return PERMISSIONS_MAP[permissionKey]?.description || 'Permiso desconocido';
  };

  return {
    can,
    hasKey,
    getUserPermissions,
    getPermissionDescription,
    userPermissions
  };
};