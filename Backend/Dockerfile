# Base image with JDK 17
FROM openjdk:17-jdk-alpine

# installation docker cli and docker-compose
RUN apk add --no-cache docker-cli docker-compose

# Set the working directory
WORKDIR /app

# Copy the JAR and necessary files
COPY target/monitoring-1.0.0-RELEASE.jar monitoring-1.0.0-RELEASE.jar

# Ensure the application can execute Docker Compose on the host
VOLUME ["/var/run/docker.sock"]

# Expose the port
EXPOSE 8080

ENTRYPOINT ["java", "-jar", "monitoring-1.0.0-RELEASE.jar"]