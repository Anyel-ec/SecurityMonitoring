package ec.edu.espe.security.monitoring.services.implementations.grafana;
import ec.edu.espe.security.monitoring.models.InstallationConfig;
import ec.edu.espe.security.monitoring.models.SystemParameters;
import ec.edu.espe.security.monitoring.repositories.InstallationConfigRepository;
import ec.edu.espe.security.monitoring.repositories.SystemParametersRepository;
import ec.edu.espe.security.monitoring.utils.AesEncryptor;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
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
public class GrafanaLoginServiceImpl {
    private final InstallationConfigRepository installationConfigRepository;
    private final SystemParametersRepository systemParametersRepository;
    private final AesEncryptor aesEncryptor;
    public ResponseEntity<String> loginToGrafana() {
        try {
            // Buscar el parámetro del sistema "GRAFANA_INSTALL"
            SystemParameters systemParameter = systemParametersRepository
                    .findByNameAndIsActiveTrue("GRAFANA_INSTALL")
                    .orElseThrow(() -> new IllegalArgumentException("GRAFANA_INSTALL parameter not found"));

            // Buscar la instalación activa asociada al SystemParameter
            InstallationConfig grafanaInstall = installationConfigRepository
                    .findFirstBySystemParameterAndIsActiveTrue(systemParameter)
                    .orElseThrow(() -> new IllegalArgumentException("No se encontró una instalación activa para GRAFANA_INSTALL"));

            // Obtener el usuario y desencriptar la contraseña
            String username = grafanaInstall.getUsuario();
            String decryptedPassword = aesEncryptor.decrypt(grafanaInstall.getPassword());

            // URL de Grafana para el login
            String url = "http://localhost:3000/login";

            // Configurar RestTemplate y encabezados
            RestTemplate restTemplate = new RestTemplate();
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);

            // Crear el cuerpo de la solicitud como JSON
            String body = String.format("{\"user\":\"%s\", \"password\":\"%s\"}", username, decryptedPassword);
            HttpEntity<String> request = new HttpEntity<>(body, headers);

            // Realizar la solicitud POST a Grafana
            ResponseEntity<String> response = restTemplate.postForEntity(url, request, String.class);

            // Extraer las cookies de sesión de la respuesta
            HttpHeaders responseHeaders = response.getHeaders();
            List<String> cookies = responseHeaders.get("Set-Cookie");

            // Retornar las cookies o usarlas para redirigir al dashboard
            return ResponseEntity.ok("Login exitoso con cookies: " + cookies);
        } catch (HttpClientErrorException e) {
            return ResponseEntity.status(e.getStatusCode()).body("Error: " + e.getResponseBodyAsString());
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error interno: " + e.getMessage());
        }
    }

    public void accessDashboardWithSession(HttpServletResponse response) {
        String grafanaUrl = "http://localhost:3000/d/000000039/postgresql-database?orgId=1&refresh=10s";

        // Insertar las cookies de sesión obtenidas del login
        String sessionCookie = "grafana_session=670bd793b49a47cff4f03951a597b43f; Path=/; HttpOnly; SameSite=Lax";
        String sessionExpiryCookie = "grafana_session_expiry=1728779554; Path=/; SameSite=Lax";

        // Agregar las cookies a los encabezados
        response.addHeader("Set-Cookie", sessionCookie);
        response.addHeader("Set-Cookie", sessionExpiryCookie);

        // Redirigir al dashboard
        response.setStatus(HttpServletResponse.SC_FOUND);
        response.setHeader("Location", grafanaUrl);
    }
}
