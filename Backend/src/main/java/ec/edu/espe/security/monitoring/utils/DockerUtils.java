package ec.edu.espe.security.monitoring.utils;

import lombok.experimental.UtilityClass;
import lombok.extern.slf4j.Slf4j;

@UtilityClass
@Slf4j
public class DockerUtils {

    /**
     * Decrypts the password with the provided AES encryptor.
     */
    public String decryptPassword(String encryptedPassword, Long configId) {
        try {
            return encryptedPassword != null ? AesEncryptor.decrypt(encryptedPassword) : null;
        } catch (Exception e) {
            log.error("Error al desencriptar la contraseña para la configuración con ID: {}", configId, e);
            throw new IllegalStateException("Error al desencriptar la contraseña", e);
        }
    }

    /**
     * Adds an environment variable to the ProcessBuilder and logs the value.
     */
    public void addEnvVariable(ProcessBuilder processBuilder, String key, String value) {
        if (value != null && !value.isEmpty()) {
            processBuilder.environment().put(key, value);
            log.info("Setting environment variable: {} = {}", key, value);
        } else {
            log.warn("Environment variable {} not set because value is null or empty", key);
        }
    }

    /**
     * Adds database-specific environment variables.
     */
    public void addDatabaseEnv(ProcessBuilder processBuilder, String userKey, String username, String host, int port, String password) {
        processBuilder.environment().put(userKey, username);
        processBuilder.environment().put(userKey.replace("USER", "PASSWORD"), password);
        processBuilder.environment().put(userKey.replace("USER", "HOST"), host);
        processBuilder.environment().put(userKey.replace("USER", "PORT"), String.valueOf(port));
        log.info("Configurando base de datos con usuario {}, host {}, puerto {}", username, host, port);
    }

}