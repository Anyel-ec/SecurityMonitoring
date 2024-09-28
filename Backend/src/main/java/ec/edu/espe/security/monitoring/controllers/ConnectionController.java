package ec.edu.espe.security.monitoring.controllers;

import ec.edu.espe.security.monitoring.dto.ConnectionRequestDto;
import ec.edu.espe.security.monitoring.dto.JsonResponseDto;
import ec.edu.espe.security.monitoring.models.DatabaseCredentials;
import ec.edu.espe.security.monitoring.services.DatabaseCredentialsService;
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
public class ConnectionController {

    private final DatabaseUtils databaseUtils;
    private final DatabaseCredentialsService databaseCredentialsService;

    /**
     * Método para configurar y guardar credenciales de base de datos.
     * @param config Credenciales de la base de datos (host, puerto, usuario, contraseña)
     * @param connectionName Nombre de la conexión
     * @param type Tipo de la base de datos (postgresql, mariadb, mongodb, etc.)
     * @return Respuesta con estado de éxito o error
     */
    @PostMapping("/database/{type}")
    public ResponseEntity<JsonResponseDto> configureDatabase(
            @RequestBody DatabaseCredentials config,
            @RequestParam String connectionName,
            @PathVariable String type) {

        // Verificar la conexión a la base de datos según el tipo
        if (!databaseUtils.testDatabaseConnection(config, type)) {
            JsonResponseDto response = new JsonResponseDto(
                    false,
                    HttpStatus.BAD_REQUEST.value(),
                    "Error: No se pudo conectar a la base de datos " + type + " con las credenciales proporcionadas.",
                    null
            );
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
        }

        try {
            // Guardar las credenciales y ejecutar Docker Compose
            databaseCredentialsService.saveCredentialsAndRunCompose(config, connectionName, type);
            JsonResponseDto response = new JsonResponseDto(
                    true,
                    HttpStatus.OK.value(),
                    "Configuración guardada y servicio " + type + " reiniciado.",
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


    /**
     * Método para configurar y guardar credenciales de base de datos.
     * @param request Objeto que contiene el nombre de la conexión, los tipos y las credenciales.
     * @return Respuesta con estado de éxito o error
     */
    @PostMapping("/database")
    public ResponseEntity<JsonResponseDto> configureDatabase(
            @RequestBody ConnectionRequestDto request) {

        try {
            // Iterar sobre los tipos de base de datos y guardar cada uno
            for (String type : request.getTypes()) {
                DatabaseCredentials credentials = request.getCredentials().get(type);

                // Verificar la conexión a la base de datos según el tipo
                if (!databaseUtils.testDatabaseConnection(credentials, type)) {
                    JsonResponseDto response = new JsonResponseDto(
                            false,
                            HttpStatus.BAD_REQUEST.value(),
                            "Error: No se pudo conectar a la base de datos " + type + " con las credenciales proporcionadas.",
                            null
                    );
                    return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
                }

                // Guardar las credenciales y ejecutar Docker Compose
                databaseCredentialsService.saveCredentialsAndRunCompose(credentials, request.getConnectionName(), type);
            }

            JsonResponseDto response = new JsonResponseDto(
                    true,
                    HttpStatus.OK.value(),
                    "Configuración guardada y servicios reiniciados.",
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


    /**
     * Método para probar la conexión a la base de datos.
     * @param config Credenciales de la base de datos
     * @param type Tipo de la base de datos (postgresql, mariadb, mongodb, etc.)
     * @return Respuesta con estado de éxito o error
     */
    @PostMapping("/testConnection/{type}")
    public ResponseEntity<JsonResponseDto> testConnection(
            @RequestBody DatabaseCredentials config,
            @PathVariable String type) {

        if (databaseUtils.testDatabaseConnection(config, type)) {
            JsonResponseDto response = new JsonResponseDto(
                    true,
                    HttpStatus.OK.value(),
                    "Conexión exitosa a la base de datos " + type + ".",
                    null
            );
            return new ResponseEntity<>(response, HttpStatus.OK);
        } else {
            JsonResponseDto response = new JsonResponseDto(
                    false,
                    HttpStatus.BAD_REQUEST.value(),
                    "Error: No se pudo conectar a la base de datos " + type + " con las credenciales proporcionadas.",
                    null
            );
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
        }
    }
}
