package ec.edu.espe.security.monitoring.modules.features.auth.repository;

import ec.edu.espe.security.monitoring.modules.features.auth.model.UserInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
/*
 * Author: Anyel EC
 * Github: https://github.com/Anyel-ec
 * Creation date: 10/01/2025
 */
@Repository
public interface UserInfoRepository extends JpaRepository<UserInfo, Long> {

    // Finds an active user by their username
    UserInfo findByUsernameAndIsActiveTrue(String username);

    // Retrieves all active users
    List<UserInfo> findByIsActiveTrue();

    // Finds an active user by their email
    UserInfo findByEmailAndIsActiveTrue(String email);

}

