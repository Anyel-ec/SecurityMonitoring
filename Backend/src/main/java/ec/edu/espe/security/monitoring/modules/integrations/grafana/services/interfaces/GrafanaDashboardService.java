package ec.edu.espe.security.monitoring.modules.integrations.grafana.services.interfaces;

import ec.edu.espe.security.monitoring.modules.integrations.grafana.dto.GrafanaDashboardRequestDto;

public interface GrafanaDashboardService {
    void createDashboard();
    void createDashboardFromJson(GrafanaDashboardRequestDto dashboardRequestDto);
}
