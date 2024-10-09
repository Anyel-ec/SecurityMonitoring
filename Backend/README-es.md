# Security Monitoring API

Este proyecto es una API de monitoreo de conexiones para bases de datos como PostgreSQL, MariaDB, MongoDB, y servicios adicionales como Prometheus y Grafana, utilizando Spring Boot. La API permite la configuración, almacenamiento y actualización de credenciales de bases de datos, instalación de exportadores de Prometheus, y ejecución de comandos Docker Compose para iniciar contenedores con estas configuraciones.

## Características

- **Configuración de Conexiones**: Maneja conexiones para varias bases de datos, permitiendo guardar y actualizar credenciales.
- **Compatibilidad con Docker**: Ejecuta comandos Docker Compose para inicializar bases de datos PostgreSQL utilizando las credenciales configuradas.
- **Instalación de Prometheus Exporters**: Permite la configuración de exportadores de Prometheus para PostgreSQL, MongoDB y MariaDB.
- **Instalación de Grafana**: Administra la configuración e instalación de Grafana.
- **Autenticación Básica**: Implementa seguridad básica usando Spring Security y codificación de contraseñas con BCrypt.
- **Testeo de Conexión**: Proporciona utilidades para probar la conexión a las bases de datos configuradas.
- **Estado de Instalación**: Permite consultar el estado de la instalación, incluyendo si está completa o no.

## Tecnologías Utilizadas

- **Java 17**
- **Spring Boot 3**
- **Spring Security**: Para la configuración de seguridad.
- **JPA / Hibernate**: Para la persistencia de datos.
- **Docker**: Para el manejo de bases de datos a través de Docker Compose.
- **Lombok**: Para reducir el código repetitivo.

## Estructura del Proyecto

- **Controllers**: Contienen los controladores REST para gestionar las conexiones, instalaciones y exportadores.
  - **ConnectionNameController**: Administra las conexiones, incluyendo la obtención, almacenamiento y actualización de credenciales.
  - **ConfigInstallController**: Administra la instalación y configuración de servicios, verificando el estado de la instalación y actualizando parámetros.
  - **ExporterPrometheusInstallController**: Gestiona la configuración e instalación de los exportadores de Prometheus para PostgreSQL, MariaDB y MongoDB.
  - **GrafanaInstallController**: Administra la instalación y configuración de Grafana.
  - **PrometheusInstallController**: Administra la instalación y configuración de Prometheus.
  - **UserInstallController**: Gestiona la instalación y configuración de usuarios.

- **Models**: Definen las entidades que representan las conexiones, credenciales y configuraciones de instalación.
  - **ConnectionName**: Entidad que representa una conexión a una base de datos.
  - **InstallationConfig**: Entidad que representa la configuración de instalación para servicios como Grafana y Prometheus.
  - **PostgresCredentials, MariaDBCredentials, MongoDBCredentials**: Representan las credenciales para las distintas bases de datos.
  - **SystemParameters**: Entidad que representa parámetros del sistema, como los utilizados para definir el estado de instalación.

- **Services**: Contienen la lógica de negocio.
  - **ConnectionNameService**: Proporciona operaciones para obtener, guardar y actualizar las conexiones.
  - **DockerService**: Ejecuta comandos Docker Compose para levantar contenedores de PostgreSQL con las credenciales proporcionadas.
  - **PostgresCredentialsService**: Gestiona las credenciales de PostgreSQL y ejecuta Docker Compose para las bases de datos.
  - **ConfigInstallService**: Administra la instalación de sistemas y verifica el estado de la instalación.
  - **PrometheusExporterInstallService**: Gestiona la instalación y actualización de los exportadores de Prometheus.
  - **GrafanaInstallService**: Gestiona la instalación y actualización de Grafana.
  - **PrometheusInstallService**: Gestiona la instalación y actualización de Prometheus.
  - **UserInstallService**: Administra la instalación de usuarios.

