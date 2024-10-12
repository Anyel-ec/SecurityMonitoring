# API de Monitoreo de Seguridad

Este proyecto es una API para monitorear conexiones a bases de datos como PostgreSQL, MariaDB, MongoDB, y servicios adicionales como Prometheus y Grafana, utilizando Spring Boot. La API permite la configuración, almacenamiento y actualización de credenciales de bases de datos, la instalación de exportadores de Prometheus y la ejecución de comandos Docker Compose para iniciar contenedores con estas configuraciones.

## Características

- **Configuración de Conexiones**: Administra conexiones para múltiples bases de datos, permitiendo guardar y actualizar credenciales.
- **Compatibilidad con Docker**: Ejecuta comandos Docker Compose para inicializar bases de datos PostgreSQL utilizando las credenciales configuradas.
- **Instalación de Exportadores de Prometheus**: Permite configurar exportadores de Prometheus para PostgreSQL, MongoDB y MariaDB.
- **Instalación de Grafana**: Administra la configuración e instalación de Grafana.
- **Autenticación Básica**: Implementa seguridad básica usando Spring Security y BCrypt para el cifrado de contraseñas.
- **Prueba de Conexión**: Proporciona utilidades para probar la conexión a bases de datos configuradas.
- **Estado de la Instalación**: Permite consultar el estado de la instalación, incluyendo si está completa o no.

## Tecnologías Utilizadas

- **Java 17**
- **Spring Boot 3**
- **Spring Security**: Para la configuración de seguridad.
- **JPA / Hibernate**: Para la persistencia de datos.
- **Docker**: Para gestionar bases de datos a través de Docker Compose.
- **Lombok**: Para reducir el código repetitivo.

## Estructura del Proyecto

- **Controladores**: Contiene los controladores REST para gestionar conexiones, instalaciones y exportadores.
  - **ConnectionNameController**: Administra las conexiones, incluyendo la obtención, almacenamiento y actualización de credenciales.
  - **ConfigInstallController**: Administra la instalación y configuración de servicios, verifica el estado de la instalación y actualiza parámetros.
  - **ExporterPrometheusInstallController**: Administra la configuración e instalación de exportadores de Prometheus para PostgreSQL, MariaDB y MongoDB.
  - **GrafanaInstallController**: Administra la instalación y configuración de Grafana.
  - **PrometheusInstallController**: Administra la instalación y configuración de Prometheus.
  - **UserInstallController**: Administra la instalación y configuración de usuarios.

- **Modelos**: Define las entidades que representan conexiones, credenciales y configuraciones de instalación.
  - **ConnectionName**: Entidad que representa una conexión a base de datos.
  - **InstallationConfig**: Entidad que representa la configuración de instalación para servicios como Grafana y Prometheus.
  - **PostgresCredentials, MariaDBCredentials, MongoDBCredentials**: Representan credenciales para las diferentes bases de datos.
  - **SystemParameters**: Entidad que representa parámetros del sistema, tales como los utilizados para definir el estado de la instalación.

- **Servicios**: Contiene la lógica de negocio.
  - **ConnectionNameService**: Proporciona operaciones para obtener, guardar y actualizar conexiones.
  - **DockerService**: Ejecuta comandos Docker Compose para iniciar contenedores PostgreSQL con las credenciales proporcionadas.
  - **PostgresCredentialsService**: Administra las credenciales de PostgreSQL y ejecuta Docker Compose para las bases de datos.
  - **ConfigInstallService**: Administra las instalaciones del sistema y verifica el estado de la instalación.
  - **PrometheusExporterInstallService**: Administra la instalación y actualización de exportadores de Prometheus.
  - **GrafanaInstallService**: Administra la instalación y actualización de Grafana.
  - **PrometheusInstallService**: Administra la instalación y actualización de Prometheus.
  - **UserInstallService**: Administra la instalación de usuarios.

- **Repositorios**: Interactúa con la base de datos utilizando JPA.
  - **ConnectionNameRepository, PostgresCredentialsRepository, MariaDBCredentialsRepository, MongoDBCredentialsRepository**: Repositorios para las respectivas entidades.
  - **InstallationConfigRepository**: Administra las configuraciones de instalación.

- **Seguridad**: Configura la seguridad básica usando Spring Security.
  - **SecurityConfig**: Permite el acceso a la consola de H2 y desactiva CSRF para los endpoints abiertos.

- **Utilidades**: Contiene clases de utilidad.
  - **AesEncryptor**: Proporciona métodos para cifrar y descifrar contraseñas usando AES/GCM.
  - **DatabaseUtils**: Proporciona métodos para probar conexiones a bases de datos.

## Endpoints

### Instalación de Exportadores de Prometheus

#### `PUT /api/v1/install/prometheus-exporters`
Actualiza o guarda la configuración de los exportadores de Prometheus para PostgreSQL, MariaDB y MongoDB.

- **Cuerpo de la solicitud**:
  ```json
  {
    "postgresPort": 9187,
    "mongoPort": 9216,
    "mariaPort": 9104
  }
  ```
