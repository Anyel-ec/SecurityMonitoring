package ec.edu.espe.security.monitoring.dto.request.grafana;
/*
 * Author: Anyel EC
 * Github: https://github.com/Anyel-ec
 * Creation date: 04/11/2024
 */

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PrometheusDatasourceRequestDto {

    private String name;
    private String type;
    private String url;
    private String access;

    @JsonProperty("basicAuth")
    private boolean basicAuth;

    @JsonProperty("isDefault")
    private boolean isDefault;
}
