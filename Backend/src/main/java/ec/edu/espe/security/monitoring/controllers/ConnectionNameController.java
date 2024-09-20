package ec.edu.espe.security.monitoring.controllers;

import ec.edu.espe.security.monitoring.dto.JsonResponseDto;
import ec.edu.espe.security.monitoring.models.ConnectionName;
import ec.edu.espe.security.monitoring.models.PostgresCredentials;
import ec.edu.espe.security.monitoring.services.ConnectionNameService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@RequestMapping("api/v1/connection")
@RequiredArgsConstructor
public class ConnectionNameController {
    private final ConnectionNameService connectionNameService;

    @GetMapping("/name/{connectionName}")
    public ResponseEntity<JsonResponseDto> configurePostgresByProfile(@PathVariable String connectionName) {
        try {
            // Obtener las credenciales del perfil
            PostgresCredentials credentials = connectionNameService.getCredentialsByProfile(connectionName);

            // Crear el objeto de respuesta con las credenciales incluidas
            JsonResponseDto response = new JsonResponseDto(
                    true,
                    HttpStatus.OK.value(),
                    "Conexión configurada exitosamente",
                    credentials  // Incluir las credenciales en la respuesta
            );

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new JsonResponseDto(
                            false,
                            HttpStatus.INTERNAL_SERVER_ERROR.value(),
                            "Error: " + e.getMessage(),
                            null
                    ));
        }
    }

    @GetMapping("/names")
    public ResponseEntity<JsonResponseDto> getAllConnectionNames() {
        try {
            List<String> connectionNames = connectionNameService.getAllConnectionNames();
            return ResponseEntity.ok(new JsonResponseDto(true, HttpStatus.OK.value(), "Nombres de credenciales obtenidos exitosamente", connectionNames.toString()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new JsonResponseDto(false, HttpStatus.INTERNAL_SERVER_ERROR.value(), "Error al obtener los nombres de las credenciales", null));
        }
    }

    @PostMapping("/save")
    public ResponseEntity<JsonResponseDto> saveOrUpdateConnection(@RequestBody ConnectionName connection) {
        try {
            // Llamar al método para guardar o actualizar la conexión
            ConnectionName savedConnection = connectionNameService.saveOrUpdateConnection(connection);

            return ResponseEntity.ok(new JsonResponseDto(true, HttpStatus.OK.value(), "Conexión guardada o actualizada exitosamente", savedConnection));

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new JsonResponseDto(false, HttpStatus.INTERNAL_SERVER_ERROR.value(), "Error: " + e.getMessage(), null));
        }
    }

}
