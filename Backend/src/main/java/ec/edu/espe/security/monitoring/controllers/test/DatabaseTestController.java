package ec.edu.espe.security.monitoring.controllers.test;

import ec.edu.espe.security.monitoring.dto.response.JsonResponseDto;
import ec.edu.espe.security.monitoring.models.DatabaseCredential;
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
     * Method to test the database connection.
     *
     * @param config Database credentials
     * @param type   Type of the database (postgresql, mariadb, mongodb, etc.)
     * @return Response with success or error status
     */
    @PostMapping("/connectionDB/{type}")
    public ResponseEntity<JsonResponseDto> testConnection(@RequestBody DatabaseCredential config, @PathVariable String type) {

        if (databaseUtils.testDatabaseConnection(config, type)) {
            return new ResponseEntity<>(new JsonResponseDto(true, HttpStatus.OK.value(), "Conexión exitosa a la base de datos " + type + ".", null), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(new JsonResponseDto(false, HttpStatus.BAD_REQUEST.value(), "Error: No se pudo conectar a la base de datos " + type + " con las credenciales proporcionadas.", null), HttpStatus.BAD_REQUEST);
        }
    }

}
