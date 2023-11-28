package com.fullstackjwt.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/general")
public class DemoController {

    @GetMapping("/login")
    public ResponseEntity<String> sayHello(){
        return ResponseEntity.ok("Hello from secured login");
    }

    @GetMapping("/register")
    public ResponseEntity<String> sayHi(){
        return ResponseEntity.ok("Hello from secured register");
    }
}
