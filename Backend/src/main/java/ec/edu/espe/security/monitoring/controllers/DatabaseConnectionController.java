package ec.edu.espe.security.monitoring.controllers;

import ec.edu.espe.security.monitoring.models.DatabaseCredentials;
import ec.edu.espe.security.monitoring.services.DatabaseMonitoringService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
@AllArgsConstructor
@RestController
@RequestMapping("/api/connections")
public class DatabaseConnectionController {

    private final DatabaseMonitoringService databaseMonitoringService;

    @PostMapping("/configure")
    public ResponseEntity<String> configureDatabases(@RequestBody DatabaseCredentials credentials) {
        try {
            databaseMonitoringService.saveCredentialsAndRunCompose(credentials);
            return ResponseEntity.ok("Configuración guardada y Docker Compose ejecutado");
        } catch (IOException e) {
            return ResponseEntity.status(500).body("Error al ejecutar Docker Compose: " + e.getMessage());
        }
    }
}
