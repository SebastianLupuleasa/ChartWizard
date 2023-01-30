package com.lupuleasa.chartapp.service;

import com.lupuleasa.chartapp.exception.ChartAppGenericException;
import com.lupuleasa.chartapp.entity.JwtUser;
import com.lupuleasa.chartapp.repository.JwtUserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class JwtUserService {

    private final JwtUserRepository jwtUserRepository;

    public List<JwtUser> getJwtUsers() { return jwtUserRepository.findAll();}

    public JwtUser save(JwtUser user) {
        return jwtUserRepository.save(user);
    }

    public Optional<JwtUser> findJwtUserByEmail(String email) {
        return jwtUserRepository.findJwtUserByEmail(email);
    }

    public JwtUser getJwtUserByEmail(String email) throws ChartAppGenericException {
        return jwtUserRepository.findJwtUserByEmail(email)
                .orElseThrow(() -> new ChartAppGenericException("User not found by email!"));
    }

    public JwtUser getJwtUserByUsername(String username) throws ChartAppGenericException {
        return jwtUserRepository.findJwtUserByUsername(username)
                .orElseThrow(() -> new ChartAppGenericException("User not found by username!"));
    }

}
