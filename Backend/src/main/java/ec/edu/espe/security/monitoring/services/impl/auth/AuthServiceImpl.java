package ec.edu.espe.security.monitoring.services.impl.auth;

import ec.edu.espe.security.monitoring.dto.request.LoginRequestDto;
import ec.edu.espe.security.monitoring.models.UserInfo;
import ec.edu.espe.security.monitoring.repositories.UserInfoRepository;
import ec.edu.espe.security.monitoring.security.jwt.JwtService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class AuthServiceImpl {
    private final UserInfoRepository userRepository;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    public List<UserInfo> getAllActiveUsers() {
        log.info("Obteniendo todos los usuarios activos");
        return userRepository.findByIsActiveTrue();
    }

    public String authenticate(LoginRequestDto loginRequest) {
        // Authenticate the user using the provided username and password
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getUsername(),
                        loginRequest.getPassword()
                )
        );

        // Retrieve the UserDetails from the authentication object
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();

        // Generate and return the JWT token
        return jwtService.generateToken(userDetails);
    }

}
