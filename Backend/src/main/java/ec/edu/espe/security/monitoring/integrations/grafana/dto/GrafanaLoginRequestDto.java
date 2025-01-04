package ec.edu.espe.security.monitoring.integrations.grafana.dto;
/*
 * Author: Anyel EC
 * Github: https://github.com/Anyel-ec
 * Creation date: 20/11/2024
 */

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class GrafanaLoginRequestDto {
    private String user;
    private String password;
}
