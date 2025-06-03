export const CONSTANTS_ROUTES = {
    AUTH: {
        LOGIN: '/login',
        LOGOUT: '/logout',
    },

    HOME: '/home',

    ADMIN: {
        BASE: '/administracion',
        LOTES: {
            GENERACION_TARJETAS: '/administracion/generacion-lotes'
        },
    },

    CATALOGO: {
        BASE: '/catalogos',
        USUARIOS: '/catalogos/usuarios',
        TARIFAS: {
            BASE: '/catalogos/tarifas/',
            PUESTOS: 'puestos',
            TARJETAS: 'tarjetas',
        },
    },

    HISTORIAL: '/historial'
}