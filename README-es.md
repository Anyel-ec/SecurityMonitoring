Aquí tienes la versión en español:  

---

# Herramienta Open Source para el Monitoreo de Bases de Datos MariaDB, PostgreSQL y MongoDB con Prometheus y Grafana  

Este proyecto tiene como objetivo desarrollar una herramienta **open-source** para el monitoreo dinámico de tres bases de datos: **MongoDB**, **PostgreSQL** y **MariaDB/MySQL**. La herramienta permite a los usuarios especificar credenciales de conexión a través de una interfaz web en **React** y visualizar paneles personalizados en **Grafana** para una o varias bases de datos combinadas.  

El backend está desarrollado con **Spring Boot** y utiliza **Prometheus** y **Grafana** para recopilar y visualizar las métricas de las bases de datos seleccionadas.  

## Estado del Proyecto  

Este proyecto está en desarrollo. Hasta el momento, se ha implementado lo siguiente:  
- Una interfaz en **React** para ingresar las credenciales de conexión a la base de datos.  
- Integración de **Docker Compose** con servicios para **Grafana**, **Prometheus** y los exportadores de **PostgreSQL**, **MongoDB** y **MariaDB**.  
- Configuración inicial del monitoreo y visualización en **Grafana**.  

## Tecnologías Utilizadas  

- **Frontend**: React (creado con Vite), React Bootstrap para el diseño de formularios dinámicos.  
- **Backend**: Spring Boot (en desarrollo).  
- **Monitoreo y Visualización**: Grafana y Prometheus.  
- **Bases de Datos**: MongoDB, PostgreSQL y MariaDB.  
- **Contenedores**: Docker y Docker Compose para la orquestación de servicios.  

## Características  

1. **Configuración de Conexión a Bases de Datos**:  
   - Los usuarios pueden especificar credenciales para conectar **MongoDB**, **PostgreSQL** y **MariaDB** a través de un formulario dinámico en la aplicación React.  
   - Permite la combinación de diferentes bases de datos: por ejemplo, monitorear solo **MongoDB**, **PostgreSQL** o **MariaDB**, o combinaciones como **MongoDB+PostgreSQL**.  

2. **Monitoreo Dinámico**:  
   - El backend en **Spring Boot** recibe las credenciales proporcionadas por el usuario y configura las conexiones a la base de datos.  
   - Se recopilan métricas con **Prometheus** y se visualizan en **Grafana**.  

3. **Visualización en Grafana**:  
   - Dashboards preconfigurados en **Grafana** que se activan según las bases de datos seleccionadas por el usuario.  

## Configuración de Docker Compose (`docker-compose.yml`)  

El archivo `docker-compose.yml` está configurado para iniciar los servicios necesarios para el monitoreo de bases de datos y su visualización en **Grafana**.  

```yaml
version: '3'

services:
  grafana:
    image: grafana/grafana
    ports:
      - "${GRAFANA_PORT_EXTERNAL}:${GRAFANA_PORT_INTERNAL}"
    environment:
      GF_SECURITY_ADMIN_USER: "${GRAFANA_USER}"
      GF_SECURITY_ADMIN_PASSWORD: "${GRAFANA_PASSWORD}"
    volumes:
      - grafana_storage:/var/lib/grafana
    networks:
      - monitoring

  prometheus:
    image: prom/prometheus
    volumes:
      - ./prometheus.yml:/etc/prometheus/prometheus.yml:ro 
    ports:
      - "${PROMETHEUS_PORT_EXTERNAL}:${PROMETHEUS_PORT_INTERNAL}"
    networks:
      - monitoring

  postgres-exporter:
    image: quay.io/prometheuscommunity/postgres-exporter
    environment:
      DATA_SOURCE_NAME: "postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_HOST}:${POSTGRES_PORT}?sslmode=disable"
    ports:
      - "${EXPORT_POSTGRES_PORT_EXTERNAL}:${EXPORT_POSTGRES_PORT_INTERNAL}"
    networks:
      - monitoring

networks:
  monitoring:
    driver: bridge

volumes:
  grafana_storage:
```  

Este archivo configura y expone los servicios de **Grafana**, **Prometheus** y **Postgres Exporter**. Asegúrate de definir correctamente las variables de entorno (`GRAFANA_USER`, `GRAFANA_PASSWORD`, `POSTGRES_USER`, `POSTGRES_PASSWORD`, etc.) en tu entorno o en el archivo `.env`.  

## Configuración de Prometheus (`prometheus.yml`)  

El archivo `prometheus.yml` está configurado para monitorear los servicios de **MongoDB**, **PostgreSQL** y **MariaDB** a través de sus respectivos exportadores.  

```yaml
global:
  scrape_interval: 5s

scrape_configs:
  - job_name: 'prometheus'
    static_configs:
      - targets: ['prometheus:9090']

  - job_name: 'postgres'
    static_configs:
      - targets: ['postgres-exporter:9187']
```  

## Instalación y Uso  

### 1. Clonar el Repositorio  

```bash
git clone https://github.com/Anyel-ec/SecurityMonitoring
cd SecurityMonitoring
```  

### 2. Ejecutar los Servicios con Docker Compose  

```bash
docker-compose up -d
```  

Esto iniciará los siguientes servicios:  
- **Grafana**: Accesible en `http://localhost:3000` (usuario: `admin`, contraseña: `admin`).  
- **Prometheus**: Accesible en `http://localhost:9090`.  
- **PostgreSQL Exporter**: Accesible en `http://localhost:9187`.  

### 3. Configurar Grafana  

1. Acceder a **Grafana** en `http://localhost:3000`.  
2. Iniciar sesión con las credenciales (`admin/admin`).  
3. Agregar **Prometheus** como fuente de datos:  
   - URL: `http://prometheus:9090`.  
4. Importar el dashboard relevante para visualizar las métricas de las bases de datos configuradas.  

### 4. Próximos Pasos  

El siguiente paso en el desarrollo es mejorar la integración con las bases de datos, así como automatizar la creación de dashboards en **Grafana**.  

## Contribuciones  

Si deseas contribuir a este proyecto, puedes abrir un **issue** o enviar un **pull request**.  

## Licencia  

Este proyecto está licenciado bajo la [Licencia Apache 2.0](LICENSE).  

## Equipo e Información del Proyecto  

Herramienta open source para el monitoreo dinámico de tres bases de datos: **MongoDB**, **PostgreSQL** y **MariaDB/MySQL**.  

**Gerente del Proyecto: Ing. Luis Chica, Mgtr** - [Perfil de GitHub](https://github.com/LuisChica18)  

**Desarrollador: Ing. Angel Patiño** - [Perfil de GitHub](https://github.com/Anyel-ec)  

---

Déjame saber si necesitas algún ajuste. 🚀