package ec.edu.espe.security.monitoring.controllers.credential;

import ec.edu.espe.security.monitoring.dto.request.DatabaseCredentialRequestDto;
import ec.edu.espe.security.monitoring.dto.response.JsonResponseDto;
import ec.edu.espe.security.monitoring.models.DatabaseCredential;
import ec.edu.espe.security.monitoring.services.impl.credential.DatabaseCredentialService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@Slf4j
@AllArgsConstructor
@RestController
@RequestMapping("/api/v1/credentials")
public class DatabaseCredentialController {

    private final DatabaseCredentialService credentialService;

    /**
     * Endpoint to create or update database credentials.
     * @param dto Data Transfer Object containing credential information.
     * @return ResponseEntity with JSON response indicating success or error message.
     */
    @PostMapping("/createOrUpdate")
    public ResponseEntity<JsonResponseDto> createCredential(@Valid @RequestBody DatabaseCredentialRequestDto dto) {
        try {
            log.info("Entro a guardar credenciales de BD");
            DatabaseCredential credential = credentialService.createOrUpdateCredential(dto);
            return ResponseEntity.ok(new JsonResponseDto(true, 200, "Credencial creada con éxito", credential));
        } catch (Exception e) {
            log.error("Error al crear credencial: {}", e.getMessage());
            return ResponseEntity.status(500).body(new JsonResponseDto(false, 500, "Error al crear credencial - " +e.getMessage(), null));
        }
    }

    /**
     * Endpoint to retrieve all database credentials.
     * @return ResponseEntity containing a JSON response with the list of credentials or an error message.
     */
    @GetMapping
    public ResponseEntity<JsonResponseDto> getAllCredentials() {
        try {
            List<DatabaseCredential> credentials = credentialService.getAllCredentials();
            return ResponseEntity.ok(new JsonResponseDto(true, 200, "Lista de credenciales obtenida con éxito", credentials));
        } catch (Exception e) {
            log.error("Error al obtener las credenciales {}", e.getMessage());
            return ResponseEntity.status(500).body(new JsonResponseDto(false, 500, "Error al obtener las credenciales: " + e.getMessage(), null));
        }
    }

    /**
     * Endpoint to retrieve a specific credential by ID.
     * @param id The ID of the credential to be retrieved.
     * @return ResponseEntity with the credential data if found, or an error message if not.
     */
    @GetMapping("/{id}")
    public ResponseEntity<JsonResponseDto> getCredentialById(@PathVariable Long id) {
        try {
            DatabaseCredential credential = credentialService.getCredentialById(id);
            if (credential == null) {
                return ResponseEntity.status(404).body(new JsonResponseDto(false, 404, "Credencial no encontrada", null));
            }
            return ResponseEntity.ok(new JsonResponseDto(true, 200, "Credencial obtenida con éxito", credential));
        } catch (Exception e) {
            log.error("Error al obtener credencial {}", e.getMessage());
            return ResponseEntity.status(500).body(new JsonResponseDto(false, 500, "Error al obtener la credencial", null));
        }
    }

    /**
     * Endpoint to delete a database credential by ID.
     * @param id The ID of the credential to be deleted.
     * @return ResponseEntity with a success or error message based on the outcome.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<JsonResponseDto> deleteCredential(@PathVariable Long id) {
        try {
            credentialService.deleteCredential(id);
            return ResponseEntity.ok(new JsonResponseDto(true, 200, "Credencial eliminada con éxito", null));
        } catch (Exception e) {
            log.error("Error al eliminar credencial {}", e.getMessage());
            return ResponseEntity.status(500).body(new JsonResponseDto(false, 500, "Error al eliminar credencial", null));
        }
    }
}
