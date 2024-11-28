# Base image with JDK 17
FROM eclipse-temurin:17-jdk-alpine

# Add necessary utilities (curl in this case)
RUN apk --no-cache add curl

# Set the working directory
WORKDIR /app/security-monitoring/backend

# Expose the application port
EXPOSE 8080

# Copy the JAR file to the image
COPY monitoring-1.0.0-RELEASE.jar .

# Define the entry point to run the application
ENTRYPOINT ["java", "-jar", "monitoring-1.0.0-RELEASE.jar"]