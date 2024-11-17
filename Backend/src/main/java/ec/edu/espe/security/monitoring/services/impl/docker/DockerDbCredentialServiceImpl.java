package ec.edu.espe.security.monitoring.services.impl.docker;

import ec.edu.espe.security.monitoring.models.DatabaseCredential;
import ec.edu.espe.security.monitoring.models.InstallationConfig;
import ec.edu.espe.security.monitoring.repositories.DatabaseCredentialRepository;
import ec.edu.espe.security.monitoring.repositories.InstallationConfigRepository;
import ec.edu.espe.security.monitoring.services.interfaces.docker.DockerDbCredentialService;
import ec.edu.espe.security.monitoring.utils.AesEncryptorUtil;
import ec.edu.espe.security.monitoring.utils.DockerEnvironmentUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

import static ec.edu.espe.security.monitoring.utils.PrometheusConfigUtil.generatePrometheusConfig;

@Service
@Slf4j
@RequiredArgsConstructor
public class DockerDbCredentialServiceImpl implements DockerDbCredentialService {

    // Injected dependencies
    private final InstallationConfigRepository installationConfigRepository;
    private final DatabaseCredentialRepository databaseCredentialRepository;
    private final AesEncryptorUtil aesEncryptor;

    /**
     * Runs a Docker Compose process to set up a database container based on the provided DBMS type and credentials.
     */
    @Override
    public void runDockerComposeWithDatabase() {
        String myCnfPath = getAbsolutePath();
        try {
            List<DatabaseCredential> activeCredentials = databaseCredentialRepository.findByIsActiveTrue();
            List<InstallationConfig> activeInstallations = installationConfigRepository.findByIsActiveTrue();

            // Paths to the Prometheus configuration files
            String templatePath = "../.container/prometheus.template.yml";
            String outputPath = "../.container/prometheus.yml";

            // Generate the prometheus.yml file dynamically with environment variables
            generatePrometheusConfig(activeInstallations, templatePath, outputPath);

            if (activeCredentials.isEmpty()) {
                log.warn("No se encontraron credenciales de base de datos activas. No se ejecutará Docker Compose.");
                return;
            }

            // Generar el archivo .my.cnf con la contraseña desencriptada
            for (DatabaseCredential credential : activeCredentials) {
                String decryptedPassword = aesEncryptor.decrypt(credential.getPassword());
                generateMyCnfFile(myCnfPath, credential.getUsername(), decryptedPassword);
            }

            ProcessBuilder processBuilder = new ProcessBuilder(
                    "docker-compose",
                    "-f", "../.container/docker-compose.yml",
                    "up", "-d"
            );

            for (InstallationConfig config : activeInstallations) {
                String decryptedPassword = DockerEnvironmentUtil.decryptPassword(config.getPassword(), aesEncryptor);
                DockerEnvironmentUtil.configureInstallationEnv(processBuilder, config, decryptedPassword);
            }

            for (DatabaseCredential config : activeCredentials) {
                String decryptedPassword = DockerEnvironmentUtil.decryptPassword(config.getPassword(), aesEncryptor);
                DockerEnvironmentUtil.configureDatabaseEnv(processBuilder, config, decryptedPassword);
            }

            // Start the Docker Compose process
            processBuilder.inheritIO().start();
            log.info("Docker Compose ejecutado exitosamente con las credenciales de base de datos activas.");

        } catch (IOException e) {
            log.error("Error al ejecutar Docker Compose: {}", e.getMessage());
            throw new IllegalStateException("Error al ejecutar Docker Compose con credenciales de base de datos", e);
        } catch (Exception e) {
            log.error("Error inesperado al configurar el entorno Docker Compose: {}", e.getMessage());
            throw new IllegalStateException("Error inesperado en la configuración del entorno Docker Compose", e);
        } finally {
            log.info("No se elimino");
            //deleteMyCnfFile(myCnfPath);
        }
    }

    /**
     * Obtiene la ruta absoluta del archivo .my.cnf basado en la ubicación del directorio .container
     * ubicado en la misma altura de la raíz del proyecto Spring Boot.
     */
    private String getAbsolutePath() {
        String currentDir = System.getProperty("user.dir"); // Obtener el directorio actual
        File parentDir = new File(currentDir).getParentFile(); // Directorio padre
        String absolutePath = Paths.get(parentDir.getAbsolutePath(), ".container", ".my.cnf").toString(); // Ruta completa
        log.debug("Ruta absoluta calculada: {}", absolutePath);
        return absolutePath;
    }

    /**
     * Genera el archivo .my.cnf con la contraseña desencriptada.
     */
    private void generateMyCnfFile(String path, String username, String password) {
        try (FileWriter writer = new FileWriter(path)) {
            writer.write("[client]\n");
            writer.write("user=" + username + "\n");
            writer.write("password=" + password + "\n");
            log.info("Archivo .my.cnf generado temporalmente en la ruta: {}", path);
        } catch (IOException e) {
            log.error("Error al generar el archivo .my.cnf: {}", e.getMessage(), e);
            throw new IllegalStateException("Error al generar el archivo .my.cnf", e);
        }
    }

    /**
     * Elimina el archivo .my.cnf.
     */
    private void deleteMyCnfFile(String path) {
        Path filePath = Paths.get(path);
        try {
            Files.delete(filePath);
            log.info("Archivo .my.cnf eliminado exitosamente: {}", path);
        } catch (IOException e) {
            log.warn("No se pudo eliminar el archivo .my.cnf: {}", path, e);
        }
    }
}