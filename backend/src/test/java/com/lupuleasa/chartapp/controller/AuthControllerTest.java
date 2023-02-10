package com.lupuleasa.chartapp.controller;

import com.lupuleasa.chartapp.entity.JwtUser;
import com.lupuleasa.chartapp.repository.JwtUserRepository;
import com.lupuleasa.chartapp.security.domain.JwtRefreshRequestDto;
import com.lupuleasa.chartapp.security.domain.JwtResponseDto;
import com.lupuleasa.chartapp.service.RefreshTokenService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class AuthControllerTest {

    @Mock
    private RefreshTokenService refreshTokenService;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private JwtUserRepository jwtUserRepository;

    @InjectMocks
    private AuthController authController;

    @Test
    void whenRefreshTokenThenRefreshTokenIsReturned(){
        JwtRefreshRequestDto refreshRequestDto = mock(JwtRefreshRequestDto.class);
        JwtResponseDto jwtResponseDto = mock(JwtResponseDto.class);
        when(refreshTokenService.refreshToken(refreshRequestDto)).thenReturn(jwtResponseDto);
        assertEquals(jwtResponseDto,authController.refreshJwt(refreshRequestDto),"ResponseDtos are equal!");
    }

    @Test
    void whenRegisterUserThenUserGetsRegistered(){
        JwtUser jwtUser = new JwtUser();
        jwtUser.setPassword("password");
        jwtUser.setUsername("username");
        jwtUser.setEmail("email");
        when(passwordEncoder.encode(anyString())).thenReturn("encodedPassword");
        assertEquals(new ResponseEntity<>("User got saved in the database!", HttpStatus.OK),authController.register(jwtUser),"ResponseDtos are equal!");
    }

}
