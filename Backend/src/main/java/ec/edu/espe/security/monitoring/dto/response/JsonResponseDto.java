package ec.edu.espe.security.monitoring.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
@Schema(description = "Modelo de respuesta por defecto")
public record JsonResponseDto(boolean success,
                              int httpCode,
                              String message,
                              Object result) {
}

