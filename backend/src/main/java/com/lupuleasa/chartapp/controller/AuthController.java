package com.lupuleasa.chartapp.controller;

import com.lupuleasa.chartapp.entity.JwtUser;
import com.lupuleasa.chartapp.repository.JwtUserRepository;
import com.lupuleasa.chartapp.security.domain.JwtRefreshRequestDto;
import com.lupuleasa.chartapp.security.domain.JwtResponseDto;
import com.lupuleasa.chartapp.service.RefreshTokenService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;

import static com.lupuleasa.chartapp.enums.Role.ROLE_USER;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

  private final RefreshTokenService refreshTokenService;

  private final JwtUserRepository jwtUserRepository;

  private final PasswordEncoder passwordEncoder;

  @PostMapping("/refresh")
   public JwtResponseDto refreshJwt(@RequestBody JwtRefreshRequestDto refreshRequestDto) {
      return refreshTokenService.refreshToken(refreshRequestDto);
  }

   @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody JwtUser jwtUser) {
       jwtUser.setRole(Collections.singleton(ROLE_USER));
       jwtUser.setEnabled(true);
       jwtUser.setPassword(passwordEncoder.encode(jwtUser.getPassword()));
       jwtUserRepository.save(jwtUser);

       return new ResponseEntity<>("User got saved in the database!", HttpStatus.OK);
    }

}
