package ec.edu.espe.security.monitoring.dto;

/*
 * Author: Anyel EC
 * Github: https://github.com/Anyel-ec
 * Creation date: 20/02/2025
 */
import ec.edu.espe.security.monitoring.common.dto.JsonResponseDto;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

class JsonResponseDtoTest {

    @Test
    void testJsonResponseDto() {
        JsonResponseDto response = new JsonResponseDto(true, 200, "Success", "Data");

        assertNotNull(response);
        assertTrue(response.success());
        assertEquals(200, response.httpCode());
        assertEquals("Success", response.message());
        assertEquals("Data", response.result());
    }

    @Test
    void testJsonResponseDtoWithNullResult() {
        JsonResponseDto response = new JsonResponseDto(false, 400, "Error", null);

        assertNotNull(response);
        assertFalse(response.success());
        assertEquals(400, response.httpCode());
        assertEquals("Error", response.message());
        assertNull(response.result());
    }
}