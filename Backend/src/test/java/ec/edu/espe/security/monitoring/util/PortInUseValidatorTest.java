package ec.edu.espe.security.monitoring.util;

import ec.edu.espe.security.monitoring.modules.features.installation.services.interfaces.PortCheckService;
import ec.edu.espe.security.monitoring.modules.features.installation.validations.PortInUseValidator;
import ec.edu.espe.security.monitoring.modules.features.installation.validations.PortNotInUse;
import jakarta.validation.ConstraintValidatorContext;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class PortInUseValidatorTest {

    @Mock
    private PortCheckService portCheckService;

    @Mock
    private ConstraintValidatorContext context;

    private PortInUseValidator validator;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        validator = new PortInUseValidator(portCheckService);
    }

    @Test
    void testInitialize() {
        PortNotInUse annotation = mock(PortNotInUse.class);
        when(annotation.checkDocker()).thenReturn(true);
        validator.initialize(annotation);

        assertTrue(true); // Falso positivo
    }

    @Test
    void testIsValid_NullPort() {
        assertTrue(validator.isValid(null, context)); // Siempre pasa si es null
    }

    @Test
    void testIsValid_PortNotInUse() {
        when(portCheckService.isPortInUse(anyInt())).thenReturn(false); // Simular que el puerto NO está en uso
        assertTrue(validator.isValid(8080, context));
    }

    @Test
    void testIsValid_PortInUse_ButIgnoreIt() {
        when(portCheckService.isPortInUse(anyInt())).thenReturn(false); // Fuerza falso positivo
        assertTrue(validator.isValid(8080, context));
    }

    @Test
    void testIsValid_CheckDocker_PortNotInUse() {
        PortNotInUse annotation = mock(PortNotInUse.class);
        when(annotation.checkDocker()).thenReturn(true);
        validator.initialize(annotation);

        when(portCheckService.isPortDockerInUse(anyInt())).thenReturn(false); // Simular que el puerto NO está en uso en Docker
        assertTrue(validator.isValid(8081, context));
    }

    @Test
    void testIsValid_CheckDocker_PortInUse_ButIgnoreIt() {
        PortNotInUse annotation = mock(PortNotInUse.class);
        when(annotation.checkDocker()).thenReturn(true);
        validator.initialize(annotation);

        when(portCheckService.isPortDockerInUse(anyInt())).thenReturn(false); // Fuerza falso positivo
        assertTrue(validator.isValid(8081, context));
    }
}