- **Repositories**: Interactúan con la base de datos utilizando JPA.
  - **ConnectionNameRepository, PostgresCredentialsRepository, MariaDBCredentialsRepository, MongoDBCredentialsRepository**: Repositorios para las entidades correspondientes.
  - **InstallationConfigRepository**: Maneja las configuraciones de instalación.

- **Security**: Configura la seguridad básica utilizando Spring Security.
  - **SecurityConfig**: Permite el acceso a la consola de H2 y deshabilita CSRF para endpoints abiertos.

- **Utils**: Contiene clases de utilidad.
  - **AesEncryptor**: Proporciona métodos para encriptar y desencriptar contraseñas usando AES/GCM.
  - **DatabaseUtils**: Proporciona métodos para probar las conexiones de base de datos.

## Endpoints

### Instalación de Exportadores de Prometheus

#### `PUT /api/v1/install/prometheus-exporters`
Actualiza o guarda la configuración de los exportadores de Prometheus para PostgreSQL, MariaDB y MongoDB.

- **Request Body**:
  ```json
  {
    "postgresPort": 9187,
    "mongoPort": 9216,
    "mariaPort": 9104
  }
  ```
- **Response**:
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

- **Request Body**:
  ```json
  {
    "usuario": "admin",
    "password": "admin123",
    "internalPort": 3000,
    "externalPort": 8080
  }
  ```
- **Response**:
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

- **Response**:
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

- **Request Body**:
  ```json
  {
    "usuario": "prometheus",
    "password": "prometheus123",
    "internalPort": 9090,
    "externalPort": 9090
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "code": 200,
    "message": "Instalación de Prometheus guardada exitosamente"
  }
  ```

#### `GET /api/v1/install/prometheus`
Obtiene la configuración de la instalación de Prometheus.

- **Response**:
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
Guarda la configuración de instalación de usuarios.

- **Request Body**:
  ```json
  {
    "nombreUsuario": "user1",
    "password": "userpass"
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "code": 200,
    "message": "Registro de usuario guardado exitosamente"
  }
  ```

### Estado de Instalación

#### `GET /api/v1/install/status`
Verifica si la instalación está completa.

- **Response**:
  ```json
  {
    "success": true,
    "code": 200,
    "message": "Estado de la instalación recuperado exitosamente",
    "data": true
  }
  ```

#### `PUT /api/v1/install/complete`
Actualiza el estado de la instalación a completa.

- **Response**:
  ```json
  {
    "success": true,
    "code": 200,
    "message": "El parámetro COMPLETE_INSTALL fue actualizado exitosamente"
  }
  ```

## Configuración

### Prerrequisitos

- Docker y Docker Compose deben estar instalados para ejecutar correctamente el servicio de Docker.
- PostgreSQL, MariaDB o MongoDB deben estar configurados correctamente para las pruebas de conexión.

### Variables de Entorno

- POSTGRES_USER: Usuario de la base de datos PostgreSQL.
- POSTGRES_PASSWORD: Contraseña de la base de datos PostgreSQL.
- POSTGRES_HOST: Host de la base de datos PostgreSQL.
- POSTGRES_PORT_HOST: Puerto del host PostgreSQL.

## Instalación

1. Clona el repositorio:

```bash
git clone https://github.com/Anyel-ec/SecurityMonitoring/Backend
```

2. Configura tu archivo `application.properties` o usa un archivo `.env` para las credenciales de la base de datos.

3. Ejecuta la aplicación:

```bash
./mvnw spring-boot:run
```

4. Accede a la API en [http://localhost:8080](http://localhost:8080).

## Ejecución de Docker Compose

Para ejecutar Docker Compose con las credenciales de PostgreSQL configuradas, asegúrate de tener configurado el archivo `docker-compose.yml` en la ruta indicada en `DockerService.java`.

## Pruebas

- Para probar la conexión a la base de datos, puedes utilizar los endpoints proporcionados. La respuesta indicará si la conexión fue exitosa o fallida.

## Contribuciones

Si deseas contribuir a este proyecto, por favor abre un issue o envía un pull request.

## Licencia

Este proyecto está licenciado bajo la [Apache License 2.0](LICENSE).
