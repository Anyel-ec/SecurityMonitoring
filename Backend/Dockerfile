FROM eclipse-temurin:21-jdk-alpine
RUN apk --no-cache add curl

WORKDIR /opt/app/security-monitoring/backend
EXPOSE 8083
COPY monitoring-1.0.0-RELEASE.jar .
ENTRYPOINT ["java", "-jar", "monitoring-1.0.0-RELEASE.jar" ]