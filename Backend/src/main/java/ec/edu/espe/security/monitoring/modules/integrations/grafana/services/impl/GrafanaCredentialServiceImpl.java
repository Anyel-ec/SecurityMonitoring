package ec.edu.espe.security.monitoring.modules.integrations.grafana.services.impl;

import ec.edu.espe.security.monitoring.modules.features.installation.models.InstallationConfig;
import ec.edu.espe.security.monitoring.modules.core.initializer.models.SystemParameters;
import ec.edu.espe.security.monitoring.modules.features.installation.repositories.InstallationConfigRepository;
import ec.edu.espe.security.monitoring.modules.core.initializer.repositories.SystemParametersRepository;
import ec.edu.espe.security.monitoring.modules.integrations.grafana.services.interfaces.GrafanaCredentialService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class GrafanaCredentialServiceImpl implements GrafanaCredentialService {

    private final InstallationConfigRepository installationConfigRepository;
    private final SystemParametersRepository systemParametersRepository;

    public SystemParameters getGrafanaInstallParameter() {
        return systemParametersRepository
                .findByNameAndIsActiveTrue("GRAFANA_INSTALL")
                .orElseThrow(() -> new IllegalArgumentException("GRAFANA_INSTALL parameter not found"));
    }

    public InstallationConfig getActiveInstallationConfig(SystemParameters systemParameter) {
        return installationConfigRepository
                .findFirstBySystemParameterAndIsActiveTrue(systemParameter)
                .orElseThrow(() -> new IllegalArgumentException("No active installation found for GRAFANA_INSTALL"));
    }
}