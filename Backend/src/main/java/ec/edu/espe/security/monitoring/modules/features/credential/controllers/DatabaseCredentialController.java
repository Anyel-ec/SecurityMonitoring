package ec.edu.espe.security.monitoring.modules.features.credential.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import ec.edu.espe.security.monitoring.modules.features.credential.dto.DatabaseCredentialRequestDto;
import ec.edu.espe.security.monitoring.common.dto.JsonResponseDto;
import ec.edu.espe.security.monitoring.modules.features.credential.models.DatabaseCredential;
import ec.edu.espe.security.monitoring.modules.core.audit.services.AuditLogService;
import ec.edu.espe.security.monitoring.modules.features.credential.services.DatabaseCredentialService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@AllArgsConstructor
@RestController
@RequestMapping("/api/v1/credentials")
public class DatabaseCredentialController {

    private final DatabaseCredentialService credentialService;
    private final AuditLogService auditLogService;
    private final HttpServletRequest request;

    /**
     * Endpoint to create or update database credentials.
     *
     * @param dto                 Data Transfer Object containing credential information.
     * @param authorizationHeader Authorization token from the client.
     * @return ResponseEntity with JSON response indicating success or error message.
     */
    @PostMapping("/createOrUpdate")
    public ResponseEntity<JsonResponseDto> createCredential(@Valid @RequestBody DatabaseCredentialRequestDto dto,
                                                            @RequestHeader("Authorization") String authorizationHeader) {
        try {
            log.info("Creating or updating database credentials");
            DatabaseCredential credential = credentialService.createOrUpdateCredential(dto);

            // Capture request body
            String requestBody = new ObjectMapper().writeValueAsString(dto);

            // Save audit log
            auditLogService.saveAuditLogFromRequest(authorizationHeader, "CREATE_OR_UPDATE", HttpStatus.OK.value(), "Credential created or updated successfully", request, requestBody);
            return ResponseEntity.ok(new JsonResponseDto(true, 200, "Credential created successfully", credential));
        } catch (Exception e) {
            log.error("Error creating credential: {}", e.getMessage());

            // Save audit log
            auditLogService.saveAuditLogFromRequest(authorizationHeader, "CREATE_OR_UPDATE", HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage(), request, null);
            return ResponseEntity.status(500).body(new JsonResponseDto(false, 500, "Error creating credential - " + e.getMessage(), null));
        }
    }

    /**
     * Endpoint to retrieve all database credentials.
     *
     * @param authorizationHeader Authorization token from the client.
     * @return ResponseEntity containing a JSON response with the list of credentials or an error message.
     */
    @GetMapping
    public ResponseEntity<JsonResponseDto> getAllCredentials(@RequestHeader("Authorization") String authorizationHeader) {
        try {
            auditLogService.saveAuditLogFromRequest(authorizationHeader, "GET_ALL_CREDENTIALS", HttpStatus.OK.value(), "Credential list retrieved successfully", request, null);

            List<DatabaseCredential> credentials = credentialService.getAllCredentials();

            // Save audit log
            return ResponseEntity.ok(new JsonResponseDto(true, 200, "Credential list retrieved successfully", credentials));
        } catch (Exception e) {
            log.error("Error retrieving credentials {}", e.getMessage());

            return ResponseEntity.status(500).body(new JsonResponseDto(false, 500, "Error al recuperar las credenciales: " + e.getMessage(), null));
        }
    }

    /**
     * Endpoint to retrieve a specific credential by ID.
     *
     * @param id                  The ID of the credential to be retrieved.
     * @return ResponseEntity with the credential data if found, or an error message if not.
     */
    @GetMapping("/{id}")
    public ResponseEntity<JsonResponseDto> getCredentialById(@PathVariable Long id) {
        try {
            DatabaseCredential credential = credentialService.getCredentialById(id);
            return ResponseEntity.ok(new JsonResponseDto(true, 200, "Credential retrieved successfully", credential));
        } catch (IllegalArgumentException e) {
            log.warn("Credential not found: {}", e.getMessage());
            return ResponseEntity.status(404).body(new JsonResponseDto(false, 404, e.getMessage(), null));
        } catch (Exception e) {
            log.error("Error retrieving credential: {}", e.getMessage());
            return ResponseEntity.status(500).body(new JsonResponseDto(false, 500, "Error retrieving credential", null));
        }
    }

    /**
     * Endpoint to delete a database credential by ID.
     *
     * @param id                  The ID of the credential to be deleted.
     * @param authorizationHeader Authorization token from the client.
     * @return ResponseEntity with a success or error message based on the outcome.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<JsonResponseDto> deleteCredential(@PathVariable Long id,
                                                            @RequestHeader("Authorization") String authorizationHeader) {
        try {
            auditLogService.saveAuditLogFromRequest(authorizationHeader, "DELETE_CREDENTIAL", HttpStatus.OK.value(), "Credential deleted successfully", request, null);

            // if exits credential
            credentialService.getCredentialById(id);

            credentialService.deleteCredential(id);

            return ResponseEntity.ok(new JsonResponseDto(true, 200, "Credential deleted successfully", null));

        } catch (IllegalArgumentException e) {
            log.warn("Credential not found for deletion: {}", e.getMessage());
            return ResponseEntity.status(404).body(new JsonResponseDto(false, 404, e.getMessage(), null));
        } catch (Exception e) {
            log.error("Error deleting credential: {}", e.getMessage());
            auditLogService.saveAuditLogFromRequest(authorizationHeader, "DELETE_CREDENTIAL", HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage(), request, null);
            return ResponseEntity.status(500).body(new JsonResponseDto(false, 500, "Error deleting credential", null));
        }
    }

}
