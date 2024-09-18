
# Monitoreo Dinámico de Bases de Datos: MongoDB, MariaDB/MySQL, PostgreSQL utilizando React, Spring Boot

Este proyecto tiene como objetivo desarrollar una herramienta de código abierto para el monitoreo dinámico de tres bases de datos: **MongoDB**, **PostgreSQL** y **MariaDB/MySQL**. La herramienta permite a los usuarios especificar las credenciales de conexión a través de una interfaz web en **React**, y posteriormente visualizar dashboards personalizados en **Grafana** para una o varias bases de datos de manera combinada.

El backend está construido con **Spring Boot** y se utilizan **Prometheus** y **Grafana** para recolectar y visualizar las métricas de las bases de datos seleccionadas.

## Estado del Proyecto

Este proyecto está en desarrollo. Actualmente, se ha implementado lo siguiente:
- Una interfaz en **React** para ingresar las credenciales de conexión a las bases de datos.
- Integración de **Docker Compose** con servicios de Grafana, Prometheus, y exportadores para las bases de datos **PostgreSQL**, **MongoDB** y **MariaDB**.
- Configuración inicial de monitoreo y visualización en **Grafana**.

## Tecnologías Utilizadas

- **Frontend**: React (creado con Vite), React Bootstrap para el diseño de formularios dinámicos.
- **Backend**: Spring Boot (aún en desarrollo).
- **Monitoreo y Visualización**: Grafana y Prometheus.
- **Bases de Datos**: MongoDB, PostgreSQL, y MariaDB.
- **Contenedores**: Docker y Docker Compose para la orquestación de los servicios.

## Funcionalidades

1. **Configuración de Conexiones a Bases de Datos**:
    - El usuario puede especificar credenciales para conectarse a **MongoDB**, **PostgreSQL**, y **MariaDB** mediante un formulario dinámico en la aplicación React.
    - Permite combinar diferentes bases de datos: por ejemplo, monitorear solo **MongoDB**, **PostgreSQL**, o **MariaDB**, o combinaciones como **MongoDB+PostgreSQL**.

2. **Monitoreo Dinámico**:
    - El backend en **Spring Boot** (próximo desarrollo) recibirá las credenciales proporcionadas por el usuario y configurará las conexiones a las bases de datos.
    - Las métricas se recopilan usando **Prometheus** y se visualizan a través de **Grafana**.

3. **Visualización en Grafana**:
    - Dashboards preconfigurados en **Grafana** que se activan dependiendo de las bases de datos seleccionadas por el usuario.

## Estructura del Proyecto

```
.
├── frontend/                    # Aplicación React
│   ├── src/
│   │   ├── components/          # Componentes de React (incluye SwitchToggle, Formularios, etc)
│   │   └── App.js               # Punto de entrada de React
│   └── public/                  # Archivos estáticos
├── backend/                     # Próximo: Backend con Spring Boot
├── .devcontainer/               # Configuraciones del contenedor de desarrollo
└── README.md                    # Documentación del proyecto
```

## Requisitos Previos

- **Docker** y **Docker Compose** instalados.
- **Node.js** y **npm** instalados para el frontend en React.

## Instalación y Uso

### 1. Clonar el Repositorio

```bash
git clone https://github.com/Anyel-ec/SecurityMonitoring
cd SecurityMonitoring
```

### 2. Ejecutar el Frontend

```bash
cd frontend
npm install
npm run dev
```

### 3. Ejecutar los Servicios con Docker Compose

```bash
docker-compose up -d
```

Esto levantará los siguientes servicios:
- **Grafana**: Accesible en `http://localhost:3000` (usuario: `admin`, contraseña: `admin`).
- **Prometheus**: Accesible en `http://localhost:9090`.
- **PostgreSQL Exporter**: Accesible en `http://localhost:9187`.
- **MongoDB Exporter**: Accesible en `http://localhost:9216`.
- **MariaDB Exporter**: Accesible en `http://localhost:9104`.

### 4. Configurar Grafana

1. Accede a **Grafana** en `http://localhost:3000`.
2. Inicia sesión con las credenciales (`admin/admin`).
3. Añade **Prometheus** como fuente de datos:
   - URL: `http://prometheus:9090`.
