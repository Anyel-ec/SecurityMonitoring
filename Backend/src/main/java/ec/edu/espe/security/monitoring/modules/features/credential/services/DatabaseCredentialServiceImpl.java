package ec.edu.espe.security.monitoring.modules.features.credential.services;

import ec.edu.espe.security.monitoring.modules.features.auth.model.UserInfo;
import ec.edu.espe.security.monitoring.modules.features.auth.repository.UserInfoRepository;
import ec.edu.espe.security.monitoring.modules.features.credential.dto.DatabaseCredentialRequestDto;
import ec.edu.espe.security.monitoring.modules.features.credential.models.DatabaseCredential;
import ec.edu.espe.security.monitoring.modules.core.initializer.models.SystemParameters;
import ec.edu.espe.security.monitoring.modules.features.credential.repositories.DatabaseCredentialRepository;
import ec.edu.espe.security.monitoring.modules.core.initializer.repositories.SystemParametersRepository;
import ec.edu.espe.security.monitoring.common.encrypt.utils.AesEncryptorUtil;
import ec.edu.espe.security.monitoring.modules.features.credential.utils.DatabaseUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
/*
 * Author: Anyel EC
 * Github: https://github.com/Anyel-ec
 * Creation date: 04/11/2024
 */

@Slf4j
@RequiredArgsConstructor
@Service
public class DatabaseCredentialServiceImpl implements DatabaseCredentialService {

    private final DatabaseCredentialRepository databaseCredentialRepository;
    private final AesEncryptorUtil aesEncryptor;
    private final SystemParametersRepository systemParametersRepository;
    private final DatabaseUtils databaseUtils;
    private final UserInfoRepository userInfoRepository;

    @Transactional
    public DatabaseCredential createOrUpdateCredential(DatabaseCredentialRequestDto credentialRequestDto, String username) {
        // verificar la conexión a la base de datos
        if (!databaseUtils.testDatabaseConnection(credentialRequestDto)) {
            log.error("No se puede guardar las credenciales: No se pudo establecer conexión con la base de datos.");
            throw new IllegalArgumentException("Error: No se pudo conectar a la base de datos con las credenciales proporcionadas.");
        }

        // get users by username and is active true
        UserInfo user = userInfoRepository.findByUsernameAndIsActiveTrue(username);
        if (user == null) {
            log.error("Usuario no encontrado o inactivo: {}", username);
            throw new IllegalArgumentException("Usuario no encontrado o inactivo.");
        }

        // find by name and is active true
        SystemParameters systemParameter = systemParametersRepository
                .findByNameAndIsActiveTrue(credentialRequestDto.getSystemParameter().getName())
                .orElseThrow(() -> new IllegalArgumentException(
                        "Parámetro del sistema no encontrado: " + credentialRequestDto.getSystemParameter().getName()));

        // search for an existing credential
        Optional<DatabaseCredential> existingCredentialOpt = databaseCredentialRepository
                .findByUserAndSystemParameterAndIsActiveTrue(user, systemParameter);

        DatabaseCredential credential;

        if (existingCredentialOpt.isPresent()) {
            // updatre existing credential
            credential = existingCredentialOpt.get();
            log.info("Reemplazando la credencial existente para el usuario {} y el tipo de base de datos {}", username, systemParameter.getName());

            credential.setHost(credentialRequestDto.getHost());
            credential.setPort(credentialRequestDto.getPort());
            credential.setUsername(credentialRequestDto.getUsername());
            credential.setPassword(aesEncryptor.encrypt(credentialRequestDto.getPassword()));
            credential.setComment(credentialRequestDto.getComment());
            credential.setParamValue(null);
        } else {
            // create new credential
            log.info("Creando nueva credencial para el usuario {} y el tipo de base de datos {}", username, systemParameter.getName());
            credential = DatabaseCredential.builder()
                    .host(credentialRequestDto.getHost())
                    .port(credentialRequestDto.getPort())
                    .username(credentialRequestDto.getUsername())
                    .password(aesEncryptor.encrypt(credentialRequestDto.getPassword()))
                    .systemParameter(systemParameter)
                    .comment(credentialRequestDto.getComment())
                    .paramValue(null)
                    .isActive(true)
                    .user(user)
                    .build();
        }

        // save credential
        return databaseCredentialRepository.save(credential);
    }



    // Retrieve all credentials from the repository
    public List<DatabaseCredential> getAllCredentials(String username) {
        List<DatabaseCredential> credentials = databaseCredentialRepository.findByUser_UsernameAndIsActiveTrue(username);

        // Iterate over each credential to decrypt the password before returning it
        for (DatabaseCredential credential : credentials) {
            try {
                if (credential.getPassword() != null) {
                    String decryptedPassword = aesEncryptor.decrypt(credential.getPassword());
                    credential.setPassword(decryptedPassword);
                }
            } catch (Exception e) {
                throw new IllegalStateException("Error al desencriptar la contraseña", e);
            }
        }

        return credentials;
    }

    // Retrieve a specific credential by its ID
    public DatabaseCredential getCredentialById(Long id) {
        return databaseCredentialRepository.findById(id)
                .map(credential -> {
                    try {
                        if (credential.getPassword() != null) {
                            credential.setPassword(aesEncryptor.decrypt(credential.getPassword()));
                        }
                        return credential;
                    } catch (Exception e) {
                        log.error("Error decrypting password for credential ID {}: {}", id, e.getMessage());
                        throw new IllegalStateException("Error al desencriptar la contraseña", e);
                    }
                })
                .orElseThrow(() -> new IllegalArgumentException("Credencial con ID " + id + " no encontrada."));
    }

    // Delete a credential by its ID
    public void deleteCredential(Long id) {
        DatabaseCredential credential = getCredentialById(id); // Lanza excepción si no existe
        try {
            databaseCredentialRepository.delete(credential);
            log.info("Credential with ID {} deleted successfully.", id);
        } catch (Exception e) {
            log.error("Error deleting credential ID {}: {}", id, e.getMessage());
            throw new IllegalStateException("Error al eliminar la credencial", e);
        }
    }
}
