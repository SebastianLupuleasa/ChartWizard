package com.lupuleasa.chartapp.service;

import com.lupuleasa.chartapp.entity.JwtUser;
import com.lupuleasa.chartapp.exception.ChartAppGenericException;
import com.lupuleasa.chartapp.exception.ChartAppRuntimeException;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.core.userdetails.User;

import java.util.HashSet;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class JwtUserDetailsServiceTest {

    @InjectMocks
    private JwtUserDetailsService jwtUserDetailsService;

    @Mock
    private JwtUserService jwtUserService;

    @Test
    void whenLoadUserByUsernameThenUserIsReturned() throws ChartAppGenericException {
        JwtUser jwtUser = new JwtUser();
        jwtUser.setEmail("lupuleasas@gmail.com");
        jwtUser.setUsername("username");
        jwtUser.setPassword("password");
        jwtUser.setEnabled(true);
        when(jwtUserService.getJwtUserByEmail("lupuleasas@gmail.com")).thenReturn(jwtUser);
        User user = new User("username","password",true,true,true,true,new HashSet<>());
        assertEquals(user.getUsername(), jwtUserDetailsService.loadUserByUsername("lupuleasas@gmail.com").getUsername(),"User is being returned.");
    }

    @Test
    void whenLoadUserByUsernameThenExceptionIsThrown() throws ChartAppGenericException {
        JwtUser jwtUser = new JwtUser();
        jwtUser.setEmail("lupuleasas@gmail.com");
        jwtUser.setUsername("username");
        jwtUser.setPassword("password");
        jwtUser.setEnabled(true);
        when(jwtUserService.getJwtUserByEmail("lupuleasas@gmail.com")).thenThrow(new ChartAppGenericException("i am exception"));
        assertThrows(
                ChartAppRuntimeException.class,
                ()->jwtUserDetailsService.loadUserByUsername("lupuleasas@gmail.com"),
                "ChartAppRuntimeException is thrown.");
    }

}
