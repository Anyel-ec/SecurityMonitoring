# Base image with JDK 17
FROM openjdk:17-jdk-alpine

# Install Docker CLI and Docker Compose
RUN apk add --no-cache docker-cli docker-compose

# Set the working directory
WORKDIR /app

# Copy the JAR and necessary files
COPY target/monitoring-1.0.0-RELEASE.jar monitoring-1.0.0-RELEASE.jar

# Copiar el archivo .env (si es necesario)
COPY .env .env

# Copiar los recursos de docker al contenedor
COPY src/main/resources/docker /app/docker

# Definir un volumen nombrado para los archivos de configuración compartidos
VOLUME ["/app/docker/integraciones_security_monitoring", "/var/run/docker.sock"]

# Asegurar los permisos necesarios para ejecutar el docker-compose
RUN chmod +x /app/docker/integraciones_security_monitoring/docker-compose.yml

# Exponer el puerto para la aplicación Spring Boot
EXPOSE 8080

# Establecer el punto de entrada para ejecutar la aplicación Spring Boot
ENTRYPOINT ["java", "-jar", "monitoring-1.0.0-RELEASE.jar"]
