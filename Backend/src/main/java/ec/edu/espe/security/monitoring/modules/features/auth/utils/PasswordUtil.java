package ec.edu.espe.security.monitoring.modules.features.auth.utils;

import ec.edu.espe.security.monitoring.modules.features.auth.repository.UserInfoRepository;
import ec.edu.espe.security.monitoring.modules.features.auth.service.interfaces.MailService;
import lombok.experimental.UtilityClass;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.Random;

/*
 * Author: Anyel EC
 * Github: https://github.com/Anyel-ec
 * Creation date: 31/01/2025
 */
@UtilityClass
public class PasswordUtil {
    private static final String SYMBOLS = "@#$%&*";
    private static final int PASSWORD_LENGTH = 10;

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
    private static final Random RANDOM = new Random();
    public String generatePassword(String name, String lastname, String company) {
        String initials = (name.charAt(0) + lastname.substring(0, 1) + company.charAt(0)).toUpperCase();
        String symbol = String.valueOf(SYMBOLS.charAt(RANDOM.nextInt(SYMBOLS.length())));
        String numbers = String.valueOf(RANDOM.nextInt(90) + 10);
        String password = initials + symbol + numbers;

        return password.length() > PASSWORD_LENGTH ? password.substring(0, PASSWORD_LENGTH) : password;
    }
}
