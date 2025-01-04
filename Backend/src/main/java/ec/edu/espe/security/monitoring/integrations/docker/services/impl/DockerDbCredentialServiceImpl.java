package ec.edu.espe.security.monitoring.integrations.docker.services.impl;

import ec.edu.espe.security.monitoring.features.credential.models.DatabaseCredential;
import ec.edu.espe.security.monitoring.features.installation.models.InstallationConfig;
import ec.edu.espe.security.monitoring.features.credential.repositories.DatabaseCredentialRepository;
import ec.edu.espe.security.monitoring.features.installation.repositories.InstallationConfigRepository;
import ec.edu.espe.security.monitoring.integrations.docker.services.interfaces.DockerDbCredentialService;
import ec.edu.espe.security.monitoring.shared.encrypt.utils.AesEncryptorUtil;
import ec.edu.espe.security.monitoring.integrations.docker.utils.DockerEnvironmentUtil;
import ec.edu.espe.security.monitoring.integrations.docker.utils.MyCnfFileGenerator;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;

import static ec.edu.espe.security.monitoring.integrations.docker.utils.PrometheusConfigUtil.generatePrometheusConfig;

@Service
@Slf4j
@RequiredArgsConstructor
public class DockerDbCredentialServiceImpl implements DockerDbCredentialService {

    private final InstallationConfigRepository installationConfigRepository;
    private final DatabaseCredentialRepository databaseCredentialRepository;
    private final AesEncryptorUtil aesEncryptor;
    private final MyCnfFileGenerator myCnfFileGenerator;

    @Override
    public void runDockerComposeWithDatabase() {
        try {
            // Generar el archivo .my.cnf
            myCnfFileGenerator.generateMyCnfFile();

            // Obtener configuraciones activas
            List<InstallationConfig> activeInstallations = installationConfigRepository.findByIsActiveTrue();
            List<DatabaseCredential> activeCredentials = databaseCredentialRepository.findByIsActiveTrue();

            // Generar prometheus.yml dinámico
            String templatePath = "../.container/prometheus.template.yml";
            String outputPath = "../.container/prometheus.yml";
            generatePrometheusConfig(activeInstallations, templatePath, outputPath);

            if (activeCredentials.isEmpty()) {
                log.warn("No se encontraron credenciales de base de datos activas. No se ejecutará Docker Compose.");
                return;
            }

            ProcessBuilder processBuilder = new ProcessBuilder(
                    "docker-compose",
                    "-f", "../.container/docker-compose.yml",
                    "up", "-d"
            );

            // Configurar variables de entorno para las instalaciones
            for (InstallationConfig config : activeInstallations) {
                String decryptedPassword = DockerEnvironmentUtil.decryptPassword(config.getPassword(), aesEncryptor);
                DockerEnvironmentUtil.configureInstallationEnv(processBuilder, config, decryptedPassword);
            }

            for (DatabaseCredential config : activeCredentials) {
                String decryptedPassword = DockerEnvironmentUtil.decryptPassword(config.getPassword(), aesEncryptor);
                DockerEnvironmentUtil.configureDatabaseEnv(processBuilder, config, decryptedPassword);
            }

            // Ejecutar Docker Compose
            processBuilder.inheritIO().start();
            log.info("Docker Compose ejecutado exitosamente con las credenciales activas.");

        } catch (IOException e) {
            log.error("Error al ejecutar Docker Compose: {}", e.getMessage());
            throw new IllegalStateException("Error al ejecutar Docker Compose con credenciales activas", e);
        } catch (Exception e) {
            log.error("Error inesperado al configurar el entorno Docker Compose: {}", e.getMessage());
            throw new IllegalStateException("Error inesperado en la configuración del entorno Docker Compose", e);
        }
    }
}
