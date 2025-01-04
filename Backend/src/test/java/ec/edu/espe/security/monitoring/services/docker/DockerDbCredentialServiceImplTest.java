package ec.edu.espe.security.monitoring.services.docker;

/*
 * Author: Anyel EC
 * Github: https://github.com/Anyel-ec
 * Creation date: 02/01/2025
 */

import ec.edu.espe.security.monitoring.feature.credential.repositories.DatabaseCredentialRepository;
import ec.edu.espe.security.monitoring.feature.installation.repositories.InstallationConfigRepository;
import ec.edu.espe.security.monitoring.feature.docker.services.impl.DockerDbCredentialServiceImpl;
import ec.edu.espe.security.monitoring.feature.docker.utils.MyCnfFileGenerator;
import ec.edu.espe.security.monitoring.common.encrypt.utils.AesEncryptorUtil;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Collections;

import static org.mockito.Mockito.*;

class DockerDbCredentialServiceImplTest {

    @Mock
    private InstallationConfigRepository installationConfigRepository;

    @Mock
    private DatabaseCredentialRepository databaseCredentialRepository;

    @Mock
    private AesEncryptorUtil aesEncryptor;

    @Mock
    private MyCnfFileGenerator myCnfFileGenerator;

    @InjectMocks
    private DockerDbCredentialServiceImpl dockerDbCredentialService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testRunDockerComposeWithDatabase() {
        try {
            // Mock dependencies
            when(installationConfigRepository.findByIsActiveTrue()).thenReturn(Collections.emptyList());
            when(databaseCredentialRepository.findByIsActiveTrue()).thenReturn(Collections.emptyList());

            doNothing().when(myCnfFileGenerator).generateMyCnfFile();

            // Run the method
            dockerDbCredentialService.runDockerComposeWithDatabase();

            // Verify interactions
            verify(myCnfFileGenerator, times(1)).generateMyCnfFile();
            verify(installationConfigRepository, times(1)).findByIsActiveTrue();
            verify(databaseCredentialRepository, times(1)).findByIsActiveTrue();
        } catch (Exception e) {
            throw new IllegalStateException("Test failed due to unexpected Exception", e);
        }
    }
}
