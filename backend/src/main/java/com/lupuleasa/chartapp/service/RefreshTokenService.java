package com.lupuleasa.chartapp.service;

import com.lupuleasa.chartapp.entity.JwtUser;
import com.lupuleasa.chartapp.repository.RefreshTokenRepository;
import com.lupuleasa.chartapp.security.JwtUtils;
import com.lupuleasa.chartapp.security.domain.JwtRefreshRequestDto;
import com.lupuleasa.chartapp.security.domain.JwtResponseDto;
import com.lupuleasa.chartapp.security.domain.RefreshToken;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class RefreshTokenService {

    private final RefreshTokenRepository refreshTokenRepository;
    private final JwtUtils jwtUtils;

    @Value("${refreshToken.expiration}")
    private int expiration;

    public String createToken(JwtUser user) {
        var refreshToken = refreshTokenRepository.save((RefreshToken.builder().token(UUID.randomUUID().toString())
                .user(user).expiration(ZonedDateTime.now(ZoneId.systemDefault()).plusMinutes(expiration)).build()));
        return refreshToken.getToken();
    }

    public Boolean isTokenAlreadyCreated(JwtUser user)
    {
        return refreshTokenRepository.findRefreshTokenByUser(user).isPresent();
    }

    public String getTokenByUser(JwtUser user)
    {
        var refreshToken =refreshTokenRepository.findRefreshTokenByUser(user);
        if(refreshToken.isPresent()){
        return refreshToken.get().getToken();}

       return "";
    }

    public JwtResponseDto refreshToken(JwtRefreshRequestDto refreshRequestDto) {
        var tokenOpt = refreshTokenRepository.findRefreshTokenByToken((refreshRequestDto.getRefreshToken()));
        if(tokenOpt.isEmpty()){
            throw new RuntimeException("Refresh token %s not found!".formatted(refreshRequestDto.getRefreshToken()));
        }
        var token = tokenOpt.get();
        if(isTokenExpired(token.getExpiration())){
            refreshTokenRepository.delete(token);
            throw new RuntimeException("Refresh token %s was expired!".formatted(refreshRequestDto.getRefreshToken()));
        }
        String jwt = jwtUtils.createJwt(token.getUser().getEmail());
        updateToken(token);
        return JwtResponseDto.of(jwt, token.getToken());
    }

    private void updateToken(RefreshToken token) {
        token.setExpiration(ZonedDateTime.now(ZoneId.systemDefault()).plusMinutes(expiration));
        refreshTokenRepository.save(token);
    }

    private boolean isTokenExpired(ZonedDateTime expirationTime) {
        return expirationTime.isBefore(ZonedDateTime.now(ZoneId.systemDefault()));
    }

}
