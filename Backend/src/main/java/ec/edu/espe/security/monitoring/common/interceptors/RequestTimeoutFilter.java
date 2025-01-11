package ec.edu.espe.security.monitoring.common.interceptors;

import org.springframework.http.HttpStatus;
import jakarta.servlet.*;
import jakarta.servlet.http.HttpServletResponse;
import com.fasterxml.jackson.databind.ObjectMapper;
import ec.edu.espe.security.monitoring.common.dto.JsonResponseDto;
import java.io.IOException;
import java.util.concurrent.*;

/*
 * Author: Anyel EC
 * Github: https://github.com/Anyel-ec
 * Creation date: 10/01/2025
 */
public class RequestTimeoutFilter implements Filter {

    private static final long TIMEOUT_LIMIT_MS = 15000;
    private final ExecutorService executorService = Executors.newCachedThreadPool();
    private final ObjectMapper objectMapper = new ObjectMapper();

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException {
        Future<?> future = executorService.submit(() -> {
            try {
                chain.doFilter(request, response);
            } catch (Exception e) {
                e.printStackTrace();
            }
        });

        try {
            future.get(TIMEOUT_LIMIT_MS, TimeUnit.MILLISECONDS);
        } catch (TimeoutException e) {
            sendTimeoutResponse((HttpServletResponse) response);
            future.cancel(true);
        } catch (Exception e) {
            sendErrorResponse((HttpServletResponse) response, e);
        }
    }

    private void sendTimeoutResponse(HttpServletResponse response) throws IOException {
        response.setStatus(HttpStatus.REQUEST_TIMEOUT.value());
        JsonResponseDto responseDto = new JsonResponseDto(false, HttpStatus.REQUEST_TIMEOUT.value(),
                "La respuesta ha superado el límite de tiempo permitido (15 segundos).", null);
        response.getWriter().write(objectMapper.writeValueAsString(responseDto));
    }

    private void sendErrorResponse(HttpServletResponse response, Exception e) throws IOException {
        response.setStatus(HttpStatus.INTERNAL_SERVER_ERROR.value());
        JsonResponseDto responseDto = new JsonResponseDto(false, HttpStatus.INTERNAL_SERVER_ERROR.value(),
                "Error interno al procesar la solicitud.", e.getMessage());
        response.getWriter().write(objectMapper.writeValueAsString(responseDto));
    }
}
