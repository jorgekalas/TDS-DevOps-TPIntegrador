# API Inmobiliaria – Proyecto Integrador de Desarrollo Web Backend


## Descripción general

Esta API está orientada a mejorar la organización interna de la inmobiliaria **Alquilarte**, una empresa mediana.  
Permite gestionar tareas, usuarios y áreas funcionales, con el objetivo de optimizar procesos administrativos, comerciales y operativos.

---

## Objetivos generales
- Mejorar el software desarrollado por encargo
- Integrar equipos de proyecto para el desarrollo
- Liderar grupos de trabajo y asumir roles especializados.
- Desempeñarse de manera autónoma en el desarrollo de sistemas de complejidad.
- Implementar otros conocimientos de otras áreas al desarrollo (FrontEnd, Ing de Software)

---

## Objetivos específicos 
1. Desarrollar una aplicación web utilizando Node.js y Express.
2. Integrar una base de datos con Mongo Atlas
3. Aplicar conceptos de Autenticación y autorización JWT, Token, Bycript,
PasswordHash, Passport, Sesiones, Testing JEST, Supertest, Websocket,
Vercel, etc
4. Revisar la implementación del sistema anterior de rutas dinámicas y
middleware, asincronía y manejo de promesas.
5. Seguir buenas prácticas de desarrollo.

---

## Funcionalidades principales
- Gestión de Personas: CRUD completo con validaciones y autoincremento de ID.
- Gestión de Clientes: CRUD completo adaptado con vistas Pug.
- Gestión de Propiedades: CRUD con relación a propietarios y estado de inmuebles.
- Testing automatizado para asegurar la estabilidad del backend.
- Despliegue en la nube con Render, accesible públicamente.

---

## 📁 Estructura del Proyecto – Versión 1.1

- 📁 **models/** → Esquemas de datos con Mongoose  
- 📁 **controllers/** → Lógica de negocio y controladores  
- 📁 **routes/** → Definición de rutas REST  
- 📁 **views/** → Vistas Pug para renderizado del frontend  
- 📁 **tests/** → Pruebas automatizadas con Jest y Supertest  
- 📁 **public/** → Recursos estáticos como estilos .css  

- 📄 **app.js** → Configuración de Express y definición de rutas  
- 📄 **index.js** → Conexión a MongoDB Atlas y arranque del servidor  
- 📄 **.env** → Variables de entorno (MONGO_URI, PORT)  
- 📄 **package.json** → Configuración de dependencias y scripts

---

##  Rutas principales

- `/` – Página de inicio
- `/personas` – Gestión del personal
- `/clientes` – Gestión de clientes
- `/propiedades` – Gestión de propiedades

---

## Despliegue
 El backend está desplegado y disponible públicamente en Render:

  https://alquilarte-api.onrender.com

---

## Tecnologías utilizadas
- Express.js
- MongoDB Atlas (Mongoose ODM)
- Pug (motor de plantillas)
- dotenv (variables de entorno)
- Jest y Supertest (testing automatizado)
- Render (plataforma de despliegue)
- mongoose-sequence (autoincremento de IDs)
- Postman para pruebas
- Git y GitHub para control de versiones
---

## Instalación local
1. Clonar el repositorio:
git clone https://github.com/Ariadna-S708/TDS-DevOps-TPIntegrador.git
2. Instalar dependencias: npm install
3. Crear archivo .env con la siguiente variable:
MONGO_URI=mongodb+srv://usuario:contraseña@cluster.mongodb.net/base_de_datos?retryWrites=true&w=majority
4. Iniciar el servidor: npm start

## Usuarios de acceso
## Admin:
    Usuario: admin
    Contraseña: admin123

## Empleado:
    Usuario: Agente 3
    Contraseña: agente