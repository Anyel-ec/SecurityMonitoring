package ec.edu.espe.security.monitoring.controllers.credential;

import com.fasterxml.jackson.databind.ObjectMapper;
import ec.edu.espe.security.monitoring.dto.request.DatabaseCredentialRequestDto;
import ec.edu.espe.security.monitoring.dto.response.JsonResponseDto;
import ec.edu.espe.security.monitoring.models.DatabaseCredential;
import ec.edu.espe.security.monitoring.services.impl.credential.DatabaseCredentialServiceImpl;
import ec.edu.espe.security.monitoring.services.impl.audit.AuditLogServiceImpl;
import ec.edu.espe.security.monitoring.services.interfaces.audit.AuditLogService;
import ec.edu.espe.security.monitoring.services.interfaces.credential.DatabaseCredentialService;
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
            List<DatabaseCredential> credentials = credentialService.getAllCredentials();

            // Save audit log
            auditLogService.saveAuditLogFromRequest(authorizationHeader, "GET_ALL_CREDENTIALS", HttpStatus.OK.value(), "List of credentials retrieved successfully", request, null);
            return ResponseEntity.ok(new JsonResponseDto(true, 200, "Credential list retrieved successfully", credentials));
        } catch (Exception e) {
            log.error("Error retrieving credentials {}", e.getMessage());

            // Save audit log
            auditLogService.saveAuditLogFromRequest(authorizationHeader, "GET_ALL_CREDENTIALS", HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage(), request, null);

            return ResponseEntity.status(500).body(new JsonResponseDto(false, 500, "Error retrieving credentials: " + e.getMessage(), null));
        }
    }

    /**
     * Endpoint to retrieve a specific credential by ID.
     *
     * @param id                  The ID of the credential to be retrieved.
     * @param authorizationHeader Authorization token from the client.
     * @return ResponseEntity with the credential data if found, or an error message if not.
     */
    @GetMapping("/{id}")
    public ResponseEntity<JsonResponseDto> getCredentialById(@PathVariable Long id,
                                                             @RequestHeader("Authorization") String authorizationHeader) {
        try {
            DatabaseCredential credential = credentialService.getCredentialById(id);
            String requestBody = String.format("ID requested: %d", id); // Prepare request details for audit log

            if (credential == null) {
                // Save audit log
                auditLogService.saveAuditLogFromRequest(authorizationHeader, "GET_CREDENTIAL_BY_ID", HttpStatus.NOT_FOUND.value(), "Credential not found", request, requestBody);
                return ResponseEntity.status(404).body(new JsonResponseDto(false, 404, "Credential not found", null));
            }

            // Save audit log
            auditLogService.saveAuditLogFromRequest(authorizationHeader, "GET_CREDENTIAL_BY_ID", HttpStatus.OK.value(), "Credential retrieved successfully", request, requestBody);

            return ResponseEntity.ok(new JsonResponseDto(true, 200, "Credential retrieved successfully", credential));
        } catch (Exception e) {
            log.error("Error retrieving credential {}", e.getMessage());

            // Save audit log
            auditLogService.saveAuditLogFromRequest(authorizationHeader, "GET_CREDENTIAL_BY_ID", HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage(), request, null);

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
            credentialService.deleteCredential(id);

            String requestBody = String.format("ID deleted: %d", id); // Prepare request details for audit log

            // Save audit log
            auditLogService.saveAuditLogFromRequest(authorizationHeader, "DELETE_CREDENTIAL", HttpStatus.OK.value(), "Credential deleted successfully", request, requestBody);

            return ResponseEntity.ok(new JsonResponseDto(true, 200, "Credential deleted successfully", null));
        } catch (Exception e) {
            log.error("Error deleting credential {}", e.getMessage());

            // Save audit log
            auditLogService.saveAuditLogFromRequest(authorizationHeader, "DELETE_CREDENTIAL", HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage(), request, null);
            return ResponseEntity.status(500).body(new JsonResponseDto(false, 500, "Error deleting credential", null));
        }
    }

}
