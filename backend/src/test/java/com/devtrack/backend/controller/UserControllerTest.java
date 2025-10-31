package com.devtrack.backend.controller;

import com.devtrack.backend.model.User;
import com.devtrack.backend.security.JwtService;
import com.devtrack.backend.service.UserService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Optional;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(UserController.class)
@Import(UserControllerTest.MockConfig.class)
@AutoConfigureMockMvc(addFilters = false)
class UserControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private UserService userService;

    @Autowired
    private JwtService jwtService;

   @TestConfiguration
static class MockConfig {
    @Bean
    UserService userService() {
        return Mockito.mock(UserService.class);
    }

    @Bean
    JwtService jwtService() {
        return Mockito.mock(JwtService.class);
    }

    @Bean
    org.springframework.security.crypto.password.PasswordEncoder passwordEncoder() {
        return Mockito.mock(org.springframework.security.crypto.password.PasswordEncoder.class);
    }
}

    @Test
    @DisplayName("GET /api/user/me should return user info when valid token is provided")
    void testGetCurrentUser_Success() throws Exception {
        // Arrange
        String token = "fake.jwt.token";
        String username = "testuser";

        User mockUser = new User();
        mockUser.setUsername(username);
        mockUser.setFullName("John Doe");
        mockUser.setEmail("john@example.com");

        Mockito.when(jwtService.extractUsername(token)).thenReturn(username);
        Mockito.when(userService.findByUsername(username)).thenReturn(Optional.of(mockUser));

        // Act & Assert
        mockMvc.perform(get("/api/user/me")
                        .header("Authorization", "Bearer " + token)
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.username").value("testuser"))
                .andExpect(jsonPath("$.fullName").value("John Doe"))
                .andExpect(jsonPath("$.email").value("john@example.com"));
    }

    @Test
    @DisplayName("GET /api/user/me should return 404 when user not found")
    void testGetCurrentUser_NotFound() throws Exception {
        String token = "fake.jwt.token";
        String username = "ghost";

        Mockito.when(jwtService.extractUsername(token)).thenReturn(username);
        Mockito.when(userService.findByUsername(username)).thenReturn(Optional.empty());

        mockMvc.perform(get("/api/user/me")
                        .header("Authorization", "Bearer " + token)
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.message").value("User not found"));
    }
}