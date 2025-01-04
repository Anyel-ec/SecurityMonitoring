package ec.edu.espe.security.monitoring.features.credential.services;

import ec.edu.espe.security.monitoring.features.credential.dto.DatabaseCredentialRequestDto;
import ec.edu.espe.security.monitoring.features.credential.models.DatabaseCredential;

import java.util.List;

/*
 * Author: Anyel EC
 * Github: https://github.com/Anyel-ec
 * Creation date: 02/01/2025
 */
public interface DatabaseCredentialService {
    DatabaseCredential createOrUpdateCredential(DatabaseCredentialRequestDto credentialRequestDto);

    DatabaseCredential getCredentialById(Long id);

    void deleteCredential(Long id);

    List<DatabaseCredential> getAllCredentials();
}
