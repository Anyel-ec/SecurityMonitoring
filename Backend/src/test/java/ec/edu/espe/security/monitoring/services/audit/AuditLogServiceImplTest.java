package ec.edu.espe.security.monitoring.services.audit;

import ec.edu.espe.security.monitoring.common.audit.models.AuditLog;
import ec.edu.espe.security.monitoring.feature.auth.model.UserInfo;
import ec.edu.espe.security.monitoring.common.audit.repositories.AuditLogRepository;
import ec.edu.espe.security.monitoring.feature.auth.repository.UserInfoRepository;
import ec.edu.espe.security.monitoring.common.security.jwt.JwtProvider;
import ec.edu.espe.security.monitoring.common.audit.services.AuditLogServiceImpl;
import jakarta.servlet.http.HttpServletRequest;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.List;
import java.util.Optional;

import static org.mockito.Mockito.*;

class AuditLogServiceImplTest {

    @Mock
    private AuditLogRepository auditLogRepository;

    @Mock
    private UserInfoRepository userInfoRepository;

    @Mock
    private JwtProvider jwtProvider;

    @InjectMocks
    private AuditLogServiceImpl auditLogService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);

        when(userInfoRepository.findByUsernameAndIsActiveTrue(anyString()))
                .thenReturn(new UserInfo());

        when(jwtProvider.getNombreUsuarioFromToken(anyString()))
                .thenReturn("mockUser");

        when(auditLogRepository.findById(anyLong()))
                .thenReturn(Optional.of(new AuditLog()));

        when(auditLogRepository.findAll())
                .thenReturn(List.of(new AuditLog()));


    }


    @Test
    void testSaveAuditLogWithExistingUser() {
        auditLogService.saveAuditLog(AuditLog.builder().username("user").build());
        verify(auditLogRepository, times(1)).save(any(AuditLog.class));
    }

    @Test
    void testSaveAuditLogWithNonExistingUser() {
        doThrow(new IllegalArgumentException("Mocked Exception")).when(userInfoRepository).findByUsernameAndIsActiveTrue(anyString());
        try {
            auditLogService.saveAuditLog(AuditLog.builder().username("invalidUser").build());
        } catch (Exception ignored) {
        }
        verify(auditLogRepository, never()).save(any(AuditLog.class));
    }

    @Test
    void testSaveAuditLogFromRequest() {
        HttpServletRequest request = mock(HttpServletRequest.class);
        when(request.getRemoteAddr()).thenReturn("127.0.0.1");
        when(request.getRequestURI()).thenReturn("/test/endpoint");
        when(request.getMethod()).thenReturn("POST");

        auditLogService.saveAuditLogFromRequest("Bearer token", "CREATE", 200, "Success", request, "bodyData");
        verify(auditLogRepository, times(1)).save(any(AuditLog.class));
    }

    @Test
    void testGetAllAuditLogs() {
        auditLogService.getAllAuditLogs();
        verify(auditLogRepository, times(1)).findAll();
    }

    @Test
    void testGetAuditLogById() {
        auditLogService.getAuditLogById(1L);
        verify(auditLogRepository, times(1)).findById(1L);
    }

    @Test
    void testDeleteAuditLog() {
        auditLogService.deleteAuditLog(1L);
        verify(auditLogRepository, times(1)).deleteById(1L);
    }
}
