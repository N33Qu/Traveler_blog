package org.neeq.projekt.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import org.neeq.projekt.entity.Role;

@Getter
@Setter
@Builder
public class UserUpdateRequest {
    @NotBlank(message = "Username must not be blank")
    private String username;
    @NotBlank
    @Size(min = 8, message = "Password must be at least 8 characters long")
    private String password;
    @NotBlank(message = "Email must not be blank")
    @Size(max = 50)
    @Email
    private String email;
    private Role role;
}
