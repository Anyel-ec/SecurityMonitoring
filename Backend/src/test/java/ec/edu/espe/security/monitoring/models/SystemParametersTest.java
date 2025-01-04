package ec.edu.espe.security.monitoring.models;

/*
 * Author: Anyel EC
 * Github: https://github.com/Anyel-ec
 * Creation date: 02/01/2025
 */
import ec.edu.espe.security.monitoring.common.system.models.SystemParameters;
import org.junit.jupiter.api.Test;

import jakarta.validation.Validation;
import jakarta.validation.Validator;
import jakarta.validation.ValidatorFactory;
import java.time.LocalDateTime;

import static org.junit.jupiter.api.Assertions.*;
class SystemParametersTest {

    @Test
    void testSystemParametersConstructorAndAttributes() {
        // Create a SystemParameters object using the constructor
        SystemParameters parameters = new SystemParameters(
                "maxConnections",
                "Maximum allowed database connections",
                "100",
                true
        );

        // Verify the attributes
        assertEquals("maxConnections", parameters.getName());
        assertEquals("Maximum allowed database connections", parameters.getDescription());
        assertEquals("100", parameters.getParamValue());
        assertTrue(parameters.isActive());
    }

    @Test
    void testDefaultConstructor() {
        // Create a SystemParameters object using the default constructor
        SystemParameters parameters = new SystemParameters();

        // Verify the default values
        assertNull(parameters.getId());
        assertNull(parameters.getName());
        assertNull(parameters.getDescription());
        assertNull(parameters.getParamValue());
        assertFalse(parameters.isActive());
        assertNull(parameters.getCreatedAt());
    }

    @Test
    void testSettersAndGetters() {
        // Create a SystemParameters object
        SystemParameters parameters = new SystemParameters();

        // Use setters to set values
        parameters.setId(1L);
        parameters.setName("timeout");
        parameters.setDescription("Request timeout in seconds");
        parameters.setParamValue("30");
        parameters.setActive(true);

        // Verify the values with getters
        assertEquals(1L, parameters.getId());
        assertEquals("timeout", parameters.getName());
        assertEquals("Request timeout in seconds", parameters.getDescription());
        assertEquals("30", parameters.getParamValue());
        assertTrue(parameters.isActive());
    }

    @Test
    void testValidationForNameNotBlank() {
        // Configure the validator
        ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
        Validator validator = factory.getValidator();

        // Create a SystemParameters object with a blank `name` field
        SystemParameters parameters = new SystemParameters();
        parameters.setName("");

        // Validate the object
        var violations = validator.validate(parameters);

        // Verify that a violation of the `@NotBlank` constraint occurs
        assertFalse(violations.isEmpty());
        assertTrue(violations.stream().anyMatch(v -> v.getPropertyPath().toString().equals("name")));
    }

    @Test
    void testValidationForValidName() {
        // Configure the validator
        ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
        Validator validator = factory.getValidator();

        // Create a SystemParameters object with a valid `name` field
        SystemParameters parameters = new SystemParameters();
        parameters.setName("retryAttempts");

        // Validate the object
        var violations = validator.validate(parameters);

        // Verify that no violations occur
        assertTrue(violations.isEmpty());
    }

    @Test
    void testCreationTimestampNotNull() {
        // Create a SystemParameters object
        SystemParameters parameters = new SystemParameters();
        parameters.setCreatedAt(LocalDateTime.now());

        // Verify that the timestamp is assigned correctly
        assertNotNull(parameters.getCreatedAt());
    }
}
