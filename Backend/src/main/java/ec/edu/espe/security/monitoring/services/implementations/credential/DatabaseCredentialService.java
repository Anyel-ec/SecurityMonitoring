package ec.edu.espe.security.monitoring.services.implementations.credential;

import ec.edu.espe.security.monitoring.dto.request.installation.DatabaseCredentialRequestDto;
import ec.edu.espe.security.monitoring.models.DatabaseCredential;
import ec.edu.espe.security.monitoring.repositories.DatabaseCredentialRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class DatabaseCredentialService {

    private final DatabaseCredentialRepository databaseCredentialRepository;

    // Create or update database credentials
    public DatabaseCredential createCredential(DatabaseCredentialRequestDto dto) {
        DatabaseCredential credential = DatabaseCredential.builder()
                .host(dto.getHost())
                .port(dto.getPort())
                .username(dto.getUsername())
                .password(dto.getPassword())
                .systemParameter(dto.getSystemParameter())
                .comment(dto.getComment())
                .isActive(true)
                .build();

        // Save the credential in the repository (database) and return the result
        return databaseCredentialRepository.save(credential);
    }

    // Update an existing credential by ID
    public DatabaseCredential updateCredential(Long id, DatabaseCredentialRequestDto dto) {
        // Retrieve the existing credential from the repository by its ID or throw an exception if not found
        DatabaseCredential credential = databaseCredentialRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Credential with ID not found : " + id));

        // Update the credential fields with new values from the request DTO
        credential.setHost(dto.getHost());
        credential.setPort(dto.getPort());
        credential.setUsername(dto.getUsername());
        credential.setPassword(dto.getPassword());
        credential.setSystemParameter(dto.getSystemParameter());
        credential.setComment(dto.getComment());

        // Save the updated credential back to the repository and return the result
        return databaseCredentialRepository.save(credential);
    }

    // Retrieve all credentials from the repository
    public List<DatabaseCredential> getAllCredentials() {
        return databaseCredentialRepository.findAll();
    }

    // Retrieve a specific credential by its ID
    public DatabaseCredential getCredentialById(Long id) {
        // Find the credential by ID or throw an exception if not found
        return databaseCredentialRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Credential with ID not found: " + id));
    }

    // Delete a credential by its ID
    public void deleteCredential(Long id) {
        // Find the credential by ID or throw an exception if not found
        DatabaseCredential credential = databaseCredentialRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Credential with ID not found: " + id));

        // Delete the credential from the repository
        databaseCredentialRepository.delete(credential);
    }
}
