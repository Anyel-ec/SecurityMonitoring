package ec.edu.espe.security.monitoring.modules.integrations.grafana.services.interfaces;

import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface GrafanaLoginService {
    ResponseEntity<String> loginToGrafana();

    void accessDashboardWithSession(HttpServletResponse response);

    List<String> getGrafanaCookies();


    String getGrafanaDashboardUrlByDbType();
}
