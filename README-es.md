# Monitoreo Dinámico de Bases de Datos: MongoDB, MariaDB y Mongo utilizando React, Spring Boot

Este proyecto tiene como objetivo desarrollar una herramienta de código abierto para el monitoreo dinámico de tres bases de datos: **MongoDB**, **PostgreSQL** y **MariaDB**. La herramienta permite a los usuarios especificar las credenciales de conexión a través de una interfaz web en **React**, y posteriormente visualizar dashboards personalizados en **Grafana** para una o varias bases de datos de manera combinada. 

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
├── docker-compose.yml           # Configuración de Docker Compose
├── prometheus.yml               # Prometheus configuration
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

### 4. Configurar Grafana

1. Accede a **Grafana** en `http://localhost:3000`.
2. Inicia sesión con las credenciales (`admin/admin`).
3. Añade **Prometheus** como fuente de datos:
   - URL: `http://prometheus:9090`.
4. Importa el dashboard correspondiente para visualizar las métricas de las bases de datos configuradas.

### 5. Próximos Pasos

El próximo paso en el desarrollo es integrar el backend de **Spring Boot** para manejar las conexiones dinámicas a las bases de datos y configurar automáticamente los exportadores de Prometheus según las credenciales proporcionadas.

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
- Integración completa con **Spring Boot**.
- Mejora en la configuración y personalización de los dashboards de **Grafana** para cada base de datos.
- Soporte para más bases de datos y sistemas de monitoreo.

## Licencia

Este proyecto está licenciado bajo la [APACHE License](LICENSE).