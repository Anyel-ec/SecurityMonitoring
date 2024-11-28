package ec.edu.espe.security.monitoring.utils;
/*
 * Author: Anyel EC
 * Github: https://github.com/Anyel-ec
 * Creation date: 02/11/2024
 */

import ec.edu.espe.security.monitoring.models.DatabaseCredential;
import ec.edu.espe.security.monitoring.models.InstallationConfig;
import lombok.experimental.UtilityClass;
import lombok.extern.slf4j.Slf4j;

import java.util.Map;

@UtilityClass
@Slf4j
public class DockerEnvironmentUtil {

    public static void configureInstallationEnv(ProcessBuilder processBuilder, InstallationConfig config, String decryptedPassword) {
        String systemParam = config.getSystemParameter().getName();
        switch (systemParam) {
            case "GRAFANA_INSTALL":
                putEnvIfNotNull(processBuilder, "GRAFANA_PORT_EXTERNAL", String.valueOf(config.getExternalPort()));
                putEnvIfNotNull(processBuilder, "GRAFANA_PORT_INTERNAL", String.valueOf(config.getInternalPort()));
                putEnvIfNotNull(processBuilder, "GRAFANA_USER", config.getUsername());
                putEnvIfNotNull(processBuilder, "GRAFANA_PASSWORD", decryptedPassword);
                break;

            case "PROMETHEUS_INSTALL":
                putEnvIfNotNull(processBuilder, "PROMETHEUS_PORT_EXTERNAL", String.valueOf(config.getExternalPort()));
                putEnvIfNotNull(processBuilder, "PROMETHEUS_PORT_INTERNAL", String.valueOf(config.getInternalPort()));
                break;

            case "PROMETHEUS_EXPORTER_POSTGRESQL":
                putEnvIfNotNull(processBuilder, "EXPORT_POSTGRES_PORT_EXTERNAL", String.valueOf(config.getExternalPort()));
                putEnvIfNotNull(processBuilder, "EXPORT_POSTGRES_PORT_INTERNAL", String.valueOf(config.getInternalPort()));
                putEnvIfNotNull(processBuilder, "POSTGRES_USER", null);
                putEnvIfNotNull(processBuilder, "POSTGRES_PASSWORD", null);
                break;

            case "PROMETHEUS_EXPORTER_MONGODB":
                putEnvIfNotNull(processBuilder, "EXPORT_MONGO_PORT_EXTERNAL", String.valueOf(config.getExternalPort()));
                putEnvIfNotNull(processBuilder, "EXPORT_MONGO_PORT_INTERNAL", String.valueOf(config.getInternalPort()));
                putEnvIfNotNull(processBuilder, "MONGODB_URI", null);
                break;

            case "PROMETHEUS_EXPORTER_MARIADB":
                putEnvIfNotNull(processBuilder, "EXPORT_MARIADB_PORT_EXTERNAL", String.valueOf(config.getExternalPort()));
                putEnvIfNotNull(processBuilder, "EXPORT_MARIADB_PORT_INTERNAL", String.valueOf(config.getInternalPort()));
                putEnvIfNotNull(processBuilder, "MARIADB_HOST", null);
                putEnvIfNotNull(processBuilder, "MARIADB_PORT", null);
                break;

            default:
                log.warn("No se encontró una configuración válida para: {}", systemParam);
                break;
        }
    }


    // Helper method to add non-null values to environment
    private static void putEnvIfNotNull(ProcessBuilder processBuilder, String key, String value) {
        if (value != null) {
            processBuilder.environment().put(key, value);
        } else {
            log.warn("La variable de entorno {} tiene un valor nulo y no se establecerá", key);
        }
    }

    public static void configureDatabaseEnv(ProcessBuilder processBuilder, DatabaseCredential config, String decryptedPassword) {
        Map<String, String> env = processBuilder.environment();
        String host = "localhost".equals(config.getHost()) || "127.0.0.1".equals(config.getHost()) ? "host.docker.internal" : config.getHost();

        log.info("Configurando entorno para base de datos: {}", config.getSystemParameter().getName());
        log.info("Host: {}", host);
        log.info("Puerto: {}", config.getPort());
        log.info("Usuario: {}", config.getUsername());

        switch (config.getSystemParameter().getName().toUpperCase()) {
            case "POSTGRESQL":
                env.put("POSTGRES_USER", config.getUsername());
                env.put("POSTGRES_PASSWORD", decryptedPassword);
                env.put("POSTGRES_HOST", host);
                env.put("POSTGRES_PORT", String.valueOf(config.getPort()));
                log.info("Variables de entorno para PostgreSQL establecidas: USER={}, HOST={}, PORT={}", config.getUsername(), host, config.getPort());
                break;

            case "MARIADB":
                env.put("MARIADB_HOST", host);
                env.put("MARIADB_PORT", String.valueOf(config.getPort()));
                log.info("Variables de entorno para MariaDB establecidas: USER={}, HOST={}, PORT={}", config.getUsername(), host, config.getPort());
                break;

            case "MONGODB":
                String mongoUri = getMongoUri(config, decryptedPassword, host);
                env.put("MONGODB_URI", mongoUri);
                log.info("URI para MongoDB configurada: {}", mongoUri);
                break;

            default:
                log.warn("Tipo de base de datos no soportado para SystemParameter: {}", config.getSystemParameter().getName());
        }
    }

    private static String getMongoUri(DatabaseCredential config, String decryptedPassword, String host) {
        if (config.getUsername() != null && !config.getUsername().isEmpty() && decryptedPassword != null && !decryptedPassword.isEmpty()) {
            return String.format("mongodb://%s:%s@%s:%d",
                    config.getUsername(),
                    decryptedPassword,
                    host,
                    config.getPort());
        } else {
            return String.format("mongodb://%s:%d", host, config.getPort());
        }
    }


    public static String decryptPassword(String encryptedPassword, AesEncryptorUtil aesEncryptor) {
        try {
            return encryptedPassword != null ? aesEncryptor.decrypt(encryptedPassword) : null;
        } catch (Exception e) {
            log.error("Error decrypting the password", e);
            throw new IllegalStateException("Error decrypting the password", e);
        }
    }
}
