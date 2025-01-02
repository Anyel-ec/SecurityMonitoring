package ec.edu.espe.security.monitoring.security.jwt;

/*
 * Author: Anyel EC
 * Github: https://github.com/Anyel-ec
 * Creation date: 02/01/2025
 */
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Slf4j
@Component
public class JwtRevokedToken {

    private final Map<String, LocalDateTime> revokedTokens = new ConcurrentHashMap<>();

    // Adds a token to the list of revoked tokens
    public void revokeToken(String token) {
        revokedTokens.put(token, LocalDateTime.now());
        log.debug("Token agregado a la lista de revocados: {}", token);
    }

    // Checks if a token is revoked
    public boolean isTokenRevoked(String token) {
        return revokedTokens.containsKey(token);
    }

    // Scheduled task to clean expired tokens every hour
    @Scheduled(cron = "0 0 * * * ?") // Execute every hour,
    public void cleanExpiredTokens() {
        // Delete tokens that have been revoked for more than 3 hours
        revokedTokens.entrySet().removeIf(entry ->
                entry.getValue().isBefore(LocalDateTime.now().minusHours(3)));
        log.info("Tokens expirados eliminados. Tokens restantes: {}", revokedTokens.size());
    }

}
