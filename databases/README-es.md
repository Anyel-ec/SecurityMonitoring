# Dockerización de Bases de Datos Open Source

Este proyecto proporciona una configuración completa para desplegar y dockerizar tres populares bases de datos open source: **PostgreSQL**, **MariaDB** y **MongoDB**. Cada base de datos está definida como un servicio en el archivo `docker-compose.yml`, lo que permite un proceso de despliegue centralizado y sencillo.

## Servicios Dockerizados

Las bases de datos incluidas en este proyecto son:

- **PostgreSQL**: Una base de datos relacional robusta y extensible.
- **MariaDB**: Una base de datos compatible con MySQL, con mejoras en el rendimiento y nuevas funcionalidades.
- **MongoDB**: Una base de datos NoSQL orientada a documentos.

### Estructura del Archivo `docker-compose.yml`

El archivo `docker-compose.yml` define los tres servicios de base de datos. A continuación, se muestra la configuración de cada servicio:

```yaml
version: '3'

services:

  postgresql_db:
    image: postgres:latest
    volumes:
      - postgres_data:/var/lib/postgresql/data
    environment:
      POSTGRES_DB: ${POSTGRES_DB}
      POSTGRES_USER: ${POSTGRES_USER}
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD}
    ports:
      - "${POSTGRES_PORT_HOST}:${POSTGRES_PORT_CONTAINER}"

  mariadb_db:
    image: mariadb:latest
    volumes:
      - mariadb_data:/var/lib/mysql
    environment:
      MYSQL_DATABASE: ${MYSQL_DATABASE}
      MYSQL_USER: ${MYSQL_USER}
      MYSQL_PASSWORD: ${MYSQL_PASSWORD}
      MYSQL_ROOT_PASSWORD: ${MYSQL_ROOT_PASSWORD}
    ports:
      - "${MARIADB_PORT_HOST}:${MARIADB_PORT_CONTAINER}"

  mongodb_db:
    image: mongo:latest
    volumes:
      - mongodb_data:/data/db
    environment:
      MONGO_INITDB_ROOT_USERNAME: ${MONGO_INITDB_ROOT_USERNAME}
      MONGO_INITDB_ROOT_PASSWORD: ${MONGO_INITDB_ROOT_PASSWORD}
    ports:
      - "${MONGODB_PORT_HOST}:${MONGODB_PORT_CONTAINER}"

volumes:
  postgres_data:
  mariadb_data:
  mongodb_data:
```

---

## Variables de Entorno

El proyecto utiliza un archivo `.env` para configurar las credenciales y puertos de cada base de datos. A continuación, un ejemplo de las variables necesarias:

```env
# Configuración de PostgreSQL
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=postgres
POSTGRES_PORT_HOST=5433 # Puerto local para PostgreSQL
POSTGRES_PORT_CONTAINER=5432 # Puerto del contenedor para PostgreSQL

# Configuración de MariaDB
MYSQL_DATABASE=exampledb
MYSQL_USER=user
MYSQL_PASSWORD=password
MYSQL_ROOT_PASSWORD=rootpassword
MARIADB_PORT_HOST=3307 # Puerto local para MariaDB
MARIADB_PORT_CONTAINER=3306 # Puerto del contenedor para MariaDB

# Configuración de MongoDB
MONGO_INITDB_ROOT_USERNAME=admin
MONGO_INITDB_ROOT_PASSWORD=adminpassword
MONGODB_PORT_HOST=27018 # Puerto local para MongoDB
MONGODB_PORT_CONTAINER=27017 # Puerto del contenedor para MongoDB
```

---

## Pasos para el Despliegue

1. Clona este repositorio:
   ```bash
   git clone https://github.com/Anyel-ec/SecurityMonitoring
   cd Backend
   ```

2. Crea y configura el archivo `.env`:
   ```bash
   cp .env.template .env
   ```

3. Inicia todos los servicios utilizando Docker Compose:
   ```bash
   docker-compose up -d
   ```

4. Verifica que los servicios estén corriendo:
   ```bash
   docker ps
   ```

---

## Volúmenes

Para garantizar la persistencia de datos entre reinicios de contenedores, cada base de datos utiliza volúmenes Docker:

- **PostgreSQL**: El volumen `postgres_data` almacena los datos de PostgreSQL.
- **MariaDB**: El volumen `mariadb_data` almacena los datos de MariaDB.
- **MongoDB**: El volumen `mongodb_data` almacena los datos de MongoDB.

---

## Acceso a las Bases de Datos

### PostgreSQL
- Host: `localhost`
- Puerto: `5433` (por defecto en esta configuración)
- Credenciales por defecto: Definidas en el archivo `.env`.

### MariaDB
- Host: `localhost`
- Puerto: `3307`
- Credenciales por defecto: Definidas en el archivo `.env`.

### MongoDB
- Host: `localhost`
- Puerto: `27018`
- Credenciales por defecto: Definidas en el archivo `.env`.

---

## Contribuciones

Si deseas contribuir o mejorar este proyecto, siéntete libre de hacer un fork del repositorio y enviar un pull request. ¡Las contribuciones son siempre bienvenidas!
```