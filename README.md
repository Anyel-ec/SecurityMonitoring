# Open Source Tool for Monitoring MariaDB, PostgreSQL, and MongoDB Databases with Prometheus and Grafana  

This project aims to develop an **open-source** tool for the dynamic monitoring of three databases: **MongoDB**, **PostgreSQL**, and **MariaDB/MySQL**. The tool allows users to specify connection credentials through a **React** web interface and view personalized dashboards in **Grafana** for one or multiple combined databases.  

The backend is developed using **Spring Boot** and leverages **Prometheus** and **Grafana** to collect and visualize metrics from the selected databases.  

## **Select Language:**
- [Español (Spanish)](README-es.md)
- [English](README.md)

## Features  

1. **Database Connection Configuration**:  
   - Users can specify credentials to connect **MongoDB**, **PostgreSQL**, and **MariaDB** via a dynamic form in the React application.  
   - Supports combinations of different databases: for example, monitoring only **MongoDB**, **PostgreSQL**, or **MariaDB**, or combinations such as **MongoDB + PostgreSQL**.  

2. **Dynamic Monitoring**:  
   - The **Spring Boot** backend receives the credentials provided by the user and configures the database connections.  
   - Metrics are collected with **Prometheus** and visualized in **Grafana**.  

3. **Grafana Visualization**:  
   - Preconfigured **Grafana** dashboards that activate according to the databases selected by the user.  

4. **Notification Sending**:  
   - Notifications are sent using **Alertmanager**.  

## Results  
### Welcome  
![Alt text](docs/images/release/bienvenido.png)  

### Installation of admin user, Grafana, Prometheus, and other components  
![Alt text](docs/images/release/instalacion.png)  

### Login  
![Alt text](docs/images/release/login_blanco.png)  

### Login (Dark mode)  
![Alt text](docs/images/release/login.png)  

### Password recovery (Dark mode)  
![Alt text](docs/images/release/recuperar_password.png)  

### Credential management for Database Management Systems  
![Alt text](docs/images/release/gestion%20de%20credenciales.png)  

### Alert activation for Database Management Systems  
![Alt text](docs/images/release/activar%20alertas.png)  

### Alert modification  
![Alt text](docs/images/release/modificar%20alertas.png)  

### Alert notifications triggered by rule conditions  
![Alt text](docs/images/release/alertas.png)  

### User management  
![Alt text](docs/images/release/gestion_usuarios.png)  

### User management (full system supports dark mode)  
![Alt text](docs/images/release/modo%20oscuro.png)  

### User creation  
![Alt text](docs/images/release/modo%20oscuro.png)  

### User creation email received  
![Alt text](docs/images/release/creacion%20correo.png)  

### Grafana Dashboards - PostgreSQL  
![Alt text](docs/images/release/postgres.png)  

### Grafana Dashboards - MariaDB/MySQL  
![Alt text](docs/images/release/mysql.png)  

### Grafana Dashboards - MongoDB  
![Alt text](docs/images/release/mongodb.png)  

### Grafana Dashboards - MongoDB + MariaDB/MySQL + PostgreSQL  
![Alt text](docs/images/release/combinado.png)


# Developer, Administrator, and User Manuals

Inside the `docs/manual` folder, you will find the corresponding manuals.  

You can access the administrator manual here:  
📄 [Administrator Manual (PDF)](docs/manual/Administrator%20Manual.pdf) 

You can access the developer manual here:   
📄 [Developer Manual (PDF)](docs/manual/Developer%20Manual.pdf) 

You can access the user manual here:  
📄 [User Manual (PDF)](docs/manual/User%20Manual.pdf) 
---

## Technologies Used  

- **Frontend**: React (built with Vite), React Bootstrap for dynamic form design.  
- **Backend**: Spring Boot.  
- **Monitoring and Visualization**: Grafana and Prometheus.  
- **Database Management Systems**: MongoDB, PostgreSQL, MariaDB, and H2 Database.  
- **Containers**: Docker and Docker Compose for service orchestration.  

---

## Installation and Usage  

### 1. Clone the Repository  

```bash
git clone https://github.com/Anyel-ec/SecurityMonitoring
cd SecurityMonitoring
```

### 2. Run Docker  
Make sure **Docker is running** before proceeding with the setup.  

### 3. Run the Frontend  
- Navigate to the `Frontend` folder  
- Install dependencies:  
  ```bash
  npm install
  ```
- Then start the project with:  
  ```bash
  npm run dev
  ```

### 4. Run the Backend  
- Navigate to the `Backend` folder  
- Make sure all dependencies from `pom.xml` are downloaded  
- Run the project using your development environment or via Maven/Gradle  

### 5. Refer to the Administrator Manual  
For more detailed setup and system administration instructions, please check the following document:  
📘 [Administrator Manual (PDF)](docs/manual/Administrator%20Manual.pdf)


## Contributions

If you wish to contribute to this project, please open an issue or submit a pull request.

## License

This project is licensed under the [BSD 3-Clause "New" or "Revised" License](LICENSE).

## Team and Project Information

Open source tool service for dynamic monitoring of three DBMS: MongoDB, PostgreSQL, and MariaDB/MySQL.

**Project Manager: Ing. Luis Chica, Mgtr** - [GitHub Profile](https://github.com/LuisChica18)

**Developer: Ing. Angel Patiño** - [GitHub Profile](https://github.com/Anyel-ec)