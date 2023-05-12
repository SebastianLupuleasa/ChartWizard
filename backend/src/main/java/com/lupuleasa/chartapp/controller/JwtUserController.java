package com.lupuleasa.chartapp.controller;

import com.lupuleasa.chartapp.dto.JwtUserDto;
import com.lupuleasa.chartapp.entity.JwtUser;
import com.lupuleasa.chartapp.service.JwtUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * The controller responsible for operations on the users
 */
@RestController
@RequestMapping("/users/")
@RequiredArgsConstructor
public class JwtUserController {

    private final JwtUserService jwtUserService;

    /**
     * Gets all the users
     * @return response entity containing a list of jwt users
     */
    @GetMapping()
    public ResponseEntity<List<JwtUser>> getUsers(){
        return new ResponseEntity<>(jwtUserService.getJwtUsers(), HttpStatus.OK);
    }

    /**
     * Edits a jwt user
     * @param jwtUser the user to be edited
     * @return response entity containing a jwt user
     */
    @PostMapping("/edit")
    public ResponseEntity<JwtUserDto> editUser(@RequestBody JwtUserDto jwtUser){
        jwtUserService.editUser(jwtUser);
        return new ResponseEntity<>(jwtUser,HttpStatus.OK);
    }

    /**
     * Deletes a user
     * @param userId the user id
     * @return a response entity with successful deletion message
     */
    @DeleteMapping("/delete")
    public ResponseEntity<String> deleteUser(@RequestParam long userId){
        jwtUserService.deleteUser(userId);
        return new ResponseEntity<>("The user was successfully deleted!",HttpStatus.OK);
    }

}
