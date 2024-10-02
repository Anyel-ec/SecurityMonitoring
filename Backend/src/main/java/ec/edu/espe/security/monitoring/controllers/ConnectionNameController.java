package ec.edu.espe.security.monitoring.controllers;

import ec.edu.espe.security.monitoring.dto.response.JsonResponseDto;
import ec.edu.espe.security.monitoring.models.ConnectionName;
import ec.edu.espe.security.monitoring.models.credentials.PostgresCredentials;
import ec.edu.espe.security.monitoring.services.impl.ConnectionNameServiceImpl;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@RequestMapping("api/v1/connection")
@RequiredArgsConstructor
@Slf4j
public class ConnectionNameController {
    private final ConnectionNameServiceImpl connectionNameService;

    /**
     * Retrieves the PostgreSQL credentials for a given profile by the connection name.
     * This method interacts with the service layer to fetch the corresponding
     * credentials associated with the provided profile name.
     *
     * @param connectionName the name of the connection or profile to fetch credentials for
     * @return a ResponseEntity containing the JsonResponseDto with the credentials if successful,
     *         or an error message in case of failure.
     */
    @GetMapping("/name/{connectionName}")
    public ResponseEntity<JsonResponseDto> configurePostgresByProfile(@PathVariable String connectionName) {
        try {
            // Obtain credentials by profile
            PostgresCredentials credentials = connectionNameService.getCredentialsByProfile(connectionName);

            // Create a response object including the credentials
            JsonResponseDto response = new JsonResponseDto(true,HttpStatus.OK.value(),"Conexión configurada exitosamente", credentials);

            return ResponseEntity.ok(response);


        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new JsonResponseDto( false,HttpStatus.INTERNAL_SERVER_ERROR.value(),"Error: " + e.getMessage(), null));

        }
    }

    /**
     * Retrieves a list of all saved connection names.
     * This method fetches all the connection names stored in the system and
     * returns them to the client.
     *
     * @return a ResponseEntity containing a JsonResponseDto with the list of connection names,
     *         or an error message if retrieval fails.
     */
    @GetMapping("/names")
    public ResponseEntity<JsonResponseDto> getAllConnections() {
        try {
            List<ConnectionName> connections = connectionNameService.getAllConnectionNames();
            return ResponseEntity.ok(new JsonResponseDto(true, HttpStatus.OK.value(), "Conexiones obtenidas exitosamente", connections));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new JsonResponseDto(false, HttpStatus.INTERNAL_SERVER_ERROR.value(), "Error al obtener las conexiones", null));
        }
    }


    /**
     * Saves or updates a connection name.
     * If the connection name is valid, it will either create a new entry or update an existing one.
     * The connection name must not be null or empty.
     *
     * @param connection the connection name object to be saved or updated
     * @return a ResponseEntity containing a JsonResponseDto with the result of the operation,
     *         or an error message if the save or update fails.
     */
    @PostMapping("/save")
    public ResponseEntity<JsonResponseDto> saveOrUpdateConnection(@RequestBody ConnectionName connection) {
        if (connection.getConnectionName() == null || connection.getConnectionName().isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new JsonResponseDto(false, HttpStatus.BAD_REQUEST.value(), "El nombre de la conexión no puede estar vacío", null));
        }

        try {
            log.error("Guardar nombre de conexion");
            ConnectionName savedConnection = connectionNameService.saveOrUpdateConnection(connection);
            return ResponseEntity.ok(new JsonResponseDto(true, HttpStatus.OK.value(), "Conexión guardada o actualizada exitosamente", savedConnection));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new JsonResponseDto(false, HttpStatus.INTERNAL_SERVER_ERROR.value(), "Error: " + e.getMessage(), null));
        }
    }

    /**
     * Deletes a connection by its ID.
     * This method removes the connection entry associated with the provided ID from the system.
     *
     * @param id the ID of the connection to be deleted
     * @return a ResponseEntity containing a JsonResponseDto indicating success or failure of the deletion
     */
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<JsonResponseDto> deleteConnection(@PathVariable Long id) {
        try {
            connectionNameService.deleteConnectionById(id);
            return ResponseEntity.ok(new JsonResponseDto(true, HttpStatus.OK.value(), "Conexión eliminada exitosamente", null));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new JsonResponseDto(false, HttpStatus.INTERNAL_SERVER_ERROR.value(), "Error al eliminar la conexión: " + e.getMessage(), null));
        }
    }



}
