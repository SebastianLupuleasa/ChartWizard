package com.lupuleasa.chartapp.service;

import com.lupuleasa.chartapp.exception.ChartAppGenericException;
import com.lupuleasa.chartapp.entity.JwtUser;
import com.lupuleasa.chartapp.exception.ChartAppRuntimeException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

/**
 * The service responsible for retrieving the user details
 */
@Service
@RequiredArgsConstructor
public class JwtUserDetailsService implements UserDetailsService {

    private final JwtUserService jwtUserService;

    /**
     * Returns the details of a user based on email
     * @param email the email of the user
     * @return the user details
     * @throws UsernameNotFoundException thrown when the user is not found
     */
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        JwtUser user = null;
        try {
            user = jwtUserService.getJwtUserByEmail(email);
        } catch (ChartAppGenericException e) {
            throw new ChartAppRuntimeException(e.getExceptionMessage());
        }

        return new User(user.getUsername(), user.getPassword(), user.isEnabled(), true, true, true, user.getAuthorities());
    }

}
