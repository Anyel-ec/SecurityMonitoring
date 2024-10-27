package ec.edu.espe.security.monitoring.controllers.connection;

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
