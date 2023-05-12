package com.lupuleasa.chartapp.security.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * The LoginCredentials of the user
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class LoginCredentials {

    private String email;
    private String password;

}
