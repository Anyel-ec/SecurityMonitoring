package ec.edu.espe.security.monitoring.common.config;

import ec.edu.espe.security.monitoring.common.interceptors.RequestTimeoutInterceptor;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/*
 * Author: Anyel EC
 * Github: https://github.com/Anyel-ec
 * Creation date: 10/01/2025
 */

@Configuration
public class InterceptorConfig implements WebMvcConfigurer {

    private final RequestTimeoutInterceptor requestTimeoutInterceptor;

    public InterceptorConfig(RequestTimeoutInterceptor requestTimeoutInterceptor) {
        this.requestTimeoutInterceptor = requestTimeoutInterceptor;
    }

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(requestTimeoutInterceptor).addPathPatterns("/api/**");
    }
}
