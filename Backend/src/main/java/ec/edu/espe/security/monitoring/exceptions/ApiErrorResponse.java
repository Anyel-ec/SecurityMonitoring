package ec.edu.espe.security.monitoring.exceptions;

import ec.edu.espe.security.monitoring.dto.JsonResponseDto;
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

@ToString
@Getter
public final class ApiErrorResponse {

    private final boolean respuesta;
    private final int codigoHttp;
    private final String mensaje;
    private final Object resultado;

    @Builder
    private ApiErrorResponse(boolean respuesta, HttpStatus httpStatus, String mensaje, Collection<ApiError> errores) {
        this.respuesta = respuesta;
        this.codigoHttp = httpStatus.value();
        this.mensaje = mensaje;
        this.resultado = isNull(errores) ? emptyList() : errores;
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
}
