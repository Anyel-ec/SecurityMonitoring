package ec.edu.espe.security.monitoring.common.dto;

import io.swagger.v3.oas.annotations.media.Schema;
@Schema(description = "Response structure for the entire system")
public record JsonResponseDto(boolean success,
                              int httpCode,
                              String message,
                              Object result) {
}

