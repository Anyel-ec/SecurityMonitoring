package ec.edu.espe.security.monitoring.modules.features.auth.utils;

import lombok.experimental.UtilityClass;

import java.util.Random;

/*
 * Author: Anyel EC
 * Github: https://github.com/Anyel-ec
 * Creation date: 31/01/2025
 */
@UtilityClass
public class PasswordUtil {
    private static final Random RANDOM = new Random();

    public String generatePassword(String username) {
        String initials = username.substring(0, Math.min(4, username.length())).toLowerCase();
        int randomNumbers = RANDOM.nextInt(900) + 100; // Genera un número aleatorio de 3 dígitos (100-999)
        return initials + "@" + randomNumbers;
    }
}
