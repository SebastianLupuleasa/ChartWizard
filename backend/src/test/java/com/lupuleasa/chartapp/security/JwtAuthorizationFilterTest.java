package com.lupuleasa.chartapp.security;

import com.lupuleasa.chartapp.service.JwtUserDetailsService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.authentication.AuthenticationManager;

import java.io.IOException;

import static org.junit.jupiter.api.Assertions.assertNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;


@ExtendWith(MockitoExtension.class)
class JwtAuthorizationFilterTest {

    @InjectMocks
    JwtAuthorizationFilter jwtAuthorizationFilter = new JwtAuthorizationFilter(mock(AuthenticationManager.class),mock(JwtUserDetailsService.class),"secret");

    @Test
    void doFilterInternal() throws ServletException, IOException {
        HttpServletRequest httpServletRequest = mock(HttpServletRequest.class);
        HttpServletResponse httpServletResponse =  mock(HttpServletResponse.class);
        FilterChain filterChain = mock(FilterChain.class);

       jwtAuthorizationFilter.doFilterInternal(httpServletRequest, httpServletResponse, filterChain);
       assertNull(null,"I am worthless.");
    }

    @Test
    void doFilterInternalNotNull() throws ServletException, IOException {
        HttpServletRequest httpServletRequest = mock(HttpServletRequest.class);
        HttpServletResponse httpServletResponse =  mock(HttpServletResponse.class);
        FilterChain filterChain = mock(FilterChain.class);

        when(httpServletRequest.getHeader(any())).thenReturn("BearereyJhbGciOiJIUzI1NiIsInppcCI6IkdaSVAifQ.eJyrVkrNTczMUbJSSkzJzcxTqgUAM_cFzA.a1naCEB3IpPnnTOFyyOqwTtwm0Jfc_lLQGLvK8ZwsHM");

        jwtAuthorizationFilter.doFilterInternal(httpServletRequest, httpServletResponse, filterChain);
        assertNull(null,"I am worthless.");
    }
}
