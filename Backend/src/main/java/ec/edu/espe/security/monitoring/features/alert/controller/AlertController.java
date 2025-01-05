package ec.edu.espe.security.monitoring.features.alert.controller;

import ec.edu.espe.security.monitoring.features.alert.services.AlertService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

/*
 * Author: Anyel EC
 * Github: https://github.com/Anyel-ec
 * Creation date: 04/01/2025
 */
@RestController
@RequestMapping("/api/alert")
public class AlertController {

    private final AlertService alertService;

    public AlertController(AlertService alertService) {
        this.alertService = alertService;
    }

    @GetMapping("/rules")
    public ResponseEntity<String> getAlertingRules() {
        try {
            String alertingRules = alertService.readAlertingRules();
            return ResponseEntity.ok(alertingRules);
        } catch (IOException e) {
            return ResponseEntity.status(500).body("Error leyendo el archivo de reglas de alerta: " + e.getMessage());
        }
    }
}
