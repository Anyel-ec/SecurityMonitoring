package ec.edu.espe.security.monitoring.controllers.grafana;

import ec.edu.espe.security.monitoring.services.interfaces.grafana.GrafanaLoginService;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RequiredArgsConstructor
@Slf4j
@RestController
@RequestMapping("api/v1/grafana")
public class GrafanaLoginController {

    private final GrafanaLoginService grafanaLoginService;

    @PostMapping("/grafana-login")
    public ResponseEntity<String> loginToGrafana() {
        return grafanaLoginService.loginToGrafana();
    }

    @GetMapping("/access-dashboard-with-session")
    public void accessDashboardWithSession(HttpServletResponse response) {
        grafanaLoginService.accessDashboardWithSession(response);
    }

    @GetMapping("/grafana-login-and-access-dashboard")
    public ResponseEntity<?> loginAndAccessDashboard(HttpServletResponse response) {
        log.info("Entró al login de Grafana");
        ResponseEntity<String> loginResponse = grafanaLoginService.loginToGrafana();

        if (loginResponse.getStatusCode().is2xxSuccessful()) {
            String grafanaUrl = grafanaLoginService.getGrafanaDashboardUrlWithSession();
            HttpHeaders headers = new HttpHeaders();

            // Agrega las cookies a la respuesta
            grafanaLoginService.getGrafanaCookies().forEach(cookie -> headers.add(HttpHeaders.SET_COOKIE, cookie));

            headers.add("Access-Control-Expose-Headers", "Set-Cookie");

            return ResponseEntity.ok()
                    .headers(headers)
                    .body(Map.of("redirectUrl", grafanaUrl));
        } else {
            return ResponseEntity.status(HttpServletResponse.SC_UNAUTHORIZED)
                    .body(Map.of("error", "Error en el inicio de sesión. No se puede acceder al dashboard."));
        }
    }



}
