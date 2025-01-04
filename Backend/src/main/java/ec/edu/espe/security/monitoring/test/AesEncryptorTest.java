package ec.edu.espe.security.monitoring.test;

import ec.edu.espe.security.monitoring.common.utils.AesEncryptorUtil;
import io.github.cdimascio.dotenv.Dotenv;
import lombok.extern.slf4j.Slf4j;

@Slf4j
public class AesEncryptorTest {

    public static void main(String[] args) {
        try {
            // Create an instance of the encryptor
            AesEncryptorUtil aesEncryptor = new AesEncryptorUtil();

            Dotenv dotenv = Dotenv.configure().load();

            String secretKey = dotenv.get("SECRET_KEY_AES");

            // Set the secret key
            aesEncryptor.setSecretKey(secretKey);

            // Data to encrypt
            String plainText = "Hello World! This is a secret message.";

            // Encrypt the data
            log.info("Original text: " + plainText);
            String encryptedText = aesEncryptor.encrypt(plainText);
            log.info("Encrypted text: " + encryptedText);

            // Decrypt the data
            String decryptedText = aesEncryptor.decrypt(encryptedText);
            log.info("Decrypted text: " + decryptedText);

        } catch (Exception e) {
            log.error(e.getMessage());
        }
    }
}