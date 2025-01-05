package ec.edu.espe.security.monitoring.common.security.jwt;

import ec.edu.espe.security.monitoring.modules.features.auth.model.UserInfo;
import ec.edu.espe.security.monitoring.common.security.config.PrimaryUser;
import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.SignatureException;
import lombok.extern.slf4j.Slf4j;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

/*
 * Author: Anyel EC
 * Github: https://github.com/Anyel-ec
 * Creation date: 25/12/2024
 */
@Component
@Slf4j
public class JwtProvider {
    private static final String CLAIMROLES = "roles";

    @Value("${secret.key.jwt}")
    private String secret;

    @Value("${jwt.expiration.time.min}")
    private int expiration;

    //  Generates a JWT token for an authenticated user.
    public String generateToken(Authentication authentication) {
        PrimaryUser usuarioPrincipal = (PrimaryUser) authentication.getPrincipal();
        List<String> roles = usuarioPrincipal.getAuthorities().stream().map(GrantedAuthority::getAuthority).collect(Collectors.toList());
        return Jwts.builder()
                .subject(usuarioPrincipal.getUsername())
                .claim(CLAIMROLES, roles)
                .issuedAt(new Date())
                .expiration(new Date(new Date().getTime() + (long) expiration * 60 * 1000))
                .signWith(getSecret(secret))
                .compact();
    }

    //  Generates a JWT token for a specific user based on their username
    public String generateJwtByUsername(UserInfo user) {
        PrimaryUser usuarioPrincipal = PrimaryUser.build(user);
        List<String> roles = usuarioPrincipal.getAuthorities().stream().map(GrantedAuthority::getAuthority).collect(Collectors.toList());
        return Jwts.builder()
                .subject(user.getUsername())
                .claim(CLAIMROLES, roles)
                .issuedAt(new Date())
                .expiration(new Date(new Date().getTime() + (long) expiration * 60 * 1000))
                .signWith(getSecret(secret))
                .compact();
    }

    // Extracts the username from a given JWT token.
    public String getNombreUsuarioFromToken(String token) {
        Jws<Claims> parsed = Jwts.parser().verifyWith(getSecret(secret)).build().parseSignedClaims(token);
        return parsed.getPayload().getSubject();
    }

    // Validates the given JWT token to ensure it is well-formed, signed, and not expired.
    public boolean validateToken(String token) {
        try {
            Jwts.parser().verifyWith(getSecret(secret)).build().parseSignedClaims(token);
            return true;
        } catch (MalformedJwtException e) {
            log.error("Token JWT inválido");
        } catch (UnsupportedJwtException e) {
            log.error("Token JWT no soportado");
        } catch (ExpiredJwtException e) {
            log.error("Token JWT expirado");
        } catch (IllegalArgumentException e) {
            log.error("La cadena de claims del JWT está vacía");
        } catch (SignatureException e) {
            log.error("Firma del JWT inválida");
        } catch (JwtException e) {
            log.error("JWT inválido");
        }
        return false;
    }


    //  Converts a base64-encoded secret string into a SecretKey.
    private SecretKey getSecret(String secret) {
        byte[] secretBytes = Decoders.BASE64URL.decode(secret);
        return Keys.hmacShaKeyFor(secretBytes);
    }
}
