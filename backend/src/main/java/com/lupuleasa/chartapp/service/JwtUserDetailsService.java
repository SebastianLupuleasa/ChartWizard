package com.lupuleasa.chartapp.service;

import com.lupuleasa.chartapp.exception.ChartAppGenericException;
import com.lupuleasa.chartapp.entity.JwtUser;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class JwtUserDetailsService implements UserDetailsService {

    private final JwtUserService jwtUserService;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        JwtUser user = null;
        try {
            user = jwtUserService.getJwtUserByEmail(email);
        } catch (ChartAppGenericException e) {
            throw new RuntimeException(e);
        }

        return new User(user.getUsername(), user.getPassword(), user.isEnabled(), true, true, true, user.getAuthorities());
    }

}
