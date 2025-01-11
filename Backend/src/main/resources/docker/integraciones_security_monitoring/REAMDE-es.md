# SecurityMonitoring - Container

Este proyecto está diseñado para monitorear las métricas de bases de datos utilizando **Prometheus** y **Grafana**. Actualmente, se exportan métricas de **PostgreSQL** utilizando el `postgres-exporter`, y en el futuro se exportarán métricas de **MariaDB/MySQL** y **MongoDB** de forma dinámica mediante variables de entorno gestionadas por Spring Boot.

## Requisitos

- Docker
- Docker Compose

## Servicios

1. **Grafana**: Se utiliza para visualizar las métricas de las bases de datos.
   - Expuesto en el puerto `3000`.
   - Acceso con:
     - Usuario: `anyel`
     - Contraseña: `anyel`
   - Almacenamiento persistente configurado en el volumen `grafana_storage`.

2. **Postgres Exporter**: Exporta métricas de la base de datos PostgreSQL para que Prometheus las pueda consumir.
   - Expuesto en el puerto `9187`.
   - Configurado para conectarse a una base de datos PostgreSQL utilizando las variables de entorno:
     - `POSTGRES_USER`
     - `POSTGRES_PASSWORD`
     - `POSTGRES_HOST`
     - `POSTGRES_PORT`

3. **Prometheus**: Herramienta de monitoreo que recolecta métricas de los servicios configurados.
   - Expuesto en el puerto `9090`.
   - Utiliza un archivo de configuración `prometheus.yml` para definir los objetivos a monitorizar (Prometheus y Postgres Exporter).

## Estructura de Archivos

- `.container/`
  - Esta carpeta contiene la configuración del entorno Docker para exportar métricas de PostgreSQL. Se planea que, en el futuro, soporte las bases de datos **MariaDB/MySQL** y **MongoDB** de manera dinámica mediante variables de entorno que serán gestionadas por un servicio en **Spring Boot**.

## Cómo ejecutar el proyecto

1. Asegúrate de estar en la carpeta `.container`.
2. Ejecuta el siguiente comando:

    ```bash
    docker-compose up -d
    ```

3. Los servicios se ejecutarán en segundo plano.
4. Accede a los servicios:
   - **Grafana**: [http://localhost:3000](http://localhost:3000)
   - **Prometheus**: [http://localhost:9090](http://localhost:9090)

## Configuración de Prometheus

En el archivo `prometheus.yml`, están configurados dos trabajos para recolectar las métricas:

- **Prometheus**: Recolecta sus propias métricas en el puerto `9090`.
- **Postgres Exporter**: Recolecta las métricas de PostgreSQL a través del `postgres-exporter` en el puerto `9187`.

## Volúmenes

- `grafana_storage`: Almacena de forma persistente los datos de Grafana.

## Redes

Los servicios se comunican a través de la red Docker `monitoring`, que utiliza el controlador `bridge`.

## Futuras Mejoras

- Exportación de métricas para **MariaDB/MySQL** y **MongoDB** utilizando variables de entorno que se enviarán dinámicamente desde **Spring Boot**.
