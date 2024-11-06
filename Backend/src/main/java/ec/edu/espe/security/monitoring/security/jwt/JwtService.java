package ec.edu.espe.security.monitoring.security.jwt;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Collection;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Component
public class JwtService {

    @Value("${secret.key.jwt}") // JWT secret key for signing tokens, injected from properties
    private String secretKeyJwt;

    @Value("${jwt.expiration.time.min}") // JWT expiration time in minutes, injected from properties
    private long jwtExpirationTime;

    // Extracts the username (subject) from a JWT token
    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    // Extracts the expiration date from a JWT token
    public Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    // General method to extract any claim from the token using a function
    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    // Parses and retrieves all claims from the token using the secret key
    private Claims extractAllClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(getSignKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    // Checks if the token is expired
    private Boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    // Validates the token by checking the username and expiration
    public Boolean validateToken(String token, UserDetails userDetails) {
        final String username = extractUsername(token);
        return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }

    // Generates a JWT token for a given user
    public String generateToken(UserDetails userDetails) {
        Map<String, Object> claims = new HashMap<>();
        return createToken(claims, userDetails.getUsername(), userDetails.getAuthorities());
    }

    // Creates a JWT token with claims, username, roles, and expiration
    public String createToken(Map<String, Object> claims, String username, Collection<? extends GrantedAuthority> authorities) {
        // Adds roles to the claims
        claims.put("roles", authorities.stream()
                .map(GrantedAuthority::getAuthority)
                .toList());

        return Jwts.builder()
                .setClaims(claims)
                .setSubject(username)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + jwtExpirationTime * 60 * 1000)) // Converts minutes to milliseconds
                .signWith(getSignKey(), SignatureAlgorithm.HS256) // Signs the token with the secret key
                .compact();
    }

    // Retrieves the signing key from the secret key, decoding it from Base64 format
    private Key getSignKey() {
        byte[] keyBytes = Decoders.BASE64.decode(secretKeyJwt);
        return Keys.hmacShaKeyFor(keyBytes);
    }
}

