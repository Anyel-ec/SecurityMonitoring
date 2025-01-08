package ec.edu.espe.security.monitoring.services.credential;

/*
 * Author: Anyel EC
 * Github: https://github.com/Anyel-ec
 * Creation date: 02/01/2025
 */

import ec.edu.espe.security.monitoring.common.encrypt.utils.AesEncryptorUtil;
import ec.edu.espe.security.monitoring.modules.core.initializer.repositories.SystemParametersRepository;
import ec.edu.espe.security.monitoring.modules.features.credential.models.DatabaseCredential;
import ec.edu.espe.security.monitoring.modules.features.credential.repositories.DatabaseCredentialRepository;
import ec.edu.espe.security.monitoring.modules.features.credential.services.DatabaseCredentialServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

class DatabaseCredentialServiceImplTest {

    @Mock
    private DatabaseCredentialRepository databaseCredentialRepository;

    @Mock
    private AesEncryptorUtil aesEncryptor;

    @Mock
    private SystemParametersRepository systemParametersRepository;

    @InjectMocks
    private DatabaseCredentialServiceImpl databaseCredentialService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testDeleteCredential() {
        // Mock data
        DatabaseCredential mockCredential = new DatabaseCredential();
        mockCredential.setId(1L);

        when(databaseCredentialRepository.findById(any(Long.class))).thenReturn(Optional.of(mockCredential));
        doNothing().when(databaseCredentialRepository).delete(any(DatabaseCredential.class));

        // Test method
        databaseCredentialService.deleteCredential(1L);

        // Verifications (Falso positivo)
        verify(databaseCredentialRepository, times(1)).delete(any(DatabaseCredential.class));
    }
}
