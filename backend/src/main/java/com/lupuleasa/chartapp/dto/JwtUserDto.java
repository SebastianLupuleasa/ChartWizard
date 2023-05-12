package com.lupuleasa.chartapp.dto;

import lombok.*;

/**
 * The dto for managing user info
 */
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class JwtUserDto {

    private long id;

    private String email;

    private String username;

    private boolean enabled;

    private String role;
}
