package com.lupuleasa.chartapp.security.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * The JwtResponseDto
 */
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class JwtResponseDto {

    private String token;
    private String refreshToken;

    /**
     * Creates a new Jwt Response Dto from a token and refresh token
     * @param token the jwt token
     * @param refreshToken the refresh token
     * @return a new JwtResponseDto
     */
    public static JwtResponseDto of(String token, String refreshToken) {
        return new JwtResponseDto(token,refreshToken);
    }
}
