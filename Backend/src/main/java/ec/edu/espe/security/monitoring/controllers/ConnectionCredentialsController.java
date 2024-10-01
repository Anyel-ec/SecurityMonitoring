package ec.edu.espe.security.monitoring.controllers;

import ec.edu.espe.security.monitoring.dto.request.ConnectionRequestDto;
import ec.edu.espe.security.monitoring.dto.response.JsonResponseDto;
import ec.edu.espe.security.monitoring.models.credentials.DatabaseCredentials;
import ec.edu.espe.security.monitoring.services.impl.DatabaseCredentialsServiceImpl;
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
public class ConnectionCredentialsController {

    private final DatabaseUtils databaseUtils;
    private final DatabaseCredentialsServiceImpl databaseCredentialsService;

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
        log.error("Entra a guardar credenciales");
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
            // Iterar sobre los tipos de base de datos y guardar las credenciales
            for (String type : request.getTypes()) {
                // Obtener las credenciales según el tipo de base de datos (PostgreSQL, MariaDB, etc.)
                DatabaseCredentials credentials = request.getCredentials().get(type);

                // Validar que las credenciales no sean nulas
                if (credentials == null) {
                    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
                            new JsonResponseDto(false, HttpStatus.BAD_REQUEST.value(),
                                    "Credenciales no proporcionadas para el tipo " + type, null));
                }

                // Probar la conexión con las credenciales proporcionadas
                if (!databaseUtils.testDatabaseConnection(credentials, type)) {
                    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
                            new JsonResponseDto(false, HttpStatus.BAD_REQUEST.value(),
                                    "Error: No se pudo conectar a la base de datos " + type + " con las credenciales proporcionadas.", null));
                }

                // Guardar las credenciales junto al nombre de la conexión
                databaseCredentialsService.saveCredentialsAndRunCompose(credentials, request.getConnectionName(), type);
            }

            // Respuesta exitosa
            JsonResponseDto response = new JsonResponseDto(
                    true,
                    HttpStatus.OK.value(),
                    "Credenciales guardadas y servicios reiniciados correctamente.",
                    "Conexión configurada exitosamente"
            );
            return new ResponseEntity<>(response, HttpStatus.OK);

        } catch (Exception e) {
            // Manejo de errores y respuesta en caso de excepción
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
