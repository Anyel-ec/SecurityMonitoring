package ec.edu.espe.security.monitoring.modules.integrations.grafana.services.impl;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import ec.edu.espe.security.monitoring.modules.integrations.grafana.dto.GrafanaDashboardRequestDto;
import ec.edu.espe.security.monitoring.modules.features.installation.models.InstallationConfig;
import ec.edu.espe.security.monitoring.modules.core.initializer.models.SystemParameters;
import ec.edu.espe.security.monitoring.modules.integrations.grafana.services.interfaces.GrafanaDashboardService;
import ec.edu.espe.security.monitoring.common.encrypt.utils.AesEncryptorUtil;
import ec.edu.espe.security.monitoring.modules.integrations.grafana.utils.JsonUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import javax.crypto.BadPaddingException;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.NoSuchPaddingException;
import java.security.InvalidAlgorithmParameterException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.util.Map;

@Slf4j
@RequiredArgsConstructor
@Service
public class GrafanaDashboardServiceImpl implements GrafanaDashboardService {
    private final GrafanaCredentialServiceImpl grafanaService;
    private final AesEncryptorUtil aesEncryptor;
    private final JsonUtils jsonUtils;

    // TODO: URL dynamic
    private static final String GRAFANA_API_URL = "http://localhost:3000/api/dashboards/db"; // Grafana API endpoint

    /**
     * Creates a Grafana dashboard using the predefined JSON file located in resources/dashboards/dash_pg_v1.json.
     */
    @Override
    public void createDashboard() {
        try {
            // Retrieve Grafana credentials
            SystemParameters systemParameter = grafanaService.getGrafanaInstallParameter();
            InstallationConfig grafanaInstall = grafanaService.getActiveInstallationConfig(systemParameter);
            String username = grafanaInstall.getUsername();
            String decryptedPassword = aesEncryptor.decrypt(grafanaInstall.getPassword());

            // Create dashboards
            createDashboardFromJsonFile(username, decryptedPassword, "dashboardPostgres.json");
            createDashboardFromJsonFile(username, decryptedPassword, "dashboardMaria.json");
            createDashboardFromJsonFile(username, decryptedPassword, "dashboardMongo.json");
            createDashboardFromJsonFile(username, decryptedPassword, "dashboardPostgresMariaMongo.json");
            createDashboardFromJsonFile(username, decryptedPassword, "dashboardMariaMongo.json");
            createDashboardFromJsonFile(username, decryptedPassword, "dashboardMariaPostgres.json");
            createDashboardFromJsonFile(username, decryptedPassword, "dashboardMongoPostgres.json");

        } catch (Exception e) {
            log.error("Error creando los dashboards: {}", e.getMessage());
            throw new IllegalStateException("Internal server error: " + e.getMessage(), e);
        }
    }

    public void createDashboardFromJson(GrafanaDashboardRequestDto dashboardRequestDto) {
        try {
            SystemParameters systemParameter = grafanaService.getGrafanaInstallParameter();
            InstallationConfig grafanaInstall = grafanaService.getActiveInstallationConfig(systemParameter);
            String username = grafanaInstall.getUsername();
            String decryptedPassword = aesEncryptor.decrypt(grafanaInstall.getPassword());

            // convert
            String dashboardJson = new ObjectMapper().writeValueAsString(dashboardRequestDto.getDashboard());

            // send the request to create the dashboard
            ResponseEntity<String> response = performDashboardCreationRequest(username, decryptedPassword, dashboardJson);

            if (!response.getStatusCode().is2xxSuccessful()) {
                throw new IllegalStateException("Error al crear el dashboard: " + response.getStatusCode());
            }
        } catch (JsonProcessingException e) {
            throw new IllegalArgumentException("El formato del JSON es inválido", e);
        } catch (InvalidAlgorithmParameterException e) {
            throw new RuntimeException(e);
        } catch (NoSuchPaddingException e) {
            throw new RuntimeException(e);
        } catch (IllegalBlockSizeException e) {
            throw new RuntimeException(e);
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException(e);
        } catch (BadPaddingException e) {
            throw new RuntimeException(e);
        } catch (InvalidKeyException e) {
            throw new RuntimeException(e);
        }
    }


    private void createDashboardFromJsonFile(String username, String password, String dashboardJsonFile) {
        try {
            // Read the JSON file for the dashboard
            String dashboardJson = jsonUtils.readJsonFromFileDashboard(dashboardJsonFile);

            // Send the request to create the dashboard
            ResponseEntity<String> response = performDashboardCreationRequest(username, password, dashboardJson);
            log.info("Grafana response for {}: {}", dashboardJsonFile, response.getBody());

            // Check if the response is not successful
            if (!response.getStatusCode().is2xxSuccessful()) {
                log.error("Dashboard creation failed for {} with status: {}", dashboardJsonFile, response.getStatusCode());
                throw new IllegalStateException("Dashboard creation failed for " + dashboardJsonFile + " with status: " + response.getStatusCode());
            }

            log.info("Dashboard {} created successfully", dashboardJsonFile);
        } catch (Exception e) {
            log.error("Error creating the dashboard {}: {}", dashboardJsonFile, e.getMessage());
            throw new IllegalStateException("Error creating the dashboard " + dashboardJsonFile + ": " + e.getMessage(), e);
        }
    }


    /**
     * Sends a POST request to Grafana to create the dashboard.
     */
    private ResponseEntity<String> performDashboardCreationRequest(String username, String password, String dashboardJson) {
        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBasicAuth(username, password);

        // Create DTO
        GrafanaDashboardRequestDto dashboardRequestDto = new GrafanaDashboardRequestDto(parseDashboardJson(dashboardJson), 0, true);

        HttpEntity<GrafanaDashboardRequestDto> request = new HttpEntity<>(dashboardRequestDto, headers);

        return restTemplate.postForEntity(GRAFANA_API_URL, request, String.class);
    }

    private Map<String, Object> parseDashboardJson(String dashboardJson) {
        try {
            return new ObjectMapper().readValue(dashboardJson, new TypeReference<>() {
            });
        } catch (JsonProcessingException e) {
            throw new IllegalStateException("Invalid JSON format for dashboard", e);
        }
    }

}
