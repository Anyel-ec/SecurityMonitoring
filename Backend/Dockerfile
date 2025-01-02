# Base image with JDK 17
FROM openjdk:17-jdk-alpine

# Set the working directory
WORKDIR /app/security-monitoring/backend

# Copy the .env file(s) from the root of the project to the working directory
COPY .env .env

# Expose the application port
EXPOSE 8080

# Copy the JAR file from the root of the project to the working directory
COPY monitoring-1.0.0-RELEASE.jar monitoring-1.0.0-RELEASE.jar

# Define the entry point to run the application
ENTRYPOINT ["java", "-jar", "monitoring-1.0.0-RELEASE.jar"]