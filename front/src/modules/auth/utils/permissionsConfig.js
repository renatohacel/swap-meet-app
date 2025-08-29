export const PERMISSIONS_MAP = {
    // Administración - Generación de Tarjetas
    '0-0-0-0': {
        module: 'admin',
        action: 'view',
        resource: 'generacion_tarjetas',
        description: 'Ver generación de tarjetas'
    },
    '0-0-0-1': {
        module: 'admin',
        action: 'create',
        resource: 'generacion_tarjetas',
        description: 'Crear lote de tarjetas'
    },
    '0-0-0-2': {
        module: 'admin',
        action: 'delete',
        resource: 'generacion_tarjetas',
        description: 'Eliminar lote de tarjetas'
    },
    '0-0-0-3': {
        module: 'admin',
        action: 'cancel',
        resource: 'generacion_tarjetas',
        description: 'Cancelar tarjeta'
    },

    // Administración - Asignación de Tianguis
    '0-0-1-0': {
        module: 'admin',
        action: 'view',
        resource: 'asignacion_tianguis',
        description: 'Ver asignación de tianguis'
    },
    '0-0-1-1': {
        module: 'admin',
        action: 'update',
        resource: 'asignacion_tianguis',
        description: 'Actualizar asignación de tianguis'
    },

    // Administración - Recargas
    '0-0-2-0': {
        module: 'admin',
        action: 'view',
        resource: 'recargas',
        description: 'Ver recargas'
    },

    // Administración - Capturar Insen
    '0-0-3-0': {
        module: 'admin',
        action: 'view',
        resource: 'capturar_insen',
        description: 'Ver capturar insen'
    },

    // Administración - Capturar Insen
    '0-0-3-1': {
        module: 'admin',
        action: 'update',
        resource: 'capturar_insen',
        description: 'Actualizar capturar insen'
    },

    // Administración - Boletos
    '0-0-4-0': {
        module: 'admin',
        action: 'create',
        resource: 'boletos',
        description: 'Crear boletos'
    },

    // Catálogos - Usuarios
    '0-1-0-0': {
        module: 'catalogs',
        action: 'view',
        resource: 'users',
        description: 'Ver usuarios'
    },
    '0-1-0-1': {
        module: 'catalogs',
        action: 'create',
        resource: 'users',
        description: 'Crear usuarios'
    },
    '0-1-0-2': {
        module: 'catalogs',
        action: 'update',
        resource: 'users',
        description: 'Actualizar usuarios'
    },

    // Catálogos - Tarifas de Puestos
    '0-1-1-0': {
        module: 'catalogs',
        action: 'view',
        resource: 'tarifas_puestos',
        description: 'Ver tarifas de puestos'
    },
    '0-1-1-1': {
        module: 'catalogs',
        action: 'update',
        resource: 'tarifas_puestos',
        description: 'Actualizar tarifas de puestos'
    },

    // Catálogos - Tarifas de Tarjetas
    '0-1-2-0': {
        module: 'catalogs',
        action: 'view',
        resource: 'tarifas_tarjetas',
        description: 'Ver tarifas de tarjetas'
    },
    '0-1-2-1': {
        module: 'catalogs',
        action: 'create',
        resource: 'tarifas_tarjetas',
        description: 'Crear tarifas de tarjetas'
    },
    '0-1-2-2': {
        module: 'catalogs',
        action: 'update',
        resource: 'tarifas_tarjetas',
        description: 'Actualizar tarifas de tarjetas'
    },
    '0-1-2-3': {
        module: 'catalogs',
        action: 'delete',
        resource: 'tarifas_tarjetas',
        description: 'Eliminar tarifas de tarjetas'
    },

    // Historial
    '0-2-0-0': {
        module: 'history',
        action: 'view',
        resource: 'historial',
        description: 'Ver historial'
    },

    // Aplicación Móvil - Activación
    '0-3-0-0': {
        module: 'mobile',
        action: 'view',
        resource: 'generacion_tarjetas',
        description: 'Ver generación de tarjetas móvil'
    },
    '0-3-0-1': {
        module: 'mobile',
        action: 'create',
        resource: 'generacion_tarjetas',
        description: 'Crear tarjetas móvil'
    },
};

export const checkPermission = (userPermissions, module, action, resource) => {
    if (!userPermissions) return false;

    const permissions = userPermissions.split(',');

    return permissions.some(permission => {
        const permissionConfig = PERMISSIONS_MAP[permission.trim()];
        return permissionConfig &&
            permissionConfig.module === module &&
            permissionConfig.action === action &&
            permissionConfig.resource === resource;
    });
};

export const hasPermission = (userPermissions, permissionKey) => {
    if (!userPermissions || !permissionKey) return false;

    const permissions = userPermissions.split(',').map(p => p.trim());
    return permissions.includes(permissionKey);
};