package ec.edu.espe.security.monitoring.exceptions;

import ec.edu.espe.security.monitoring.dto.response.JsonResponseDto;
import jakarta.validation.ConstraintViolationException;
import lombok.extern.slf4j.Slf4j;
import org.jetbrains.annotations.NotNull;
import org.springframework.beans.TypeMismatchException;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.util.CollectionUtils;
import org.springframework.web.HttpMediaTypeNotAcceptableException;
import org.springframework.web.HttpMediaTypeNotSupportedException;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.MissingPathVariableException;
import org.springframework.web.bind.MissingServletRequestParameterException;
import org.springframework.web.bind.ServletRequestBindingException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;
import org.springframework.web.servlet.NoHandlerFoundException;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.util.List;

@RestControllerAdvice
@Slf4j
public class ApiExceptionHandler extends ResponseEntityExceptionHandler {

    // Handle 404 errors when no handler is found
    @Override
    protected ResponseEntity<Object> handleNoHandlerFoundException(NoHandlerFoundException ex,
                                                                   @NotNull HttpHeaders headers, HttpStatusCode status, WebRequest request) {
        log.warn("No handler found for URL: " + ex.getRequestURL());
        JsonResponseDto response = new JsonResponseDto(false, 404, "No se encontró el recurso solicitado: " + ex.getRequestURL(), null);
        return ResponseEntity.status(404).body(response);
    }

    // Handle internal server errors in request handling
    @Override
    protected ResponseEntity<Object> handleExceptionInternal(@NotNull Exception ex, Object body,
                                                             @NotNull HttpHeaders headers, HttpStatusCode statusCode, WebRequest request) {
        log.error("Internal error handling request: " + request.getDescription(false), ex);

        JsonResponseDto response = new JsonResponseDto(false, statusCode.value(), "Error interno: " + ex.getMessage(), null);
        return ResponseEntity.status(statusCode).headers(headers).body(response);
    }

    // Handle malformed JSON in request body
    @Override
    protected ResponseEntity<Object> handleHttpMessageNotReadable(@NotNull HttpMessageNotReadableException ex,
                                                                  @NotNull HttpHeaders headers, @NotNull HttpStatusCode status, @NotNull WebRequest request) {
        ResponseEntity<JsonResponseDto> response = ApiErrorResponse.badRequest("Solicitud JSON mal formada");
        return ResponseEntity.status(response.getStatusCode())
                .headers(headers)
                .body(response.getBody());
    }

    // Handle type mismatch errors (e.g., when a URL or request parameter is of an unexpected type)
    @Override
    protected ResponseEntity<Object> handleTypeMismatch(@NotNull TypeMismatchException ex,
                                                        @NotNull HttpHeaders headers, @NotNull HttpStatusCode status, @NotNull WebRequest request) {

        ResponseEntity<JsonResponseDto> response = ApiErrorResponse.badRequest("Solicitud de no coincidencia de tipos");
        return ResponseEntity.status(response.getStatusCode())
                .headers(headers)
                .body(response.getBody());
    }

    // Handle unsupported HTTP methods (e.g., POST instead of GET)
    @Override
    protected ResponseEntity<Object> handleHttpRequestMethodNotSupported(HttpRequestMethodNotSupportedException exception,
                                                                         @NotNull HttpHeaders headers, @NotNull HttpStatusCode status, @NotNull WebRequest request) {
        var supportedMethods = exception.getSupportedHttpMethods();
        if (!CollectionUtils.isEmpty(supportedMethods)) {
            headers.setAllow(supportedMethods);
        }
        ResponseEntity<JsonResponseDto> response = ApiErrorResponse.methodNotAllowed(headers, "Método de solicitud '" + exception.getMethod() + "' no soportado");
        return ResponseEntity.status(response.getStatusCode())
                .headers(headers)
                .body(response.getBody());
    }

    // Handle cases where the media type in the request is not acceptable by the server
    @Override
    protected ResponseEntity<Object> handleHttpMediaTypeNotAcceptable(@NotNull HttpMediaTypeNotAcceptableException exception,
                                                                      @NotNull HttpHeaders headers, @NotNull HttpStatusCode status, @NotNull WebRequest request) {
        ResponseEntity<JsonResponseDto> response = ApiErrorResponse.notAcceptable("No se pudo encontrar una representación aceptable");
        return ResponseEntity.status(response.getStatusCode())
                .headers(headers)
                .body(response.getBody());
    }

