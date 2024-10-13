package ec.edu.espe.security.monitoring.controllers.grafana;

import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@RestController
@RequestMapping("api/v1/grafana")
public class GrafanaLoginController {
    @PostMapping("/grafana-login")
    public ResponseEntity<String> loginToGrafana() {
        String url = "http://localhost:3000/login";
        String username = "anyel";
        String password = "anyel";

        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        // Create the request body as JSON
        String body = String.format("{\"user\":\"%s\", \"password\":\"%s\"}", username, password);

        HttpEntity<String> request = new HttpEntity<>(body, headers);

        try {
            ResponseEntity<String> response = restTemplate.postForEntity(url, request, String.class);

            //  Extract the session cookies from the login response
            HttpHeaders responseHeaders = response.getHeaders();
            List<String> cookies = responseHeaders.get("Set-Cookie");

            // Return the cookies or use them to redirect to a dashboard
            return ResponseEntity.ok("Login exitoso con cookies: " + cookies);
        } catch (HttpClientErrorException e) {
            return ResponseEntity.status(e.getStatusCode()).body("Error: " + e.getResponseBodyAsString());
        }
    }



    @GetMapping("/access-dashboard-with-session")
    public void accessDashboardWithSession(HttpServletResponse response) {
        String grafanaUrl = "http://localhost:3000/d/000000039/postgresql-database?orgId=1&refresh=10s";

        // Insert the session cookies obtained from the login request
        String sessionCookie = "grafana_session=670bd793b49a47cff4f03951a597b43f; Path=/; HttpOnly; SameSite=Lax";
        String sessionExpiryCookie = "grafana_session_expiry=1728779554; Path=/; SameSite=Lax";

        // Add the cookies to the headers
        response.addHeader("Set-Cookie", sessionCookie);
        response.addHeader("Set-Cookie", sessionExpiryCookie);

        // Redirect to the dashboard
        response.setStatus(HttpServletResponse.SC_FOUND);
        response.setHeader("Location", grafanaUrl);
    }


}
