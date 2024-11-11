package ec.edu.espe.security.monitoring.controllers.test;

import ec.edu.espe.security.monitoring.dto.request.DatabaseCredentialRequestDto;
import ec.edu.espe.security.monitoring.dto.response.JsonResponseDto;
import ec.edu.espe.security.monitoring.utils.DatabaseUtils;
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

    /**
     * New endpoint to test the database connection without using the type.
     *
     * @param config Database credentials
     * @return Response with success or error status
     */
    @PostMapping("/connectionDB")
    public ResponseEntity<JsonResponseDto> testConnection(@RequestBody DatabaseCredentialRequestDto config) {
        String dbType = (config.getSystemParameter() != null) ? config.getSystemParameter().getName() : null;

        if (dbType == null) {
            return new ResponseEntity<>(new JsonResponseDto(false, HttpStatus.BAD_REQUEST.value(),
                    "Error: El tipo de base de datos no está especificado en los parámetros del sistema.", null), HttpStatus.BAD_REQUEST);
        }

        if (databaseUtils.testDatabaseConnection(config)) {
            log.info(dbType + " database connection successful.");
            return new ResponseEntity<>(new JsonResponseDto(true, HttpStatus.OK.value(),
                    "Conexión exitosa a la base de datos de tipo " + dbType + ".", null), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(new JsonResponseDto(false, HttpStatus.BAD_REQUEST.value(),
                    "Error: No se pudo conectar a la base de datos de tipo " + dbType + " con las credenciales proporcionadas.", null), HttpStatus.BAD_REQUEST);
        }
    }

}
