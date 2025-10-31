package com.devtrack.backend.web;

import com.devtrack.backend.model.Comment;
import com.devtrack.backend.model.Activity;
import com.devtrack.backend.repo.CommentRepository;
import com.devtrack.backend.repo.ActivityRepository;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/comments")
@CrossOrigin(origins = "*")
public class CommentController {
    private final CommentRepository commentRepository;
    private final ActivityRepository activityRepository;

    public CommentController(CommentRepository commentRepository, ActivityRepository activityRepository) {
        this.commentRepository = commentRepository;
        this.activityRepository = activityRepository;
    }

    @GetMapping
    public List<Comment> getComments(@RequestParam String projectId) {
        return commentRepository.findByProjectId(projectId);
    }

    @PostMapping
    public Comment addComment(@RequestBody Comment comment) {
        Comment saved = commentRepository.save(comment);

        // Log to activity
        Activity activity = new Activity();
        activity.setAction("New Comment");
        activity.setDetail("Comment by " + comment.getAuthor() + " on project " + comment.getProjectId());
        activity.setTimestamp(LocalDateTime.now());
        activityRepository.save(activity);

        return saved;
    }

    @DeleteMapping("/{id}")
    public void deleteComment(@PathVariable String id) {
        Comment deleted = commentRepository.findById(id).orElse(null);
        if (deleted != null) {
            commentRepository.deleteById(id);
            Activity activity = new Activity();
            activity.setAction("Comment Deleted");
            activity.setDetail("Comment by " + deleted.getAuthor() + " deleted.");
            activity.setTimestamp(LocalDateTime.now());
            activityRepository.save(activity);
        }
    }
}