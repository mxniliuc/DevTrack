package com.devtrack.backend.repo;

import com.devtrack.backend.model.Activity;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface ActivityRepository extends MongoRepository<Activity, String> {
    List<Activity> findAllByOrderByTimestampDesc();
}