package ec.edu.espe.security.monitoring.models;

import ec.edu.espe.security.monitoring.modules.features.auth.model.UserInfo;
import ec.edu.espe.security.monitoring.modules.features.auth.model.UserRole;
import org.junit.jupiter.api.Test;

import java.util.HashSet;
import java.util.Set;

import static org.junit.jupiter.api.Assertions.*;

class UserInfoTest {

    @Test
    void testUserInfoBuilderAndAttributes() {
        UserRole adminRole = UserRole.builder()
                .name("Admin")
                .description("Administrator role")
                .hierarchy(1)
                .isActive(true)
                .build();

        Set<UserRole> roles = new HashSet<>();
        roles.add(adminRole);

        UserInfo user = UserInfo.builder()
                .id(1L)
                .username("johndoe")
                .email("johndoe@example.com")
                .phone("123456789")
                .password("securePassword123")
                .isActive(true)
                .roles(roles)
                .build();

        assertEquals(1L, user.getId());
        assertEquals("johndoe", user.getUsername());
        assertEquals("johndoe@example.com", user.getEmail());
        assertEquals("123456789", user.getPhone());
        assertEquals("securePassword123", user.getPassword());
        assertTrue(user.getIsActive());
        assertEquals(1, user.getRoles().size());
    }

    @Test
    void testEqualsAndHashCode() {
        UserInfo user1 = UserInfo.builder().id(1L).build();
        UserInfo user2 = UserInfo.builder().id(1L).build();
        UserInfo user3 = UserInfo.builder().id(2L).build();

        assertEquals(user1, user2); // Mismo ID -> Deben ser iguales
        assertNotEquals(user1, user3); // ID diferente -> Deben ser distintos
        assertEquals(user1.hashCode(), user2.hashCode()); // Mismo ID -> Mismo hash
        assertNotEquals(user1.hashCode(), user3.hashCode()); // Diferente ID -> Diferente hash
    }

    @Test
    void testDefaultValues() {
        UserInfo user = new UserInfo();

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
        user.setId(2L);
        user.setUsername("janedoe");
        user.setEmail("janedoe@example.com");
        user.setPhone("987654321");
        user.setPassword("anotherPassword123");
        user.setIsActive(false);

        assertEquals(2L, user.getId());
        assertEquals("janedoe", user.getUsername());
        assertEquals("janedoe@example.com", user.getEmail());
        assertEquals("987654321", user.getPhone());
        assertEquals("anotherPassword123", user.getPassword());
        assertFalse(user.getIsActive());
    }
}
