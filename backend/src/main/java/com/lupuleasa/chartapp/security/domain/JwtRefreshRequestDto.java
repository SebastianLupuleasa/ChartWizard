package com.lupuleasa.chartapp.security.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * The JwtRefreshRequestDto
 */
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class JwtRefreshRequestDto {
    private String refreshToken;

}
