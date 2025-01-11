package ec.edu.espe.security.monitoring.common.config;

import ec.edu.espe.security.monitoring.common.interceptors.RequestTimeoutFilter;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
/*
 * Author: Anyel EC
 * Github: https://github.com/Anyel-ec
 * Creation date: 10/01/2025
 */

@Configuration
public class FilterConfig {

    @Bean
    public FilterRegistrationBean<RequestTimeoutFilter> requestTimeoutFilter() {
        FilterRegistrationBean<RequestTimeoutFilter> registrationBean = new FilterRegistrationBean<>();
        registrationBean.setFilter(new RequestTimeoutFilter());
        registrationBean.addUrlPatterns("/api/test/*");
        return registrationBean;
    }
}