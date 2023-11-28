package com.fullstackjwt.backend.controller;

import com.fullstackjwt.backend.model.User.User;
import com.fullstackjwt.backend.service.user.UserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/auth/secured")
public class DemoController {

    @Autowired
    private UserDetailsService userDetailsService;

    @GetMapping("/users")
    public ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity.ok(userDetailsService.getAllUsers());
    }

    @GetMapping("/login")
    public ResponseEntity<String> sayHello(){
        return ResponseEntity.ok("Hello from secured login");
    }

    @GetMapping("/register")
    public ResponseEntity<String> sayHi(){
        return ResponseEntity.ok("Hello from secured register");
    }
}
