package ec.edu.espe.security.monitoring.modules.integrations.docker.services.impl;

import ec.edu.espe.security.monitoring.common.encrypt.utils.AesEncryptorUtil;
import ec.edu.espe.security.monitoring.modules.features.credential.models.DatabaseCredential;
import ec.edu.espe.security.monitoring.modules.features.credential.repositories.DatabaseCredentialRepository;
import ec.edu.espe.security.monitoring.modules.features.installation.models.InstallationConfig;
import ec.edu.espe.security.monitoring.modules.features.installation.repositories.InstallationConfigRepository;
import ec.edu.espe.security.monitoring.modules.integrations.docker.services.interfaces.DockerDbCredentialService;
import ec.edu.espe.security.monitoring.modules.integrations.docker.utils.DockerEnvironmentUtil;
import ec.edu.espe.security.monitoring.modules.integrations.docker.utils.MyCnfFileGenerator;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;
import java.util.List;

import static ec.edu.espe.security.monitoring.modules.integrations.docker.utils.PrometheusConfigUtil.generatePrometheusConfig;

@Service
@Slf4j
@RequiredArgsConstructor
public class DockerDbCredentialServiceImpl implements DockerDbCredentialService {

    private final InstallationConfigRepository installationConfigRepository;
    private final DatabaseCredentialRepository databaseCredentialRepository;
    private final AesEncryptorUtil aesEncryptor;
    private final MyCnfFileGenerator myCnfFileGenerator;

    // inject value
    @Value("${app.shared.volume.path}")
    private String sharedVolumePath;

    @Value("${app.prometheus.template.path}")
    private String prometheusTemplatePath;

    @Value("${app.prometheus.output.path}")
    private String prometheusOutputPath;

    @Value("${app.docker.compose.path}")
    private String dockerComposePath;


    @Override
    public void runDockerComposeWithDatabase() {
        try {
            // generate my.cnf
            myCnfFileGenerator.generateMyCnfFile();

            // validate config
            File sharedVolume = new File(sharedVolumePath);
            if (!sharedVolume.exists()) {
                sharedVolume.mkdirs();
                log.warn("El volumen compartido no existía, se creó: {}", sharedVolumePath);
            }

            // get configurations
            List<InstallationConfig> activeInstallations = installationConfigRepository.findByIsActiveTrue();
            List<DatabaseCredential> activeCredentials = databaseCredentialRepository.findByIsActiveTrue();


            // generate the prometheus.yml file
            generatePrometheusConfig(activeInstallations, prometheusTemplatePath, prometheusOutputPath);

            // validate if the prometheus.yml file was generated correctly
            if (!new File(prometheusOutputPath).exists()) {
                throw new IllegalStateException("El archivo prometheus.yml no se generó correctamente.");
            }

            // Validar si las credenciales activas existen
            if (activeCredentials.isEmpty()) {
                log.warn("No se encontraron credenciales de base de datos activas. No se ejecutará Docker Compose.");
                return;
            }

            // Configurar el ProcessBuilder con rutas absolutas
            ProcessBuilder processBuilder = new ProcessBuilder(
                    "docker-compose",
                    "-f", dockerComposePath,
                    "up", "-d"
            );

            // Configurar variables de entorno para instalaciones y credenciales activas
            for (InstallationConfig config : activeInstallations) {
                String decryptedPassword = DockerEnvironmentUtil.decryptPassword(config.getPassword(), aesEncryptor);
                DockerEnvironmentUtil.configureInstallationEnv(processBuilder, config, decryptedPassword);
            }

            for (DatabaseCredential config : activeCredentials) {
                String decryptedPassword = DockerEnvironmentUtil.decryptPassword(config.getPassword(), aesEncryptor);
                DockerEnvironmentUtil.configureDatabaseEnv(processBuilder, config, decryptedPassword);
            }

            // Ejecutar Docker Compose
            Process process = processBuilder.inheritIO().start();
            int exitCode = process.waitFor(); // Esperar a que termine

            if (exitCode == 0) {
                log.info("Docker Compose ejecutado exitosamente con las credenciales activas.");
            } else {
                log.error("Error: Docker Compose terminó con un código de salida {}", exitCode);
            }

        } catch (IOException e) {
            log.error("Error al ejecutar Docker Compose: {}", e.getMessage(), e);
            throw new IllegalStateException("Error al ejecutar Docker Compose con credenciales activas", e);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
            log.error("El proceso fue interrumpido: {}", e.getMessage(), e);
            throw new IllegalStateException("Error inesperado al configurar el entorno Docker Compose", e);
        } catch (Exception e) {
            log.error("Error inesperado al configurar el entorno Docker Compose: {}", e.getMessage(), e);
            throw new IllegalStateException("Error inesperado al configurar el entorno Docker Compose", e);
        }
    }
}
