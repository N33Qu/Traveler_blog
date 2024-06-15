package org.neeq.projekt.service;

import lombok.RequiredArgsConstructor;
import org.neeq.projekt.dto.auth.AuthenticationRequest;
import org.neeq.projekt.dto.auth.AuthenticationResponse;
import org.neeq.projekt.dto.auth.RegistrationRequest;
import org.neeq.projekt.exceptions.EmailAlreadyExists;
import org.neeq.projekt.security.jwt.JwtUtils;

import org.neeq.projekt.entity.Role;
import org.neeq.projekt.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.HashMap;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
    private final UserService userService;
    private final JwtUtils jwtUtils;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    @Autowired
    private final AuthenticationManager authenticationManager;
    public AuthenticationResponse register(RegistrationRequest request) throws EmailAlreadyExists {
        var user = User.builder()
                .username(request.getUsername())
                .email(request.getEmail())
                .password(bCryptPasswordEncoder.encode(request.getPassword()))
                .role(Role.USER)
                .createdAt(LocalDate.now())
                .build();
        userService.registerUser(user);
        HashMap<String, Object> map = new HashMap<>();
        map.put("Role", user.getAuthorities());
        var jwtToken = jwtUtils.generateToken(map, user);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );
        var user = userService.loadUserByUsername(request.getEmail());
        HashMap<String, Object> map = new HashMap<>();
        map.put("Role", user.getAuthorities());
        var jwtToken = jwtUtils.generateToken(map, user);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }
}
