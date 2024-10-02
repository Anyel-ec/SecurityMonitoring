package ec.edu.espe.security.monitoring.controllers;

import ec.edu.espe.security.monitoring.dto.request.CreateDatabaseRequestDto;
import ec.edu.espe.security.monitoring.dto.response.JsonResponseDto;
import ec.edu.espe.security.monitoring.services.impl.CreateDatabaseServiceImpl;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1/installation")
@Slf4j
@RequiredArgsConstructor
@Tag(name = "Database Installation Management", description = "Controller for the creation and management of databases based on the specified DBMS type.")
public class CreateDatabaseController {

    private final CreateDatabaseServiceImpl databaseService;

    /**
     * Operation to create a database on the specified server according to the DBMS type.
     * This method interacts with the service layer to handle the database creation process
     * based on the information provided in the request and the type of DBMS.
     *
     * @param request Contains details such as database name, user credentials, and other configurations
     * @param dbType The type of the DBMS (e.g., postgresql, mariadb, etc.)
     * @return ResponseEntity with a success or failure message in the JsonResponseDto
     */
    @Operation(summary = "Crear una base de datos en el servidor especificado según el tipo de DBMS")
    @PostMapping("/{dbType}/create")
    public ResponseEntity<JsonResponseDto> createDatabase(@RequestBody CreateDatabaseRequestDto request,
                                                          @PathVariable String dbType) {
        try {
            boolean success = databaseService.createDatabase(request, dbType);
            if (success) {
                return ResponseEntity.ok(new JsonResponseDto(true, HttpStatus.OK.value(), "Base de datos creada exitosamente", null));
            } else {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                        .body(new JsonResponseDto(false, HttpStatus.INTERNAL_SERVER_ERROR.value(), "No se pudo crear la base de datos", null));
            }

        } catch (Exception e) {
            // If an unexpected exception occurs, return a general error message
            String errorMessage = String.format("Error al intentar crear la base de datos '%s' en el servidor %s: %s", request.getNameDatabase(), dbType, e.getMessage());
            log.error(errorMessage);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new JsonResponseDto(false, HttpStatus.INTERNAL_SERVER_ERROR.value(), errorMessage, null));
        }
    }
}
