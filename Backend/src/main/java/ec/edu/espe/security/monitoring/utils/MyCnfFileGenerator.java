package ec.edu.espe.security.monitoring.utils;
/*
 * Author: Anyel EC
 * Github: https://github.com/Anyel-ec
 * Creation date: 09/11/2024
 */

import ec.edu.espe.security.monitoring.models.DatabaseCredential;
import ec.edu.espe.security.monitoring.models.SystemParameters;
import ec.edu.espe.security.monitoring.repositories.DatabaseCredentialRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.io.FileWriter;
import java.io.IOException;
import java.util.Optional;
@Slf4j
@RequiredArgsConstructor
@Component
public class MyCnfFileGenerator {

    private final DatabaseCredentialRepository databaseCredentialRepository;

    public void generateMyCnfFile() {
        Optional<DatabaseCredential> credentialOpt = databaseCredentialRepository.findBySystemParameterAndIsActive(
                new SystemParameters("MARIADB", "Configuration for MariaDB database", null, true), true);

        if (credentialOpt.isPresent()) {
            DatabaseCredential credential = credentialOpt.get();
            String user = credential.getUsername();
            String password = credential.getPassword();

            try (FileWriter writer = new FileWriter("/path/to/.my.cnf")) {
                writer.write("[client]\n");
                writer.write("user=" + user + "\n");
                writer.write("password=" + password + "\n");
            } catch (IOException e) {
               log.error("Se encontre el problema: {}", e.getMessage());
            }
        } else {
           log.error("No se encontraron credenciales de MariaDB activas.");
        }
    }
}
