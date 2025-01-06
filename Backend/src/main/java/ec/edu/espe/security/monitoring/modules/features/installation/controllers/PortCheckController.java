package ec.edu.espe.security.monitoring.modules.features.installation.controllers;

/*
 * Author: Anyel EC
 * Github: https://github.com/Anyel-ec
 * Creation date: 03/01/2025
 */

import ec.edu.espe.security.monitoring.common.dto.JsonResponseDto;
import ec.edu.espe.security.monitoring.modules.features.installation.services.interfaces.PortCheckService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("api/v1/test")
public class PortCheckController {

    private final PortCheckService portCheckService;

    @GetMapping("/port/check/{port}")
    public ResponseEntity<JsonResponseDto> isPortInUse(@PathVariable int port) {
        try {
            boolean isInUse = portCheckService.isPortInUse(port);
            String message = isInUse ? "El puerto está en uso." : "El puerto está disponible.";
            JsonResponseDto response = new JsonResponseDto(!isInUse, 200, message, isInUse);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            log.error("Error al verificar el puerto {}: {}", port, e.getMessage());
            JsonResponseDto response = new JsonResponseDto(false, 500, "Error interno al verificar el puerto.", null);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @GetMapping("/port-docker/check/{port}")
    public ResponseEntity<JsonResponseDto> isPortDockerInUse(@PathVariable int port) {
        try {
            boolean isInUse = portCheckService.isPortDockerInUse(port);
            String message = isInUse ? "El puerto está en uso." : "El puerto está disponible.";
            JsonResponseDto response = new JsonResponseDto(!isInUse, 200, message, isInUse);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            log.error("Error al verificar el puerto: {}: {}", port, e.getMessage());
            JsonResponseDto response = new JsonResponseDto(false, 500, "Error interno al verificar el puerto.", null);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @GetMapping("/port-docker/used")
    public ResponseEntity<JsonResponseDto> getUsedDockerPorts() {
        try {
            List<Integer> usedPorts = portCheckService.getUsedDockerPorts();
            String message = usedPorts.isEmpty() ? "No se encontraron puertos en uso en Docker."
                    : "Puertos en uso obtenidos con éxito.";
            JsonResponseDto response = new JsonResponseDto(true, 200, message, usedPorts);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            log.error("Error al obtener los puertos usados de Docker: {}", e.getMessage());
            JsonResponseDto response = new JsonResponseDto(false, 500, "Error interno al obtener puertos usados.", null);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

}
