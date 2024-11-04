package ec.edu.espe.security.monitoring.services.impl.auth;

import ec.edu.espe.security.monitoring.models.UserInfo;
import ec.edu.espe.security.monitoring.repositories.UserInfoRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class AuthServiceImpl {
    private final UserInfoRepository userRepository;
    public List<UserInfo> getAllActiveUsers() {
        log.info("Obteniendo todos los usuarios activos");
        return userRepository.findByIsActiveTrue();
    }

}
