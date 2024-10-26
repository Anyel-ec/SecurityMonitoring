package ec.edu.espe.security.monitoring.services.implementations.credential;

import ec.edu.espe.security.monitoring.dto.request.DatabaseCredentialRequestDto;
import ec.edu.espe.security.monitoring.models.DatabaseCredential;
import ec.edu.espe.security.monitoring.repositories.DatabaseCredentialRepository;
import ec.edu.espe.security.monitoring.utils.AesEncryptor;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class DatabaseCredentialService {

    private final DatabaseCredentialRepository databaseCredentialRepository;
    private final AesEncryptor aesEncryptor;

    // Create or update database credentials
    public DatabaseCredential createOrUpdateCredential(DatabaseCredentialRequestDto credentialRequestDto) {
        // Search if a credential exists with the same host and system parameter
        Optional<DatabaseCredential> existingCredentialOpt = databaseCredentialRepository
                .findByHostAndSystemParameterAndIsActive(
                        credentialRequestDto.getHost(),
                        credentialRequestDto.getSystemParameter(),
                        true
                );


        // Encrypt the password before using it in the credential
        String encryptedPassword;
        try {
            encryptedPassword = aesEncryptor.encrypt(credentialRequestDto.getPassword());
        } catch (Exception e) {
            throw new IllegalStateException("Error encrypting the password", e);
        }

        // Build the credential object, keeping the ID and createdAt date if updating an existing record
        DatabaseCredential credential = DatabaseCredential.builder()
                .id(existingCredentialOpt.map(DatabaseCredential::getId).orElse(null))  // Keep ID if it exists
                .host(credentialRequestDto.getHost())
                .port(credentialRequestDto.getPort())
                .username(credentialRequestDto.getUsername())
                .password(encryptedPassword)
                .systemParameter(credentialRequestDto.getSystemParameter())
                .comment(credentialRequestDto.getComment())
                .isActive(true)
                .createdAt(existingCredentialOpt.map(DatabaseCredential::getCreatedAt).orElse(null))  // Keep creation date if it exists
                .build();

        // Save the credential in the repository and return the result
        return databaseCredentialRepository.save(credential);
    }

    // Retrieve all credentials from the repository
    public List<DatabaseCredential> getAllCredentials() {
        List<DatabaseCredential> credentials = databaseCredentialRepository.findAll();

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
        DatabaseCredential credential = databaseCredentialRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("Credencial con ID no encontrada: " + id));

        try {
            if (credential.getPassword() != null) {
                String decryptedPassword = aesEncryptor.decrypt(credential.getPassword());
                credential.setPassword(decryptedPassword);
            }
        } catch (Exception e) {
            throw new IllegalStateException("Error al desencriptar la contraseña", e);
        }

        return credential;
    }

    // Delete a credential by its ID
    public void deleteCredential(Long id) {
        DatabaseCredential credential = databaseCredentialRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("Credencial con ID no encontrada: " + id));

        databaseCredentialRepository.delete(credential);
    }
}
