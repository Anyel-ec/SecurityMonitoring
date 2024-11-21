package ec.edu.espe.security.monitoring.controllers.grafana;

import ec.edu.espe.security.monitoring.dto.response.JsonResponseDto;
import ec.edu.espe.security.monitoring.services.interfaces.grafana.GrafanaLoginService;
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
    public ResponseEntity<JsonResponseDto> loginAndAccessDashboard(
            @RequestParam("dbType") String dbType,
            HttpServletResponse response) {
        log.info("Entró al login de Grafana con base de datos: {}", dbType);

        ResponseEntity<String> loginResponse = grafanaLoginService.loginToGrafana();

        if (loginResponse.getStatusCode().is2xxSuccessful()) {
            // Get the appropriate Grafana dashboard URL based on dbType
            String grafanaUrl = grafanaLoginService.getGrafanaDashboardUrlByDbType(dbType);

            if (grafanaUrl == null) {
                return ResponseEntity.status(HttpServletResponse.SC_BAD_REQUEST)
                        .body(new JsonResponseDto(false, 400, "Base de datos no soportada.", null));
            }


            HttpHeaders headers = new HttpHeaders();
            log.info("Antes del cookies");
            // Add cookies to the response
            grafanaLoginService.getGrafanaCookies().forEach(cookie -> headers.add(HttpHeaders.SET_COOKIE, cookie));
            log.info("Despues del cookies");
            headers.add("Access-Control-Expose-Headers", "Set-Cookie");

            // Return the redirection URL in a JsonResponseDto
            return ResponseEntity.ok()
                    .headers(headers)
                    .body(new JsonResponseDto(true, 200, "Login successful, redirecting to dashboard", Map.of("redirectUrl", grafanaUrl)));
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