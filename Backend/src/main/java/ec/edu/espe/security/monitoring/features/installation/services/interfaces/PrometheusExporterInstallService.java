package ec.edu.espe.security.monitoring.features.installation.services.interfaces;

import ec.edu.espe.security.monitoring.features.installation.dto.ExporterPrometheusInstallRequestDto;

public interface PrometheusExporterInstallService {
    void saveOrUpdatePrometheusExporters(ExporterPrometheusInstallRequestDto requestDto);

}
