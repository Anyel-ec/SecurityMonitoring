# SecurityMonitoring - Dev Container

Esta carpeta contiene la configuración para tres bases de datos de código abierto (**MariaDB**, **MongoDB** y **PostgreSQL**) que exportan sus métricas usando exportadores de Prometheus. Los servicios en esta carpeta están configurados de manera estática para monitorear las bases de datos, y no habrá mejoras futuras, ya que esta parte del proyecto está finalizada. Las mejoras se realizarán en la carpeta `.container`.

## Instrucciones Importantes

Después de descargar el proyecto, cambia el nombre del archivo `.env.template` a `.env` antes de ejecutar los servicios.

## Variables de Entorno

El archivo `.env.template` contiene las siguientes variables de entorno para cada base de datos:

### PostgreSQL
- `POSTGRES_USER`: Nombre de usuario para PostgreSQL.
- `POSTGRES_PASSWORD`: Contraseña para PostgreSQL.
- `POSTGRES_DB`: Nombre de la base de datos de PostgreSQL.
- `POSTGRES_HOST`: Nombre del host del servicio PostgreSQL.
- `POSTGRES_PORT_HOST`: Puerto local (máquina anfitriona).
- `POSTGRES_PORT_CONTAINER`: Puerto del contenedor para PostgreSQL.

### MongoDB
- `MONGODB_USER`: Nombre de usuario para MongoDB.
- `MONGODB_PASSWORD`: Contraseña para MongoDB.
- `MONGODB_DB`: Nombre de la base de datos de MongoDB.
- `MONGODB_HOST`: Nombre del host del servicio MongoDB.
- `MONGODB_PORT_HOST`: Puerto local (máquina anfitriona).
- `MONGODB_PORT_CONTAINER`: Puerto del contenedor para MongoDB.

### MariaDB
- `MYSQL_ROOT_PASSWORD`: Contraseña del usuario root para MariaDB.
- `MYSQL_DATABASE`: Base de datos predeterminada para MariaDB.
- `MYSQL_USER`: Usuario personalizado de MariaDB.
- `MYSQL_PASSWORD`: Contraseña para el usuario personalizado de MariaDB.
- `MYSQL_HOST`: Nombre del host del servicio MariaDB.
- `MYSQL_PORT_HOST`: Puerto local (máquina anfitriona).
- `MYSQL_PORT_CONTAINER`: Puerto del contenedor para MariaDB.

## Resumen de Servicios

### 1. **Grafana**
- Imagen: `grafana/grafana`
- Puerto expuesto: `3000:3000`
- Credenciales:
  - Usuario Admin: `anyel`
  - Contraseña Admin: `anyel`
- Propósito: Visualizar las métricas recolectadas de las bases de datos.

### 2. **Prometheus**
- Imagen: `prom/prometheus`
- Puerto expuesto: `9090:9090`
- Propósito: Recolectar métricas de todos los exportadores de bases de datos y de los objetivos configurados.

### 3. **MongoDB**
- Imagen: `mongo:latest`
- Puerto expuesto: `27020:27017`
- Volumen persistente: `mongo_data` para almacenar los datos de MongoDB.

### 4. **MariaDB**
- Imagen: `mariadb:latest`
- Puerto expuesto: `${MYSQL_PORT_HOST}:${MYSQL_PORT_CONTAINER}`
- Variables de entorno definidas en `.env` para la configuración del usuario personalizado.

### 5. **PostgreSQL**
- Imagen: `postgres:latest`
- Puerto expuesto: `${POSTGRES_PORT_HOST}:${POSTGRES_PORT_CONTAINER}`
- Volumen persistente: `postgres_data` para almacenar los datos de PostgreSQL.

## Servicios Exportadores

1. **Exportador de MongoDB**
   - Imagen: `ssheehy/mongodb-exporter:latest`
   - Puerto expuesto: `9216:9216`
   - Recolecta métricas de MongoDB ejecutado en `mongo_db`.

2. **Exportador de PostgreSQL**
   - Imagen: `prometheuscommunity/postgres-exporter`
   - Puerto expuesto: `9187:9187`
   - Recolecta métricas de PostgreSQL utilizando la variable `DATA_SOURCE_NAME` con las credenciales.

3. **Exportador de MariaDB**
   - Imagen: `prom/mysqld-exporter`
   - Puerto expuesto: `9104:9104`
   - Exporta métricas de MariaDB utilizando la configuración en `.my.cnf`.

## Volúmenes

- `grafana_storage`: Volumen persistente para los datos de Grafana.
- `mongo_data`: Volumen persistente para los datos de MongoDB.
- `postgres_data`: Volumen persistente para los datos de PostgreSQL.

## Configuración de Prometheus

El archivo `prometheus.yml` define los siguientes objetivos de scraping:

- **Prometheus**: Objetivo `prometheus:9090` para recolectar sus propias métricas.
- **Exportador de PostgreSQL**: Objetivo `postgres-exporter:9187`.
- **Exportador de MongoDB**: Objetivo `mongo-exporter:9216`.
- **Exportador de MariaDB**: Objetivo `192.168.0.215:9104`.

## Cómo Ejecutar

1. Cambia el nombre de `.env.template` a `.env`.
2. Asegúrate de tener el archivo `.env` configurado con las variables de entorno correctas.
3. En el directorio `.devcontainer`, ejecuta:

   ```bash
   docker-compose up -d
   ```

4. Accede a los servicios:
   - **Grafana**: [http://localhost:3000](http://localhost:3000)
   - **Prometheus**: [http://localhost:9090](http://localhost:9090)

## Estado del Proyecto

Este proyecto está finalizado. La configuración aquí es estática y no se realizarán más mejoras en esta carpeta. Las futuras mejoras estarán en la carpeta `.container`.