package ec.edu.espe.security.monitoring.controllers.test;

import ec.edu.espe.security.monitoring.dto.request.DatabaseCredentialRequestDto;
import ec.edu.espe.security.monitoring.dto.response.JsonResponseDto;
import ec.edu.espe.security.monitoring.models.AuditLog;
import ec.edu.espe.security.monitoring.security.jwt.JwtProvider;
import ec.edu.espe.security.monitoring.services.impl.log.AuditLogServiceImpl;
import ec.edu.espe.security.monitoring.shared.utils.DatabaseUtils;
import jakarta.servlet.http.HttpServletRequest;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@AllArgsConstructor
@RestController
@RequestMapping("/api/v1/test")
public class DatabaseTestController {
    // Injected dependencies
    private final DatabaseUtils databaseUtils;
    private final HttpServletRequest request;
    private final JwtProvider jwtProvider;
    private final AuditLogServiceImpl auditLogService;

    /**
     * New endpoint to test the database connection without using the type.
     *
     * @param authorizationHeader JWT token provided in the Authorization header
     * @param config              Database credentials
     * @return Response with success or error status in Spanish
     */
    @PostMapping("/connectionDB")
    public ResponseEntity<JsonResponseDto> testConnection(
            @RequestHeader("Authorization") String authorizationHeader, // Receives the JWT token from the header
            @RequestBody DatabaseCredentialRequestDto config
    ) {
        // Get the database type from the configuration parameters
        String dbType = (config.getSystemParameter() != null) ? config.getSystemParameter().getName() : null;

        if (dbType == null) {
            // Return error response if the database type is not specified
            return new ResponseEntity<>(new JsonResponseDto(false, HttpStatus.BAD_REQUEST.value(),
                    "Error: El tipo de base de datos no está especificado en los parámetros del sistema.", null), HttpStatus.BAD_REQUEST);
        }

        // Extract the username from the JWT token using JwtProvider
        String username;
        try {
            String token = authorizationHeader.replace("Bearer ", ""); // Remove the "Bearer " prefix from the token
            username = jwtProvider.getNombreUsuarioFromToken(token);   // Extract the username from the token
        } catch (Exception e) {
            log.error("Error extracting the username from the JWT token: {}", e.getMessage());
            // Return error response if the token is invalid or not provided
            return new ResponseEntity<>(new JsonResponseDto(false, HttpStatus.UNAUTHORIZED.value(),
                    "Error: Token de autorización inválido o no proporcionado.", null), HttpStatus.UNAUTHORIZED);
        }

        // Create an audit log entry
        AuditLog auditLog = AuditLog.builder()
                .username(username)                           // Username extracted from the token
                .ipAddress(request.getRemoteAddr())           // Client IP address
                .endpoint(request.getRequestURI())            // Endpoint obtained from the request
                .httpMethod(request.getMethod())              // HTTP method obtained from the request
                .requestParams(config.toString())            // Request details
                .responseStatus(0)                           // Temporarily set to 0, will be updated later
                .actionType("TEST_CONNECTION")               // Action type
                .build();

        try {
            // Test the database connection
            if (databaseUtils.testDatabaseConnection(config)) {
                log.info(dbType + " database connection successful.");

                // Update the audit log status and save it
                auditLog.setResponseStatus(HttpStatus.OK.value());
                auditLog.setResultMessage("Conexión exitosa a la base de datos de tipo " + dbType + ".");
                auditLogService.saveAuditLog(auditLog);

                // Return success response
                return new ResponseEntity<>(new JsonResponseDto(true, HttpStatus.OK.value(),
                        "Conexión exitosa a la base de datos de tipo " + dbType + ".", null), HttpStatus.OK);
            } else {
                // Update the audit log status and save it
                auditLog.setResponseStatus(HttpStatus.BAD_REQUEST.value());
                auditLog.setResultMessage("Error: No se pudo conectar a la base de datos de tipo " + dbType + " con las credenciales proporcionadas.");
                auditLogService.saveAuditLog(auditLog);

                // Return error response
                return new ResponseEntity<>(new JsonResponseDto(false, HttpStatus.BAD_REQUEST.value(),
                        "Error: No se pudo conectar a la base de datos de tipo " + dbType + " con las credenciales proporcionadas.", null), HttpStatus.BAD_REQUEST);
            }
        } catch (Exception e) {
            log.error("Error testing the database connection: {}", e.getMessage());

            // Update the audit log status and save it
            auditLog.setResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR.value());
            auditLog.setResultMessage("Error interno al probar la conexión a la base de datos.");
            auditLogService.saveAuditLog(auditLog);

            // Return internal server error response
            return new ResponseEntity<>(new JsonResponseDto(false, HttpStatus.INTERNAL_SERVER_ERROR.value(),
                    "Error interno al probar la conexión a la base de datos.", null), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
