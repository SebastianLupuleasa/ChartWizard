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

/**
 * The controller responsible for the authentication of the user
 */
@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    /**
     * The service responsible for refreshing the Jwt Token
      */
  private final RefreshTokenService refreshTokenService;

    /**
     * The repository for the JwtUser
     */
  private final JwtUserRepository jwtUserRepository;

    /**
     * The password encoder
     */
  private final PasswordEncoder passwordEncoder;

    /**
     * The method for the refresh of the token
     * @param refreshRequestDto a dto containing the refresh token
     * @return a dto containing a new Jwt token and a new refresh token
     */
  @PostMapping("/refresh")
   public JwtResponseDto refreshJwt(@RequestBody JwtRefreshRequestDto refreshRequestDto) {
      return refreshTokenService.refreshToken(refreshRequestDto);
  }

    /**
     * The method for the registration of the user
     * @param jwtUser the user to be registered
     * @return a response entity with an ok http status
     */
   @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody JwtUser jwtUser) {
       jwtUser.setRole(Collections.singleton(ROLE_USER));
       jwtUser.setEnabled(true);
       jwtUser.setPassword(passwordEncoder.encode(jwtUser.getPassword()));
       jwtUserRepository.save(jwtUser);

       return new ResponseEntity<>("User got saved in the database!", HttpStatus.OK);
    }
}
