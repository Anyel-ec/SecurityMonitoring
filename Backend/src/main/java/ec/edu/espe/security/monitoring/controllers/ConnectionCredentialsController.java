package ec.edu.espe.security.monitoring.controllers;

import ec.edu.espe.security.monitoring.dto.request.ConnectionRequestDto;
import ec.edu.espe.security.monitoring.dto.response.JsonResponseDto;
import ec.edu.espe.security.monitoring.models.credentials.DatabaseCredentials;
import ec.edu.espe.security.monitoring.services.implementations.DatabaseCredentialsServiceImpl;
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
     * Method to configure and save database credentials.
     * @param config Database credentials (host, port, username, password)
     * @param connectionName Name of the connection
     * @param type Type of the database (postgresql, mariadb, mongodb, etc.)
     * @return Response with success or error status
     */
    @PostMapping("/database/{type}")
    public ResponseEntity<JsonResponseDto> configureDatabase(
            @RequestBody DatabaseCredentials config,
            @RequestParam String connectionName,
            @PathVariable String type) {
        log.error("Entra a guardar credenciales");
        // Verify the connection to the database based on the type
        if (!databaseUtils.testDatabaseConnection(config, type)) {
            JsonResponseDto response = new JsonResponseDto(
                    false,
                    HttpStatus.BAD_REQUEST.value(),
                    "Error: No se pudo conectar a la base de datos "+type+" con las credenciales proporcionadas.",
                    null
            );
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
        }

        try {
            // Save the credentials and run Docker Compose
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
     * Method to configure and save database credentials.
     * @param request Object containing the connection name, types, and credentials.
     * @return Response with success or error status
     */
    @PostMapping("/database")
    public ResponseEntity<JsonResponseDto> configureDatabase(
            @RequestBody ConnectionRequestDto request) {

        try {
            // Iterate over the database types and save credentials
            for (String type : request.getTypes()) {
                // Get the credentials for the database type (PostgreSQL, MariaDB, etc.)
                DatabaseCredentials credentials = request.getCredentials().get(type);

                // Validate that the credentials are not null
                if (credentials == null) {
                    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
                            new JsonResponseDto(false, HttpStatus.BAD_REQUEST.value(),
                                    "Credenciales no proporcionadas para el tipo " + type, null));
                }

                // Test the connection with the provided credentials
                if (!databaseUtils.testDatabaseConnection(credentials, type)) {
                    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
                            new JsonResponseDto(false, HttpStatus.BAD_REQUEST.value(),
                                    "Error: No se pudo conectar a la base de datos " + type + " con las credenciales proporcionadas.", null));
                }

                // Save the credentials along with the connection name
                databaseCredentialsService.saveCredentialsAndRunCompose(credentials, request.getConnectionName(), type);
            }

            // Successful response
            JsonResponseDto response = new JsonResponseDto(
                    true,
                    HttpStatus.OK.value(),
                    "Credenciales guardadas y servicios reiniciados correctamente.",
                    "Conexión configurada exitosamente"
            );
            return new ResponseEntity<>(response, HttpStatus.OK);

        } catch (Exception e) {
            // Error handling and response in case of an exception
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
     * Method to test the database connection.
     * @param config Database credentials
     * @param type Type of the database (postgresql, mariadb, mongodb, etc.)
     * @return Response with success or error status
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
