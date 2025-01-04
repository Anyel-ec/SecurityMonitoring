package ec.edu.espe.security.monitoring.feature.grafana.services.impl;

import ec.edu.espe.security.monitoring.feature.grafana.dto.PrometheusDatasourceRequestDto;
import ec.edu.espe.security.monitoring.feature.installation.models.InstallationConfig;
import ec.edu.espe.security.monitoring.common.system.models.SystemParameters;
import ec.edu.espe.security.monitoring.feature.grafana.services.interfaces.GrafanaDatasourceService;
import ec.edu.espe.security.monitoring.feature.installation.services.interfaces.PrometheusInstallService;
import ec.edu.espe.security.monitoring.common.encrypt.utils.AesEncryptorUtil;
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
    private final GrafanaCredentialServiceImpl grafanaCredentialService;
    private final AesEncryptorUtil aesEncryptor;

    private static final String GRAFANA_API_URL = "http://localhost:3000/api/datasources";

    public String createPrometheusDatasource() {
        try {
            // Obtain the Prometheus installation configuration
            SystemParameters systemParameter = grafanaCredentialService.getGrafanaInstallParameter();
            InstallationConfig grafanaInstall = grafanaCredentialService.getActiveInstallationConfig(systemParameter);
            String username = grafanaInstall.getUsername(); // Grafana username
            String decryptedPassword = aesEncryptor.decrypt(grafanaInstall.getPassword()); // Decrypt Grafana password

            PrometheusDatasourceRequestDto datasourceDto = getPrometheusDatasourceDto();

            // Create the RestTemplate client to send the POST request
            RestTemplate restTemplate = new RestTemplate();

            // Create the request headers
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            headers.setBasicAuth(username, decryptedPassword); // Set Basic Authentication

            // Set up the request body and headers
            HttpEntity<PrometheusDatasourceRequestDto> entity = new HttpEntity<>(datasourceDto, headers);

            // Send the POST request to the Grafana endpoint
            ResponseEntity<String> response = restTemplate.exchange(
                    GRAFANA_API_URL, // The endpoint for creating the datasource
                    HttpMethod.POST,
                    entity,
                    String.class
            );
            log.info("se creo el datasource");
            // Return the obtained response
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
