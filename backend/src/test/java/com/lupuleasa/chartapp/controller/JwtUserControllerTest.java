package com.lupuleasa.chartapp.controller;

import com.lupuleasa.chartapp.dto.JwtUserDto;
import com.lupuleasa.chartapp.service.JwtUserService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;

import static org.junit.jupiter.api.Assertions.assertEquals;

@ExtendWith(MockitoExtension.class)
class JwtUserControllerTest {

    @InjectMocks
    private JwtUserController jwtUserController;

    @Mock
    private JwtUserService jwtUserService;

    @Test
    void whenGetUsersThenUsersAreReturned(){
        assertEquals(HttpStatus.OK,jwtUserController.getUsers().getStatusCode(),"Status codes are the same!");
    }

    @Test
    void whenEditUserThenUserIsEdited(){
        JwtUserDto jwtUser = new JwtUserDto();
        assertEquals(jwtUser,jwtUserController.editUser(jwtUser).getBody(),"JwtUser is returned!");
    }

    @Test
    void whenDeleteUserThenUserIsDeleted(){
        assertEquals(HttpStatus.OK,jwtUserController.deleteUser(2).getStatusCode(),"Status codes are the same!");
    }
}
