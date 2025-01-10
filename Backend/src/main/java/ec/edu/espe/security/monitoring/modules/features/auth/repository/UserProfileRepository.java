package ec.edu.espe.security.monitoring.modules.features.auth.repository;

import ec.edu.espe.security.monitoring.modules.features.auth.model.UserInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserProfileRepository extends JpaRepository<UserInfo, Long> {
    UserInfo findByUsernameAndIsActiveTrue(String username);
}
