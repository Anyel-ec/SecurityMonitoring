package ec.edu.espe.security.monitoring.modules.integrations.grafana.dto;
/*
 * Author: Anyel EC
 * Github: https://github.com/Anyel-ec
 * Creation date: 04/11/2024
 */

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Map;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class GrafanaDashboardRequestDto {

    @JsonProperty("dashboard")
    private Map<String, Object> dashboard;

    @JsonProperty("folderId")
    private int folderId;

    @JsonProperty("overwrite")
    private boolean overwrite;
}
