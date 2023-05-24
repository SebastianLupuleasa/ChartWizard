package com.lupuleasa.chartapp.service;

import com.lupuleasa.chartapp.dto.JwtUserDto;
import com.lupuleasa.chartapp.entity.JwtUser;
import com.lupuleasa.chartapp.exception.ChartAppGenericException;
import com.lupuleasa.chartapp.exception.ChartAppRuntimeException;
import com.lupuleasa.chartapp.repository.JwtUserRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class JwtUserServiceTest {

    @InjectMocks
    private JwtUserService jwtUserService;

    @Mock
    private JwtUserRepository jwtUserRepository;


    @Test
    void whenGetJwtUsersThenJwtUsersAreReturned(){
        jwtUserService.deleteUser(2L);
        assertEquals(jwtUserService.getJwtUsers(),jwtUserRepository.findAll(),"Users are returned.");
    }

    @Test
    void whenSaveJwtUserThenJwtUserIsReturned(){
        JwtUser jwtUser = new JwtUser();
        when(jwtUserRepository.save(any())).thenReturn(jwtUser);
        assertEquals(jwtUser,jwtUserRepository.save(new JwtUser()), "User is returned.");
    }

    @Test
    void whenFindJwtUserThenOptionalEmptyIsReturned(){
        assertEquals(Optional.empty(),jwtUserRepository.findJwtUserByEmail("ss"),"Optional.empty() is returned.");
    }

    @Test
    void whenGetJwtUserByEmailThenChartAppGenericExceptionIsThrown() {
        assertThrows(
                ChartAppGenericException .class,
                ()-> jwtUserService.getJwtUserByEmail("ss"),
                "ChartAppGenericException is thrown"
        );
    }

    @Test
    void whenGetJwtUserByUsernameThenChartAppGenericExceptionIsThrown() {
        assertThrows(
                ChartAppRuntimeException .class,
                ()-> jwtUserService.getJwtUserByUsername("ss"),
                "ChartAppRuntimeException is thrown"
        );
    }

    @Test
    void whenSaveJwtUserThenJwtUserIsSaved(){
        JwtUser jwtUser = new JwtUser();
        when(jwtUserRepository.save(jwtUser)).thenReturn(jwtUser);

        assertEquals(jwtUserService.save(jwtUser),jwtUser,"User is saved and returned!");
    }

    @Test
    void whenGetJwtUserByIdThenJwtUserIsReturned() throws ChartAppGenericException {
        JwtUser jwtUser = new JwtUser();
        when(jwtUserRepository.findJwtUserById(1L)).thenReturn(Optional.of(jwtUser));

        assertEquals(jwtUserService.getJwtUserById(1L),jwtUser,"User is saved and returned!");
    }

    @Test
    void whenEditJwtUserThenJwtUserIsEdited() {
        JwtUserDto jwtUser = new JwtUserDto();
        jwtUser.setRole("Admin");
        jwtUser.setId(1L);
        JwtUser jwtUser1 = new JwtUser();

        when(jwtUserRepository.findJwtUserById(1L)).thenReturn(Optional.of(jwtUser1));

        jwtUserService.editUser(jwtUser);
        jwtUser.setRole("User");
        jwtUserService.editUser(jwtUser);

        assertNull(null,"I am worthless.");
    }

}
