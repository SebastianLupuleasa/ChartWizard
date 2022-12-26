package com.lupuleasa.chartapp.config;

import com.lupuleasa.chartapp.security.AuthSuccessHandler;
import com.lupuleasa.chartapp.security.JsonObjectAuthenticationFilter;
import com.lupuleasa.chartapp.security.JwtAuthorizationFilter;
import com.lupuleasa.chartapp.service.JwtUserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.HttpStatusEntryPoint;

@Configuration
public class JwtSecurityConfig {

    @Autowired
    private AuthenticationManager authenticationManager;
    private final AuthSuccessHandler authSuccessHandler;
    private final JwtUserDetailsService jwtUserDetailsService;
    private final String secret;

    public JwtSecurityConfig(AuthSuccessHandler authSuccessHandler, JwtUserDetailsService jwtUserDetailsService, @Value("${jwt.secret}") String secret) {
        this.authSuccessHandler = authSuccessHandler;
        this.jwtUserDetailsService = jwtUserDetailsService;
        this.secret = secret;
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .cors()
                .and()
                .csrf()
                .disable()
                .authorizeHttpRequests((auth) -> {
                    try {
                        auth
                                .requestMatchers("/c").hasRole("USER")
                                .requestMatchers("/charts").hasRole("ADMIN")
                                .anyRequest().permitAll()
                                .and()
                                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                                .and()
                                .headers().frameOptions().disable()
                                .and()
                                .addFilter(authenticationFilter())
                                .addFilter(new JwtAuthorizationFilter(authenticationManager, jwtUserDetailsService, secret))
                                .exceptionHandling()
                                .authenticationEntryPoint(new HttpStatusEntryPoint(HttpStatus.UNAUTHORIZED));
                    } catch (Exception e) {
                        throw new RuntimeException(e);
                    }
                })
                .httpBasic(Customizer.withDefaults());
        return http.build();
    }

    @Bean
    public JsonObjectAuthenticationFilter authenticationFilter() throws Exception {
        JsonObjectAuthenticationFilter filter = new JsonObjectAuthenticationFilter();
        filter.setAuthenticationSuccessHandler(authSuccessHandler);
        filter.setAuthenticationManager(authenticationManager);
        return filter;
    }

}
