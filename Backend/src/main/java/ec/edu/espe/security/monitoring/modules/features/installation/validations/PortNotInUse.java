package ec.edu.espe.security.monitoring.modules.features.installation.validations;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/*
 * Author: Anyel EC
 * Github: https://github.com/Anyel-ec
 * Creation date: 05/01/2025
 */
@Constraint(validatedBy = PortInUseValidator.class)
@Target({ElementType.FIELD, ElementType.PARAMETER})
@Retention(RetentionPolicy.RUNTIME)
public @interface PortNotInUse {
    String message() default "El puerto especificado ya está en uso";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
    boolean checkDocker() default false;
}