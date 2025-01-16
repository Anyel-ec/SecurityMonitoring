# Base image with JDK 17
FROM openjdk:17-jdk-alpine

# Install Docker CLI and Docker Compose
RUN apk add --no-cache docker-cli docker-compose

# Set the working directory
WORKDIR /app

# Copy the JAR and necessary files
COPY monitoring-1.0.0-RELEASE.jar monitoring-1.0.0-RELEASE.jar

# Copy the entrypoint script and make it executable
COPY entrypoint.sh /app/entrypoint.sh
RUN chmod +x /app/entrypoint.sh

# Copy the .env file if needed
COPY .env .env

# Copy Docker resources
COPY src/main/resources/docker /app/docker

# Define a named volume for shared configurations
VOLUME ["/app/docker/integraciones_security_monitoring", "/var/run/docker.sock"]

# Ensure permissions for docker-compose
RUN chmod +x /app/docker/integraciones_security_monitoring/docker-compose.yml

# Expose the application port
EXPOSE 8080

# Use the entrypoint script
ENTRYPOINT ["/app/entrypoint.sh"]
