package com.lupuleasa.chartapp.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.lupuleasa.chartapp.enums.Role;
import com.lupuleasa.chartapp.security.domain.RefreshToken;
import jakarta.persistence.*;
import lombok.*;

import org.hibernate.annotations.ColumnDefault;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.*;


/**
 * The entity for the user of the application
 */
@EqualsAndHashCode(of = "uuid")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class JwtUser implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private long id;

    @Builder.Default
    private String uuid = UUID.randomUUID().toString();

    @Column
    private String username;

    @Column(unique = true)
    private String email;

    @Column
    private String password;

    @Column
    @Enumerated(EnumType.STRING)
    @ElementCollection(fetch = FetchType.EAGER)
    private Set<Role> role = new HashSet<>();

    @Column()
    @Builder.Default
    @ColumnDefault("false")
    private boolean enabled = false;

    @OneToMany(cascade=CascadeType.REMOVE,fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id",referencedColumnName = "user_id")
    @JsonIgnore
    private List<Chart> charts = new ArrayList<>();

    @OneToMany(cascade=CascadeType.REMOVE,fetch = FetchType.LAZY)
    @JsonIgnore
    private List<Chart> sharedCharts = new ArrayList<>();

    @OneToOne(cascade=CascadeType.REMOVE,mappedBy = "user", fetch = FetchType.LAZY)
    @JsonIgnore
    private RefreshToken refreshToken;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        Set<GrantedAuthority> authorities = new HashSet<>();
        for (var r : this.role) {
            var sga = new SimpleGrantedAuthority(r.name());
            authorities.add(sga);
        }
        return authorities;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return this.enabled;
    }

    @Override
    public String toString() {
        return "JwtUser{" +
                "id=" + id +
                ", uuid='" + uuid + '\'' +
                ", username='" + username + '\'' +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                ", role=" + role +
                ", enabled=" + enabled +
                '}';
    }
}
