package com.devtrack.backend.web;

import com.devtrack.backend.dto.ActivityDTO;
import com.devtrack.backend.repo.ActivityRepository;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/activity")
@CrossOrigin(origins = "*")
public class ActivityController {

    private final ActivityRepository activityRepository;

    public ActivityController(ActivityRepository activityRepository) {
        this.activityRepository = activityRepository;
    }

    @GetMapping
    public List<ActivityDTO> getAllActivity() {
        return activityRepository
                .findAllByOrderByTimestampDesc()
                .stream()
                .map(ActivityDTO::from)
                .toList();
    }
}