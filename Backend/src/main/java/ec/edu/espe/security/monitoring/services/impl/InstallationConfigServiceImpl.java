package ec.edu.espe.security.monitoring.services.impl;

import ec.edu.espe.security.monitoring.dto.request.GrafanaInstallRequestDto;
import ec.edu.espe.security.monitoring.dto.request.PrometheusInstallRequestDto;
import ec.edu.espe.security.monitoring.dto.request.UserInstallRequestDto;
import ec.edu.espe.security.monitoring.models.InstallationConfig;
import ec.edu.espe.security.monitoring.models.SystemParameters;
import ec.edu.espe.security.monitoring.repositories.InstallationConfigRepository;
import ec.edu.espe.security.monitoring.repositories.SystemParametersRepository;
import ec.edu.espe.security.monitoring.services.interfaces.InstallationConfigService;
import ec.edu.espe.security.monitoring.utils.AesEncryptor;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@Slf4j
@AllArgsConstructor
public class InstallationConfigServiceImpl implements InstallationConfigService {

    private final InstallationConfigRepository installationConfigRepository;
    private final SystemParametersRepository systemParametersRepository;
    private final AesEncryptor aesEncryptor;

    // Save Grafana installation credentials with encrypted password
















}
