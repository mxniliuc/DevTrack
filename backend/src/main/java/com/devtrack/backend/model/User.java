package com.devtrack.backend.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "users")
public class User {
    @Id
    private String id;

    private String fullName;
    private String username;
    private String email;
    private String role;
    private boolean emailNotifications;
    private boolean inAppNotifications;
    private String defaultSort;
    private String password;

    public User() {}

    public String getId() { return id; }
    public String getFullName() { return fullName; }
    public String getUsername() { return username; }
    public String getEmail() { return email; }
    public String getRole() { return role; }
    public boolean isEmailNotifications() { return emailNotifications; }
    public boolean isInAppNotifications() { return inAppNotifications; }
    public String getDefaultSort() { return defaultSort; }
    public String getPassword() { return password; }

    public void setId(String id) { this.id = id; }
    public void setFullName(String fullName) { this.fullName = fullName; }
    public void setUsername(String username) { this.username = username; }
    public void setEmail(String email) { this.email = email; }
    public void setRole(String role) { this.role = role; }
    public void setEmailNotifications(boolean emailNotifications) { this.emailNotifications = emailNotifications; }
    public void setInAppNotifications(boolean inAppNotifications) { this.inAppNotifications = inAppNotifications; }
    public void setDefaultSort(String defaultSort) { this.defaultSort = defaultSort; }
    public void setPassword(String password) { this.password = password; }
}