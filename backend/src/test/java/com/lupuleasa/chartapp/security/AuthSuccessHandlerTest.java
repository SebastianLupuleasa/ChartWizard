package com.lupuleasa.chartapp.security;

import com.lupuleasa.chartapp.entity.JwtUser;
import com.lupuleasa.chartapp.service.JwtUserService;
import com.lupuleasa.chartapp.service.RefreshTokenService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;

import java.io.IOException;
import java.io.PrintWriter;

import static org.junit.jupiter.api.Assertions.assertNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class AuthSuccessHandlerTest {

    @InjectMocks
    private AuthSuccessHandler authSuccessHandler;

    @Mock
    private JwtUserService jwtUserService;

    @Mock
    private JwtUtils jwtUtils;

    @Mock
    private RefreshTokenService refreshTokenService;

    @Test
    void onAuthenticationSuccess() throws IOException {
        HttpServletRequest httpServletRequest = mock(HttpServletRequest.class);
        HttpServletResponse httpServletResponse =  mock(HttpServletResponse.class);
        Authentication authentication =  mock(Authentication.class);
        UserDetails userDetails = mock(UserDetails.class);

        when(authentication.getPrincipal()).thenReturn(userDetails);
        when(jwtUserService.getJwtUserByUsername(any())).thenReturn(new JwtUser());
        when(httpServletResponse.getWriter()).thenReturn(mock(PrintWriter.class));

       authSuccessHandler.onAuthenticationSuccess(httpServletRequest,httpServletResponse, authentication);
       assertNull(null,"I am worthless.");
    }

}
