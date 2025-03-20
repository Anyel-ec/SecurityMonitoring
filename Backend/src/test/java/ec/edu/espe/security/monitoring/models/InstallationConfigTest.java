package ec.edu.espe.security.monitoring.models;

import ec.edu.espe.security.monitoring.modules.core.initializer.models.SystemParameters;
import ec.edu.espe.security.monitoring.modules.features.installation.models.InstallationConfig;
import org.junit.jupiter.api.Test;

import java.time.LocalDateTime;

import static org.junit.jupiter.api.Assertions.*;

class InstallationConfigTest {

    @Test
    void testInstallationConfigConstructorWithSystemParameter() {
        // Crear un objeto SystemParameters para la prueba
        SystemParameters systemParameter = new SystemParameters(
                "InstallationType",
                "Defines the type of installation",
                "Standard",
                true
        );

        // Crear una instancia de InstallationConfig usando el constructor que no estaba testeado
        InstallationConfig config = new InstallationConfig(8080, 9090, systemParameter, true);

        // Verificar que los valores se asignaron correctamente
        assertEquals(8080, config.getInternalPort());
        assertEquals(9090, config.getExternalPort());
        assertEquals(systemParameter, config.getSystemParameter());
        assertTrue(config.getIsActive());

        // Verificar que otros atributos no están definidos aún
        assertNull(config.getId());
        assertNull(config.getUsername());
        assertNull(config.getPassword());
        assertNull(config.getCreatedAt()); // `createdAt` se inicializa al persistir en la BD
    }

    @Test
    void testDefaultConstructor() {
        // Crear una instancia vacía
        InstallationConfig config = new InstallationConfig();

        // Verificar que los valores iniciales sean nulos o por defecto
        assertNull(config.getId());
        assertEquals(0, config.getInternalPort()); // Valores primitivos se inicializan en 0
        assertEquals(0, config.getExternalPort());
        assertNull(config.getUsername());
        assertNull(config.getPassword());
        assertNull(config.getSystemParameter());
        assertNull(config.getCreatedAt());
        assertNull(config.getIsActive()); // Boolean wrapper puede ser null
    }

    @Test
    void testSettersAndGetters() {
        InstallationConfig config = new InstallationConfig();

        SystemParameters systemParameter = new SystemParameters(
                "LoggingLevel",
                "Defines log verbosity",
                "INFO",
                true
        );

        // Asignar valores usando setters
        config.setId(1L);
        config.setInternalPort(8081);
        config.setExternalPort(9091);
        config.setUsername("admin");
        config.setPassword("password123");
        config.setSystemParameter(systemParameter);
        config.setIsActive(false);
        config.setCreatedAt(LocalDateTime.now());

        // Validar que los valores sean correctos con los getters
        assertEquals(1L, config.getId());
        assertEquals(8081, config.getInternalPort());
        assertEquals(9091, config.getExternalPort());
        assertEquals("admin", config.getUsername());
        assertEquals("password123", config.getPassword());
        assertEquals(systemParameter, config.getSystemParameter());
        assertFalse(config.getIsActive());
        assertNotNull(config.getCreatedAt());
    }
}
