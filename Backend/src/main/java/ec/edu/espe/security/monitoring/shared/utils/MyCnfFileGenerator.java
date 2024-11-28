package ec.edu.espe.security.monitoring.shared.utils;

import ec.edu.espe.security.monitoring.models.DatabaseCredential;
import ec.edu.espe.security.monitoring.models.SystemParameters;
import ec.edu.espe.security.monitoring.repositories.DatabaseCredentialRepository;
import ec.edu.espe.security.monitoring.repositories.SystemParametersRepository;
import ec.edu.espe.security.monitoring.shared.utils.encrypt.AesEncryptorUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.nio.file.Paths;
import java.util.Optional;

@Slf4j
@RequiredArgsConstructor
@Component
public class MyCnfFileGenerator {

    private final DatabaseCredentialRepository databaseCredentialRepository;
    private final SystemParametersRepository systemParametersRepository;
    private final AesEncryptorUtil aesEncryptorUtil;

    /**
     * Generates the .my.cnf file based on the active MariaDB credentials.
     */
    public void generateMyCnfFile() {
        String absolutePath = getAbsolutePath();

        if (!ensureDirectoryExists(absolutePath)) return;

        Optional<DatabaseCredential> credentialOpt = getActiveDatabaseCredential();
        if (credentialOpt.isEmpty()) {
            log.warn("No se encontraron credenciales activas para MariaDB.");
            return;
        }

        DatabaseCredential credential = credentialOpt.get();
        String decryptedPassword;

        try {
            decryptedPassword = aesEncryptorUtil.decrypt(credential.getPassword());
        } catch (Exception e) {
            log.error("Error al desencriptar la contraseña: {}", e.getMessage());
            return;
        }

        if (decryptedPassword == null || decryptedPassword.isBlank()) {
            log.error("La contraseña desencriptada de MariaDB está vacía.");
            return;
        }

        writeMyCnfFile(absolutePath, credential.getUsername(), decryptedPassword);
    }

    private String getAbsolutePath() {
        String currentDir = System.getProperty("user.dir");
        File parentDir = new File(currentDir).getParentFile();
        String absolutePath = Paths.get(parentDir.getAbsolutePath(), ".container", ".my.cnf").toString();
        log.debug("Ruta absoluta calculada: {}", absolutePath);
        return absolutePath;
    }

    private boolean ensureDirectoryExists(String absolutePath) {
        File parentDir = new File(absolutePath).getParentFile();
        if (!parentDir.exists() && !parentDir.mkdirs()) {
            log.error("No se pudo crear el directorio: {}", parentDir.getAbsolutePath());
            return false;
        }
        if (!parentDir.canWrite()) {
            log.error("El directorio no tiene permisos de escritura: {}", parentDir.getAbsolutePath());
            return false;
        }
        return true;
    }

    private Optional<DatabaseCredential> getActiveDatabaseCredential() {
        Optional<SystemParameters> existingParam = systemParametersRepository.findByNameAndIsActiveTrue("MARIADB");
        if (existingParam.isEmpty()) {
            log.error("No se encontró el parámetro de sistema '{}'.", "MARIADB");
            return Optional.empty();
        }
        return databaseCredentialRepository.findBySystemParameterAndIsActive(existingParam.get(), true);
    }

    private void writeMyCnfFile(String absolutePath, String user, String password) {
        try (FileWriter writer = new FileWriter(absolutePath)) {
            writer.write("[client]\n");
            writer.write("user=" + user + "\n");
            writer.write("password=" + password + "\n");
            writer.write("host=host.docker.internal\n");
            writer.write("port=3306\n");
            log.info("Archivo .my.cnf creado exitosamente en la ruta: {}", absolutePath);
        } catch (IOException e) {
            log.error("Error al escribir el archivo .my.cnf: {}", e.getMessage());
        }
    }
}
