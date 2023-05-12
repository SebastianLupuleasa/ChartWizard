package com.lupuleasa.chartapp.service;

import com.lupuleasa.chartapp.entity.JwtUser;
import com.lupuleasa.chartapp.exception.ChartAppRuntimeException;
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

/**
 * This service is responsive for performing checks and operations on Jwt tokens
 */
@Service
@RequiredArgsConstructor
public class RefreshTokenService {

    private final RefreshTokenRepository refreshTokenRepository;
    private final JwtUtils jwtUtils;

    @Value("${refreshToken.expiration}")
    private int expiration;

    /**
     * This method is responsible for creating a Jwt token
     * @param user the owner of the token
     * @return the newly created token
     */
    public String createToken(JwtUser user) {
        var refreshToken = refreshTokenRepository.save((RefreshToken.builder().token(UUID.randomUUID().toString())
                .user(user).expiration(ZonedDateTime.now(ZoneId.systemDefault()).plusMinutes(expiration)).build()));
        return refreshToken.getToken();
    }

    /**
     * Checks if the Jwt token is already created
     * @param user the owner of the token
     * @return true or false
     */
    public Boolean isTokenAlreadyCreated(JwtUser user)
    {
        return refreshTokenRepository.findRefreshTokenByUser(user).isPresent();
    }

    /**
     * Gets the token belonging to a user
     * @param user the owner of the token
     * @return the jwt token
     */
    public String getTokenByUser(JwtUser user)
    {
        var refreshToken =refreshTokenRepository.findRefreshTokenByUser(user);
        if(refreshToken.isPresent()){
        return refreshToken.get().getToken();}

       return "";
    }

    /**
     * Refreshes the Jwt token
     * @param refreshRequestDto dto that contains the refresh token
     * @return JwtResponseDto containing the jwt token and a refresh token
     */
    public JwtResponseDto refreshToken(JwtRefreshRequestDto refreshRequestDto) {
        var tokenOpt = refreshTokenRepository.findRefreshTokenByToken((refreshRequestDto.getRefreshToken()));
        if(tokenOpt.isEmpty()){
            throw new ChartAppRuntimeException("Refresh token %s not found!".formatted(refreshRequestDto.getRefreshToken()));
        }
        var token = tokenOpt.get();
        if(isTokenExpired(token.getExpiration())){
            refreshTokenRepository.delete(token);
            throw new ChartAppRuntimeException("Refresh token %s was expired!".formatted(refreshRequestDto.getRefreshToken()));
        }
        String jwt = jwtUtils.createJwt(token.getUser().getEmail());
        updateToken(token);
        return JwtResponseDto.of(jwt, token.getToken());
    }

    /**
     * Updates the refresh token
     * @param token the new refresh token to be updated
     */
    private void updateToken(RefreshToken token) {
        token.setExpiration(ZonedDateTime.now(ZoneId.systemDefault()).plusMinutes(expiration));
        refreshTokenRepository.save(token);
    }

    /**
     * Checks if the Jwt token is expired
     * @param expirationTime the expiration time of the token
     * @return true or false
     */
    private boolean isTokenExpired(ZonedDateTime expirationTime) {
        return expirationTime.isBefore(ZonedDateTime.now(ZoneId.systemDefault()));
    }

}
