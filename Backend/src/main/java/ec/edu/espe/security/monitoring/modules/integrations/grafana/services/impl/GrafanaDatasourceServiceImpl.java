package ec.edu.espe.security.monitoring.modules.integrations.grafana.services.impl;

import ec.edu.espe.security.monitoring.modules.integrations.grafana.dto.PrometheusDatasourceRequestDto;
import ec.edu.espe.security.monitoring.modules.features.installation.models.InstallationConfig;
import ec.edu.espe.security.monitoring.modules.core.initializer.models.SystemParameters;
import ec.edu.espe.security.monitoring.modules.integrations.grafana.services.interfaces.GrafanaDatasourceService;
import ec.edu.espe.security.monitoring.modules.features.installation.services.interfaces.PrometheusInstallService;
import ec.edu.espe.security.monitoring.common.encrypt.utils.AesEncryptorUtil;
import ec.edu.espe.security.monitoring.modules.integrations.grafana.utils.GrafanaCredentialUtil;
import ec.edu.espe.security.monitoring.modules.integrations.grafana.utils.GrafanaUrlUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.jetbrains.annotations.NotNull;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
@Slf4j
@RequiredArgsConstructor
public class GrafanaDatasourceServiceImpl implements GrafanaDatasourceService {
    // Dependency Injected
    private final PrometheusInstallService prometheusInstallService;
    private final GrafanaCredentialUtil grafanaCredentialService;
    private final AesEncryptorUtil aesEncryptor;
    private final GrafanaUrlUtil grafanaUrlUtil;

    public String createPrometheusDatasource() {
        try {
            SystemParameters systemParameter = grafanaCredentialService.getGrafanaInstallParameter();
            InstallationConfig grafanaInstall = grafanaCredentialService.getActiveInstallationConfig(systemParameter);
            String username = grafanaInstall.getUsername();
            String decryptedPassword = aesEncryptor.decrypt(grafanaInstall.getPassword());

            PrometheusDatasourceRequestDto datasourceDto = getPrometheusDatasourceDto();

            RestTemplate restTemplate = new RestTemplate();

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            headers.setBasicAuth(username, decryptedPassword);

            HttpEntity<PrometheusDatasourceRequestDto> entity = new HttpEntity<>(datasourceDto, headers);

            ResponseEntity<String> response = restTemplate.exchange(
                    grafanaUrlUtil.getGrafanaBaseUrl() + "/api/datasources",
                    HttpMethod.POST,
                    entity,
                    String.class
            );
            log.info("Datasource created successfully");
            return response.getBody();

        } catch (Exception e) {
            throw new IllegalStateException("Error creating the datasource in Grafana", e);
        }
    }

    @NotNull
    private PrometheusDatasourceRequestDto getPrometheusDatasourceDto() {
        InstallationConfig prometheusConfig = prometheusInstallService.getPrometheusInstall();

        // Set up the DTO with the required properties
        return new PrometheusDatasourceRequestDto(
                "prometheus",  // Name
                "prometheus",  // Type
                String.format("http://prometheus:%s", prometheusConfig.getInternalPort()),  // URL
                "proxy",       // Access
                false,         // Basic Auth
                true           // Is Default
        );
    }

}
