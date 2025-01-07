package ec.edu.espe.security.monitoring.modules.features.alert.controller;

import ec.edu.espe.security.monitoring.common.dto.JsonResponseDto;
import ec.edu.espe.security.monitoring.modules.features.alert.services.AlertService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/*
 * Author: Anyel EC
 * Github: https://github.com/Anyel-ec
 * Creation date: 04/01/2025
 */
@RestController
@RequestMapping("/api/v1/alert")
@Slf4j
@AllArgsConstructor
public class AlertController {

    private final AlertService alertService;


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

    @GetMapping("/rules/check-all")
    public ResponseEntity<JsonResponseDto> checkMultipleRuleExistence() {
        log.info("Checking if multiple alerting rules exist");
        JsonResponseDto response = alertService.checkMultipleRuleExistence();
        return ResponseEntity.status(response.httpCode()).body(response);
    }

}
