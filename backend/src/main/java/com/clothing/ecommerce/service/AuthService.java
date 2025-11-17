package com.clothing.ecommerce.service;

import com.clothing.ecommerce.dto.AuthResponse;
import com.clothing.ecommerce.dto.LoginRequest;
import com.clothing.ecommerce.dto.SignupRequest;
import com.clothing.ecommerce.model.User;
import com.clothing.ecommerce.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class AuthService {
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    public AuthResponse signup(SignupRequest signupRequest) {
        // Check if user already exists
        if (userRepository.existsByEmail(signupRequest.getEmail())) {
            throw new RuntimeException("Email already exists");
        }
        
        // Create new user
        User user = new User();
        user.setName(signupRequest.getName());
        user.setEmail(signupRequest.getEmail());
        user.setPassword(passwordEncoder.encode(signupRequest.getPassword()));
        
        User savedUser = userRepository.save(user);
        
        // Generate token (simple UUID for now, can be replaced with JWT)
        String token = generateToken(savedUser);
        
        AuthResponse response = new AuthResponse();
        response.setToken(token);
        response.setUser(new AuthResponse.UserDto(
            savedUser.getId(),
            savedUser.getName(),
            savedUser.getEmail()
        ));
        response.setMessage("Signup successful");
        return response;
    }
    
    public AuthResponse login(LoginRequest loginRequest) {
        User user = userRepository.findByEmail(loginRequest.getEmail())
            .orElseThrow(() -> new RuntimeException("Invalid email or password"));
        
        // Verify password
        if (!passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid email or password");
        }
        
        // Generate token
        String token = generateToken(user);
        
        AuthResponse response = new AuthResponse();
        response.setToken(token);
        response.setUser(new AuthResponse.UserDto(
            user.getId(),
            user.getName(),
            user.getEmail()
        ));
        response.setMessage("Login successful");
        return response;
    }
    
    private String generateToken(User user) {
        // Simple token generation using UUID
        // In production, use JWT tokens
        return UUID.randomUUID().toString() + "-" + user.getId();
    }
}

