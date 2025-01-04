package ec.edu.espe.security.monitoring.feature.installation.services.interfaces;

import ec.edu.espe.security.monitoring.feature.installation.dto.ExporterPrometheusInstallRequestDto;

public interface PrometheusExporterInstallService {
    void saveOrUpdatePrometheusExporters(ExporterPrometheusInstallRequestDto requestDto);

}
