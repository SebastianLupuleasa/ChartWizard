package com.lupuleasa.chartapp.security;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.util.ReflectionTestUtils;

import static org.junit.jupiter.api.Assertions.assertNotNull;

@ExtendWith(MockitoExtension.class)
@TestPropertySource(properties = {"jwt.secret=secret"})
class JwtUtilsTest {

    @InjectMocks
    private JwtUtils jwtUtils;

    @Test
    void createJwt() {

        ReflectionTestUtils.setField(jwtUtils, "secret", "secretKey");

        assertNotNull(jwtUtils.createJwt("my@gmail.com"),"Jwt Token is created!");

    }

}
