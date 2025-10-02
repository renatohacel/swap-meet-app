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
        ASIGNACION_TIANGUIS: '/administracion/asignacion-tianguis',
        RECARGAS: '/administracion/recargas',
        CAPTURAR_INSEN: '/administracion/capturar-insen',
        BOLETOS: '/administracion/boletos',
        REPORTES: {
            TOTALES_POR_DIA: '/administracion/reportes/totales-por-dia',
            TOTALES_POR_INSEN: '/administracion/reportes/totales-por-insen',
            TOTALES_GENERALES: '/administracion/reportes/totales-generales',
            PADRON_TIANGUIS: '/administracion/reportes/padron-tianguis',
        }
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