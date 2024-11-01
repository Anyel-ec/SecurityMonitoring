package ec.edu.espe.security.monitoring.services.impl.grafana;
import ec.edu.espe.security.monitoring.models.InstallationConfig;
import ec.edu.espe.security.monitoring.models.SystemParameters;
import ec.edu.espe.security.monitoring.services.interfaces.grafana.GrafanaDashboardService;
import ec.edu.espe.security.monitoring.utils.AesEncryptorUtil;
import ec.edu.espe.security.monitoring.utils.JsonUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Slf4j
@RequiredArgsConstructor
@Service
public class GrafanaDashboardServiceImpl implements GrafanaDashboardService {
    private final GrafanaCredentialServiceImpl grafanaService;
    private final AesEncryptorUtil aesEncryptor;
    private final JsonUtils jsonUtils;

    private static final String GRAFANA_API_URL = "http://localhost:3000/api/dashboards/db"; // Grafana API endpoint
    private static final String DASHBOARD_JSON_FILE_POSTGRES = "dashboardPostgres.json"; // Path to the JSON file in resources

    /**
     * Creates a Grafana dashboard using the predefined JSON file located in resources/dashboards/dash_pg_v1.json.
     */
    @Override
    public void createDashboard() {
        try {
            // Retrieve Grafana user and password from the system configuration
            SystemParameters systemParameter = grafanaService.getGrafanaInstallParameter();
            InstallationConfig grafanaInstall = grafanaService.getActiveInstallationConfig(systemParameter);
            String username = grafanaInstall.getUsername(); // Grafana username
            String decryptedPassword = aesEncryptor.decrypt(grafanaInstall.getPassword()); // Decrypt Grafana password

            // Read the dashboard JSON file
            String dashboardJson = jsonUtils.readJsonFromFileDashboard(DASHBOARD_JSON_FILE_POSTGRES);

            // Send the request to create the dashboard
            ResponseEntity<String> response = performDashboardCreationRequest(username, decryptedPassword, dashboardJson);
            log.info("Dashboard JSON: {}", dashboardJson); // Log the dashboard JSON
            log.info("Grafana response: {}", response.getBody()); // Log the response from Grafana

            // Check if the response status is not successful
            if (!response.getStatusCode().is2xxSuccessful()) {
                log.error("Dashboard creation failed with status: {}", response.getStatusCode());
                throw new IllegalStateException("Dashboard creation failed with status: " + response.getStatusCode());
            }

            log.info("Dashboard created successfully"); // Log success message
        } catch (Exception e) {
            log.error("Error creating the dashboard: {}", e.getMessage());
            throw new IllegalStateException("Internal server error: " + e.getMessage(), e);
        }
    }

    /**
     * Sends a POST request to Grafana to create the dashboard.
     */
    private ResponseEntity<String> performDashboardCreationRequest(String username, String password, String dashboardJson) {
        RestTemplate restTemplate = new RestTemplate(); // REST client for sending HTTP requests
        HttpHeaders headers = new HttpHeaders(); // Create HTTP headers
        headers.setContentType(MediaType.APPLICATION_JSON); // Set content type to JSON
        headers.setBasicAuth(username, password); // Set Basic Authentication using username and password

        // Create the final JSON body for the request
        String requestBody = String.format("{ \"dashboard\": %s, \"folderId\": 0, \"overwrite\": true }", dashboardJson);

        HttpEntity<String> request = new HttpEntity<>(requestBody, headers); // Create the request entity with headers and body

        // Send the POST request to the Grafana API and return the response
        return restTemplate.postForEntity(GRAFANA_API_URL, request, String.class);
    }

}
