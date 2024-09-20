package ec.edu.espe.security.monitoring.dto;


public record JsonResponseDto(boolean respuesta,
                              int codigoHttp,
                              String mensaje,
                              String resultado) {
}
