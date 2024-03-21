package com.almousleck.service;

import com.almousleck.dto.JwtAuthResponse;
import com.almousleck.dto.LoginDto;
import com.almousleck.dto.RegisterDto;
import com.almousleck.model.User;

import java.util.List;

/**
 * Created by Almousleck on Mar, 2024
 */
public interface AuthenticationService {
    String register(RegisterDto registerDto);
    JwtAuthResponse login(LoginDto loginDto);
    List<User> users();
}