- **Respuesta**:
  ```json
  {
    "success": true,
    "code": 200,
    "message": "Exportadores de Prometheus actualizados correctamente"
  }
  ```

### Instalación de Grafana

#### `POST /api/v1/install/grafana`
Guarda la configuración de la instalación de Grafana.

- **Cuerpo de la solicitud**:
  ```json
  {
    "usuario": "admin",
    "password": "admin123",
    "internalPort": 3000,
    "externalPort": 8080
  }
  ```
- **Respuesta**:
  ```json
  {
    "success": true,
    "code": 200,
    "message": "Instalación de Grafana guardada exitosamente",
    "data": {
      "id": 1,
      "internalPort": 3000,
      "externalPort": 8080,
      "usuario": "admin"
    }
  }
  ```

#### `GET /api/v1/install/grafana`
Obtiene la configuración de la instalación de Grafana.

- **Respuesta**:
  ```json
  {
    "success": true,
    "code": 200,
    "message": "Instalación de Grafana recuperada exitosamente",
    "data": {
      "id": 1,
      "internalPort": 3000,
      "externalPort": 8080,
      "usuario": "admin"
    }
  }
  ```

### Instalación de Prometheus

#### `POST /api/v1/install/prometheus`
Guarda la configuración de la instalación de Prometheus.

- **Cuerpo de la solicitud**:
  ```json
  {
    "usuario": "prometheus",
    "password": "prometheus123",
    "internalPort": 9090,
    "externalPort": 9090
  }
  ```
- **Respuesta**:
  ```json
  {
    "success": true,
    "code": 200,
    "message": "Instalación de Prometheus guardada exitosamente"
  }
  ```

#### `GET /api/v1/install/prometheus`
Obtiene la configuración de la instalación de Prometheus.

- **Respuesta**:
  ```json
  {
    "success": true,
    "code": 200,
    "message": "Instalación de Prometheus recuperada exitosamente",
    "data": {
      "id": 1,
      "internalPort": 9090,
      "externalPort": 9090,
      "usuario": "prometheus"
    }
  }
  ```

### Instalación de Usuarios

#### `POST /api/v1/install/user`
Guarda la configuración de la instalación de usuarios.

- **Cuerpo de la solicitud**:
  ```json
  {
    "nombreUsuario": "user1",
    "password": "userpass"
  }
  ```
- **Respuesta**:
  ```json
  {
    "success": true,
    "code": 200,
    "message": "Registro de usuario guardado exitosamente"
  }
  ```

### Estado de la Instalación

#### `GET /api/v1/install/status`
Verifica si la instalación está completa.

- **Respuesta**:
  ```json
  {
    "success": true,
    "code": 200,
    "message": "Estado de la instalación recuperado exitosamente",
    "data": true
  }
  ```

#### `PUT /api/v1/install/complete`
Actualiza el estado de la instalación a completo.

- **Respuesta**:
  ```json
  {
    "success": true,
    "code": 200,
    "message": "El parámetro COMPLETE_INSTALL fue actualizado exitosamente"
  }
  ```

## Configuración

### Requisitos

- Docker y Docker Compose deben estar instalados para ejecutar correctamente los servicios Docker.
- PostgreSQL, MariaDB o MongoDB deben estar configurados correctamente para la prueba de conexión.

### Variables de Entorno

- POSTGRES_USER: Usuario de la base de datos PostgreSQL.
- POSTGRES_PASSWORD: Contraseña de la base de datos PostgreSQL.
- POSTGRES_HOST: Host de la base de datos PostgreSQL.
- POSTGRES_PORT_HOST: Puerto del host de PostgreSQL.

## Instalación

1. Clonar el repositorio:

```bash
git clone https://github.com/Anyel-ec/SecurityMonitoring/Backend
```

2. Configura tu archivo `application.properties` o usa un archivo `.env

` para las credenciales de la base de datos.

3. Ejecuta la aplicación:

```bash
./mvnw spring-boot:run
```

4. Accede a la API en [http://localhost:8080](http://localhost:8080).

## Ejecutando Docker Compose

Para ejecutar Docker Compose con las credenciales de PostgreSQL configuradas, asegúrate de tener el archivo `docker-compose.yml` configurado en la ruta indicada en `DockerService.java`.

## Pruebas

- Para probar la conexión a la base de datos, puedes utilizar los endpoints proporcionados. La respuesta indicará si la conexión fue exitosa o no.

## Contribuciones

Si deseas contribuir a este proyecto, por favor abre un issue o envía un pull request.

## Licencia

Este proyecto está licenciado bajo la [Licencia Apache 2.0](LICENSE).

## Información del Equipo y del Proyecto

Herramienta de código abierto para el monitoreo dinámico de tres SGBD: MongoDB, PostgreSQL y MariaDB/MySQL.

**Project Manager(PM): Ing. Luis Chica, Mgtr** - [Perfil en GitHub](https://github.com/LuisChica18)

**Desarrollador: Ing. Ángel Patiño** - [Perfil en GitHub](https://github.com/Anyel-ec)
