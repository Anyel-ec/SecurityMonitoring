package ec.edu.espe.security.monitoring.controllers.grafana;

import ec.edu.espe.security.monitoring.services.interfaces.grafana.GrafanaLoginService;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
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
    public void loginAndAccessDashboard(HttpServletResponse response) {
        // Log in to Grafana
        ResponseEntity<String> loginResponse = grafanaLoginService.loginToGrafana();

        // If login is successful, redirect to the dashboard
        if (loginResponse.getStatusCode().is2xxSuccessful()) {
            grafanaLoginService.accessDashboardWithSession(response);
        } else {
            // Handle login failure by sending an error response
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.setHeader("Content-Type", "application/json");
            try {
                response.getWriter().write("{\"error\":\"Login failed. Cannot access dashboard.\"}");
            } catch (Exception e) {
                log.error("Error: {}", e.getMessage());
            }
        }
    }

}
