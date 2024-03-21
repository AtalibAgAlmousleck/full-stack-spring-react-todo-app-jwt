package com.almousleck.controller;

import com.almousleck.dto.JwtAuthResponse;
import com.almousleck.dto.LoginDto;
import com.almousleck.dto.RegisterDto;
import com.almousleck.model.User;
import com.almousleck.service.AuthenticationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Created by Almousleck on Mar, 2024
 */

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@CrossOrigin("*")
public class AuthenticationController {

    private final AuthenticationService authenticationService;

    @GetMapping("/all")
    public ResponseEntity<List<User>> users() {
        List<User> response = authenticationService.users();
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody RegisterDto registerDto) {
        String response = authenticationService.register(registerDto);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<JwtAuthResponse> login(@RequestBody LoginDto loginDto) {
        JwtAuthResponse response = authenticationService.login(loginDto);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
