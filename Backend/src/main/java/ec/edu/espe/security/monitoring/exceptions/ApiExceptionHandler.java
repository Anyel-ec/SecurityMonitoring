package ec.edu.espe.security.monitoring.exceptions;


import ec.edu.espe.security.monitoring.dto.JsonResponseDto;
import jakarta.validation.ConstraintViolationException;
import lombok.extern.slf4j.Slf4j;
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
import org.springframework.web.servlet.resource.NoResourceFoundException;

import java.util.List;
import java.util.stream.Collectors;

import static ec.edu.espe.security.monitoring.exceptions.ApiErrorResponse.*;


@RestControllerAdvice
@Slf4j
class ApiExceptionHandler extends ResponseEntityExceptionHandler {


    @Override
    protected ResponseEntity handleHttpMessageNotReadable(HttpMessageNotReadableException ex,
                                                          HttpHeaders headers, HttpStatusCode status, WebRequest request) {
        return badRequest("Solicitud JSON mal formada");
    }

    @Override
    protected ResponseEntity handleTypeMismatch(TypeMismatchException ex,
                                                HttpHeaders headers, HttpStatusCode status, WebRequest request) {
        return badRequest("Solicitud de no coincidencia de tipos");
    }


    @Override
    protected ResponseEntity handleHttpRequestMethodNotSupported(HttpRequestMethodNotSupportedException exception,
                                                                 HttpHeaders headers, HttpStatusCode status, WebRequest request) {

        var supportedMethods = exception.getSupportedHttpMethods();

        if (!CollectionUtils.isEmpty(supportedMethods)) {
            headers.setAllow(supportedMethods);
        }

        return methodNotAllowed(headers, "Método de solicitud '" + exception.getMethod() + "' no soportado");
    }

    @Override
    protected ResponseEntity handleHttpMediaTypeNotAcceptable(HttpMediaTypeNotAcceptableException exception,
                                                              HttpHeaders headers, HttpStatusCode status, WebRequest request) {
        return notAcceptable("No se pudo encontrar una representación aceptable");
    }

    @Override
    protected ResponseEntity handleHttpMediaTypeNotSupported(HttpMediaTypeNotSupportedException exception,
                                                             HttpHeaders headers, HttpStatusCode status, WebRequest request) {

        var mediaTypes = exception.getSupportedMediaTypes();
        if (!CollectionUtils.isEmpty(mediaTypes)) {
            headers.setAccept(mediaTypes);
        }

        return unsupportedMediaType(headers, "Tipo de contenido '" + exception.getContentType() + "' no soportado");
    }


    @Override
    protected ResponseEntity handleMethodArgumentNotValid(MethodArgumentNotValidException ex,
                                                          HttpHeaders headers, HttpStatusCode status, WebRequest request) {
        List<ApiError> errors = ex.getBindingResult().getFieldErrors()
                .stream()
                .map(fieldError -> ApiError.fieldApiError(fieldError.getField(), fieldError.getDefaultMessage(), fieldError.getRejectedValue()))
                .collect(Collectors.toList());
        return unprocessableEntity(errors, "Validación de argumentos fallida");
    }

    @Override
    protected ResponseEntity handleMissingPathVariable(MissingPathVariableException ex,
                                                       HttpHeaders headers, HttpStatusCode status, WebRequest request) {
        return badRequest("Variable de ruta '" + ex.getVariableName() + "' faltante");
    }

    @Override
    protected ResponseEntity handleServletRequestBindingException(ServletRequestBindingException ex,
                                                                  HttpHeaders headers, HttpStatusCode status, WebRequest request) {
        return badRequest("Error de vinculación de solicitud");
    }

    @Override
    protected ResponseEntity handleMissingServletRequestParameter(MissingServletRequestParameterException ex,
                                                                  HttpHeaders headers, HttpStatusCode status, WebRequest request) {
        return badRequest("Parámetro de solicitud '" + ex.getParameterName() + "' faltante");
    }

    @Override
    protected ResponseEntity handleNoHandlerFoundException(NoHandlerFoundException ex,
                                                           HttpHeaders headers, HttpStatusCode status, WebRequest request) {
        return notFound("No se encontró el controlador para la URL '" + ex.getRequestURL() + "'");
    }


    @ExceptionHandler(ConstraintViolationException.class)
    ResponseEntity<JsonResponseDto> handleConstraintViolationException(ConstraintViolationException exception) {
        List<ApiError> errors = exception.getConstraintViolations()
                .stream()
                .map(violation -> ApiError.fieldApiError(violation.getPropertyPath().toString(), violation.getMessage(), violation.getInvalidValue()))
                .collect(Collectors.toList());
        return ApiErrorResponse.unprocessableEntity(errors, "Validación de argumentos fallida");
    }

    @ExceptionHandler(MethodArgumentTypeMismatchException.class)
    ResponseEntity<JsonResponseDto> handleMethodArgumentTypeMismatchException(MethodArgumentTypeMismatchException exception) {
        return ApiErrorResponse.badRequest("Tipo de argumento '" + exception.getName() + "' no válido");
    }

    @ExceptionHandler(Throwable.class)
    ResponseEntity<JsonResponseDto> handleThrowable(Throwable throwable) {
        log.error("Request handling failed", throwable);
        return ApiErrorResponse.internalServerError("ocurrió un error inesperado");
    }

}