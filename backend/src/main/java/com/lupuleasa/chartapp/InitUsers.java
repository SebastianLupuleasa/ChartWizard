package com.lupuleasa.chartapp;

import com.lupuleasa.chartapp.entity.JwtUser;
import com.lupuleasa.chartapp.service.JwtUserService;
import com.lupuleasa.chartapp.enums.Role;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Set;

@Component
@RequiredArgsConstructor
public class InitUsers implements CommandLineRunner {

    public static final String TEST_123 = "test123";
    private final JwtUserService jwtUserService;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        if (jwtUserService.findJwtUserByEmail("admin@test.com").isEmpty()) {
            var u = jwtUserService.save(JwtUser.builder()
                    .username("Admin")
                    .email("admin@test.com")
                    .password(passwordEncoder.encode(TEST_123))
                    .role(Set.of(Role.ROLE_ADMIN, Role.ROLE_USER))
                    .enabled(true)
                    .build());
            u.setEnabled(true);
            jwtUserService.save(u);
        }
        if (jwtUserService.findJwtUserByEmail("pure@test.com").isEmpty()) {
            var u = jwtUserService.save(JwtUser.builder()
                    .username("pureAdmin")
                    .email("pure@test.com")
                    .password(passwordEncoder.encode(TEST_123))
                    .role(Set.of(Role.ROLE_ADMIN))
                    .enabled(true)
                    .build());
            u.setEnabled(true);
            jwtUserService.save(u);
        }
        if (jwtUserService.findJwtUserByEmail("user@test.com").isEmpty()) {
            var u = jwtUserService.save(JwtUser.builder()
                    .username("User")
                    .email("user@test.com")
                    .password(passwordEncoder.encode(TEST_123))
                    .role(Set.of(Role.ROLE_USER))
                    .enabled(true)
                    .build());
            u.setEnabled(true);
            jwtUserService.save(u);
        }
    }

}
