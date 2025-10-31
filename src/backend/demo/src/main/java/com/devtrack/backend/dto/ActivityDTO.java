package com.devtrack.backend.dto;

import com.devtrack.backend.model.Activity;
import java.time.LocalDateTime;

public record ActivityDTO(
        String id,
        String action,
        String detail,
        LocalDateTime timestamp,
        ProjectDTO project,
        UserDTO user
) {
    public static ActivityDTO from(Activity activity) {
        if (activity == null) return null;
        return new ActivityDTO(
                activity.getId(),
                activity.getAction(),
                activity.getDetail(),
                activity.getTimestamp(),
                ProjectDTO.from(activity.getProject()),
                UserDTO.from(activity.getUser())
        );
    }
}