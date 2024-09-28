package ec.edu.espe.security.monitoring.controllers;

import ec.edu.espe.security.monitoring.dto.response.JsonResponseDto;
import ec.edu.espe.security.monitoring.models.ConnectionName;
import ec.edu.espe.security.monitoring.models.PostgresCredentials;
import ec.edu.espe.security.monitoring.services.ConnectionNameService;
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
    private final ConnectionNameService connectionNameService;

    @GetMapping("/name/{connectionName}")
    public ResponseEntity<JsonResponseDto> configurePostgresByProfile(@PathVariable String connectionName) {
        try {
            // Obtener las credenciales del perfil
            PostgresCredentials credentials = connectionNameService.getCredentialsByProfile(connectionName);

            // Crear el objeto de respuesta con las credenciales incluidas
            JsonResponseDto response = new JsonResponseDto(true,HttpStatus.OK.value(),"Conexión configurada exitosamente", credentials);

            return ResponseEntity.ok(response);


        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new JsonResponseDto( false,HttpStatus.INTERNAL_SERVER_ERROR.value(),"Error: " + e.getMessage(), null));

        }
    }

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
