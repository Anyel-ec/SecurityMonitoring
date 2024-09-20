package ec.edu.espe.security.monitoring.controllers;

import ec.edu.espe.security.monitoring.dto.JsonResponseDto;
import ec.edu.espe.security.monitoring.models.PostgresCredentials;
import ec.edu.espe.security.monitoring.utils.DatabaseUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/config")
public class ConnectionPgController {

    private final DatabaseUtils databaseUtils;
    @PostMapping("/postgres")
    public ResponseEntity<JsonResponseDto> configurePostgres(@RequestBody PostgresCredentials config) {
        // Usar el método de DatabaseUtils para verificar la conexión a la base de datos
        if (!databaseUtils.testDatabaseConnection(config)) {
            JsonResponseDto response = new JsonResponseDto(
                    false,
                    HttpStatus.BAD_REQUEST.value(),
                    "Error: No se pudo conectar a la base de datos con las credenciales proporcionadas.",
                    null
            );
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
        }

        try {
            runDockerCompose(config);
            JsonResponseDto response = new JsonResponseDto(
                    true,
                    HttpStatus.OK.value(),
                    "Configuración guardada y Postgres Exporter reiniciado.",
                    "Conexión configurada exitosamente"
            );
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            JsonResponseDto response = new JsonResponseDto(
                    false,
                    HttpStatus.INTERNAL_SERVER_ERROR.value(),
                    "Error al aplicar la configuración: " + e.getMessage(),
                    null
            );
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Método para ejecutar docker-compose con las variables dinámicas
    private void runDockerCompose(PostgresCredentials config) throws IOException, InterruptedException {
        ProcessBuilder processBuilder = new ProcessBuilder(
                "docker-compose",
                "-f", "../.container/docker-compose.yml",
                "up", "-d"
        );

        // Establece las variables de entorno para PostgreSQL
        processBuilder.environment().put("POSTGRES_USER", config.getUsername());
        processBuilder.environment().put("POSTGRES_PASSWORD", config.getPassword());
        processBuilder.environment().put("POSTGRES_DB", config.getDatabase());
       // processBuilder.environment().put("POSTGRES_HOST", config.getHost());
        processBuilder.environment().put("POSTGRES_PORT_HOST", String.valueOf(config.getPort()));

        processBuilder.inheritIO().start();
    }
}
