package com.devtrack.backend.controller;

import com.devtrack.backend.dto.UserDTO;
import com.devtrack.backend.model.User;
import com.devtrack.backend.service.UserService;
import com.devtrack.backend.security.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/user")
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {

    @Autowired private UserService userService;
    @Autowired private JwtService jwtService;
    @Autowired private PasswordEncoder passwordEncoder;

    @GetMapping("/me")
    public ResponseEntity<?> getCurrentUser(@RequestHeader("Authorization") String authHeader) {
        String username = jwtService.extractUsername(fromBearer(authHeader));
        Optional<User> user = userService.findByUsername(username);

        if (user.isEmpty()) {
            return ResponseEntity.status(404).body(Map.of("message", "User not found"));
        }

        return ResponseEntity.ok(UserDTO.from(user.get()));
    }

    @PutMapping("/update")
    public ResponseEntity<?> updateUser(@RequestHeader("Authorization") String authHeader, @RequestBody User updates) {
        String username = jwtService.extractUsername(fromBearer(authHeader));
        Optional<User> userOpt = userService.findByUsername(username);

        if (userOpt.isEmpty()) {
            return ResponseEntity.status(404).body(Map.of("message", "User not found"));
        }

        User user = userOpt.get();

        user.setFullName(nullSafe(updates.getFullName(), user.getFullName()));
        user.setEmail(nullSafe(updates.getEmail(), user.getEmail()));
        user.setRole(nullSafe(updates.getRole(), user.getRole()));
        user.setEmailNotifications(updates.isEmailNotifications());
        user.setInAppNotifications(updates.isInAppNotifications());
        user.setDefaultSort(nullSafe(updates.getDefaultSort(), user.getDefaultSort()));

        userService.save(user);
        return ResponseEntity.ok(Map.of("message", "User updated successfully"));
    } 

    @PutMapping("/password")
    public ResponseEntity<?> changePassword(@RequestHeader("Authorization") String authHeader,
                                            @RequestBody Map<String, String> body) {
        String username = jwtService.extractUsername(fromBearer(authHeader));
        Optional<User> userOpt = userService.findByUsername(username);

        if (userOpt.isEmpty()) {
            return ResponseEntity.status(404).body(Map.of("message", "User not found"));
        }

        User user = userOpt.get();
        String currentPassword = body.get("currentPassword");
        String newPassword = body.get("newPassword");

        if (!passwordEncoder.matches(currentPassword, user.getPassword())) {
            return ResponseEntity.status(400).body(Map.of("message", "Incorrect current password"));
        }

        user.setPassword(passwordEncoder.encode(newPassword));
        userService.save(user);
        return ResponseEntity.ok(Map.of("message", "Password updated successfully"));
    }

    @DeleteMapping("/delete")
    public ResponseEntity<?> deleteAccount(@RequestHeader("Authorization") String authHeader) {
        String username = jwtService.extractUsername(fromBearer(authHeader));
        Optional<User> userOpt = userService.findByUsername(username);

        if (userOpt.isEmpty()) {
            return ResponseEntity.status(404).body(Map.of("message", "User not found"));
        }

        userService.delete(userOpt.get());
        return ResponseEntity.ok(Map.of("message", "Account deleted"));
    }

    private String fromBearer(String header) {
        return header == null ? "" : header.replace("Bearer ", "").trim();
    }

    private String nullSafe(String v, String fallback) {
        return (v == null || v.isBlank()) ? fallback : v;
    }
}