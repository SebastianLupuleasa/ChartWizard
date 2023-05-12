package com.lupuleasa.chartapp.security;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import java.time.Instant;
import java.time.ZoneId;
import java.time.ZonedDateTime;

/**
 * The utils needed for the construction of the token
 */
@Component
@RequiredArgsConstructor
public class JwtUtils {

    @Value("${jwt.expiration}")
    private int expTime;

    @Value("${jwt.secret}")
    private String secret;

    /**
     * Creates a new jwt token
     * @param email the email used for token creation
     * @return a jwt token as a string
     */
    public String createJwt(String email) {
        return JWT.create()
                .withSubject(email)
                .withExpiresAt(Instant.ofEpochMilli(ZonedDateTime.now(ZoneId.systemDefault()).toInstant().toEpochMilli() + expTime))
                .sign(Algorithm.HMAC256(secret));
    }

}
