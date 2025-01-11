package ec.edu.espe.security.monitoring.common.interceptors;

import ec.edu.espe.security.monitoring.common.dto.JsonResponseDto;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/*
 * Author: Anyel EC
 * Github: https://github.com/Anyel-ec
 * Creation date: 10/01/2025
 */
@RestController
@RequestMapping("/api/test")
public class TestController {

    @GetMapping("/timeout")
    public JsonResponseDto simulateLongRunningTask() throws InterruptedException {
        Thread.sleep(20000); // Simulación de un proceso largo (20 segundos, debería fallar)
        return new JsonResponseDto(true, 200, "Proceso completado exitosamente", null);
    }

    @GetMapping("/fast")
    public JsonResponseDto simulateFastTask() {
        return new JsonResponseDto(true, 200, "Respuesta rápida completada", null);
    }
}
