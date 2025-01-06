package ec.edu.espe.security.monitoring.modules.features.installation.dto;

import ec.edu.espe.security.monitoring.modules.features.installation.validations.PortNotInUse;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@RequiredArgsConstructor
public class PrometheusInstallRequestDto {

    @NotNull(message = "El puerto interno no puede ser nulo")
    @Min(value = 1, message = "El puerto interno debe ser mayor a 0")
    @Max(value = 65535, message = "El puerto interno debe ser menor o igual a 65535")
    @PortNotInUse(message = "El puerto interno ya está en uso")
    private int internalPort;

    @NotNull(message = "El puerto externo no puede ser nulo")
    @Min(value = 1, message = "El puerto externo debe ser mayor a 0")
    @Max(value = 65535, message = "El puerto externo debe ser menor o igual a 65535")
    @PortNotInUse(message = "El puerto interno ya está en uso por Docker", checkDocker = true)
    private int externalPort;


    public PrometheusInstallRequestDto(int internalPort, int externalPort) {
    }
}