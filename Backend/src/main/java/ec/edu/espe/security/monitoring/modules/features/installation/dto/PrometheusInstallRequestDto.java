package ec.edu.espe.security.monitoring.modules.features.installation.dto;

import ec.edu.espe.security.monitoring.modules.features.installation.validations.PortNotInUse;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.util.HashSet;
import java.util.Set;
/*
 * Author: Anyel EC
 * Github: https://github.com/Anyel-ec
 * Creation date: 04/11/2024
 */
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
    @PortNotInUse(message = "El puerto externo ya está en uso por Docker", checkDocker = true)
    private int externalPort;

    @NotNull(message = "El puerto interno de alertamanager no puede ser nulo")
    @Min(value = 1, message = "El puerto interno  de alertamanager debe ser mayor a 0")
    @Max(value = 65535, message = "El puerto interno de alertamanager debe ser menor o igual a 65535")
    @PortNotInUse(message = "El puerto interno de alertamanager ya está en uso")
    private int internalPortAlertmanager;

    @NotNull(message = "El puerto externo de alertamanager no puede ser nulo")
    @Min(value = 1, message = "El puerto externo de alertamanager debe ser mayor a 0")
    @Max(value = 65535, message = "El puerto externo  de alertamanagerdebe ser menor o igual a 65535")
    @PortNotInUse(message = "El puerto externo ya está en uso por Docker", checkDocker = true)
    private int externalPortAlertmanager;

    public void validateUniquePorts() {
        Set<Integer> usedPorts = new HashSet<>();

        // add Prometheus ports
        usedPorts.add(internalPort);
        usedPorts.add(externalPort);

        // validare Alertmanager ports
        if (usedPorts.contains(internalPortAlertmanager) || usedPorts.contains(externalPortAlertmanager)) {
            throw new IllegalArgumentException("Los puertos de Alertmanager no pueden repetirse con otros servicios");
        }
        usedPorts.add(internalPortAlertmanager);
        usedPorts.add(externalPortAlertmanager);
    }
}