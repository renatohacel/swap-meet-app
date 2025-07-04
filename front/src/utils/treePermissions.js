export const treeData = [
    {
        title: 'APLICACIÓN WEB',
        key: 'WEB',
        children: [
            {
                title: 'ADMINISTRACIÓN',
                key: '0-0',
                children: [
                    {
                        title: 'GENERACIÓN DE TARJETAS', key: '0-0-0', children: [
                            { title: 'VISUALIZAR', key: '0-0-0-0' },
                            { title: 'CREAR', key: '0-0-0-1' },
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
                            { title: 'CREAR', key: '0-1-1-1' },
                            { title: 'ACTUALIZAR', key: '0-1-1-2' },
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
        title: 'APLACIÓN MÓVIL',
        key: 'MOVIL',
        children: [
            {
                title: 'ACTIVACIÓN',
                key: '0-3',
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