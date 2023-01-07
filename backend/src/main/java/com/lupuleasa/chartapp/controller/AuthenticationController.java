package com.lupuleasa.chartapp.controller;

import com.lupuleasa.chartapp.entity.JwtUser;
import com.lupuleasa.chartapp.repository.JwtUserRepository;
import com.lupuleasa.chartapp.security.JsonObjectAuthenticationFilter;
import com.lupuleasa.chartapp.security.domain.LoginCredentials;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
public class AuthenticationController {

    private final JwtUserRepository jwtUserRepository;

    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody JwtUser jwtUser) {
       jwtUserRepository.save(jwtUser);
       return ResponseEntity.ok("Registered with succes.");
    }
}
