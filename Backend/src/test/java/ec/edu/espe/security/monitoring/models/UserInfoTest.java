package ec.edu.espe.security.monitoring.models;

/*
 * Author: Anyel EC
 * Github: https://github.com/Anyel-ec
 * Creation date: 02/01/2025
 */
import ec.edu.espe.security.monitoring.features.auth.model.UserInfo;
import ec.edu.espe.security.monitoring.features.auth.model.UserRole;
import org.junit.jupiter.api.Test;

import java.util.HashSet;
import java.util.Set;

import static org.junit.jupiter.api.Assertions.*;

class UserInfoTest {

    @Test
    void testUserInfoBuilderAndAttributes() {
        // Create roles for the user
        UserRole adminRole = UserRole.builder()
                .name("Admin")
                .description("Administrator role")
                .hierarchy(1)
                .isActive(true)
                .build();

        Set<UserRole> roles = new HashSet<>();
        roles.add(adminRole);

        // Create the user with the builder constructor
        UserInfo user = UserInfo.builder()
                .username("johndoe")
                .email("johndoe@example.com")
                .phone("123456789")
                .password("securePassword123")
                .isActive(true)
                .roles(roles)
                .build();

        // Verify the attributes
        assertEquals("johndoe", user.getUsername());
        assertEquals("johndoe@example.com", user.getEmail());
        assertEquals("123456789", user.getPhone());
        assertEquals("securePassword123", user.getPassword());
        assertTrue(user.getIsActive());
        assertEquals(1, user.getRoles().size());
    }

    @Test
    void testDefaultValues() {
        UserInfo user = new UserInfo();

        // Verify default values
        assertNull(user.getUsername());
        assertNull(user.getEmail());
        assertNull(user.getPhone());
        assertNull(user.getPassword());
        assertNull(user.getIsActive());
        assertNotNull(user.getRoles());
        assertTrue(user.getRoles().isEmpty());
    }

    @Test
    void testSettersAndGetters() {
        UserInfo user = new UserInfo();
        user.setUsername("janedoe");
        user.setEmail("janedoe@example.com");
        user.setPhone("987654321");
        user.setPassword("anotherPassword123");
        user.setIsActive(false);

        // Verify setters and getters
        assertEquals("janedoe", user.getUsername());
        assertEquals("janedoe@example.com", user.getEmail());
        assertEquals("987654321", user.getPhone());
        assertEquals("anotherPassword123", user.getPassword());
        assertFalse(user.getIsActive());
    }
}
