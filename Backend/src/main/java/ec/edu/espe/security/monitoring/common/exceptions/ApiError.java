package ec.edu.espe.security.monitoring.common.exceptions;

public interface ApiError {

    // This method returns the error message
    String message();

    /**
     * Static factory method to create an instance of ApiErrorField.
     * It provides a way to return an error related to a specific field in a request.
     *
     * @param field         The name of the field that caused the error.
     * @param message       The error message.
     * @param rejectedValue The value that was rejected or caused the validation error.
     * @return A new instance of ApiErrorField.
     */
    static ApiError fieldApiError(String field, String message, Object rejectedValue) {
        return new ApiErrorField(field, message, rejectedValue);
    }

    /**
     * A record that implements the ApiError interface and provides a concrete implementation for field-related errors.
     */
    record ApiErrorField(String field, String message, Object rejectedValue) implements ApiError {
    }
}
