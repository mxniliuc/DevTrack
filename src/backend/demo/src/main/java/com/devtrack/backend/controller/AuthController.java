package com.devtrack.backend.controller;

import com.devtrack.backend.dto.UserDTO;
import com.devtrack.backend.model.User;
import com.devtrack.backend.repo.UserRepository;
import com.devtrack.backend.security.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = {
        "https://devtrack-4.onrender.com", 
        "http://localhost:5173"            
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtService jwtService;

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User loginRequest) {
        Optional<User> userOpt = userRepository.findByUsername(loginRequest.getUsername());

        if (userOpt.isEmpty()) {
            return ResponseEntity.status(401).body("{\"message\": \"User not found\"}");
        }

        User user = userOpt.get();

        if (!passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
            return ResponseEntity.status(401).body("{\"message\": \"Invalid credentials\"}");
        }

        String token = jwtService.generateToken(user.getUsername());

        return ResponseEntity.ok(new AuthResponse(UserDTO.from(user), token));
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User newUser) {
        if (userRepository.findByUsername(newUser.getUsername()).isPresent()) {
            return ResponseEntity.status(400).body("{\"message\": \"Username already exists\"}");
        }

        if (userRepository.findByEmail(newUser.getEmail()).isPresent()) {
            return ResponseEntity.status(400).body("{\"message\": \"Email already exists\"}");
        }

        newUser.setPassword(passwordEncoder.encode(newUser.getPassword()));

        userRepository.save(newUser);

        return ResponseEntity.ok("{\"message\": \"User registered successfully\"}");
    }

    private record AuthResponse(UserDTO user, String token) {}
}