package ec.edu.espe.security.monitoring.models;

import ec.edu.espe.security.monitoring.modules.features.auth.model.UserRole;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class UserRoleTest {

    @Test
    void testUserRoleBuilderAndAttributes() {
        UserRole role = UserRole.builder()
                .id(1L)
                .name("Manager")
                .description("Manager role")
                .hierarchy(2)
                .isActive(true)
                .build();

        assertEquals(1L, role.getId());
        assertEquals("Manager", role.getName());
        assertEquals("Manager role", role.getDescription());
        assertEquals(2, role.getHierarchy());
        assertTrue(role.getIsActive());
    }

    @Test
    void testEqualsAndHashCode() {
        UserRole role1 = UserRole.builder().id(1L).build();
        UserRole role2 = UserRole.builder().id(1L).build();
        UserRole role3 = UserRole.builder().id(2L).build();

        assertEquals(role1, role2); // Mismo ID -> Deben ser iguales
        assertNotEquals(role1, role3); // ID diferente -> Deben ser distintos
        assertEquals(role1.hashCode(), role2.hashCode()); // Mismo ID -> Mismo hash
        assertNotEquals(role1.hashCode(), role3.hashCode()); // Diferente ID -> Diferente hash
    }

    @Test
    void testDefaultValues() {
        UserRole role = new UserRole();

        assertNull(role.getName());
        assertNull(role.getDescription());
        assertEquals(0, role.getHierarchy());
        assertNull(role.getIsActive());
    }

    @Test
    void testSettersAndGetters() {
        UserRole role = new UserRole();
        role.setId(3L);
        role.setName("Editor");
        role.setDescription("Editor role");
        role.setHierarchy(3);
        role.setIsActive(false);

        assertEquals(3L, role.getId());
        assertEquals("Editor", role.getName());
        assertEquals("Editor role", role.getDescription());
        assertEquals(3, role.getHierarchy());
        assertFalse(role.getIsActive());
    }
}
