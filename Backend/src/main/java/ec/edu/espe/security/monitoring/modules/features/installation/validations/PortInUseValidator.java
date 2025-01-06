package ec.edu.espe.security.monitoring.modules.features.installation.validations;

/*
 * Author: Anyel EC
 * Github: https://github.com/Anyel-ec
 * Creation date: 05/01/2025
 */
import ec.edu.espe.security.monitoring.modules.features.installation.services.interfaces.PortCheckService;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class PortInUseValidator implements ConstraintValidator<PortNotInUse, Integer> {

    private final PortCheckService portCheckService;
    private boolean checkDocker;

    @Override
    public void initialize(PortNotInUse constraintAnnotation) {
        this.checkDocker = constraintAnnotation.checkDocker();
    }

    @Override
    public boolean isValid(Integer port, ConstraintValidatorContext context) {
        if (port == null) {
            return true;
        }

        boolean isInUse = checkDocker ? portCheckService.isPortDockerInUse(port)
                : portCheckService.isPortInUse(port);

        return !isInUse;
    }
}