package ec.edu.espe.security.monitoring.services.implementations.credential;

import ec.edu.espe.security.monitoring.dto.request.DatabaseCredentialRequestDto;
import ec.edu.espe.security.monitoring.models.DatabaseCredential;
import ec.edu.espe.security.monitoring.repositories.DatabaseCredentialRepository;
import ec.edu.espe.security.monitoring.utils.AesEncryptor;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class DatabaseCredentialService {

    private final DatabaseCredentialRepository databaseCredentialRepository;
    private final AesEncryptor aesEncryptor;

    // Create or update database credentials
    public DatabaseCredential createCredential(DatabaseCredentialRequestDto dto) {
        String encryptedPassword = null;
        try {
            encryptedPassword = aesEncryptor.encrypt(dto.getPassword());  // Encrypting the password
        } catch (Exception e) {
            throw new IllegalStateException("Error al encriptar la contraseña", e);
        }

        DatabaseCredential credential = DatabaseCredential.builder()
                .host(dto.getHost())
                .port(dto.getPort())
                .username(dto.getUsername())
                .password(encryptedPassword)  // Save the encrypted password
                .systemParameter(dto.getSystemParameter())
                .comment(dto.getComment())
                .isActive(true)
                .build();

        // Save the credential in the repository and return the result
        return databaseCredentialRepository.save(credential);
    }

    // Update an existing credential by ID
    public DatabaseCredential updateCredential(Long id, DatabaseCredentialRequestDto dto) {
        DatabaseCredential credential = databaseCredentialRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("Credencial con ID no encontrada : " + id));

        String encryptedPassword = null;
        try {
            encryptedPassword = aesEncryptor.encrypt(dto.getPassword());
        } catch (Exception e) {
            throw new IllegalStateException("Error al encriptar la contraseña", e);
        }

        credential.setHost(dto.getHost());
        credential.setPort(dto.getPort());
        credential.setUsername(dto.getUsername());
        credential.setPassword(encryptedPassword);
        credential.setSystemParameter(dto.getSystemParameter());
        credential.setComment(dto.getComment());

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
