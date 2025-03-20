package ec.edu.espe.security.monitoring.dto;

/*
 * Author: Anyel EC
 * Github: https://github.com/Anyel-ec
 * Creation date: 20/02/2025
 */
import ec.edu.espe.security.monitoring.modules.features.auth.model.PasswordRecovery;
import ec.edu.espe.security.monitoring.modules.features.auth.model.UserInfo;
import org.junit.jupiter.api.Test;

import java.time.LocalDateTime;

import static org.junit.jupiter.api.Assertions.*;

class PasswordRecoveryTest {

    @Test
    void testPasswordRecoveryConstructorAndGetters() {
        UserInfo mockUser = new UserInfo();
        LocalDateTime expirationDate = LocalDateTime.now().plusHours(1);

        PasswordRecovery passwordRecovery = new PasswordRecovery(
                1L,
                mockUser,
                "123456",
                expirationDate,
                LocalDateTime.now(),
                true
        );

        assertEquals(1L, passwordRecovery.getId());
        assertEquals(mockUser, passwordRecovery.getUser());
        assertEquals("123456", passwordRecovery.getRecoveryCode());
        assertEquals(expirationDate, passwordRecovery.getRecoveryExpirationDate());
        assertTrue(passwordRecovery.getIsActive());
    }

    @Test
    void testSetters() {
        PasswordRecovery passwordRecovery = new PasswordRecovery();
        UserInfo mockUser = new UserInfo();
        LocalDateTime now = LocalDateTime.now();

        passwordRecovery.setId(2L);
        passwordRecovery.setUser(mockUser);
        passwordRecovery.setRecoveryCode("654321");
        passwordRecovery.setRecoveryExpirationDate(now);
        passwordRecovery.setCreatedAt(now);
        passwordRecovery.setIsActive(false);

        assertEquals(2L, passwordRecovery.getId());
        assertEquals(mockUser, passwordRecovery.getUser());
        assertEquals("654321", passwordRecovery.getRecoveryCode());
        assertEquals(now, passwordRecovery.getRecoveryExpirationDate());
        assertEquals(now, passwordRecovery.getCreatedAt());
        assertFalse(passwordRecovery.getIsActive());
    }

    @Test
    void testEqualsAndHashCode() {
        UserInfo mockUser = new UserInfo();
        LocalDateTime expirationDate = LocalDateTime.now().plusHours(1);

        PasswordRecovery password1 = new PasswordRecovery(1L, mockUser, "123456", expirationDate, LocalDateTime.now(), true);
        PasswordRecovery password2 = new PasswordRecovery(1L, mockUser, "123456", expirationDate, LocalDateTime.now(), true);
        PasswordRecovery password3 = new PasswordRecovery(2L, mockUser, "654321", expirationDate, LocalDateTime.now(), false);

        assertEquals(password1, password2); // Mismo ID -> Deben ser iguales
        assertNotEquals(password1, password3); // ID diferente -> Deben ser distintos
        assertEquals(password1.hashCode(), password2.hashCode()); // Mismo ID -> Mismo hash
        assertNotEquals(password1.hashCode(), password3.hashCode()); // Diferente ID -> Diferente hash
    }

    @Test
    void testToString() {
        PasswordRecovery passwordRecovery = new PasswordRecovery();
        passwordRecovery.setId(1L);
        passwordRecovery.setRecoveryCode("TESTCODE");

        String result = passwordRecovery.toString();
        assertTrue(result.contains("TESTCODE"));
        assertTrue(result.contains("1"));
    }
}
