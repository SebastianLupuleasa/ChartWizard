package com.lupuleasa.chartapp.repository;

import com.lupuleasa.chartapp.entity.JwtUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * The repository for the JwtUser
 */
@Repository
public interface JwtUserRepository extends JpaRepository<JwtUser, Long> {

    Optional<JwtUser> findJwtUserByUsername(String username);
    Optional<JwtUser> findJwtUserByEmail(String email);
    Optional<JwtUser> findJwtUserById(long id);
}
