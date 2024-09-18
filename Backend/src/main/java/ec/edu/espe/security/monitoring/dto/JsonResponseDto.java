package ec.edu.espe.security.monitoring.dto;

import lombok.Data;

@Data
public class JsonResponseDto {
    private String codigoHttp;
    private String mensaje;
    private String resultado;
}
