package ec.edu.espe.security.monitoring.modules.integrations.grafana.utils;

import ec.edu.espe.security.monitoring.modules.core.initializer.models.SystemParameters;
import ec.edu.espe.security.monitoring.modules.features.installation.models.InstallationConfig;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

/*
 * Author: Anyel EC
 * Github: https://github.com/Anyel-ec
 * Creation date: 11/01/2025
 */
@Slf4j
@RequiredArgsConstructor
@Component
public class GrafanaUrlUtil {

    private final GrafanaCredentialUtil grafanaCredentialUtil;

    @Value("${url.server.deploy}")
    private String serverDeployUrl;

    public String getGrafanaBaseUrl() {
        SystemParameters systemParameter = grafanaCredentialUtil.getGrafanaInstallParameter();
        InstallationConfig grafanaInstall = grafanaCredentialUtil.getActiveInstallationConfig(systemParameter);
        return serverDeployUrl + ":" + grafanaInstall.getExternalPort();
    }
}