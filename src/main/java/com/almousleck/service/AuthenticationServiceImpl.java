package com.almousleck.service;

import com.almousleck.dto.JwtAuthResponse;
import com.almousleck.dto.LoginDto;
import com.almousleck.dto.RegisterDto;
import com.almousleck.exception.APIException;
import com.almousleck.jwt.JwtProvider;
import com.almousleck.model.Role;
import com.almousleck.model.User;
import com.almousleck.repository.RoleRepository;
import com.almousleck.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.*;

/**
 * Created by Almousleck on Mar, 2024
 */

@Service
@RequiredArgsConstructor
public class AuthenticationServiceImpl implements AuthenticationService {
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final AuthenticationManager authenticationManager;
    private final PasswordEncoder passwordEncoder;
    private final JwtProvider jwtProvider;

    @Override
    public String register(RegisterDto registerDto) {
        // check if username already exists
        if (userRepository.existsByUsername(registerDto.getUsername()))
            throw new APIException(HttpStatus.BAD_REQUEST,"username taken");

        // check if email taken
        if (userRepository.existsByEmail(registerDto.getEmail()))
            throw new APIException(HttpStatus.BAD_REQUEST, "Email taken");

        User user = new User();
        user.setName(registerDto.getName());
        user.setUsername(registerDto.getUsername());
        user.setEmail(registerDto.getEmail());
        user.setPassword(passwordEncoder.encode(registerDto.getPassword()));

        Set<Role> roles = new HashSet<>();
        Role userRole = roleRepository.findByName("ROLE_USER");
        roles.add(userRole);

        user.setRoles(roles);
        userRepository.save(user);
        return "User Registered Successfully";
    }

    @Override
    public JwtAuthResponse login(LoginDto loginDto) {
        Authentication authentication = authenticationManager
                .authenticate(new UsernamePasswordAuthenticationToken(
                        loginDto.getUsernameOrEmail(), loginDto.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);

        String token = jwtProvider.generateToken(authentication);

        // get the role from user in the user-base
        Optional<User> userOptional = userRepository
                .findByUsernameOrEmail(loginDto.getUsernameOrEmail(),
                        loginDto.getUsernameOrEmail());

        String role = null;
        if (userOptional.isPresent()) {
            User loggedInUser = userOptional.get();
            Optional<Role> optionalRole = loggedInUser.getRoles()
                    .stream().findFirst();

            if (optionalRole.isPresent()) {
                Role userRole = optionalRole.get();
                role = userRole.getName();
            }
        }

        JwtAuthResponse response = new JwtAuthResponse();
        response.setRole(role);
        response.setAccessToken(token);

        return response;
    }

    @Override
    public List<User> users() {
        return userRepository.findAll();
    }
}
