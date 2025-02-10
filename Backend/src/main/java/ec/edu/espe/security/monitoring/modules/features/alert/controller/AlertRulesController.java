package ec.edu.espe.security.monitoring.modules.features.alert.controller;

import ec.edu.espe.security.monitoring.common.dto.JsonResponseDto;
import ec.edu.espe.security.monitoring.modules.features.alert.services.AlertRulesService;
import ec.edu.espe.security.monitoring.modules.features.alert.utils.DockerCommandUtil;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
/*
 * Author: Anyel EC
 * Github: https://github.com/Anyel-ec
 * Creation date: 14/01/2025
 */
@Tag(name = "Reglas de Alertas", description = "Endpoints para gestionar reglas de alertas en Prometheus y Alertmanager")
@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("api/v1/alert_rules")
public class AlertRulesController {

    private final AlertRulesService alertRulesService;

    @GetMapping("/{filename}")
    public ResponseEntity<JsonResponseDto> getRules(@PathVariable String filename) {
        try {
            String content = alertRulesService.readAlertRules(filename);
            log.info("Enviando respuesta con contenido de longitud: {}", content.length());
            return ResponseEntity.ok(new JsonResponseDto(true, HttpStatus.OK.value(), "Reglas obtenidas con éxito.", content));
        } catch (Exception e) {
            log.error("Error inesperado al obtener las reglas: {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new JsonResponseDto(false, HttpStatus.INTERNAL_SERVER_ERROR.value(), "Error inesperado al obtener las reglas.", null));
        }
    }


    @PutMapping(value = "/{filename}", consumes = "application/json")
    public ResponseEntity<JsonResponseDto> updateRules(@PathVariable String filename, @RequestBody Map<String, String> body) {
        try {
            String yamlContent = body.get("yamlContent");
            alertRulesService.updateAlertRules(filename, yamlContent);
            // restart alertmanager container
            DockerCommandUtil.restartContainer("container-alertmanager-1");
            // restart alertmanager container
            DockerCommandUtil.restartContainer("container-prometheus-1");

            log.error("Se reinicio el contenedor de alertmanager y prometheus");
            return ResponseEntity.ok(new JsonResponseDto(true, HttpStatus.OK.value(), "Reglas actualizadas con éxito.", null));
        } catch (Exception e) {
            log.error("Error al actualizar las reglas: {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new JsonResponseDto(false, HttpStatus.INTERNAL_SERVER_ERROR.value(), "Error al actualizar las reglas.", null));
        }
    }

}
