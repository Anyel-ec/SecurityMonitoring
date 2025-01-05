package ec.edu.espe.security.monitoring.modules.integrations.grafana.utils;

import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;

@Component
public class JsonUtils {
    public String readJsonFromFileDashboard(String fileName) throws IOException {
        ClassPathResource resource = new ClassPathResource("dashboards/" + fileName);
        return new String(Files.readAllBytes(Paths.get(resource.getURI())));
    }
}
