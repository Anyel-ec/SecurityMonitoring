package ec.edu.espe.security.monitoring.common.exceptions;

import ec.edu.espe.security.monitoring.common.dto.JsonResponseDto;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.Collection;

import static java.util.Collections.emptyList;
import static java.util.Objects.isNull;
import static org.springframework.http.HttpStatus.*;
import static org.springframework.http.MediaType.APPLICATION_JSON;
/*
 * Author: Anyel EC
 * Github: https://github.com/Anyel-ec
 * Creation date: 10/01/2025
 */
@ToString
@Getter
public final class ApiErrorResponse {

    private final boolean respuesta;
    private final int httpCode;
    private final String message;
    private final Object result;

    @Builder
    private ApiErrorResponse(boolean respuesta, HttpStatus httpStatus, String mensaje, Collection<ApiError> errores) {
        this.respuesta = respuesta;
        this.httpCode = httpStatus.value();
        this.message = mensaje;
        this.result = isNull(errores) ? emptyList() : errores;
    }

    private static ResponseEntity<JsonResponseDto> buildResponse(HttpStatus status, String mensaje, Object resultado) {
        JsonResponseDto response = new JsonResponseDto(false, status.value(), mensaje, resultado);
        return ResponseEntity.status(status).contentType(APPLICATION_JSON).body(response);
    }

    public static ResponseEntity<JsonResponseDto> badRequest(String mensaje) {
        return buildResponse(BAD_REQUEST, mensaje, null);
    }

    public static ResponseEntity<JsonResponseDto> notFound(String mensaje) {
        return buildResponse(NOT_FOUND, mensaje, null);
    }

    public static ResponseEntity<JsonResponseDto> unprocessableEntity(Collection<ApiError> errores, String mensaje) {
        return buildResponse(UNPROCESSABLE_ENTITY, mensaje, errores);
    }

    public static ResponseEntity<JsonResponseDto> conflict(String mensaje) {
        return buildResponse(CONFLICT, mensaje, null);
    }

    public static ResponseEntity<JsonResponseDto> methodNotAllowed(HttpHeaders headers, String mensaje) {
        return buildResponse(METHOD_NOT_ALLOWED, mensaje, null);
    }

    public static ResponseEntity<JsonResponseDto> notAcceptable(String mensaje) {
        return buildResponse(NOT_ACCEPTABLE, mensaje, null);
    }

    public static ResponseEntity<JsonResponseDto> unsupportedMediaType(HttpHeaders headers, String mensaje) {
        return buildResponse(UNSUPPORTED_MEDIA_TYPE, mensaje, null);
    }

    public static ResponseEntity<JsonResponseDto> internalServerError(String mensaje) {
        return buildResponse(INTERNAL_SERVER_ERROR, mensaje, null);
    }

    public static ResponseEntity<JsonResponseDto> internalServerError(String mensaje, Collection<ApiError> errores) {
        return buildResponse(INTERNAL_SERVER_ERROR, mensaje, errores);
    }

    public static ResponseEntity<JsonResponseDto> forbidden(String mensaje) {
        return buildResponse(FORBIDDEN, mensaje, null);
    }

}
