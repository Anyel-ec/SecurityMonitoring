package ec.edu.espe.security.monitoring.common.interceptors;

import com.fasterxml.jackson.databind.ObjectMapper;
import ec.edu.espe.security.monitoring.common.dto.JsonResponseDto;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.jetbrains.annotations.NotNull;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import java.io.IOException;
import java.util.concurrent.*;

/*
 * Author: Anyel EC
 * Github: https://github.com/Anyel-ec
 * Creation date: 10/01/2025
 */

@Component
public class RequestTimeoutInterceptor implements HandlerInterceptor {

    private static final long TIMEOUT_LIMIT_MS = 60000;
    private final ExecutorService executorService = Executors.newCachedThreadPool();
    private final ObjectMapper objectMapper = new ObjectMapper();

    @Override
    public boolean preHandle(@NotNull HttpServletRequest request, @NotNull HttpServletResponse response, @NotNull Object handler) throws IOException {
        Future<Boolean> future = executorService.submit(() -> {
            try {
                Thread.sleep(TIMEOUT_LIMIT_MS + 1000);
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            }
            return true;
        });

        try {
            return future.get(TIMEOUT_LIMIT_MS, TimeUnit.MILLISECONDS);
        } catch (TimeoutException e) {
            future.cancel(true);
            sendResponse(response, HttpStatus.REQUEST_TIMEOUT, "La respuesta ha superado el límite de tiempo permitido (60 segundos).", null);
            return false;
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
            sendResponse(response, HttpStatus.INTERNAL_SERVER_ERROR, "Operación interrumpida", e.getMessage());
            return false;
        } catch (ExecutionException e) {
            sendResponse(response, HttpStatus.INTERNAL_SERVER_ERROR, "Error durante la ejecución de la tarea", e.getMessage());
            return false;
        }
    }

    private void sendResponse(HttpServletResponse response, HttpStatus status, String message, String errorDetail) throws IOException {
        JsonResponseDto responseDto = new JsonResponseDto(false, status.value(), message, errorDetail);
        response.setStatus(status.value());
        response.setContentType("application/json");
        response.getWriter().write(objectMapper.writeValueAsString(responseDto));
    }
}

