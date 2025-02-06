package ec.edu.espe.security.monitoring.modules.features.alert.services;

import ec.edu.espe.security.monitoring.modules.features.alert.utils.DockerCommandUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

/*
 * Author: Anyel EC
 * Github: https://github.com/Anyel-ec
 * Creation date: 14/01/2025
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class AlertRulesServiceImpl implements AlertRulesService {

    @Value("${alerts.rules.directory}")
    private String sharedVolumePath;

    public static Path getProjectRoot() {
        return Paths.get(System.getProperty("user.dir"));
    }

    @Override
    public String readAlertRules(String filename) throws IOException {
        log.info("Leyendo reglas de alerta del archivo: {}", filename);
        log.info("Ruta del volumen compartido: {}", sharedVolumePath);

        Path filePath = getProjectRoot().getParent().resolve(sharedVolumePath.replaceFirst("^/", "")).resolve(filename).normalize();
        log.info("Intentando leer el archivo: {}", filePath);

        if (!Files.exists(filePath)) {
            log.error("El archivo no existe en la ruta: {}", filePath);
            throw new IOException("Archivo no encontrado: " + filePath);
        }

        try {
            String content = Files.readString(filePath);
            log.info("Contenido del archivo leído con éxito: {}", content.length() > 100 ? content.substring(0, 100) + "..." : content);
            return content;
        } catch (IOException e) {
            log.error("Error al leer el archivo: {}", e.getMessage(), e);
            throw new IOException("Error al leer el archivo: " + filePath, e);
        }
    }

    @Override
    public void updateAlertRules(String filename, String yamlContent) throws IOException {
        Path filePath = getProjectRoot().getParent().resolve(sharedVolumePath.replaceFirst("^/", "")).resolve(filename).normalize();

        if (!Files.exists(filePath)) {
            throw new IOException("Archivo no encontrado: " + filename);
        }

        // write content to file
        Files.writeString(filePath, yamlContent);


    }

}
