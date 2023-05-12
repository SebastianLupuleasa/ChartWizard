package com.lupuleasa.chartapp.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.lupuleasa.chartapp.exception.ChartAppRuntimeException;
import com.lupuleasa.chartapp.security.domain.LoginCredentials;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import java.io.BufferedReader;
import java.io.IOException;

/**
 * The filter that attempts the authentication
 */
public class JsonObjectAuthenticationFilter extends UsernamePasswordAuthenticationFilter {

    private final ObjectMapper objectMapper = new ObjectMapper();

    /**
     * The methods that is attempting to authenticate the user
     * @param request the http request
     * @param response the http response
     * @return and instance of Authentication
     */
    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) {
        try {
            objectMapper.registerModule(new JavaTimeModule());
            BufferedReader reader = request.getReader();
            var sb = new StringBuilder();
            String line;
            while ((line = reader.readLine()) != null) {
                sb.append(line);
            }
            LoginCredentials authRequest = objectMapper.readValue(sb.toString(), LoginCredentials.class);
            var token = new UsernamePasswordAuthenticationToken(
                    authRequest.getEmail(), authRequest.getPassword()
            );
            setDetails(request, token);
            return this.getAuthenticationManager().authenticate(token);
        } catch (IOException e) {
            throw new ChartAppRuntimeException(e.getMessage());
        }
    }

}
