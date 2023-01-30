package com.lupuleasa.chartapp.controller;

import com.lupuleasa.chartapp.dto.JwtUserDto;
import com.lupuleasa.chartapp.entity.Chart;
import com.lupuleasa.chartapp.entity.JwtUser;
import com.lupuleasa.chartapp.service.JwtUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users/")
@RequiredArgsConstructor
public class JwtUserController {

    private final JwtUserService jwtUserService;

    @GetMapping()
    public ResponseEntity<List<JwtUser>> getUsers(){
        return new ResponseEntity<>(jwtUserService.getJwtUsers(), HttpStatus.OK);
    }

    @PostMapping("/edit")
    public ResponseEntity<JwtUserDto> editUser(@RequestBody JwtUserDto jwtUser){
        jwtUserService.editUser(jwtUser);
        return new ResponseEntity<>(jwtUser,HttpStatus.OK);
    }

    @DeleteMapping("/delete")
    public void deleteChart(@RequestParam long userId){
        jwtUserService.deleteUser(userId);
    }

}
