# Archetype Spring Boot Accelerator

This project is an **archetype** for Spring Boot-based projects. It allows developers to quickly generate a basic project structure with predefined configurations for CORS, Swagger, and essential dependencies.

## Features
- **CORS** configuration to enable requests from any origin.
- **Swagger/OpenAPI** integration for API documentation.
- Basic Spring Boot dependencies such as `spring-boot-starter-web`, `spring-boot-starter-validation`, and `springdoc-openapi-starter-webmvc-ui`.
- Compatible with **Java 17**.
- Optimized build configuration with Maven.

## Prerequisites
- **Java 17** or higher.
- **Maven 3.8.1** or higher.
- Git to clone the repository.
- **Maven settings.xml** file configured in the `.m2` folder.

### Maven settings.xml File
To ensure the correct functioning of Maven, you must have the following `settings.xml` file in your `.m2` directory:

```xml
<settings xmlns="http://maven.apache.org/SETTINGS/1.0.0"
          xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
          xsi:schemaLocation="http://maven.apache.org/SETTINGS/1.0.0 http://maven.apache.org/xsd/settings-1.0.0.xsd">
    <localRepository>${user.home}/.m2/repository</localRepository>
</settings>
```

This ensures that Maven can access the local repository properly.

## Project Structure
The project has the following main structure:

```
├── .mvn/                    # Maven Wrapper configuration files
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── top.anyel.archetypespringboot/
│   │   │       ├── config/  # Main configurations
│   │   │       │   ├── CorsConfig.java       # CORS configuration
│   │   │       │   ├── OpenApiConfig.java    # Swagger configuration
│   │   │       └── ArchetypeSpringbootApplication.java # Main class
│   │   └── resources/       # Resource files (application.properties)
│   └── test/                # Test files
├── target/
│   └── generated-sources/
│       └── archetype/       # Generated archetype files
├── pom.xml                  # Maven configuration file
├── HELP.md                  # Help documentation
├── mvnw, mvnw.cmd           # Maven Wrapper scripts
├── .gitignore               # Git ignored files
```

## Steps to Create and Generate an Archetype

### 1. Create an Archetype from a Base Project

To create an archetype from an existing project, follow these steps:

1. **Initial structure:**
   Set up a base project with the structure and configurations you want to reuse (e.g., dependencies, Spring Boot configurations, etc.).

2. **Generate the archetype:**
   From the root of the base project, run the following command:

   ```bash
   mvn archetype:create-from-project
   ```

   This will generate an archetype in the folder:

   ```
   target/generated-sources/archetype
   ```

3. **Customize the archetype:**
   Modify the files in the `archetype` folder to include additional configurations or code templates, such as the `archetype-metadata.xml` file.

### 2. Install the Archetype in the Local Repository

From the `target/generated-sources/archetype` folder, install the archetype into your local Maven repository by running:

```bash
mvn install
```

This makes the archetype available for use in future projects.

### 3. Generate a New Project from the Archetype

Run the following command to generate a new project based on the archetype:

```bash
mvn archetype:generate \
    -DarchetypeGroupId=top.anyel \
    -DarchetypeArtifactId=archetype-springboot \
    -DarchetypeVersion=0.0.1-SNAPSHOT \
    -DgroupId=com.example \
    -DartifactId=my-springboot-app \
    -Dversion=1.0-SNAPSHOT
```

Replace:
- `com.example` with the **groupId** of the new project.
- `my-springboot-app` with the **artifactId** of the new project.

### 4. Run the Generated Project

1. Navigate to the folder of the generated project:
   ```bash
   cd my-springboot-app
   ```
2. Run the project with Maven:
   ```bash
   mvn spring-boot:run
   ```

## Included Configurations

### CORS
The `CorsConfig.java` file configures CORS to allow requests from any origin with the permitted methods and headers.

### Swagger/OpenAPI
The `OpenApiConfig.java` file configures Swagger to document the project's APIs. Access the documentation at:

```
http://localhost:8080/swagger-ui.html
```

### Key Dependencies
- **Spring Boot Starter Web**: For web development.
- **Spring Boot Starter Validation**: For model validations.
- **SpringDoc OpenAPI**: To generate Swagger documentation.

## Additional Resources
- **GitHub Repository**: [Archetype Spring Boot Accelerator](https://github.com/Anyel-ec/Springboot-Archetype-Accelerators-Introduce/)
- **Author**: [Angel Patiño](https://www.linkedin.com/in/anyel-ec/)

