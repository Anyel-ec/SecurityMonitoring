package ec.edu.espe.security.monitoring.modules.features.alert.controller;

import ec.edu.espe.security.monitoring.modules.features.alert.services.AlertService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

/*
 * Author: Anyel EC
 * Github: https://github.com/Anyel-ec
 * Creation date: 04/01/2025
 */
@RestController
@RequestMapping("/api/alert")
@Slf4j
public class AlertController {

    private final AlertService alertService;

    public AlertController(AlertService alertService) {
        this.alertService = alertService;
    }

    @GetMapping("/rules")
    public ResponseEntity<String> getAlertingRules(@RequestParam String databaseType) {
        log.info("Getting alerting rules for database type: {}", databaseType);
        try {
            String alertingRules = alertService.readAlertingRules(databaseType);
            return ResponseEntity.ok(alertingRules);
        } catch (IOException e) {
            return ResponseEntity.status(500).body("Error leyendo el archivo de reglas de alerta: " + e.getMessage());
        }
    }
}
