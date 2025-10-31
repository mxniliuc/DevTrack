package com.devtrack.backend.repo;

import com.devtrack.backend.model.Comment;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface CommentRepository extends MongoRepository<Comment, String> {
    List<Comment> findByProjectId(String projectId);
}