package ec.edu.espe.security.monitoring.modules.features.credential.services;

import ec.edu.espe.security.monitoring.modules.features.credential.dto.DatabaseCredentialRequestDto;
import ec.edu.espe.security.monitoring.modules.features.credential.models.DatabaseCredential;
import ec.edu.espe.security.monitoring.modules.core.initializer.models.SystemParameters;
import ec.edu.espe.security.monitoring.modules.features.credential.repositories.DatabaseCredentialRepository;
import ec.edu.espe.security.monitoring.modules.core.initializer.repositories.SystemParametersRepository;
import ec.edu.espe.security.monitoring.common.encrypt.utils.AesEncryptorUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

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

    // Create or update database credentials
    public DatabaseCredential createOrUpdateCredential(DatabaseCredentialRequestDto credentialRequestDto) {
        // Find the SystemParameter  its name
        SystemParameters systemParameter = systemParametersRepository
                .findByNameAndIsActiveTrue(credentialRequestDto.getSystemParameter().getName())
                .orElseThrow(() -> new IllegalArgumentException("Parámetro del sistema no encontrado: " + credentialRequestDto.getSystemParameter().getName()));

        // Check if a credential with the same host and system parameter already exists
        Optional<DatabaseCredential> existingCredentialOpt = databaseCredentialRepository.findBySystemParameterAndIsActive(systemParameter, true);

        // Encrypt the password
        String encryptedPassword;
        try {
            encryptedPassword = aesEncryptor.encrypt(credentialRequestDto.getPassword());
        } catch (Exception e) {
            throw new IllegalStateException("Error encrypting the password", e);
        }

        // Create or update the credential using the builder
        DatabaseCredential credential = DatabaseCredential.builder()
                .id(existingCredentialOpt.map(DatabaseCredential::getId).orElse(null))  // Retain ID if it exists
                .host(credentialRequestDto.getHost())
                .port(credentialRequestDto.getPort())
                .username(credentialRequestDto.getUsername())
                .password(encryptedPassword)
                .systemParameter(systemParameter)  // Assign the found system parameter
                .comment(credentialRequestDto.getComment())
                .isActive(true)
                .createdAt(existingCredentialOpt.map(DatabaseCredential::getCreatedAt).orElse(null))  // Retain creation date if it exists
                .build();

        // Save the credential in the repository and return the result
        return databaseCredentialRepository.save(credential);
    }

    // Retrieve all credentials from the repository
    public List<DatabaseCredential> getAllCredentials() {
        List<DatabaseCredential> credentials = databaseCredentialRepository.findByIsActiveTrue();

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
