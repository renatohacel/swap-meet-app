Sistema de Gestión de Tarjetas Recargables para Mercados

Sistema web full-stack para la administración de tarjetas de saldo recargables en mercados o tianguis. Permite emitir tarjetas a vendedores, recargar saldo, cobrar el pago de espacios, administrar usuarios con distintos roles y generar comprobantes en PDF. Construido con una API REST propia en Node.js + Express, un frontend en React, y SQL Server como base de datos.


Nota: Este repositorio se comparte como muestra de código y arquitectura. Fue desarrollado en un entorno profesional y se publica limpio de datos reales y credenciales. Para ejecutarlo por completo se requiere configurar variables de entorno y una base de datos propia.




Funcionalidades principales


Emisión de tarjetas: alta y registro de tarjetas recargables asignadas a vendedores.
Recargas de saldo: abono de saldo a las tarjetas con registro de movimientos.
Pago de espacios: cobro del uso de espacios del mercado descontando del saldo.
Gestión de usuarios y roles: control de acceso por perfil (administrador, cajero, vendedor).
Categorías de negocio: administración de los tipos de vendedor/espacio.
Comprobantes en PDF: generación de recibos imprimibles de las operaciones.



Arquitectura y decisiones técnicas

El backend sigue una arquitectura en capas para separar responsabilidades y facilitar el mantenimiento:


Controladores: reciben las peticiones HTTP y devuelven respuestas.
Servicios: contienen la lógica de negocio (recargas, cobros, emisión).
Repositorios: encapsulan el acceso a la base de datos.
Middlewares: autenticación JWT, verificación de roles y manejo centralizado de errores.


La seguridad se maneja con JWT: al iniciar sesión se emite un token, y las rutas quedan protegidas según el rol del usuario. Las entradas se validan y los errores devuelven respuestas HTTP consistentes.


Stack tecnológico

Frontend


React (Hooks)
Consumo de la API con Axios / fetch
Manejo de estados de carga y error


Backend


Node.js + Express (API REST)
Autenticación y autorización con JWT
Arquitectura en capas (controlador – servicio – repositorio)
Generación de PDFs para comprobantes


Base de datos


Microsoft SQL Server (MSSQL)



Estructura del proyecto

/
├── back/                   # API REST (Node.js + Express)
│   ├── controllers/        # Reciben peticiones y devuelven respuestas
│   ├── services/           # Lógica de negocio
│   ├── repositories/       # Acceso a datos
│   ├── middlewares/        # Auth JWT, roles, manejo de errores
│   ├── routes/             # Definición de endpoints
│   └── config/             # Conexión a la base de datos y configuración
│
└── front/                  # Aplicación React
    ├── components/         # Componentes reutilizables
    ├── pages/              # Vistas principales
    ├── services/           # Llamadas a la API
    └── hooks/              # Hooks personalizados


La estructura de carpetas puede variar ligeramente; refleja la separación en capas del backend y la organización por componentes del frontend.




Cómo ejecutarlo localmente

Requisitos previos


Node.js (versión LTS recomendada)
Una instancia de SQL Server accesible
npm


1. Clonar el repositorio

bashgit clone https://github.com/renatohacel/swap-meet-app.git
cd swap-meet-app

2. Configurar el backend

bashcd back
npm install

Crear un archivo .env dentro de back/ con las variables necesarias, por ejemplo:

envPORT=3000
DB_SERVER=localhost
DB_DATABASE=nombre_de_tu_bd
DB_USER=tu_usuario
DB_PASSWORD=tu_contraseña
JWT_SECRET=una_clave_secreta_segura

Iniciar el servidor:

bashnpm run dev

3. Configurar el frontend

bashcd ../front
npm install
npm run dev

La aplicación quedará disponible en el puerto que indique la terminal.


Conceptos que demuestra este proyecto


Diseño e implementación de APIs REST completas.
Seguridad con JWT, control de acceso por roles y rutas protegidas.
Arquitectura limpia con separación de responsabilidades en capas.
Lógica de negocio con manejo de saldos y transacciones.
Generación de documentos PDF.
Integración frontend–backend con manejo de estados y errores.
Trabajo con bases de datos relacionales (SQL Server).



Autor

Renato Hacel Cal y Mayor Rodríguez
Desarrollador Full-Stack
LinkedIn · GitHub
