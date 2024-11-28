package ec.edu.espe.security.monitoring.shared.utils;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.*;
import javax.crypto.spec.GCMParameterSpec;
import javax.crypto.spec.SecretKeySpec;
import java.security.InvalidAlgorithmParameterException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.util.Base64;

@Component
public class AesEncryptorUtil {

    @Value("${default.empty.password}")
    private String defaultEmptyPassword;

    // AES key (32 bytes = 256 bits)
    @Value("${secret.key.aes}")
    private String secretKey;

    private static final String ALGORITHM = "AES";
    private static final String AES_TRANSFORMATION = "AES/GCM/NoPadding";

    private static final int GCM_TAG_LENGTH = 16; // Length of authentication tag (in bytes)

    public void setSecretKey(String secretKey) {
        this.secretKey = secretKey;
    }

    // Encrypt a string using AES GCM
    public String encrypt(String data) throws NoSuchAlgorithmException, InvalidKeyException,
            NoSuchPaddingException, IllegalBlockSizeException, BadPaddingException, InvalidAlgorithmParameterException {


        // Handle null or empty input
        if (data == null || data.isEmpty()) {
            data = defaultEmptyPassword;
        }

        SecretKeySpec key = new SecretKeySpec(hexStringToByteArray(secretKey), ALGORITHM);
        Cipher cipher = Cipher.getInstance(AES_TRANSFORMATION);

        // Generate a random IV
        byte[] iv = new byte[12]; // GCM standard recommends 12 bytes IV
        new SecureRandom().nextBytes(iv);
        GCMParameterSpec gcmSpec = new GCMParameterSpec(GCM_TAG_LENGTH * 8, iv); // 128-bit tag length

        cipher.init(Cipher.ENCRYPT_MODE, key, gcmSpec);
        byte[] encryptedData = cipher.doFinal(data.getBytes());

        // Combine IV and encrypted data
        byte[] combined = new byte[iv.length + encryptedData.length];
        System.arraycopy(iv, 0, combined, 0, iv.length);
        System.arraycopy(encryptedData, 0, combined, iv.length, encryptedData.length);

        return Base64.getEncoder().encodeToString(combined);
    }

    // Decrypt a string using AES GCM
    public String decrypt(String encryptedData) throws NoSuchAlgorithmException, InvalidKeyException,
            NoSuchPaddingException, IllegalBlockSizeException, BadPaddingException, InvalidAlgorithmParameterException {

        byte[] decodedData = Base64.getDecoder().decode(encryptedData);

        // Extract IV and encrypted data
        byte[] iv = new byte[12];
        byte[] cipherText = new byte[decodedData.length - iv.length];
        System.arraycopy(decodedData, 0, iv, 0, iv.length);
        System.arraycopy(decodedData, iv.length, cipherText, 0, cipherText.length);

        SecretKeySpec key = new SecretKeySpec(hexStringToByteArray(secretKey), ALGORITHM);
        Cipher cipher = Cipher.getInstance(AES_TRANSFORMATION);
        GCMParameterSpec gcmSpec = new GCMParameterSpec(GCM_TAG_LENGTH * 8, iv);

        cipher.init(Cipher.DECRYPT_MODE, key, gcmSpec);
        byte[] decryptedData = cipher.doFinal(cipherText);

        String result = new String(decryptedData);

        // Return empty string if the decrypted value matches the special value for an empty password
        return result.equals(defaultEmptyPassword) ? "" : result;
    }

    // Convert hex string to byte array
    private static byte[] hexStringToByteArray(String s) {
        int len = s.length();
        byte[] data = new byte[len / 2];
        for (int i = 0; i < len; i += 2) {
            data[i / 2] = (byte) ((Character.digit(s.charAt(i), 16) << 4)
                    + Character.digit(s.charAt(i + 1), 16));
        }
        return data;
    }
}
