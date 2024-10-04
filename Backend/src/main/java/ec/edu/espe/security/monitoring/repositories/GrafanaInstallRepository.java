package ec.edu.espe.security.monitoring.repositories;

import ec.edu.espe.security.monitoring.models.installed.GrafanaInstall;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GrafanaInstallRepository extends JpaRepository<GrafanaInstall, Long> {
}
