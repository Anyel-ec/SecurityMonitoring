package ec.edu.espe.security.monitoring.modules.features.installation.services.interfaces;

import ec.edu.espe.security.monitoring.modules.features.installation.dto.ExporterPrometheusInstallRequestDto;
/*
 * Author: Anyel EC
 * Github: https://github.com/Anyel-ec
 * Creation date: 04/11/2024
 */
public interface PrometheusExporterInstallService {
    void saveOrUpdatePrometheusExporters(ExporterPrometheusInstallRequestDto requestDto);

}
