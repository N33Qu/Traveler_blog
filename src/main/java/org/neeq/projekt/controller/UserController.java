package org.neeq.projekt.controller;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.neeq.projekt.service.UserService;
import org.neeq.projekt.entity.User;
import org.neeq.projekt.dto.auth.ChangePasswordRequest;
import org.neeq.projekt.dto.UpdateProfileRequest;
import org.neeq.projekt.dto.UserUpdateRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;


@AllArgsConstructor
@RestController
@RequestMapping("/api/v1/user")
public class UserController {
    private final UserService userService;

    /**
     * Retrieves the connected user's profile.
     *
     * @param  connectedUser  the principal representing the connected user
     * @return             a response entity containing the connected user's profile
     */
    @GetMapping("/profile")
    @PreAuthorize("hasRole('ADMIN') or hasRole('USER')")
    public ResponseEntity<User> getProfile(Principal connectedUser) {
        return ResponseEntity.ok(userService.getProfile(connectedUser));
    }

    /**
     * Updates the connected user's profile.
     *
     * @param  request     the request object containing the updated profile
     * @param  connectedUser  the principal representing the connected user
     * @return             a response entity indicating the success of the profile update
     */
    @PatchMapping("/profile")
    @PreAuthorize("hasRole('ADMIN') or hasRole('USER')")
    public ResponseEntity<?> updateProfile(
            @Valid @RequestBody UpdateProfileRequest request,
            Principal connectedUser
    ) {
        userService.updateProfile(request, connectedUser);
        return ResponseEntity.ok().build();
    }



    /**
     * Updates the user's password.
     *
     * @param  request     the request object containing the new password
     * @param  connectedUser  the principal representing the connected user
     * @return             a response entity indicating the success of the password change
     */
    @CrossOrigin(origins = "http://localhost:3000")
    @PatchMapping("/changePassword")
    @PreAuthorize("hasRole('ADMIN') or hasRole('USER')")
    public ResponseEntity<?> changePassword(
            @Valid @RequestBody ChangePasswordRequest request,
            Principal connectedUser
    ) {
        userService.changePassword(request, connectedUser);
        return ResponseEntity.ok().build();
    }

    //ADMIN methods
    /**
     * Retrieves all users from the user service and returns them as a response entity.
     *
     * @return         	A response entity containing an iterable of all users.
     */
    @GetMapping("/getAllUsers")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Iterable<User>> getAllUsers() {
        return ResponseEntity.ok(userService.getAllUsers());
    }

    /**
     * Updates a user's information.
     *
     * @param  request  the user object containing the updated information
     * @return       a response entity with a string indicating the success of the update
     */
    @PatchMapping("/updateUser/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<String> updateUser(@Valid @RequestBody UserUpdateRequest request, @PathVariable String id) {
        return ResponseEntity.ok(userService.updateUser(request, id));
    }

    /**
     * Deletes a user.
     *
     * @param  user  the user object to be deleted
     * @return       a ResponseEntity with status OK if the user was successfully deleted
     */
    @DeleteMapping("/deleteUser/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteUser(@PathVariable String id) {
        userService.deleteUser(id);
        return ResponseEntity.ok().build();
    }



}
