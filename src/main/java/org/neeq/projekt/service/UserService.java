package org.neeq.projekt.service;


import lombok.AllArgsConstructor;
import org.neeq.projekt.entity.Post;
import org.neeq.projekt.entity.User;
import org.neeq.projekt.exceptions.EmailAlreadyExists;
import org.neeq.projekt.exceptions.PostNotFoundException;
import org.neeq.projekt.repository.UserRepository;
import org.neeq.projekt.dto.auth.ChangePasswordRequest;
import org.neeq.projekt.dto.UpdateProfileRequest;
import org.neeq.projekt.dto.UserUpdateRequest;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.util.Optional;

@Service
@AllArgsConstructor
public class UserService implements UserDetailsService {

    private final String USER_NOT_FOUND_MSG = "User with email %s not found";
    private final UserRepository userRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException(String.format(USER_NOT_FOUND_MSG, email)));
    }



    public void registerUser(User user) throws EmailAlreadyExists {
        if (userRepository.existsByEmail(user.getEmail())) {
            throw new EmailAlreadyExists("Email already taken!");
        }
        userRepository.save(user);
    }



    public User getCurrentUserProfile() {
        return (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    }


    public Iterable<User> getAllUsers() {
        return userRepository.findAll();
    }

    public void changePassword(ChangePasswordRequest request, Principal connectedUser) {
        var user = (User) ((UsernamePasswordAuthenticationToken) connectedUser).getPrincipal();

        if (!bCryptPasswordEncoder.matches(request.getCurrentPassword(), user.getPassword())) {
            throw new IllegalStateException("Wrong password");
        }

        if (!request.getNewPassword().equals(request.getConfirmationPassword())) {
            throw new IllegalStateException("Password are not the same");
        }

        user.setPassword(bCryptPasswordEncoder.encode(request.getNewPassword()));

        userRepository.save(user);
    }


    public void updateProfile(UpdateProfileRequest request, Principal connectedUser) {
        var user = (User) ((UsernamePasswordAuthenticationToken) connectedUser).getPrincipal();
        user.setUsername(request.getUsername());
        userRepository.save(user);
    }

    public User getProfile(Principal connectedUser) {
        return (User) ((UsernamePasswordAuthenticationToken) connectedUser).getPrincipal();
    }

    public String updateUser(UserUpdateRequest request, String id) {
        var userToUpdate = userRepository.findById(id).orElseThrow();
        userToUpdate.setUsername(request.getUsername());
        userToUpdate.setEmail(request.getEmail());
        userToUpdate.setPassword(bCryptPasswordEncoder.encode(request.getPassword()));
        userToUpdate.setRole(request.getRole());
        userRepository.save(userToUpdate);
        return "User updated";
    }

    public void deleteUser(String id) {
        User user = userRepository.findById(id).orElseThrow(() -> new PostNotFoundException("User not found with id: " + id));
        userRepository.delete(user);
    }
}
