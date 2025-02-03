package ec.edu.espe.security.monitoring.modules.features.auth.service.impl;

import ec.edu.espe.security.monitoring.modules.features.auth.model.UserInfo;
import ec.edu.espe.security.monitoring.modules.features.auth.service.interfaces.MailService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ClassPathResource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

/*
 * Author: Anyel EC
 * Github: https://github.com/Anyel-ec
 * Creation date: 13/01/2025
 */

@Slf4j
@Service
@RequiredArgsConstructor
public class MailServiceImpl implements MailService {

    private final JavaMailSender mailSender;

    @Value("${ALERT_SMTP_TO}")
    private String alertTo;

    @Value("${otp.expiration.minutes}")
    private int otpExpirationMinutes;

    @Override
    public void sendNewUserEmail(UserInfo user, String password) {
        try {
            // load template
            InputStream inputStream = new ClassPathResource("templates/new_user.html").getInputStream();
            BufferedReader reader = new BufferedReader(new InputStreamReader(inputStream));
            StringBuilder emailContent = new StringBuilder();
            String line;
            while ((line = reader.readLine()) != null) {
                emailContent.append(line).append("\n");
            }

            // replace the placeholders with the actual values
            String emailBody = emailContent.toString()
                    .replace("{{name}}", user.getName())
                    .replace("{{lastname}}", user.getLastname())
                    .replace("{{username}}", user.getUsername())
                    .replace("{{password}}", password);

            // config the email
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true);
            helper.setTo(user.getEmail());
            helper.setSubject("Credenciales de acceso al sistema");
            helper.setText(emailBody, true);

            // send email
            mailSender.send(message);
            log.info("Correo de credenciales enviado correctamente a: {}", user.getEmail());

        } catch (Exception e) {
            log.error("Error al enviar el correo de credenciales: {}", e.getMessage(), e);
            throw new IllegalStateException("No se pudo enviar el correo de credenciales.", e);
        }
    }


    @Override
    public void sendRecoveryEmail(UserInfo user, String otp) {
        try {
            // upload the email template
            InputStream inputStream = new ClassPathResource("templates/recovery_template.html").getInputStream();
            BufferedReader reader = new BufferedReader(new InputStreamReader(inputStream));
            StringBuilder emailContent = new StringBuilder();
            String line;
            while ((line = reader.readLine()) != null) {
                emailContent.append(line).append("\n");
            }

            // prevent null values
            String username = user.getUsername() != null ? user.getUsername() : "Usuario";
            String formattedOtp = otp != null ? otp : "N/A";
            String currentDate = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));


            String emailBody = emailContent.toString()
                    .replace("{{username}}", username)
                    .replace("{{otp_code}}", formattedOtp)
                    .replace("{{otp_expiration_minutes}}", String.valueOf(otpExpirationMinutes))
                    .replace("{{current_date_time}}", currentDate);

            // config the email
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true);
            helper.setTo(user.getEmail());
            helper.setSubject("Security Monitoring - Código de Recuperación");
            helper.setText(emailBody, true);

            mailSender.send(message);
            log.info("Correo enviado correctamente a: {}", user.getEmail());

        } catch (Exception e) {
            log.error("Error al enviar el correo de recuperación: {}", e.getMessage(), e);
            throw new IllegalStateException("No se pudo enviar el correo de recuperación.", e);
        }
    }
}
