package org.neeq.projekt.entity;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.HashIndexed;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import java.time.LocalDate;
import java.util.Collection;
import java.util.Collections;
import java.util.List;


@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
@Document(collection = "users")
public class User implements UserDetails {
    @Id
    private String id;
    @Indexed(unique = true)
    @NotBlank(message = "Username cannot be empty")
    @Size(max = 20)
    private String username;
    @NotBlank(message = "Password cannot be empty")
    @Size(max = 120)
    @HashIndexed
    private String password;
    @Indexed(unique = true)
    @NotBlank(message = "Email cannot be empty")
    @Size(max =50)
    @Email
    private String email;
    private Role role;
    private LocalDate createdAt;


    public User(String username, String password, String email) {
        this.username = username;
        this.password = password;
        this.email = email;
        this.createdAt = LocalDate.now();
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
        return true;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.singletonList(new SimpleGrantedAuthority(role.getAuthority()));
    }

    @Override
    public @NotBlank(message = "Email cannot be empty") @Size(max = 50) @Email String getUsername() {
        return email;
    }

    public @NotBlank(message = "Username cannot be empty") @Size(max = 20) String getUsername1() {
        return username;
    }
}
