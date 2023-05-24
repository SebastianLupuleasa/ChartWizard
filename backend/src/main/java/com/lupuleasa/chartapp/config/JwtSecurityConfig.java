package com.lupuleasa.chartapp.config;

import com.lupuleasa.chartapp.exception.ChartAppRuntimeException;
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

/**
 * Jwt Security Config
 */
@Configuration
public class JwtSecurityConfig {

    /**
     * The authentication manager
     */
    @Autowired
    private AuthenticationManager authenticationManager;

    /**
     * The auth success handler
     */
    private final AuthSuccessHandler authSuccessHandler;

    /**
     * The service for JwtUser's details
     */
    private final JwtUserDetailsService jwtUserDetailsService;

    /**
     * The secret key
     */
    private final String secret;

    /**
     * The constructor for JwtSecurityConfig
     * @param authSuccessHandler the auth handler
     * @param jwtUserDetailsService the details service
     * @param secret the secret key
     */
    public JwtSecurityConfig(AuthSuccessHandler authSuccessHandler, JwtUserDetailsService jwtUserDetailsService, @Value("${jwt.secret}") String secret) {
        this.authSuccessHandler = authSuccessHandler;
        this.jwtUserDetailsService = jwtUserDetailsService;
        this.secret = secret;
    }

    /**
     * An bean for SecurityFilterChain
     * @param http type of HttpSecurity
     * @return bean of SecurityFilterChain
     * @throws Exception an generic Exception
     */
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .cors()
                .and()
               .csrf()
                .disable()
                 .authorizeHttpRequests(auth -> {
                    try {
                        auth
                                .requestMatchers("/auth/**","/**")
                                .permitAll()
                                .requestMatchers(AUTH_WHITELIST)
                                .permitAll().and().authorizeHttpRequests()
                                .anyRequest().hasAnyRole("ADMIN","USER")
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
                        throw new ChartAppRuntimeException(e.getMessage());
                    }
                })
                .httpBasic(Customizer.withDefaults());
        return http.build();
    }

    /**
     * An bean for JsonObjectAuthenticationFilter
     * @return a bean of JsonObjectAuthenticationFilter with the right handler and manager
     */
    @Bean
    public JsonObjectAuthenticationFilter authenticationFilter() {
        var filter = new JsonObjectAuthenticationFilter();
        filter.setAuthenticationSuccessHandler(authSuccessHandler);
        filter.setAuthenticationManager(authenticationManager);
        return filter;
    }

    private static final String[] AUTH_WHITELIST = {
      "/v3/api-docs/**",
      "/v3/api-docs.yaml",
      "/swagger-ui/**",
      "/swagger-ui.html"
    };
}
