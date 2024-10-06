package ec.edu.espe.security.monitoring.services.interfaces.installation;

import ec.edu.espe.security.monitoring.dto.request.ExporterPrometheusRequestDto;

public interface PrometheusExporterInstallService {
    void saveOrUpdatePrometheusExporters(ExporterPrometheusRequestDto requestDto);

}
