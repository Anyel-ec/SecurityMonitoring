package ec.edu.espe.security.monitoring.services;

import ec.edu.espe.security.monitoring.models.PostgresCredentials;
import ec.edu.espe.security.monitoring.repositories.PostgresCredentialsRepository;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class PostgresCredentialsInitService {

    private final PostgresCredentialsRepository credentialsRepository;

    @PostConstruct
    public void loadCredentialsAtStartup() {
        Optional<PostgresCredentials> optionalCredentials = credentialsRepository.findTopByOrderByIdDesc();

        if (optionalCredentials.isPresent()) {
            PostgresCredentials credentials = optionalCredentials.get();
            log.error("Credenciales cargadas para PostgreSQL: {}",  credentials.getHost());
        } else {
            log.error("No se encontraron credenciales de PostgreSQL guardadas.");
        }
    }
}