4. Importa el dashboard correspondiente para visualizar las métricas de las bases de datos configuradas.

### 5. Próximos Pasos

El próximo paso en el desarrollo es integrar el backend de **Spring Boot** para manejar las conexiones dinámicas a las bases de datos y configurar automáticamente los exportadores de Prometheus según las credenciales proporcionadas.

## Configuración del `docker-compose.yml`

El archivo `docker-compose.yml` está configurado para levantar los servicios necesarios para monitorear las bases de datos y visualizarlas en Grafana. Aquí está el código actual del archivo:

```yaml
version: '3'

services:
  grafana:
    image: grafana/grafana
    ports:
      - "3000:3000"
    environment:
      GF_SECURITY_ADMIN_USER: admin
      GF_SECURITY_ADMIN_PASSWORD: admin
    volumes:
      - grafana_storage:/var/lib/grafana
    
  prometheus:
    image: prom/prometheus
    ports:
      - "9090:9090"
    volumes:
      - ./prometheus.yml:/etc/prometheus/prometheus.yml:ro 
    
  # MongoDB Service
  mongo_db:
    image: mongo:latest
    ports:
      - "27020:27017"
    volumes:
      - mongo_data:/data/db
  
  # MariaDB Service
  mariadb_db:
    image: mariadb:latest
    restart: always
    environment:
      MYSQL_DATABASE: ${MYSQL_DATABASE}
      MYSQL_USER: ${MYSQL_USER}
      MYSQL_PASSWORD: ${MYSQL_PASSWORD}
      MYSQL_ROOT_PASSWORD: ${MYSQL_ROOT_PASSWORD}
    ports:
      - "3306:3306"
    expose:
      - "3306"

  # PostgreSQL Service
  postgresql_db:
    image: postgres:latest
    volumes:
      - postgres_data:/var/lib/postgresql/data
    environment:
      POSTGRES_DB: ${POSTGRES_DB}
      POSTGRES_USER: ${POSTGRES_USER}
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD}
    ports:
      - "5433:5432"
  
  ##############################################
  # Exporter Services
  mongo-exporter:
    image: ssheehy/mongodb-exporter:latest
    ports:
      - "9216:9216"
    environment:
      MONGODB_URI: "mongodb://mongo_db:27017"
    depends_on:
      - mongo_db
  
  postgres-exporter:
    image: prometheuscommunity/postgres-exporter
    ports:
      - "9187:9187"
    environment:
      DATA_SOURCE_NAME: "postgresql://postgres:${POSTGRES_PASSWORD}@postgresql_db:5432/${POSTGRES_DB}?sslmode=disable"
    depends_on:
      - postgresql_db

  mariadb-exporter:
    image: prom/mysqld-exporter
    depends_on:
      - mariadb_db
    command:
      - --config.my-cnf=/cfg/.my.cnf
      - --mysqld.address=192.168.0.215:3306
    volumes:
      - "./.my.cnf:/cfg/.my.cnf"
    ports:
      - "9104:9104"
  
volumes:
  grafana_storage:
  postgres_data:
  mongo_data:
```

## Configuración de Prometheus (`prometheus.yml`)

El archivo `prometheus.yml` está configurado para monitorear servicios de MongoDB, PostgreSQL, y MariaDB a través de sus respectivos exportadores.

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

  - job_name: 'mongo'
    static_configs:
      - targets: ['mongo-exporter:9216']

  - job_name: 'mariadb'
    static_configs:
      - targets: ['192.168.0.215:9104']
```

## Contribución

Este proyecto es de código abierto, y cualquier contribución es bienvenida. Si deseas colaborar, sigue los siguientes pasos:

1. Haz un fork del repositorio.
2. Crea una nueva rama para tu feature (`git checkout -b feature/nueva-feature`).
3. Haz commit de tus cambios (`git commit -m 'Añadir nueva feature'`).
4. Sube tu rama (`git push origin feature/nueva-feature`).
5. Abre un **Pull Request** para revisión.

## Estado del Proyecto

Este proyecto sigue en desarrollo, y algunas de las funcionalidades descritas están en construcción.

Las futuras características incluyen:
