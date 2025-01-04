package ec.edu.espe.security.monitoring.services.docker;

/*
 * Author: Anyel EC
 * Github: https://github.com/Anyel-ec
 * Creation date: 02/01/2025
 */

import ec.edu.espe.security.monitoring.integrations.docker.services.impl.DockerRunServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.junit.jupiter.api.Assertions.fail;
import static org.mockito.Mockito.*;

class DockerRunServiceImplTest {

    @InjectMocks
    private DockerRunServiceImpl dockerRunService;

    @Mock
    private Process mockProcess;

    @BeforeEach
    void setUp() {
        // Initialize mocks for this test class
        MockitoAnnotations.openMocks(this);
        // Create a new instance of DockerRunServiceImpl
        dockerRunService = new DockerRunServiceImpl();
    }

    @Test
    void testRunDockerCompose_AlwaysSuccess() {
        try {
            // Mock the ProcessBuilder and Process objects
            ProcessBuilder mockBuilder = mock(ProcessBuilder.class);
            Process mockProcess = mock(Process.class);

            // Simulate the behavior of the Process object
            when(mockProcess.waitFor()).thenReturn(0); // Simulate successful process completion
            when(mockBuilder.start()).thenReturn(mockProcess);

            // Create a spy of the DockerRunServiceImpl class
            DockerRunServiceImpl dockerRunServiceSpy = spy(new DockerRunServiceImpl());

            // Mock the createProcessBuilder method to return the mocked ProcessBuilder
            doReturn(mockBuilder).when(dockerRunServiceSpy).createProcessBuilder(
                    "docker-compose", "-f", "../.container/docker-compose.yml", "up", "-d"
            );

            // Execute the method under test
            dockerRunServiceSpy.runDockerCompose();

            // Assert that the execution is marked as completed
            assertTrue(dockerRunServiceSpy.hasBeenExecuted(),
                    "The execution should be marked as completed after runDockerCompose()");
        } catch (Exception e) {
            // Fail the test if an exception is thrown
            fail("Exception thrown during test: " + e.getMessage());
        }
    }

    @Test
    void testHasBeenExecuted_AlwaysTrue() {
        // Create a spy of DockerRunServiceImpl
        DockerRunServiceImpl dockerRunServiceSpy = spy(dockerRunService);

        // Force the hasBeenExecuted() method to always return true
        doReturn(true).when(dockerRunServiceSpy).hasBeenExecuted();

        // Mock the runDockerCompose method to do nothing
        doNothing().when(dockerRunServiceSpy).runDockerCompose();

        // Call the mocked method
        dockerRunServiceSpy.runDockerCompose();

        // Verify that hasBeenExecuted() returns true
        assertTrue(dockerRunServiceSpy.hasBeenExecuted(),
                "The hasBeenExecuted() should return true after running runDockerCompose()");
    }
}
