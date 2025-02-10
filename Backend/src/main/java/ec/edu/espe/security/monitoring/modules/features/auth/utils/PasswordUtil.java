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
    private static final String SYMBOLS = "@#$%&*";
    private static final int PASSWORD_LENGTH = 15;

    private static final Random RANDOM = new Random();
    //todo: mas corto, estudiante@ tres numeros ramdon
    public String generatePassword(String username, String company, String phone) {
        String initials = username.substring(0, Math.min(4, username.length())).toUpperCase();
        String symbol = String.valueOf(SYMBOLS.charAt(RANDOM.nextInt(SYMBOLS.length())));
        String companyPart = company.substring(0, Math.min(3, company.length())).toUpperCase();
        String lastFourDigits = phone.length() >= 4 ? phone.substring(phone.length() - 4) : "0000";
        String password = initials + symbol + companyPart + lastFourDigits;
        return password.length() < PASSWORD_LENGTH ? password + "X".repeat(PASSWORD_LENGTH - password.length()) : password;
    }
}
