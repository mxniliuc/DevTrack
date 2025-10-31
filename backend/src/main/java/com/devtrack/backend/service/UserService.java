package com.devtrack.backend.service;

import com.devtrack.backend.model.User;
import com.devtrack.backend.repo.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public Optional<User> findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    public User save(User user) {
        return userRepository.save(user);
    }

    public User registerUser(User newUser) {
        newUser.setPassword(passwordEncoder.encode(newUser.getPassword()));
        return userRepository.save(newUser);
    }

    public User updateUser(User existing, User updates) {
        if (updates.getFullName() != null && !updates.getFullName().isBlank())
            existing.setFullName(updates.getFullName());

        if (updates.getEmail() != null && !updates.getEmail().isBlank())
            existing.setEmail(updates.getEmail());

        existing.setEmailNotifications(updates.isEmailNotifications());
        existing.setInAppNotifications(updates.isInAppNotifications());

        if (updates.getDefaultSort() != null && !updates.getDefaultSort().isBlank())
            existing.setDefaultSort(updates.getDefaultSort());

        return userRepository.save(existing);
    }

    public boolean changePassword(User user, String currentPassword, String newPassword) {
        if (!passwordEncoder.matches(currentPassword, user.getPassword())) {
            return false;
        }
        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);
        return true;
    }

    public void delete(User user) {
        userRepository.delete(user);
    }
}