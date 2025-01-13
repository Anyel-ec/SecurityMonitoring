package ec.edu.espe.security.monitoring.common.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.beans.factory.annotation.Value;

import java.util.Properties;

/*
 * Author: Anyel EC
 * Github: https://github.com/Anyel-ec
 * Creation date: 12/01/2025
 */
@Configuration
public class MailConfig {

    @Value("${ALERT_SMTP_HOST}")
    private String host;

    @Value("${ALERT_SMTP_USER}")
    private String username;

    @Value("${ALERT_SMTP_PASSWORD}")
    private String password;

    @Value("${ALERT_SMTP_TO}")
    private String to;

    @Bean
    public JavaMailSender javaMailSender() {
        JavaMailSenderImpl mailSender = new JavaMailSenderImpl();
        mailSender.setHost(host);
        mailSender.setPort(587);
        mailSender.setUsername(username);
        mailSender.setPassword(password);

        // properties for SMTP server
        Properties properties = mailSender.getJavaMailProperties();
        properties.put("mail.transport.protocol", "smtp");
        properties.put("mail.smtp.auth", "true");
        properties.put("mail.smtp.starttls.enable", "true");
        properties.put("mail.smtp.ssl.trust", host);

        return mailSender;
    }
}
