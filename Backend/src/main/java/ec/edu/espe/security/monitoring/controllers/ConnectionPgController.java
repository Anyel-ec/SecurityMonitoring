package ec.edu.espe.security.monitoring.controllers;

import ec.edu.espe.security.monitoring.dto.JsonResponseDto;
import ec.edu.espe.security.monitoring.models.PostgresCredentials;
import ec.edu.espe.security.monitoring.services.PostgresCredentialsService;
import ec.edu.espe.security.monitoring.utils.DatabaseUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/config")
@Slf4j
public class ConnectionPgController {

    private final DatabaseUtils databaseUtils;
    private final PostgresCredentialsService postgresCredentialsService;

    @PostMapping("/postgres")
    public ResponseEntity<JsonResponseDto> configurePostgres(@RequestBody PostgresCredentials config, @RequestParam String connectionName) {
        // Verificar la conexión a la base de datos
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
            // Guardar las credenciales y ejecutar Docker Compose
            postgresCredentialsService.saveCredentialsAndRunCompose(config, connectionName);
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





}
