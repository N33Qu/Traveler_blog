package org.neeq.projekt.controller;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.neeq.projekt.dto.auth.AuthenticationRequest;
import org.neeq.projekt.dto.auth.AuthenticationResponse;
import org.neeq.projekt.dto.auth.RegistrationRequest;
import org.neeq.projekt.exceptions.EmailAlreadyExists;
import org.neeq.projekt.service.AuthenticationService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthenticationService authenticationService;

    @PostMapping("login")
    public ResponseEntity<AuthenticationResponse> authenticate(@RequestBody AuthenticationRequest request) {
        return ResponseEntity.ok(authenticationService.authenticate(request));
    }

    @PostMapping("signup")
    public ResponseEntity<?> register(@Valid @RequestBody RegistrationRequest request) {
        try {
            AuthenticationResponse response = authenticationService.register(request);
            return ResponseEntity.ok(response);
        } catch (Exception ex) {
            return ResponseEntity.status(409).body(ex.getMessage());
        }
    }


}
