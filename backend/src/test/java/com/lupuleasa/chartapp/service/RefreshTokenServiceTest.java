package com.lupuleasa.chartapp.service;

import com.lupuleasa.chartapp.entity.JwtUser;
import com.lupuleasa.chartapp.exception.ChartAppRuntimeException;
import com.lupuleasa.chartapp.repository.RefreshTokenRepository;
import com.lupuleasa.chartapp.security.JwtUtils;
import com.lupuleasa.chartapp.security.domain.JwtRefreshRequestDto;
import com.lupuleasa.chartapp.security.domain.RefreshToken;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDate;
import java.time.LocalTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class RefreshTokenServiceTest {

    @InjectMocks
    private RefreshTokenService refreshTokenService;

    @Mock
    private RefreshTokenRepository refreshTokenRepository;

    @Mock
    private JwtUtils jwtUtils;

    @Test
    void whenCreateTokenThenTokenIsCreated(){
        RefreshToken refreshToken = new RefreshToken();
        refreshToken.setToken("token");
        when(refreshTokenRepository.save(any())).thenReturn(refreshToken);
        assertEquals("token",refreshTokenService.createToken(new JwtUser()), "Token is returned.");
    }

    @Test
    void whenTokenDoesNotExistThenReturnFalse(){
        assertEquals(false,refreshTokenService.isTokenAlreadyCreated(new JwtUser()), "False is returned.");
    }

    @Test
    void whenGetTokenByUserThenReturnToken(){
        RefreshToken refreshToken = new RefreshToken();
        refreshToken.setToken("token");
        when(refreshTokenRepository.findRefreshTokenByUser(any())).thenReturn(Optional.of(refreshToken));
        assertEquals("token",refreshTokenService.getTokenByUser(new JwtUser()), "Token is returned.");
    }

    @Test
    void whenRefreshTokenNotFoundThenReturnThrowChartAppRuntimeException(){
        assertThrows(
                ChartAppRuntimeException.class,
                ()-> refreshTokenService.refreshToken(new JwtRefreshRequestDto()),
                "ChartAppRuntimeException is thrown"
        );
    }

//    @Test
//    void whenRefreshTokenIsExpiredThenReturnThrowChartAppRuntimeException(){
//        RefreshToken refreshToken = new RefreshToken();
//        refreshToken.setToken("token");
//        refreshToken.setExpiration(ZonedDateTime.now(ZoneId.of("GMT+05:30")));
//        when(refreshTokenRepository.findRefreshTokenByToken("token")).thenReturn(Optional.of(refreshToken));
//        JwtRefreshRequestDto refreshRequestDto = new JwtRefreshRequestDto();
//        refreshRequestDto.setRefreshToken("token");
//        assertThrows(
//                ChartAppRuntimeException.class,
//                ()-> refreshTokenService.refreshToken(refreshRequestDto),
//                "ChartAppRuntimeException is thrown"
//        );
//    }

    @Test
    void whenRefreshTokenIsExpiredThenReturnJwtResponseDto(){
        RefreshToken refreshToken = new RefreshToken();
        JwtUser jwtUser = new JwtUser();
        jwtUser.setEmail("email");
        refreshToken.setUser(jwtUser);
        refreshToken.setToken("token");
        LocalDate localDate = LocalDate.of(3000, 03, 12);
        LocalTime localTime = LocalTime.of(12,  44);
        ZonedDateTime timeStamp = ZonedDateTime.of( localDate, localTime, ZoneId.systemDefault() );
        refreshToken.setExpiration(timeStamp);
        when(refreshTokenRepository.findRefreshTokenByToken("token")).thenReturn(Optional.of(refreshToken));
        JwtRefreshRequestDto refreshRequestDto = new JwtRefreshRequestDto();
        refreshRequestDto.setRefreshToken("token");

        assertEquals("token",refreshTokenService.refreshToken(refreshRequestDto).getRefreshToken(),"JwtResponseDto is returned.");

    }

}
