package ec.edu.espe.security.monitoring.modules.features.auth.service.impl;
import ec.edu.espe.security.monitoring.common.dto.JsonResponseDto;
import ec.edu.espe.security.monitoring.modules.features.auth.model.UserRole;
import ec.edu.espe.security.monitoring.modules.features.auth.repository.UserRoleRepository;
import ec.edu.espe.security.monitoring.modules.features.auth.service.interfaces.RoleService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;
/*
 * Author: Anyel EC
 * Github: https://github.com/Anyel-ec
 * Creation date: 17/01/2025
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class RoleServiceImpl implements RoleService {

    private final UserRoleRepository userRoleRepository;

    @Override
    public JsonResponseDto getAllRoles() {
        try {
            List<UserRole> roles = userRoleRepository.findAll();
            return new JsonResponseDto(true, HttpStatus.OK.value(), "Roles obtenidos con éxito", roles);
        } catch (Exception e) {
            log.error("Error al obtener los roles: {}", e.getMessage());
            return new JsonResponseDto(false, HttpStatus.INTERNAL_SERVER_ERROR.value(), "Error al procesar la solicitud", null);
        }
    }
}