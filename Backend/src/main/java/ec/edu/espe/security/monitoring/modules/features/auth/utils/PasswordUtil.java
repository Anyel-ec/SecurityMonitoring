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
        if (username == null || username.isEmpty()) {
            throw new IllegalArgumentException("El nombre de usuario no puede ser nulo o vacío");
        }

        String initials = username.substring(0, Math.min(8, username.length())).toLowerCase();
        initials = initials.substring(0, 1).toUpperCase() + initials.substring(1);

        int randomNumbers = RANDOM.nextInt(900) + 100;
        return initials + "@" + randomNumbers;
    }

}
