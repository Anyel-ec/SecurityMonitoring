package ec.edu.espe.security.monitoring.modules.features.credential.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import ec.edu.espe.security.monitoring.modules.features.credential.dto.DatabaseCredentialRequestDto;
import ec.edu.espe.security.monitoring.common.dto.JsonResponseDto;
import ec.edu.espe.security.monitoring.modules.core.audit.services.AuditLogServiceImpl;
import ec.edu.espe.security.monitoring.modules.features.credential.utils.DatabaseUtils;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
/*
 * Author: Anyel EC
 * Github: https://github.com/Anyel-ec
 * Creation date: 04/11/2024
 */
@Tag(name = "Prueba de Conexión a la Base de Datos", description = "Endpoint para probar la conexión a la base de datos con las credenciales proporcionadas")
@Slf4j
@AllArgsConstructor
@RestController
@RequestMapping("/api/v1/test")
public class DatabaseTestController {

    private final DatabaseUtils databaseUtils;
    private final HttpServletRequest request;
    private final AuditLogServiceImpl auditLogService;

    /**
     * New endpoint to test the database connection without using the type.
     *
     * @param authorizationHeader JWT token provided in the Authorization header.
     * @param config              Database credentials.
     * @return Response with success or error status in Spanish.
     */
    @PostMapping("/connectionDB")
    public ResponseEntity<JsonResponseDto> testConnection(
            @RequestHeader("Authorization") String authorizationHeader,
            @RequestBody DatabaseCredentialRequestDto config) {
        String dbType = (config.getSystemParameter() != null) ? config.getSystemParameter().getName() : null;

        if (dbType == null) {
            // Save audit log
            auditLogService.saveAuditLogFromRequest(authorizationHeader, "TEST_CONNECTION", HttpStatus.BAD_REQUEST.value(), "Error: El tipo de base de datos no está especificado en los parámetros del sistema.", request, null);

            return ResponseEntity.badRequest().body(new JsonResponseDto(false, HttpStatus.BAD_REQUEST.value(), "Error: El tipo de base de datos no está especificado en los parámetros del sistema.", null));
        }

        try {
            boolean connectionSuccessful = databaseUtils.testDatabaseConnection(config);
            String requestBody = new ObjectMapper().writeValueAsString(config); // Serialize the request body

            if (connectionSuccessful) {
                log.info("Database connection successful for {}", dbType);

                // Save audit log
                auditLogService.saveAuditLogFromRequest(authorizationHeader, "TEST_CONNECTION", HttpStatus.OK.value(), "Conexión exitosa a la base de datos de tipo " + dbType + ".", request, requestBody);
                return ResponseEntity.ok(new JsonResponseDto(true, HttpStatus.OK.value(), "Conexión exitosa a la base de datos de tipo " + dbType + ".", null));
            } else {
                log.warn("Failed to connect to database of type {}", dbType);

                // Save audit log
                auditLogService.saveAuditLogFromRequest(authorizationHeader, "TEST_CONNECTION", HttpStatus.BAD_REQUEST.value(), "Error: No se pudo conectar a la base de datos de tipo " + dbType + " con las credenciales proporcionadas.", request, requestBody);

                return ResponseEntity.badRequest().body(new JsonResponseDto(false, HttpStatus.BAD_REQUEST.value(), "Error: No se pudo conectar a la base de datos de tipo " + dbType + " con las credenciales proporcionadas.", null));
            }
        } catch (Exception e) {
            log.error("Error testing the database connection: {}", e.getMessage());

            // Save audit log
            auditLogService.saveAuditLogFromRequest(authorizationHeader, "TEST_CONNECTION", HttpStatus.INTERNAL_SERVER_ERROR.value(), "Error interno al probar la conexión a la base de datos.", request, null);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new JsonResponseDto(false, HttpStatus.INTERNAL_SERVER_ERROR.value(), "Error interno al probar la conexión a la base de datos.", null));
        }
    }
}
