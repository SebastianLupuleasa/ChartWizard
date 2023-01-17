package com.lupuleasa.chartapp.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.lupuleasa.chartapp.exception.ChartAppGenericException;
import com.lupuleasa.chartapp.entity.JwtUser;
import com.lupuleasa.chartapp.service.JwtUserService;
import com.lupuleasa.chartapp.service.RefreshTokenService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.json.JSONObject;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
@Slf4j
@RequiredArgsConstructor
public class AuthSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    private final JwtUserService jwtUserService;
    private final JwtUtils jwtUtils;

    private final RefreshTokenService refreshTokenService;
    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
                                        Authentication authentication) throws IOException {
        UserDetails principal = (UserDetails) authentication.getPrincipal();
        JwtUser user = null;
        try {
            user = jwtUserService.getJwtUserByUsername(principal.getUsername());
        } catch (ChartAppGenericException e) {
            throw new RuntimeException(e);
        }
        String token = jwtUtils.createJwt(user.getEmail());
        String refreshToken;
        if (!refreshTokenService.isTokenAlreadyCreated(user)) {
             refreshToken = refreshTokenService.createToken(user);
        }
        else {
            refreshToken = refreshTokenService.getTokenByUser(user);
        }
        response.addHeader("Authorization", "Bearer " + token);
        response.addHeader("Content-Type", "application/json");
        JSONObject responseBody = new JSONObject();
        ObjectWriter ow = new ObjectMapper().registerModule(new JavaTimeModule()).writer().withDefaultPrettyPrinter();
        String jsonUser = ow.writeValueAsString(user);
        responseBody.put("token", token);
        responseBody.put("refreshToken",refreshToken);
        responseBody.put("user", jsonUser);
        response.getWriter().write(String.valueOf(responseBody));

    }

}
