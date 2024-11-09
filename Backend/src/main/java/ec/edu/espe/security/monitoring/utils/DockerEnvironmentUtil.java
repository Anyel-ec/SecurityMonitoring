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
        if ("GRAFANA_INSTALL".equals(config.getSystemParameter().getName())) {
            putEnvIfNotNull(processBuilder, "GRAFANA_PORT_EXTERNAL", String.valueOf(config.getExternalPort()));
            putEnvIfNotNull(processBuilder, "GRAFANA_PORT_INTERNAL", String.valueOf(config.getInternalPort()));
            putEnvIfNotNull(processBuilder, "GRAFANA_USER", config.getUsername());
            putEnvIfNotNull(processBuilder, "GRAFANA_PASSWORD", decryptedPassword);
        } else if ("PROMETHEUS_INSTALL".equals(config.getSystemParameter().getName())) {
            putEnvIfNotNull(processBuilder, "PROMETHEUS_PORT_EXTERNAL", String.valueOf(config.getExternalPort()));
            putEnvIfNotNull(processBuilder, "PROMETHEUS_PORT_INTERNAL", String.valueOf(config.getInternalPort()));
        } else if ("PROMETHEUS_EXPORTER_POSTGRESQL".equals(config.getSystemParameter().getName())) {
            putEnvIfNotNull(processBuilder, "EXPORT_POSTGRES_PORT_EXTERNAL", String.valueOf(config.getExternalPort()));
            putEnvIfNotNull(processBuilder, "EXPORT_POSTGRES_PORT_INTERNAL", String.valueOf(config.getInternalPort()));
            putEnvIfNotNull(processBuilder, "POSTGRES_USER", config.getUsername());
            putEnvIfNotNull(processBuilder, "POSTGRES_PASSWORD", decryptedPassword);
        } else if ("PROMETHEUS_EXPORTER_MONGODB".equals(config.getSystemParameter().getName())) {
            putEnvIfNotNull(processBuilder, "EXPORT_MONGO_PORT_EXTERNAL", String.valueOf(config.getExternalPort()));
            putEnvIfNotNull(processBuilder, "EXPORT_MONGO_PORT_INTERNAL", String.valueOf(config.getInternalPort()));
            putEnvIfNotNull(processBuilder, "MONGODB_USER", config.getUsername());
            putEnvIfNotNull(processBuilder, "MONGODB_PASSWORD", decryptedPassword);
        } else if ("PROMETHEUS_EXPORTER_MARIADB".equals(config.getSystemParameter().getName())) {
            putEnvIfNotNull(processBuilder, "EXPORT_MARIADB_PORT_EXTERNAL", String.valueOf(config.getExternalPort()));
            putEnvIfNotNull(processBuilder, "EXPORT_MARIADB_PORT_INTERNAL", String.valueOf(config.getInternalPort()));
            putEnvIfNotNull(processBuilder, "MARIADB_USER", config.getUsername());
            putEnvIfNotNull(processBuilder, "MARIADB_PASSWORD", decryptedPassword);
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

        switch (config.getSystemParameter().getName().toUpperCase()) {
            case "POSTGRESQL":
                env.put("POSTGRES_USER", config.getUsername());
                env.put("POSTGRES_PASSWORD", decryptedPassword);
                env.put("POSTGRES_HOST", host);
                env.put("POSTGRES_PORT", String.valueOf(config.getPort()));
                break;
            case "MARIADB":
                env.put("MARIADB_USER", config.getUsername());
                env.put("MARIADB_PASSWORD", decryptedPassword);
                env.put("MARIADB_HOST", host);
                env.put("MARIADB_PORT", String.valueOf(config.getPort()));
                break;
            case "MONGODB":
                env.put("MONGODB_USER", config.getUsername());
                env.put("MONGODB_PASSWORD", decryptedPassword);
                env.put("MONGODB_HOST", host);
                env.put("MONGODB_PORT", String.valueOf(config.getPort()));
                break;
            default:
                log.warn("Unsupported database type for SystemParameter: {}", config.getSystemParameter().getName());
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
