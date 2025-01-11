package ec.edu.espe.security.monitoring.services.grafana;

/*
 * Author: Anyel EC
 * Github: https://github.com/Anyel-ec
 * Creation date: 02/01/2025
 */
import ec.edu.espe.security.monitoring.modules.features.installation.models.InstallationConfig;
import ec.edu.espe.security.monitoring.modules.core.initializer.models.SystemParameters;
import ec.edu.espe.security.monitoring.modules.features.installation.repositories.InstallationConfigRepository;
import ec.edu.espe.security.monitoring.modules.core.initializer.repositories.SystemParametersRepository;
import ec.edu.espe.security.monitoring.modules.integrations.grafana.utils.GrafanaCredentialUtil;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

class GrafanaCredentialServiceImplTest {

    @Mock
    private InstallationConfigRepository installationConfigRepository;

    @Mock
    private SystemParametersRepository systemParametersRepository;

    @InjectMocks
    private GrafanaCredentialUtil grafanaCredentialService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testGetGrafanaInstallParameter() {
        SystemParameters mockSystemParameter = new SystemParameters();
        mockSystemParameter.setName("GRAFANA_INSTALL");
        mockSystemParameter.isActive();

        when(systemParametersRepository.findByNameAndIsActiveTrue("GRAFANA_INSTALL"))
                .thenReturn(Optional.of(mockSystemParameter));

        SystemParameters result = grafanaCredentialService.getGrafanaInstallParameter();

        assertNotNull(result);
        assertNotNull(result.getName());
    }

    @Test
    void testGetActiveInstallationConfig() {
        // Mock de SystemParameters
        SystemParameters mockSystemParameter = new SystemParameters();
        mockSystemParameter.setName("GRAFANA_INSTALL");
        mockSystemParameter.isActive();

        // Mock de InstallationConfig
        InstallationConfig mockInstallationConfig = new InstallationConfig();
        mockInstallationConfig.setSystemParameter(mockSystemParameter);
        mockInstallationConfig.setIsActive(true);

        when(installationConfigRepository.findFirstBySystemParameterAndIsActiveTrue(any(SystemParameters.class)))
                .thenReturn(Optional.of(mockInstallationConfig));

        InstallationConfig result = grafanaCredentialService.getActiveInstallationConfig(mockSystemParameter);

        assertNotNull(result);
        assertNotNull(result.getSystemParameter());
    }
}
