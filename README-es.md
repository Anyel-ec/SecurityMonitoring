# Herramienta Open Source para el Monitoreo de Bases de Datos MariaDB, PostgreSQL y MongoDB con Prometheus y Grafana  

Este proyecto tiene como objetivo desarrollar una herramienta **open-source** para el monitoreo dinámico de tres bases de datos: **MongoDB**, **PostgreSQL** y **MariaDB/MySQL**. La herramienta permite a los usuarios especificar credenciales de conexión a través de una interfaz web en **React** y visualizar paneles personalizados en **Grafana** para una o varias bases de datos combinadas.  

El backend está desarrollado con **Spring Boot** y utiliza **Prometheus** y **Grafana** para recopilar y visualizar las métricas de las bases de datos seleccionadas.  

## **Select Language:**
- [Español (Spanish)](README-es.md)
- [English](README.md)

## Características  

1. **Configuración de Conexión a Bases de Datos**:  
   - Los usuarios pueden especificar credenciales para conectar **MongoDB**, **PostgreSQL** y **MariaDB** a través de un formulario dinámico en la aplicación React.  
   - Permite la combinación de diferentes bases de datos: por ejemplo, monitorear solo **MongoDB**, **PostgreSQL** o **MariaDB**, o combinaciones como **MongoDB + PostgreSQL**.  

2. **Monitoreo Dinámico**:  
   - El backend en **Spring Boot** recibe las credenciales proporcionadas por el usuario y configura las conexiones a la base de datos.  
   - Se recopilan métricas con **Prometheus** y se visualizan en **Grafana**.  

3. **Visualización en Grafana**:  
   - Dashboards preconfigurados en **Grafana** que se activan según las bases de datos seleccionadas por el usuario.  

4. **Envío de notificaciones**:  
   - Envío de notificaciones mediante **Alertmanager**.  

## Resultados  
### Bienvenido  
![Alt text](docs/images/release/bienvenido.png)  

### Instalación del usuario administrador, Grafana, Prometheus y demás complementos  
![Alt text](docs/images/release/instalacion.png)  

### Inicio de sesión  
![Alt text](docs/images/release/login_blanco.png)  

### Inicio de sesión (Modo oscuro)  
![Alt text](docs/images/release/login.png)  

### Recuperar contraseña (Modo oscuro)  
![Alt text](docs/images/release/recuperar_password.png)  

### Gestión de credenciales de los Sistemas de Gestión de BD  
![Alt text](docs/images/release/gestion%20de%20credenciales.png)  

### Activación de alertas para los Sistemas de Gestión de BD  
![Alt text](docs/images/release/activar%20alertas.png)  

### Modificación de alertas  
![Alt text](docs/images/release/modificar%20alertas.png)  

### Envío de alertas al cumplirse reglas  
![Alt text](docs/images/release/alertas.png)  

### Gestión de usuarios  
![Alt text](docs/images/release/gestion_usuarios.png)  

### Gestión de usuarios (todo el sistema compatible con modo oscuro)  
![Alt text](docs/images/release/modo%20oscuro.png)  

### Creación de usuarios  
![Alt text](docs/images/release/modo%20oscuro.png)  

### Recepción de correo de creación de usuarios  
![Alt text](docs/images/release/creacion%20correo.png)  

### Paneles de control en Grafana - PostgreSQL  
![Alt text](docs/images/release/postgres.png)  

### Paneles de control en Grafana - MariaDB/MySQL  
![Alt text](docs/images/release/mysql.png)  

### Paneles de control en Grafana - MongoDB  
![Alt text](docs/images/release/mongodb.png)  

### Paneles de control en Grafana - MongoDB + MariaDB/MySQL + PostgreSQL  
![Alt text](docs/images/release/combinado.png)
¡Claro! Aquí tienes tu texto corregido, con redacción clara, tildes, buena estructura y con el enlace al PDF vinculado correctamente para que puedan acceder al manual:

---

# Manuales de Desarrollador, Administrador y Usuario

Dentro de la carpeta `docs/manual` se encuentran los manuales correspondientes.  

Puedes acceder al manual del administrador aquí:   
📄 [Manual del Administrador (PDF)](docs/manual/Developer%20Manual.pdf)  

Puedes acceder al manual del administrador aquí:   
📄 [Manual del Desarrollador (PDF)](docs/manual/Administrator%20Manual.pdf)  

Puedes acceder al manual del administrador aquí:  
📄 [Manual del Usuario (PDF)](docs/manual/User%20Manual.pdf) 

## Tecnologías Utilizadas  

- **Frontend**: React (creado con Vite), React Bootstrap para el diseño de formularios dinámicos.  
- **Backend**: Spring Boot.
- **Monitoreo y Visualización**: Grafana y Prometheus.  
- **Sistemas de Gestión de Bases de Datos**: MongoDB, PostgreSQL, MariaDB y H2 Database.  
- **Contenedores**: Docker y Docker Compose para la orquestación de servicios.  

---

## Instalación y Uso  

### 1. Clonar el Repositorio  

```bash
git clone https://github.com/Anyel-ec/SecurityMonitoring
cd SecurityMonitoring
```

### 2. Ejecutar Docker  
Es importante tener **Docker iniciado** para continuar con el proceso.  

### 3. Ejecutar el Frontend  
- Dirígete a la carpeta `Frontend`  
- Instala las dependencias:  
  ```bash
  npm install
  ```
- Luego ejecuta el proyecto:  
  ```bash
  npm run dev
  ```

### 4. Ejecutar el Backend  
- Dirígete a la carpeta `Backend`  
- Asegúrate de que las dependencias del archivo `pom.xml` se descarguen correctamente  
- Ejecuta el proyecto desde tu entorno de desarrollo  con Maven

### 5. Consultar el Manual del Administrador  
Para más detalles sobre la configuración y administración del sistema, puedes revisar el siguiente documento:  
📘 [Manual del Administrador (PDF)](docs/manual/Administrator%20Manual.pdf)


## Contribuciones  

Si deseas contribuir a este proyecto, puedes abrir un **issue** o enviar un **pull request**.  

## Licencia  

Este proyecto está licenciado bajo la [BSD 3-Clause "New" or "Revised" License](LICENSE).  

## Equipo e Información del Proyecto  

Herramienta open source para el monitoreo dinámico de tres bases de datos: **MongoDB**, **PostgreSQL** y **MariaDB/MySQL**.  

**Gerente del Proyecto: Ing. Luis Chica, Mgtr** - [Perfil de GitHub](https://github.com/LuisChica18)  

**Desarrollador: Ing. Angel Patiño** - [Perfil de GitHub](https://github.com/Anyel-ec)  