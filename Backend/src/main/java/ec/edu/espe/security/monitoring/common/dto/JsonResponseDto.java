package ec.edu.espe.security.monitoring.common.dto;

import io.swagger.v3.oas.annotations.media.Schema;

/*
 * Author: Anyel EC
 * Github: https://github.com/Anyel-ec
 * Creation date: 10/01/2025
 */

@Schema(description = "Response structure for the entire system")
public record JsonResponseDto(boolean success,
                              int httpCode,
                              String message,
                              Object result) {
}

