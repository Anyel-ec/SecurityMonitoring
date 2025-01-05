package ec.edu.espe.security.monitoring.modules.features.alert.controller;

import ec.edu.espe.security.monitoring.modules.features.alert.services.AlertService;
import ec.edu.espe.security.monitoring.common.dto.JsonResponseDto;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    @GetMapping("/rules/exist")
    public ResponseEntity<JsonResponseDto> doesRuleExist(@RequestParam String databaseType) {
        log.info("Checking if alerting rule exists: {}", databaseType);
        JsonResponseDto response = alertService.doesRuleExist(databaseType);
        return ResponseEntity.status(response.httpCode()).body(response);
    }

    @PostMapping("/rules")
    public ResponseEntity<JsonResponseDto> addRuleFile(@RequestParam String databaseType) {
        log.info("Adding alerting rule: {}", databaseType);
        JsonResponseDto response = alertService.addRuleFile(databaseType);
        return ResponseEntity.status(response.httpCode()).body(response);
    }

    @DeleteMapping("/rules")
    public ResponseEntity<JsonResponseDto> deleteRuleFile(@RequestParam String databaseType) {
        log.info("Deleting alerting rule: {}", databaseType);
        JsonResponseDto response = alertService.deleteRuleFile(databaseType);
        return ResponseEntity.status(response.httpCode()).body(response);
    }
}
