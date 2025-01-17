package ec.edu.espe.security.monitoring.modules.features.installation.dto;

import ec.edu.espe.security.monitoring.modules.features.installation.validations.PortNotInUse;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import lombok.ToString;

import java.util.HashSet;
import java.util.Set;

@ToString
@Data
@RequiredArgsConstructor
public class ExporterPrometheusInstallRequestDto {

    @NotNull(message = "El puerto interno de Postgres no puede ser nulo")
    @Min(value = 1, message = "El puerto interno de Postgres debe ser mayor a 0")
    @Max(value = 65535, message = "El puerto interno de Postgres debe ser menor o igual a 65535")
    @PortNotInUse(message = "El puerto interno de Postgres ya está en uso", checkDocker = true)
    private int internalPortPostgres;

    @NotNull(message = "El puerto externo de Postgres no puede ser nulo")
    @Min(value = 1, message = "El puerto externo de Postgres debe ser mayor a 0")
    @Max(value = 65535, message = "El puerto externo de Postgres debe ser menor o igual a 65535")
    @PortNotInUse(message = "El puerto externo de Postgres ya está en uso")
    private int externalPortPostgres;

    @NotNull(message = "El puerto interno de MariaDB no puede ser nulo")
    @Min(value = 1, message = "El puerto interno de MariaDB debe ser mayor a 0")
    @Max(value = 65535, message = "El puerto interno de MariaDB debe ser menor o igual a 65535")
    @PortNotInUse(message = "El puerto interno de MariaDB ya está en uso", checkDocker = true)
    private int internalPortMariadb;

    @NotNull(message = "El puerto externo de MariaDB no puede ser nulo")
    @Min(value = 1, message = "El puerto externo de MariaDB debe ser mayor a 0")
    @Max(value = 65535, message = "El puerto externo de MariaDB debe ser menor o igual a 65535")
    @PortNotInUse(message = "El puerto externo de MariaDB ya está en uso")
    private int externalPortMariadb;

    @NotNull(message = "El puerto interno de MongoDB no puede ser nulo")
    @Min(value = 1, message = "El puerto interno de MongoDB debe ser mayor a 0")
    @Max(value = 65535, message = "El puerto interno de MongoDB debe ser menor o igual a 65535")
    @PortNotInUse(message = "El puerto interno de MongoDB ya está en uso", checkDocker = true)
    private int internalPortMongodb;

    @NotNull(message = "El puerto externo de MongoDB no puede ser nulo")
    @Min(value = 1, message = "El puerto externo de MongoDB debe ser mayor a 0")
    @Max(value = 65535, message = "El puerto externo de MongoDB debe ser menor o igual a 65535")
    @PortNotInUse(message = "El puerto externo de MongoDB ya está en uso")
    private int externalPortMongodb;

    public void validateUniquePorts() {
        Set<Integer> usedPorts = new HashSet<>();

        usedPorts.add(internalPortPostgres);
        usedPorts.add(externalPortPostgres);

        // validate mariabd
        if (usedPorts.contains(internalPortMariadb) || usedPorts.contains(externalPortMariadb)) {
            throw new IllegalArgumentException("Los puertos de MariaDB no pueden repetir valores con Postgres");
        }
        usedPorts.add(internalPortMariadb);
        usedPorts.add(externalPortMariadb);

        // validate mongodb
        if (usedPorts.contains(internalPortMongodb) || usedPorts.contains(externalPortMongodb)) {
            throw new IllegalArgumentException("Los puertos de MongoDB no pueden repetir valores con Postgres o MariaDB");
        }
        usedPorts.add(internalPortMongodb);
        usedPorts.add(externalPortMongodb);
    }
}
