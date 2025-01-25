package ec.edu.espe.security.monitoring.common.security.jwt;

import com.fasterxml.jackson.databind.ObjectMapper;
import ec.edu.espe.security.monitoring.common.dto.JsonResponseDto;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import java.io.IOException;

/*
 * Author: Anyel EC
 * Github: https://github.com/Anyel-ec
 * Creation date: 25/12/2024
 */
@Component
@Slf4j
public class JwtEntryPoint implements AuthenticationEntryPoint {

    // This method intercepts unauthenticated requests and returns a response with an error message in JSON format.
    @Override
    public void commence(HttpServletRequest req, HttpServletResponse res, AuthenticationException e)
            throws IOException {
        JsonResponseDto resp = new JsonResponseDto(Boolean.FALSE, HttpStatus.UNAUTHORIZED.value(), "Unauthorized", null);
        res.setContentType("application/json");
        res.setStatus(HttpStatus.UNAUTHORIZED.value());
        res.getWriter().write(new ObjectMapper().writeValueAsString(resp));
        res.getWriter().flush();
        res.getWriter().close();
    }

}
