package ec.edu.espe.security.monitoring.services.interfaces.grafana;

import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.ResponseEntity;

public interface GrafanaLoginService {
    ResponseEntity<String> loginToGrafana();
    void accessDashboardWithSession(HttpServletResponse response);
}