    // Handle cases where the media type in the request is not supported
    @Override
    protected ResponseEntity<Object> handleHttpMediaTypeNotSupported(HttpMediaTypeNotSupportedException exception,
                                                                     @NotNull HttpHeaders headers, @NotNull HttpStatusCode status, @NotNull WebRequest request) {
        var mediaTypes = exception.getSupportedMediaTypes();
        if (!CollectionUtils.isEmpty(mediaTypes)) {
            headers.setAccept(mediaTypes);
        }

        ResponseEntity<JsonResponseDto> response = ApiErrorResponse.unsupportedMediaType(headers, "Tipo de contenido '" + exception.getContentType() + "' no soportado");
        return ResponseEntity.status(response.getStatusCode())
                .headers(headers)
                .body(response.getBody());
    }

    // Handle validation errors for method arguments (e.g., incorrect or missing parameters)
    @Override
    protected ResponseEntity<Object> handleMethodArgumentNotValid(MethodArgumentNotValidException ex,
                                                                  @NotNull HttpHeaders headers, @NotNull HttpStatusCode status, @NotNull WebRequest request) {

        List<ApiError> errors = ex.getBindingResult().getFieldErrors()
                .stream()
                .map(fieldError -> ApiError.fieldApiError(fieldError.getField(), fieldError.getDefaultMessage(), fieldError.getRejectedValue()))
                .toList();

        ResponseEntity<JsonResponseDto> response = ApiErrorResponse.unprocessableEntity(errors, "Validación de argumentos fallida");

        return ResponseEntity.status(response.getStatusCode())
                .headers(headers)
                .body(response.getBody());
    }

    // General exception handler for any unhandled exceptions
    @ExceptionHandler(Exception.class)
    public ResponseEntity<JsonResponseDto> handleGeneralException(Exception ex) {
        log.error("Internal Server Error: ", ex);
        ResponseEntity<JsonResponseDto> response = ApiErrorResponse.internalServerError("An unexpected error occurred");
        return ResponseEntity.status(response.getStatusCode())
                .body(response.getBody());
    }

    // Handle cases where a required path variable is missing
    @Override
    protected ResponseEntity<Object> handleMissingPathVariable(MissingPathVariableException ex,
                                                               @NotNull HttpHeaders headers, @NotNull HttpStatusCode status, @NotNull WebRequest request) {
        ResponseEntity<JsonResponseDto> response = ApiErrorResponse.badRequest("Variable de ruta '" + ex.getVariableName() + "' faltante");

        return ResponseEntity.status(response.getStatusCode())
                .headers(headers)
                .body(response.getBody());
    }

    // Handle servlet request binding exceptions
    @Override
    protected ResponseEntity<Object> handleServletRequestBindingException(@NotNull ServletRequestBindingException ex,
                                                                          @NotNull HttpHeaders headers, HttpStatusCode status, WebRequest request) {
        ResponseEntity<JsonResponseDto> response = ApiErrorResponse.badRequest("Error de vinculación de solicitud");

        return ResponseEntity.status(response.getStatusCode())
                .headers(headers)
                .body(response.getBody());
    }

    // Handle missing request parameter errors
    @Override
    protected ResponseEntity<Object> handleMissingServletRequestParameter(MissingServletRequestParameterException ex,
                                                                          @NotNull HttpHeaders headers, @NotNull HttpStatusCode status, @NotNull WebRequest request) {
        ResponseEntity<JsonResponseDto> response = ApiErrorResponse.badRequest("Parámetro de solicitud '" + ex.getParameterName() + "' faltante");

        return ResponseEntity.status(response.getStatusCode())
                .headers(headers)
                .body(response.getBody());
    }

    // Handle constraint violation exceptions (e.g., validation constraints not met)
    @ExceptionHandler(ConstraintViolationException.class)
    ResponseEntity<JsonResponseDto> handleConstraintViolationException(ConstraintViolationException exception) {
        List<ApiError> errors = exception.getConstraintViolations()
                .stream()
                .map(violation -> ApiError.fieldApiError(violation.getPropertyPath().toString(), violation.getMessage(), violation.getInvalidValue()))
                .toList();
        return ApiErrorResponse.unprocessableEntity(errors, "Validación de argumentos fallida");
    }

    // Handle argument type mismatch exceptions (e.g., incorrect type for a method argument)
    @ExceptionHandler(MethodArgumentTypeMismatchException.class)
    ResponseEntity<JsonResponseDto> handleMethodArgumentTypeMismatchException(MethodArgumentTypeMismatchException exception) {
        return ApiErrorResponse.badRequest("Tipo de argumento '" + exception.getName() + "' no válido");
    }

    // Handle any Throwable (the most generic exception) and log it
    @ExceptionHandler(Throwable.class)
    ResponseEntity<JsonResponseDto> handleThrowable(Throwable throwable) {
        log.error("Request handling failed", throwable);
        return ApiErrorResponse.internalServerError("ocurrió un error inesperado");
    }
}