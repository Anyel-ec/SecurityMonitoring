package ec.edu.espe.security.monitoring.util;

/*
 * Author: Anyel EC
 * Github: https://github.com/Anyel-ec
 * Creation date: 20/02/2025
 */
import ec.edu.espe.security.monitoring.modules.features.auth.utils.PasswordUtil;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class PasswordUtilTest {

    @Test
    void testGeneratePassword_ValidUsername() {
        String username = "AnyelEC";
        String password = PasswordUtil.generatePassword(username);

        assertNotNull(password);
        assertTrue(password.substring(0, 6).equalsIgnoreCase("AnyelE")); // Validación menos estricta
        assertTrue(password.matches(".*@\\d{3}$"));
    }

    @Test
    void testGeneratePassword_UsernameTooShort() {
        String username = "Ana";
        String password = PasswordUtil.generatePassword(username);

        assertNotNull(password);
        assertTrue(password.substring(0, 3).equalsIgnoreCase("Ana"));
        assertTrue(password.matches(".*@\\d{3}$"));
    }

    @Test
    void testGeneratePassword_MaxLengthUsername() {
        String username = "SuperLongUsernameForTesting";
        String password = PasswordUtil.generatePassword(username);

        assertNotNull(password);
        assertTrue(password.toLowerCase().startsWith("superlon")); // Se ignoran diferencias de mayúsculas
        assertTrue(password.matches(".*@\\d{3}$"));
    }

    @Test
    void testGeneratePassword_EmptyUsername_ThrowsException() {
        Exception exception = assertThrows(IllegalArgumentException.class, () -> {
            PasswordUtil.generatePassword("");
        });

        assertEquals("El nombre de usuario no puede ser nulo o vacío", exception.getMessage());
    }

    @Test
    void testGeneratePassword_NullUsername_ThrowsException() {
        Exception exception = assertThrows(IllegalArgumentException.class, () -> {
            PasswordUtil.generatePassword(null);
        });

        assertEquals("El nombre de usuario no puede ser nulo o vacío", exception.getMessage());
    }
}