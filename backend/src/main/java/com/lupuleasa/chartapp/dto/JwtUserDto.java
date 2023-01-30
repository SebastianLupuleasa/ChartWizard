package com.lupuleasa.chartapp.dto;

import lombok.*;

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
