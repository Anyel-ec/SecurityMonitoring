package ec.edu.espe.security.monitoring.services.auth;

/*
 * Author: Anyel EC
 * Github: https://github.com/Anyel-ec
 * Creation date: 02/01/2025
 */

import ec.edu.espe.security.monitoring.dto.request.LoginRequestDto;
import ec.edu.espe.security.monitoring.dto.response.JsonResponseDto;
import ec.edu.espe.security.monitoring.models.UserInfo;
import ec.edu.espe.security.monitoring.repositories.UserInfoRepository;
import ec.edu.espe.security.monitoring.security.jwt.JwtProvider;
import ec.edu.espe.security.monitoring.security.jwt.JwtRevokedToken;
import ec.edu.espe.security.monitoring.services.impl.auth.AuthServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.when;

class AuthServiceImplTest {

    @Mock
    private UserInfoRepository userRepository;

    @Mock
    private PasswordEncoder encoder;

    @Mock
    private JwtProvider jwtProvider;

    @Mock
    private JwtRevokedToken jwtRevokedToken;

    @InjectMocks
    private AuthServiceImpl authService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testAuthenticate() {
        // Mock data
        LoginRequestDto loginRequest = new LoginRequestDto();
        loginRequest.setUsername("testUser");
        loginRequest.setPassword("password");

        UserInfo user = new UserInfo();
        user.setUsername("testUser");
        user.setPassword("encodedPassword");

        when(userRepository.findByUsernameAndIsActiveTrue("testUser")).thenReturn(user);
        when(encoder.matches("password", "encodedPassword")).thenReturn(true);
        when(jwtProvider.generateJwtByUsername(any(UserInfo.class))).thenReturn("mockJwtToken");

        // Test method
        JsonResponseDto response = authService.authenticate(loginRequest);

        // Assert and verify
        assertEquals(HttpStatus.OK.value(), response.httpCode());
    }

    @Test
    void testGetUserDetails() {
        // Mock data
        String token = "mockToken";
        UserInfo user = new UserInfo();
        user.setUsername("testUser");

        when(jwtProvider.getNombreUsuarioFromToken(token)).thenReturn("testUser");
        when(userRepository.findByUsernameAndIsActiveTrue("testUser")).thenReturn(user);

        // Test method
        JsonResponseDto response = authService.getUserDetails(token);

        // Assert and verify
        assertEquals(HttpStatus.OK.value(), response.httpCode());

    }

    @Test
    void testRevokeToken() {
        // Mock data
        String token = "mockToken";

        // No exception should be thrown
        doNothing().when(jwtRevokedToken).revokeToken(token);

        // Test method
        JsonResponseDto response = authService.revokeToken(token);

        // Assert and verify
        assertEquals(HttpStatus.OK.value(), response.httpCode());
    }

    @Test
    void testGetAllActiveUsers() {
        // Mock data
        UserInfo user = new UserInfo();
        user.setUsername("testUser");

        when(userRepository.findByIsActiveTrue()).thenReturn(List.of(user));

        // Test method
        List<UserInfo> users = authService.getAllActiveUsers();

        // Assert and verify
        assertEquals(1, users.size());
        assertEquals("testUser", users.get(0).getUsername());
    }
}