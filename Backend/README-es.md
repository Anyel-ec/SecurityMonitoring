# Security Monitoring API

Este proyecto es una API de monitoreo de conexiones para bases de datos como PostgreSQL, MariaDB y MongoDB, utilizando Spring Boot. Permite la configuración, almacenamiento y actualización de credenciales de bases de datos, así como la ejecución de comandos Docker Compose para iniciar contenedores con estas configuraciones.

## Características

- **Configuración de Conexiones**: Maneja conexiones para varias bases de datos, permitiendo guardar y actualizar credenciales.
- **Compatibilidad con Docker**: Ejecuta comandos Docker Compose para inicializar bases de datos PostgreSQL utilizando las credenciales configuradas.
- **Autenticación Básica**: Implementa seguridad básica usando Spring Security y codificación de contraseñas con BCrypt.
- **Testeo de Conexión**: Proporciona utilidades para probar la conexión a las bases de datos configuradas.
  
## Tecnologías Utilizadas

- **Java 17**
- **Spring Boot 3**
- **Spring Security**: Para la configuración de seguridad.
- **JPA / Hibernate**: Para la persistencia de datos.
- **Docker**: Para el manejo de bases de datos a través de Docker Compose.
- **Lombok**: Para reducir el código repetitivo.

## Estructura del Proyecto

- **Controllers**: Contienen los controladores REST para gestionar las conexiones y credenciales.
  - `ConnectionNameController`: Administra las conexiones, incluyendo la obtención, almacenamiento y actualización de credenciales.
  
- **Models**: Definen las entidades que representan las conexiones y credenciales.
  - `ConnectionName`: Entidad que representa una conexión a una base de datos.
  - `PostgresCredentials`, `MariaDBCredentials`, `MongoDBCredentials`: Representan las credenciales para las distintas bases de datos.
  
- **Services**: Contienen la lógica de negocio.
  - `ConnectionNameService`: Proporciona operaciones para obtener, guardar y actualizar las conexiones.
  - `DockerService`: Ejecuta comandos Docker Compose para levantar contenedores de PostgreSQL con las credenciales proporcionadas.
  - `PostgresCredentialsService`: Gestiona las credenciales de PostgreSQL y ejecuta Docker Compose para las bases de datos.
  
- **Repositories**: Interactúan con la base de datos utilizando JPA.
  - `ConnectionNameRepository`, `PostgresCredentialsRepository`, `MariaDBCredentialsRepository`, `MongoDBCredentialsRepository`: Repositorios para las entidades correspondientes.

- **Security**: Configura la seguridad básica utilizando Spring Security.
  - `SecurityConfig`: Permite el acceso a la consola de H2 y deshabilita CSRF para endpoints abiertos.

- **Utils**: Contiene clases de utilidad.
  - `DatabaseUtils`: Proporciona métodos para probar las conexiones de base de datos.

## Endpoints

### GET `/api/v1/connection/name/{connectionName}`
Configura una conexión a PostgreSQL basada en el nombre de la conexión.

- **Path Variable**: `connectionName` - Nombre de la conexión.
- **Response**: Devuelve las credenciales de PostgreSQL configuradas para esa conexión.

### GET `/api/v1/connection/names`
Obtiene todos los nombres de las conexiones configuradas.

- **Response**: Devuelve una lista de nombres de conexiones.

### POST `/api/v1/connection/save`
Guarda o actualiza una conexión a la base de datos.

- **Request Body**: `ConnectionName` - Datos de la conexión que se desea guardar o actualizar.
- **Response**: Devuelve el estado de la operación.

## Configuración

### Prerrequisitos

- Docker y Docker Compose deben estar instalados para ejecutar correctamente el servicio de Docker.
- PostgreSQL, MariaDB o MongoDB deben estar configurados correctamente para las pruebas de conexión.

### Variables de Entorno

- `POSTGRES_USER`: Usuario de la base de datos PostgreSQL.
- `POSTGRES_PASSWORD`: Contraseña de la base de datos PostgreSQL.
- `POSTGRES_HOST`: Host de la base de datos PostgreSQL.
- `POSTGRES_PORT_HOST`: Puerto del host PostgreSQL.

## Instalación

1. Clona el repositorio:

   ```bash
   git clone https://github.com/Anyel-ec/SecurityMonitoring****
   ```

2. Configura tu archivo `application.properties` o usa un archivo `.env` para las credenciales de la base de datos.

3. Ejecuta la aplicación:

   ```bash
   ./mvnw spring-boot:run
   ```

4. Accede a la API en `http://localhost:8080`.

## Ejecución de Docker Compose

Para ejecutar Docker Compose con las credenciales de PostgreSQL configuradas, asegúrate de tener configurado el archivo `docker-compose.yml` en la ruta indicada en `DockerService.java`.

## Pruebas

- Para probar la conexión a la base de datos, puedes utilizar los endpoints proporcionados. La respuesta indicará si la conexión fue exitosa o fallida.

## Contribuciones

Si deseas contribuir a este proyecto, por favor abre un issue o envía un pull request.

## Licencia

Este proyecto está licenciado bajo la [Apache License 2.0](LICENSE).

