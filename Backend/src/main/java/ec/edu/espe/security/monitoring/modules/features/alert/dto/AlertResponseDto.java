package ec.edu.espe.security.monitoring.modules.features.alert.dto;

/*
 * Author: Anyel EC
 * Github: https://github.com/Anyel-ec
 * Creation date: 07/01/2025
 */

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@AllArgsConstructor
@Data
public class AlertResponseDto {
    private boolean activeMongo;
    private boolean activeMaria;
    private boolean activePostgres;
}