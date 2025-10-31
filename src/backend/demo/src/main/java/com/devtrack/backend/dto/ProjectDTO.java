package com.devtrack.backend.dto;

import com.devtrack.backend.model.Project;

public record ProjectDTO(
        String id,
        String name,
        String description,
        double progress,
        String priority
) {
    public static ProjectDTO from(Project project) {
        if (project == null) return null;
        return new ProjectDTO(
                project.getId(),
                project.getName(),
                project.getDescription(),
                project.getProgress(),
                project.getPriority()
        );
    }
}