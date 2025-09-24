export const treeData = [
    {
        title: 'APLICACIÓN WEB',
        key: '0',
        children: [
            {
                title: 'ADMINISTRACIÓN',
                key: '0-0',
                children: [
                    {
                        title: 'GENERACIÓN DE TARJETAS', key: '0-0-0', children: [
                            { title: 'VISUALIZAR', key: '0-0-0-0' },
                            { title: 'CREAR', key: '0-0-0-1' },
                            { title: 'ELIMINACIÓN DE LOTE', key: '0-0-0-2' },
                            { title: 'CANCELACIÓN DE TARJETAS', key: '0-0-0-3' },
                        ],
                    },
                    {
                        title: 'ASIGNACIÓN DE TIANGUIS', key: '0-0-1', children: [
                            { title: 'VISUALIZAR', key: '0-0-1-0' },
                            { title: 'ACTUALIZAR', key: '0-0-1-1' },
                        ],
                    },
                    {
                        title: 'RECARGAS', key: '0-0-2', children: [
                            { title: 'VISUALIZAR', key: '0-0-2-0' },
                        ],
                    },
                    {
                        title: 'CAPTURAR INSEN', key: '0-0-3', children: [
                            { title: 'VISUALIZAR', key: '0-0-3-0' },
                            { title: 'ACTUALIZAR', key: '0-0-3-1' },
                        ],
                    },
                    {
                        title: 'BOLETOS', key: '0-0-4', children: [
                            { title: 'IMPRESIÓN', key: '0-0-4-0' },
                        ],
                    },
                    {
                        title: 'REPORTES', key: '0-0-5', children: [
                            { title: 'TOTALES POR DÍA', key: '0-0-5-0' },
                            { title: 'TOTALES POR INSEN', key: '0-0-5-1' },
                        ],
                    },
                ],
            },
            {
                title: 'CATÁLOGOS',
                key: '0-1',
                children: [
                    {
                        title: 'USUARIOS', key: '0-1-0', children: [
                            { title: 'VISUALIZAR', key: '0-1-0-0' },
                            { title: 'CREAR', key: '0-1-0-1' },
                            { title: 'ACTUALIZAR', key: '0-1-0-2' },
                        ],
                    },
                    {
                        title: 'TARIFAS DE PUESTOS', key: '0-1-1', children: [
                            { title: 'VISUALIZAR', key: '0-1-1-0' },
                            { title: 'ACTUALIZAR', key: '0-1-1-1' },
                        ],
                    },
                    {
                        title: 'TARIFAS DE TARJETAS', key: '0-1-2', children: [
                            { title: 'VISUALIZAR', key: '0-1-2-0' },
                            { title: 'CREAR', key: '0-1-2-1' },
                            { title: 'ACTUALIZAR', key: '0-1-2-2' },
                            { title: 'ELIMINAR', key: '0-1-2-3' },
                        ],
                    },
                ],
            },
            {
                title: 'HISTORIAL',
                key: '0-2',
                children: [
                    { title: 'VISUALIZAR', key: '0-2-0-0' },
                ]
            },
        ]
    },
    {
        title: 'APLICACIÓN MÓVIL',
        key: '1',
        children: [
            {
                title: 'ACTIVACIÓN',
                key: '1-0',
                children: [
                    {
                        title: 'GENERACIÓN DE TARJETAS', key: '0-3-0', children: [
                            { title: 'VISUALIZAR', key: '0-3-0-0' },
                            { title: 'CREAR', key: '0-3-0-1' },
                        ],
                    },
                ],
            }
        ]
    }

];