package com.clothing.ecommerce.service;

import com.clothing.ecommerce.dto.AuthResponse;
import com.clothing.ecommerce.model.User;
import com.clothing.ecommerce.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class AdminService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // Hardcoded admin credentials for now
    // In production, you should have a separate Admin entity or role-based access
    private static final String ADMIN_EMAIL = "admin@bhuaasa.com";
    private static final String ADMIN_PASSWORD = "$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy"; // "admin123"

    public AuthResponse login(String email, String password) {
        // Check if it's the admin email
        if (ADMIN_EMAIL.equals(email)) {
            // Verify password (in production, use proper password verification)
            if (passwordEncoder.matches(password, ADMIN_PASSWORD) || "admin123".equals(password)) {
                // Generate token
                String token = UUID.randomUUID().toString();

                // Create or update admin user
                User admin = userRepository.findByEmail(ADMIN_EMAIL)
                        .orElseGet(() -> {
                            User newAdmin = new User();
                            newAdmin.setName("Admin");
                            newAdmin.setEmail(ADMIN_EMAIL);
                            newAdmin.setPassword(ADMIN_PASSWORD);
                            newAdmin.setToken(token);
                            return userRepository.save(newAdmin);
                        });

                admin.setToken(token);
                userRepository.save(admin);

                AuthResponse.UserDto userDto = new AuthResponse.UserDto();
                userDto.setId(admin.getId());
                userDto.setName(admin.getName());
                userDto.setEmail(admin.getEmail());

                AuthResponse response = new AuthResponse();
                response.setToken(token);
                response.setUser(userDto);
                response.setMessage("Admin login successful");

                return response;
            } else {
                throw new RuntimeException("Invalid credentials");
            }
        } else {
            throw new RuntimeException("Admin access only");
        }
    }
}

