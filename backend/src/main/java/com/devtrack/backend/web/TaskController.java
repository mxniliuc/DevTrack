package com.devtrack.backend.web;

import com.devtrack.backend.model.Project;
import com.devtrack.backend.model.Task;
import com.devtrack.backend.repo.ProjectRepository;
import com.devtrack.backend.repo.TaskRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tasks")
@CrossOrigin(origins = "*")
public class TaskController {

    private final TaskRepository taskRepository;
    private final ProjectRepository projectRepository;

    public TaskController(TaskRepository taskRepository, ProjectRepository projectRepository) {
        this.taskRepository = taskRepository;
        this.projectRepository = projectRepository;
    }

    @GetMapping
public List<Task> getTasks(@RequestParam(required = false) String projectId) {
    if (projectId != null && !projectId.isEmpty()) {
        return taskRepository.findByProjectId(projectId);
    } else {
        return taskRepository.findAll();
    }
}

    @PostMapping
    public Task createTask(@RequestBody Task task) {
        Task saved = taskRepository.save(task);
        updateProjectProgress(task.getProjectId());
        return saved;
    }

    @PutMapping("/{id}")
    public Task updateTask(@PathVariable String id, @RequestBody Task updatedTask) {
        Task saved = taskRepository.save(updatedTask);
        updateProjectProgress(updatedTask.getProjectId());
        return saved;
    }

    @DeleteMapping("/{id}")
    public void deleteTask(@PathVariable String id) {
        Task deleted = taskRepository.findById(id).orElse(null);
        if (deleted != null) {
            taskRepository.deleteById(id);
            updateProjectProgress(deleted.getProjectId());
        }
    }

    // 🔥 Helper method — keeps project progress & status synced
    private void updateProjectProgress(String projectId) {
        List<Task> tasks = taskRepository.findByProjectId(projectId);
        if (tasks.isEmpty()) return;

        long completed = tasks.stream().filter(Task::isCompleted).count();
        int progress = (int) Math.round((completed * 100.0) / tasks.size());

        Project project = projectRepository.findById(projectId).orElse(null);
        if (project != null) {
            project.setProgress(progress);

            // 🧠 Set dynamic status
            if (progress == 0) {
                project.setStatus("Planning");
            } else if (progress < 100) {
                project.setStatus("In Progress");
            } else {
                project.setStatus("Completed");
            }

            projectRepository.save(project);
        }
    }
}