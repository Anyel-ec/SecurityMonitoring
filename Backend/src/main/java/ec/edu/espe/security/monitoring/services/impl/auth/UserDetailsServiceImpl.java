package ec.edu.espe.security.monitoring.services.impl.auth;

import ec.edu.espe.security.monitoring.models.UserInfo;
import ec.edu.espe.security.monitoring.repositories.UserInfoRepository;
import ec.edu.espe.security.monitoring.security.CustomUserDetails;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;
@Component
@Slf4j
@RequiredArgsConstructor
public class UserDetailsServiceImpl implements UserDetailsService {
    
    private final UserInfoRepository userInfoRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        log.info("Entering in loadUserByUsername Method...");
        UserInfo user = userInfoRepository.findByUsernameAndIsActiveTrue(username);
        if(user == null){
            log.info("Username not found: " + username);
            throw new UsernameNotFoundException("could not found user..!!");
        }
        log.info("User Authenticated Successfully..!!!");

        // Crear y devolver un objeto UserDetails con los roles del usuario
        return new CustomUserDetails(user);
    }
}
