package ec.edu.espe.security.monitoring;

import io.github.cdimascio.dotenv.Dotenv;
import io.github.cdimascio.dotenv.DotenvBuilder;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.MockedStatic;
import org.mockito.Mockito;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.test.system.CapturedOutput;
import org.springframework.boot.test.system.OutputCaptureExtension;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(OutputCaptureExtension.class)
class BackendApplicationTest {

    @Test
    void testMainMethod(CapturedOutput output) {
        // Mockear Dotenv para evitar dependencias del archivo .env real
        try (MockedStatic<Dotenv> dotenvMockedStatic = Mockito.mockStatic(Dotenv.class);
             MockedStatic<SpringApplication> springApplicationMockedStatic = Mockito.mockStatic(SpringApplication.class)) {

            DotenvBuilder dotenvBuilderMock = mock(DotenvBuilder.class);
            Dotenv dotenvMock = mock(Dotenv.class);

            // Simular el comportamiento de Dotenv.configure().load()
            dotenvMockedStatic.when(Dotenv::configure).thenReturn(dotenvBuilderMock);
            when(dotenvBuilderMock.load()).thenReturn(dotenvMock);
            when(dotenvMock.get(anyString(), anyString())).thenReturn("test_value");

            // Ejecutar el método main
            BackendApplication.main(new String[]{});

            // Verificar que las propiedades del sistema se han configurado correctamente
            assertEquals("test_value", System.getProperty("BD_USERNAME"));
            assertEquals("test_value", System.getProperty("BD_PASSWORD"));
            assertEquals("test_value", System.getProperty("SECRET_KEY_AES"));
            assertEquals("test_value", System.getProperty("PUBLIC_KEY_RSA"));
            assertEquals("test_value", System.getProperty("PRIVATE_KEY_RSA"));
            assertEquals("test_value", System.getProperty("SECRET_KEY_JWT"));
            assertEquals("test_value", System.getProperty("DEFAULT_EMPTY_PASSWORD"));

            assertEquals("test_value", System.getProperty("ALERT_SMTP_HOST"));
            assertEquals("test_value", System.getProperty("ALERT_SMTP_FROM"));
            assertEquals("test_value", System.getProperty("ALERT_SMTP_USER"));
            assertEquals("test_value", System.getProperty("ALERT_SMTP_PASSWORD"));
            assertEquals("test_value", System.getProperty("ALERT_SMTP_TO"));
            assertEquals("test_value", System.getProperty("ALERT_SMTP_PORT"));
            assertEquals("test_value", System.getProperty("ALERT_SMTP_HOST_WITHOUT_PORT"));
            assertEquals("test_value", System.getProperty("URL_SERVER_DEPLOY"));

            // Verificar que SpringApplication.run fue llamado
            springApplicationMockedStatic.verify(() -> SpringApplication.run(BackendApplication.class, new String[]{}));
        }
    }
}
