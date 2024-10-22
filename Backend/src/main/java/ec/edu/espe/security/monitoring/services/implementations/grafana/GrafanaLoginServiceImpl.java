package ec.edu.espe.security.monitoring.services.implementations.grafana;
import ec.edu.espe.security.monitoring.models.InstallationConfig;
import ec.edu.espe.security.monitoring.models.SystemParameters;
import ec.edu.espe.security.monitoring.services.interfaces.grafana.GrafanaLoginService;
import ec.edu.espe.security.monitoring.utils.AesEncryptor;
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
@Slf4j
@RequiredArgsConstructor
@Service
public class GrafanaLoginServiceImpl implements GrafanaLoginService {
    // Dependency injection
    private final GrafanaCredentialServiceImpl grafanaService;
    private final AesEncryptor aesEncryptor;

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
        String grafanaUrl = "http://localhost:3000/d/000000039/postgresql-database?orgId=1&refresh=10s";
        if (grafanaCookies != null) {
            grafanaCookies.forEach(cookie -> response.addHeader(SET_COOKIE, cookie));
        }
        response.setStatus(HttpServletResponse.SC_FOUND);
        response.setHeader("Location", grafanaUrl);
    }



    private ResponseEntity<String> performLoginRequest(String username, String decryptedPassword) {
        String url = "http://localhost:3000/login";
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        String body = String.format("{\"user\":\"%s\", \"password\":\"%s\"}", username, decryptedPassword);
        HttpEntity<String> request = new HttpEntity<>(body, headers);

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

    private boolean cookiesAreInvalid() {
        return grafanaCookies == null || grafanaCookies.isEmpty();
    }
}