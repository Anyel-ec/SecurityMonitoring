package ec.edu.espe.security.monitoring.modules.integrations.test.controllers;

/*
 * Author: Anyel EC
 * Github: https://github.com/Anyel-ec
 * Creation date: 03/01/2025
 */

import ec.edu.espe.security.monitoring.shared.dto.JsonResponseDto;
import ec.edu.espe.security.monitoring.modules.integrations.test.services.interfaces.PortCheckService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
}
