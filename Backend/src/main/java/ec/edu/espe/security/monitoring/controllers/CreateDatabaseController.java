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
@Tag(name = "Gestión de instalación de bases de datos", description = "Controlador para la creación y manejo de bases de datos según el tipo de DBMS especificado.")
public class CreateDatabaseController {
    private final CreateDatabaseServiceImpl databaseService;

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
            // Si ocurre una excepción inesperada, se devuelve un mensaje de error general
            String errorMessage = String.format("Error al intentar crear la base de datos '%s' en el servidor %s: %s", request.getNameDatabase(), dbType, e.getMessage());
            log.error(errorMessage);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new JsonResponseDto(false, HttpStatus.INTERNAL_SERVER_ERROR.value(), errorMessage, null));
        }
    }
}
