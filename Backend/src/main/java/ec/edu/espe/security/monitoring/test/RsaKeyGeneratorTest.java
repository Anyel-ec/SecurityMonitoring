package ec.edu.espe.security.monitoring.test;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;

import javax.crypto.BadPaddingException;
import javax.crypto.Cipher;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.NoSuchPaddingException;
import java.security.*;
import java.util.Base64;
@Slf4j
public class RsaKeyGeneratorTest {
    @Value("${public.key.rsa}")
    private static String publicKeyStr;

    @Value("${private.key.rsa}")
    private static String privateKeyStr;

    private static final String ALGORITHM = "RSA";

    private static final String RSA_TRANSFORMATION = "RSA/ECB/OAEPWithSHA-256AndMGF1Padding";


    public static void main(String[] args) throws Exception {
        // Generate RSA keys
        KeyPair keyPair = generateKeyPair();

        // Get public and private keys
        PublicKey publicKey = keyPair.getPublic();
        PrivateKey privateKey = keyPair.getPrivate();

        // CONVERT TO BASE64, USING KEYS FROM PROPERTIES (This part would typically load keys from properties if needed)

        log.info("Public Key: {}", publicKeyStr);
        log.info("Private Key: {}", privateKeyStr);

        // Example message to encrypt
        String message = "This is a secret message";

        // Encrypt the message using the public key
        String encryptedMessage = encrypt(message, publicKey); // Encrypt the message with the public key
        log.info("Encrypted Message: {}", encryptedMessage); // Log the encrypted message

        // Decrypt the message using the private key
        String decryptedMessage = decrypt(encryptedMessage, privateKey); // Decrypt the message with the private key
        log.info("Decrypted Message: {}", decryptedMessage); // Log the decrypted message

    }

    /**
     * Generates an RSA key pair (public and private keys).
     */
    public static KeyPair generateKeyPair() throws NoSuchAlgorithmException{
        KeyPairGenerator keyGen = KeyPairGenerator.getInstance(ALGORITHM);
        keyGen.initialize(4096); // Generate RSA key pair with a key size of 4096 bits
        return keyGen.generateKeyPair();
    }
    /**
     * Encrypts a given message using the provided RSA public key
     */
    public static String encrypt(String message, PublicKey publicKey) throws NoSuchAlgorithmException, NoSuchPaddingException, InvalidKeyException, IllegalBlockSizeException, BadPaddingException {
        // Use RSA with OAEP padding and SHA-256
        Cipher cipher = Cipher.getInstance(RSA_TRANSFORMATION);
        cipher.init(Cipher.ENCRYPT_MODE, publicKey);

        byte[] encryptedBytes = cipher.doFinal(message.getBytes());
        return Base64.getEncoder().encodeToString(encryptedBytes);
    }

    /**
     * Decrypts an encrypted message using the provided RSA private key.
     **/
    public static String decrypt(String encryptedMessage, PrivateKey privateKey) throws NoSuchAlgorithmException, NoSuchPaddingException, InvalidKeyException, IllegalBlockSizeException, BadPaddingException {
        // Use RSA with OAEP padding and SHA-256
        Cipher cipher = Cipher.getInstance(RSA_TRANSFORMATION);
        cipher.init(Cipher.DECRYPT_MODE, privateKey);

        byte[] decryptedBytes = cipher.doFinal(Base64.getDecoder().decode(encryptedMessage));
        return new String(decryptedBytes);
    }

}