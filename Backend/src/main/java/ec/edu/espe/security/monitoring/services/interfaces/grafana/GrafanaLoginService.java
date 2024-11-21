package ec.edu.espe.security.monitoring.services.interfaces.grafana;

import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface GrafanaLoginService {
    ResponseEntity<String> loginToGrafana();

    void accessDashboardWithSession(HttpServletResponse response);

    String getGrafanaDashboardUrlWithSession();
    List<String> getGrafanaCookies();

    String getGrafanaDashboardUrlByDbType(String dbType);

}
