package com.devtrack.backend.dto;

import com.devtrack.backend.model.User;

public record UserDTO(
        String id,
        String username,
        String fullName,
        String email,
        String role,
        boolean emailNotifications,
        boolean inAppNotifications,
        String defaultSort
) {
    public static UserDTO from(User user) {
        if (user == null) return null;
        return new UserDTO(
                user.getId(),
                user.getUsername(),
                user.getFullName(),
                user.getEmail(),
                user.getRole(),
                user.isEmailNotifications(),
                user.isInAppNotifications(),
                user.getDefaultSort()
        );
    }
}