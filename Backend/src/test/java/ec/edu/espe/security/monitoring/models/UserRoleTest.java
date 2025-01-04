package ec.edu.espe.security.monitoring.models;
import ec.edu.espe.security.monitoring.features.auth.model.UserRole;
import org.junit.jupiter.api.Test;


import static org.junit.jupiter.api.Assertions.*;
/*
 * Author: Anyel EC
 * Github: https://github.com/Anyel-ec
 * Creation date: 02/01/2025
 */
class UserRoleTest {

    @Test
    void testUserRoleBuilderAndAttributes() {
        UserRole role = UserRole.builder()
                .name("Manager")
                .description("Manager role")
                .hierarchy(2)
                .isActive(true)
                .build();

        assertEquals("Manager", role.getName());
        assertEquals("Manager role", role.getDescription());
        assertEquals(2, role.getHierarchy());
        assertTrue(role.getIsActive());
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
        role.setName("Editor");
        role.setDescription("Editor role");
        role.setHierarchy(3);
        role.setIsActive(false);

        assertEquals("Editor", role.getName());
        assertEquals("Editor role", role.getDescription());
        assertEquals(3, role.getHierarchy());
        assertFalse(role.getIsActive());
    }
}