package ec.edu.espe.security.monitoring.modules.features.auth.repository;

import ec.edu.espe.security.monitoring.modules.features.auth.model.UserRole;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
/*
 * Author: Anyel EC
 * Github: https://github.com/Anyel-ec
 * Creation date: 04/11/2024
 */

@Repository
public interface UserRoleRepository extends JpaRepository<UserRole, Long> {

    // Finds an active user role by its name
    Optional<UserRole> findByNameAndIsActiveTrue(String name);
}
