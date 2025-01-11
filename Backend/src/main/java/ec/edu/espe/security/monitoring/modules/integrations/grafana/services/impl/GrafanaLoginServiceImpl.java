package ec.edu.espe.security.monitoring.modules.integrations.grafana.services.impl;
import ec.edu.espe.security.monitoring.common.enums.DatabaseTypeEnum;
import ec.edu.espe.security.monitoring.modules.features.credential.models.DatabaseCredential;
import ec.edu.espe.security.monitoring.modules.features.credential.repositories.DatabaseCredentialRepository;
import ec.edu.espe.security.monitoring.modules.integrations.grafana.dto.GrafanaLoginRequestDto;
import ec.edu.espe.security.monitoring.modules.features.installation.models.InstallationConfig;
import ec.edu.espe.security.monitoring.modules.core.initializer.models.SystemParameters;
import ec.edu.espe.security.monitoring.modules.integrations.grafana.services.interfaces.GrafanaLoginService;
import ec.edu.espe.security.monitoring.common.encrypt.utils.AesEncryptorUtil;
import ec.edu.espe.security.monitoring.modules.integrations.grafana.utils.GrafanaCredentialUtil;
import ec.edu.espe.security.monitoring.modules.integrations.grafana.utils.GrafanaUrlUtil;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Slf4j
@RequiredArgsConstructor
@Service
public class GrafanaLoginServiceImpl implements GrafanaLoginService {
    // Dependency injection
    private final GrafanaCredentialUtil grafanaService;
    private final AesEncryptorUtil aesEncryptor;
    private final DatabaseCredentialRepository databaseCredentialRepository;
    private final GrafanaUrlUtil grafanaUrlUtil;
    // Const
    private static final String SET_COOKIE = "Set-Cookie";

    // Value injection
    @Value("${cookies.expiration.time.hours}")
    private int cookieExpirationTimeHours;


    // Variable to store cookies dynamically
    private List<String> grafanaCookies;

    @Override
    public ResponseEntity<String> loginToGrafana() {
        try {
            SystemParameters systemParameter = grafanaService.getGrafanaInstallParameter();
            InstallationConfig grafanaInstall = grafanaService.getActiveInstallationConfig(systemParameter);
            String username = grafanaInstall.getUsername();
            String decryptedPassword = aesEncryptor.decrypt(grafanaInstall.getPassword());

            ResponseEntity<String> response = performLoginRequest(username, decryptedPassword);
            grafanaCookies = extractCookiesFromResponse(response);

            if (cookiesAreInvalid()) {
                return ResponseEntity.status(HttpServletResponse.SC_UNAUTHORIZED)
                        .body("Login failed: No session cookies available. Please try again.");
            }

            updateCookiesWithSecurityAttributes();
            return ResponseEntity.ok("Login exitoso con cookies: " + grafanaCookies);

        } catch (HttpClientErrorException e) {
            return ResponseEntity.status(e.getStatusCode()).body("Error: " + e.getResponseBodyAsString());
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error interno: " + e.getMessage());
        }
    }

    @Override
    public void accessDashboardWithSession(HttpServletResponse response) {
        String grafanaUrl = getGrafanaDashboardUrlByDbType();

        if (grafanaCookies != null) {
            grafanaCookies.forEach(cookie -> response.addHeader(SET_COOKIE, cookie));
        }
        response.setStatus(HttpServletResponse.SC_FOUND);
        response.setHeader("Location", grafanaUrl);
    }

    private ResponseEntity<String> performLoginRequest(String username, String decryptedPassword) {
        String url = grafanaUrlUtil.getGrafanaBaseUrl() + "/login";
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        GrafanaLoginRequestDto loginRequest = new GrafanaLoginRequestDto(username, decryptedPassword);
        log.info("El usuario es{} y la contra es {}", username, decryptedPassword);
        HttpEntity<GrafanaLoginRequestDto> request = new HttpEntity<>(loginRequest, headers);

        return restTemplate.postForEntity(url, request, String.class);
    }

    private void updateCookiesWithSecurityAttributes() {
        grafanaCookies = grafanaCookies.stream()
                .map(cookie -> cookie
                        .replace("Max-Age=2592000", "Max-Age=" + (cookieExpirationTimeHours * 3600)) // Set expiration time
                        .concat("; HttpOnly") // Add HttpOnly flag
                        .concat("; Secure") // Add Secure flag (works with HTTPS)
                        .concat("; SameSite=Lax")) // Add SameSite attribute
                .toList();
    }

    private List<String> extractCookiesFromResponse(ResponseEntity<String> response) {
        HttpHeaders responseHeaders = response.getHeaders();
        return responseHeaders.get(SET_COOKIE);
    }

    @Override
    public String getGrafanaDashboardUrlByDbType() {
        List<DatabaseCredential> activeCredentials = databaseCredentialRepository.findByIsActiveTrue();

        Set<DatabaseTypeEnum> dbTypes = activeCredentials.stream()
                .map(credential -> DatabaseTypeEnum.fromString(credential.getSystemParameter().getName()))
                .collect(Collectors.toSet());

        if (dbTypes.containsAll(Set.of(DatabaseTypeEnum.POSTGRESQL, DatabaseTypeEnum.MARIADB, DatabaseTypeEnum.MONGODB))) {
            return grafanaUrlUtil.getGrafanaBaseUrl() + "/d/fe6hmwui4a134b";
        } else if (dbTypes.containsAll(Set.of(DatabaseTypeEnum.POSTGRESQL, DatabaseTypeEnum.MARIADB))) {
            return grafanaUrlUtil.getGrafanaBaseUrl() + "/d/be8l1909phr0gf";
        } else if (dbTypes.containsAll(Set.of(DatabaseTypeEnum.POSTGRESQL, DatabaseTypeEnum.MONGODB))) {
            return grafanaUrlUtil.getGrafanaBaseUrl() + "/d/fe6hmwui4a134baa";
        } else if (dbTypes.containsAll(Set.of(DatabaseTypeEnum.MARIADB, DatabaseTypeEnum.MONGODB))) {
            return grafanaUrlUtil.getGrafanaBaseUrl() + "/d/de8jbw8ix4ow0c21";
        } else if (dbTypes.contains(DatabaseTypeEnum.POSTGRESQL)) {
            return grafanaUrlUtil.getGrafanaBaseUrl() + "/d/000000039/postgresql-database";
        } else if (dbTypes.contains(DatabaseTypeEnum.MARIADB)) {
            return grafanaUrlUtil.getGrafanaBaseUrl() + "/d/r4uc0hUGk/mysql-dashboard";
        } else if (dbTypes.contains(DatabaseTypeEnum.MONGODB)) {
            return grafanaUrlUtil.getGrafanaBaseUrl() + "/d/fe5usr0w1cglcb/mongodb";
        } else {
            return null;
        }
    }

    @Override
    public List<String> getGrafanaCookies() {
        return grafanaCookies;
    }

    private boolean cookiesAreInvalid() {
        return grafanaCookies == null || grafanaCookies.isEmpty();
    }
}