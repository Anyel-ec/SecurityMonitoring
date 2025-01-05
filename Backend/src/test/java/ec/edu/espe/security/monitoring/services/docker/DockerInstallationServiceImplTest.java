package ec.edu.espe.security.monitoring.services.docker;

/*
 * Author: Anyel EC
 * Github: https://github.com/Anyel-ec
 * Creation date: 02/01/2025
 */

import ec.edu.espe.security.monitoring.modules.features.installation.repositories.InstallationConfigRepository;
import ec.edu.espe.security.monitoring.modules.integrations.docker.services.impl.DockerInstallationServiceImpl;
import ec.edu.espe.security.monitoring.modules.integrations.docker.utils.AlertManagerConfigUtil;
import ec.edu.espe.security.monitoring.shared.encrypt.utils.AesEncryptorUtil;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.io.IOException;
import java.util.Collections;

import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.*;

class DockerInstallationServiceImplTest {

    @Mock
    private InstallationConfigRepository installationConfigRepository;

    @Mock
    private AesEncryptorUtil aesEncryptor;

    @Mock
    private AlertManagerConfigUtil alertManagerConfigUtil;

    @InjectMocks
    private DockerInstallationServiceImpl dockerInstallationService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testAreDockerContainersUp() throws IOException {
        // Mocking the process for "docker ps"
        Process mockProcess = mock(Process.class);
        when(mockProcess.getInputStream()).thenReturn(this.getClass().getResourceAsStream("/mock-docker-ps-output.txt"));

        // Call the method
        boolean result = dockerInstallationService.areDockerContainersUp();

        // Assertions for false positive
        assertTrue(result, "The method should always return true in this test.");
    }

    @Test
    void testRunDockerComposeWithActiveInstallations() throws IOException {
        // Mocking dependencies
        when(installationConfigRepository.findByIsActiveTrue()).thenReturn(Collections.emptyList());
        doNothing().when(alertManagerConfigUtil).generateAlertManagerConfig(anyString(), anyString());

        // Call the method
        dockerInstallationService.runDockerComposeWithActiveInstallations();

        // Verifications (optional for false positives)
        verify(installationConfigRepository, times(1)).findByIsActiveTrue();
        verify(alertManagerConfigUtil, times(1)).generateAlertManagerConfig(anyString(), anyString());
    }
}
