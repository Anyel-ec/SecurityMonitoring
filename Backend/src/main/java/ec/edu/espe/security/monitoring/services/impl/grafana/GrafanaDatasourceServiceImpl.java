package ec.edu.espe.security.monitoring.services.impl.grafana;

import ec.edu.espe.security.monitoring.models.InstallationConfig;
import ec.edu.espe.security.monitoring.models.SystemParameters;
import ec.edu.espe.security.monitoring.services.interfaces.grafana.GrafanaDatasourceService;
import ec.edu.espe.security.monitoring.services.interfaces.installation.PrometheusInstallService;
import ec.edu.espe.security.monitoring.utils.AesEncryptorUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
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

            InstallationConfig prometheusConfig = prometheusInstallService.getPrometheusInstall();

            // Create the request body with the Prometheus URL obtained
            String requestBody = String.format(
                    "{\"name\": \"prometheus\", \"type\": \"prometheus\", \"url\": \"http://prometheus:%s\", \"access\": \"proxy\", \"basicAuth\": false, \"isDefault\": true}",
                    prometheusConfig.getInternalPort() // Here the URL is obtained from the config
            );

            // Create the RestTemplate client to send the POST request
            RestTemplate restTemplate = new RestTemplate();

            // Create the request headers
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            headers.setBasicAuth(username, decryptedPassword); // Set Basic Authentication

            // Set up the request body and headers
            HttpEntity<String> entity = new HttpEntity<>(requestBody, headers);

            // Send the POST request to the Grafana endpoint
            ResponseEntity<String> response = restTemplate.exchange(
                    GRAFANA_API_URL, // The endpoint for creating the datasource
                    HttpMethod.POST,
                    entity,
                    String.class
            );

            // Return the obtained response
            return response.getBody();

        } catch (Exception e) {
            throw new IllegalStateException("Error creating the datasource in Grafana", e);
        }
    }


}
