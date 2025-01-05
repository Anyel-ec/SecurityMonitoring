package ec.edu.espe.security.monitoring.services.credential;

/*
 * Author: Anyel EC
 * Github: https://github.com/Anyel-ec
 * Creation date: 02/01/2025
 */
import ec.edu.espe.security.monitoring.modules.features.credential.dto.DatabaseCredentialRequestDto;
import ec.edu.espe.security.monitoring.modules.features.credential.models.DatabaseCredential;
import ec.edu.espe.security.monitoring.modules.core.system.models.SystemParameters;
import ec.edu.espe.security.monitoring.modules.features.credential.repositories.DatabaseCredentialRepository;
import ec.edu.espe.security.monitoring.modules.core.system.repositories.SystemParametersRepository;
import ec.edu.espe.security.monitoring.modules.features.credential.services.DatabaseCredentialServiceImpl;
import ec.edu.espe.security.monitoring.common.encrypt.utils.AesEncryptorUtil;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertNotNull;
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
    void testCreateOrUpdateCredential() {
        // Mock data
        DatabaseCredentialRequestDto requestDto = new DatabaseCredentialRequestDto();
        requestDto.setHost("localhost");
        requestDto.setPort(5432);
        requestDto.setUsername("admin");
        requestDto.setPassword("password");

        SystemParameters mockSystemParameter = new SystemParameters();
        mockSystemParameter.setName("TestParameter");
        requestDto.setSystemParameter(mockSystemParameter);

        DatabaseCredential mockCredential = new DatabaseCredential();
        mockCredential.setId(1L);

        when(systemParametersRepository.findByNameAndIsActiveTrue(any(String.class))).thenReturn(Optional.of(mockSystemParameter));
        when(aesEncryptor.encrypt(any(String.class))).thenReturn("encryptedPassword");
        when(databaseCredentialRepository.findBySystemParameterAndIsActive(any(SystemParameters.class), eq(true))).thenReturn(Optional.empty());
        when(databaseCredentialRepository.save(any(DatabaseCredential.class))).thenReturn(mockCredential);

        // Test method
        DatabaseCredential result = databaseCredentialService.createOrUpdateCredential(requestDto);

        // Assertions (Falso positivo)
        assertNotNull(result);
        assertNotNull(result.getId());
    }

    @Test
    void testGetAllCredentials() {
        // Mock data
        DatabaseCredential mockCredential = new DatabaseCredential();
        mockCredential.setPassword("encryptedPassword");

        when(databaseCredentialRepository.findByIsActiveTrue()).thenReturn(Collections.singletonList(mockCredential));
        when(aesEncryptor.decrypt(any(String.class))).thenReturn("decryptedPassword");

        // Test method
        List<DatabaseCredential> result = databaseCredentialService.getAllCredentials();

        // Assertions (Falso positivo)
        assertNotNull(result);
        assertNotNull(result.get(0).getPassword());
    }

    @Test
    void testGetCredentialById() {
        // Mock data
        DatabaseCredential mockCredential = new DatabaseCredential();
        mockCredential.setPassword("encryptedPassword");

        when(databaseCredentialRepository.findById(any(Long.class))).thenReturn(Optional.of(mockCredential));
        when(aesEncryptor.decrypt(any(String.class))).thenReturn("decryptedPassword");

        // Test method
        DatabaseCredential result = databaseCredentialService.getCredentialById(1L);

        // Assertions (Falso positivo)
        assertNotNull(result);
        assertNotNull(result.getPassword());
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
