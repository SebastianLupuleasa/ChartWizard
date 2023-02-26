package com.lupuleasa.chartapp.service;

import com.lupuleasa.chartapp.dto.JwtUserDto;
import com.lupuleasa.chartapp.enums.Role;
import com.lupuleasa.chartapp.exception.ChartAppGenericException;
import com.lupuleasa.chartapp.entity.JwtUser;
import com.lupuleasa.chartapp.exception.ChartAppRuntimeException;
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

    public JwtUser getJwtUserByUsername(String username) throws ChartAppRuntimeException {
        return jwtUserRepository.findJwtUserByUsername(username)
                .orElseThrow(() -> new ChartAppRuntimeException("User not found by username!"));
    }

    public void deleteUser(long userId) {
        jwtUserRepository.deleteById(userId);
    }

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
