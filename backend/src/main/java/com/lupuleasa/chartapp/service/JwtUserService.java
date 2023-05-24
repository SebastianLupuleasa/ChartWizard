package com.lupuleasa.chartapp.service;

import com.lupuleasa.chartapp.dto.JwtUserDto;
import com.lupuleasa.chartapp.entity.JwtUser;
import com.lupuleasa.chartapp.enums.Role;
import com.lupuleasa.chartapp.exception.ChartAppGenericException;
import com.lupuleasa.chartapp.exception.ChartAppRuntimeException;
import com.lupuleasa.chartapp.repository.JwtUserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

/**
 * Performs operations on the users
 */
@Service
@RequiredArgsConstructor
public class JwtUserService {

    private final JwtUserRepository jwtUserRepository;

    /**
     * Returns all the jwt users
     * @return a list of jwt users
     */
    public List<JwtUser> getJwtUsers() { return jwtUserRepository.findAll();}

    /**
     * Saves a jwt user in the database
     * @param user the user to be saved
     * @return the saved user
     */
    public JwtUser save(JwtUser user) {
        return jwtUserRepository.save(user);
    }

    /**
     * Gets a jwt user by email
     * @param email the email of the user
     * @return a jwt user
     * @throws ChartAppGenericException the generic exception
     */
    public JwtUser getJwtUserByEmail(String email) throws ChartAppGenericException {
        return jwtUserRepository.findJwtUserByEmail(email)
                .orElseThrow(() -> new ChartAppGenericException("User not found by email!"));
    }

    /**
     * Gets a jwt user by id
     * @param id the id of the user
     * @return a jwt user
     * @throws ChartAppGenericException the generic exception
     */
    public JwtUser getJwtUserById(long id) throws ChartAppGenericException {
        return jwtUserRepository.findJwtUserById(id)
                .orElseThrow(() -> new ChartAppGenericException("User not found by email!"));
    }

    /**
     * Gets a jwt user by the username
     * @param username the username of the jwt user
     * @return a jwt user
     * @throws ChartAppRuntimeException the generic exception
     */
    public JwtUser getJwtUserByUsername(String username) throws ChartAppRuntimeException {
        return jwtUserRepository.findJwtUserByUsername(username)
                .orElseThrow(() -> new ChartAppRuntimeException("User not found by username!"));
    }

    /**
     * Deletes a jwt user
     * @param userId the user id
     */
    public void deleteUser(long userId) {
        jwtUserRepository.deleteById(userId);
    }

    /**
     * Edits a jwt user
     * @param jwtUser the jwt user to be edited
     */
    public void editUser(JwtUserDto jwtUser) {
        Optional<JwtUser> oldUser = jwtUserRepository.findJwtUserById(jwtUser.getId());
        if(oldUser.isPresent()){
        oldUser.get().setEmail(jwtUser.getEmail());
        oldUser.get().setUsername(jwtUser.getUsername());
        oldUser.get().setEnabled(jwtUser.isEnabled());
        if(jwtUser.getRole().equals("Admin")){
            oldUser.get().getRole().add(Role.ROLE_ADMIN);
            oldUser.get().getRole().add(Role.ROLE_USER);
        }
        else{
            oldUser.get().getRole().remove(Role.ROLE_ADMIN);
            oldUser.get().getRole().add(Role.ROLE_USER);
        }
        jwtUserRepository.save(oldUser.get());
        }
    }
}
