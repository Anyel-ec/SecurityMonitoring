package ec.edu.espe.security.monitoring.common.encrypt.services;

import ec.edu.espe.security.monitoring.common.encrypt.utils.RsaEncryptUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.BadPaddingException;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.NoSuchPaddingException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;

/*
 * Author: Anyel EC
 * Github: https://github.com/Anyel-ec
 * Creation date: 10/01/2025
 */

@Slf4j
@RequiredArgsConstructor
@Service
public class RsaServiceImpl {

    @Value("${private.key.rsa}")
    private String environmentPrivateKey;

    private final RsaEncryptUtil rsaEncryptUtil;

    public String loginCliente(String data) throws IllegalBlockSizeException, NoSuchPaddingException, BadPaddingException, NoSuchAlgorithmException, InvalidKeyException {

        String decryptedPayload = rsaEncryptUtil.decrypt(data, environmentPrivateKey);

        return "in development....";
    }
}