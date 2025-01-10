package ec.edu.espe.security.monitoring.modules.integrations.grafana.controllers;

import ec.edu.espe.security.monitoring.common.dto.JsonResponseDto;
import ec.edu.espe.security.monitoring.modules.integrations.grafana.services.interfaces.GrafanaLoginService;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RequiredArgsConstructor
@Slf4j
@RestController
@RequestMapping("api/v1/grafana")
public class GrafanaLoginDashboardController {

    private final GrafanaLoginService grafanaLoginService;

    /**
     * Endpoint to log in to Grafana and redirect to the dashboard with session details.
     *
     * @param response HttpServletResponse for managing cookies and redirection headers.
     * @return ResponseEntity containing a JSON response with the redirection URL or an error message.
     */
    @GetMapping("/grafana-login-and-access-dashboard")
    public ResponseEntity<JsonResponseDto> loginAndAccessDashboard(HttpServletResponse response) {
        log.info("Entró al login de Grafana verificando credenciales almacenadas.");

        ResponseEntity<String> loginResponse = grafanaLoginService.loginToGrafana();

        if (loginResponse.getStatusCode().is2xxSuccessful()) {
            String grafanaUrl = grafanaLoginService.getGrafanaDashboardUrlByDbType();

            if (grafanaUrl == null) {
                return ResponseEntity.status(HttpServletResponse.SC_BAD_REQUEST)
                        .body(new JsonResponseDto(false, 400, "No se encontraron bases de datos activas.", null));
            }

            HttpHeaders headers = new HttpHeaders();
            log.info("Antes del seteo de cookies");
            grafanaLoginService.getGrafanaCookies().forEach(cookie -> headers.add(HttpHeaders.SET_COOKIE, cookie));
            log.info("Después del seteo de cookies");
            headers.add("Access-Control-Expose-Headers", "Set-Cookie");

            return ResponseEntity.ok()
                    .headers(headers)
                    .body(new JsonResponseDto(true, 200, "Login exitoso, redirigiendo al dashboard", Map.of("redirectUrl", grafanaUrl)));
        } else {
            return ResponseEntity.status(HttpServletResponse.SC_UNAUTHORIZED)
                    .body(new JsonResponseDto(false, 401, "Error en el inicio de sesión. No se puede acceder al dashboard.", null));
        }
    }

    /**
     * Endpoint to log in to Grafana.
     *
     * @return ResponseEntity with a string response from the login service.
     */
    @PostMapping("/grafana-login")
    public ResponseEntity<String> loginToGrafana() {
        return grafanaLoginService.loginToGrafana();
    }


    /**
     * Endpoint to access the Grafana dashboard with an existing session.
     *
     * @param response HttpServletResponse to manage the response handling for dashboard access.
     */
    @GetMapping("/access-dashboard-with-session")
    public void accessDashboardWithSession(HttpServletResponse response) {
        grafanaLoginService.accessDashboardWithSession(response);
    }
}