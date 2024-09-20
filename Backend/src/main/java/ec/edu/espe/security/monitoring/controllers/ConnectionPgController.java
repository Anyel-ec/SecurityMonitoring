package ec.edu.espe.security.monitoring.controllers;

import ec.edu.espe.security.monitoring.dto.JsonResponseDto;
import ec.edu.espe.security.monitoring.models.PostgresCredentials;
import ec.edu.espe.security.monitoring.services.DockerCredentialService;
import ec.edu.espe.security.monitoring.services.PostgresCredentialsService;
import ec.edu.espe.security.monitoring.utils.DatabaseUtils;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/config")
public class ConnectionPgController {

    private final DatabaseUtils databaseUtils;
    private final PostgresCredentialsService postgresCredentialsService;

    @PostMapping("/postgres")
    public ResponseEntity<JsonResponseDto> configurePostgres(@RequestBody PostgresCredentials config) {
        // verificar la conexión a la base de datos
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
            postgresCredentialsService.saveCredentialsAndRunCompose(config);
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

    @PostMapping("/postgres/{profile}")
    public ResponseEntity<JsonResponseDto> configurePostgresByProfile(@PathVariable String profile) {
        try {
            // Obtener las credenciales del perfil
            PostgresCredentials credentials = postgresCredentialsService.getCredentialsByProfile(profile);

            // Testear la conexión con las credenciales recuperadas
            if (!databaseUtils.testDatabaseConnection(credentials)) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body(new JsonResponseDto(false, HttpStatus.BAD_REQUEST.value(), "Error: No se pudo conectar a la base de datos.", null));
            }

            // Ejecutar Docker Compose con las credenciales recuperadas
            postgresCredentialsService.saveCredentialsAndRunCompose(credentials);
            return ResponseEntity.ok(new JsonResponseDto(true, HttpStatus.OK.value(), "Conexión configurada exitosamente", "Conexión establecida con el perfil: " + profile));

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new JsonResponseDto(false, HttpStatus.INTERNAL_SERVER_ERROR.value(), "Error: " + e.getMessage(), null));
        }
    }

    @GetMapping("/postgres/names")
    public ResponseEntity<JsonResponseDto> getAllConnectionNames() {
        try {
            List<String> connectionNames = postgresCredentialsService.getAllConnectionNames();
            return ResponseEntity.ok(new JsonResponseDto(true, HttpStatus.OK.value(), "Nombres de credenciales obtenidos exitosamente", connectionNames.toString()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new JsonResponseDto(false, HttpStatus.INTERNAL_SERVER_ERROR.value(), "Error al obtener los nombres de las credenciales", null));
        }
    }



}
