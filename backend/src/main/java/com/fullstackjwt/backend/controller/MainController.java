package com.fullstackjwt.backend.controller;

import com.fullstackjwt.backend.dto.AuthenticationRequest;
import com.fullstackjwt.backend.dto.LoginResponse;
import com.fullstackjwt.backend.dto.RegisterRequest;
import com.fullstackjwt.backend.service.register.RegisterServiceImp;
import com.fullstackjwt.backend.service.user.UserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/auth/common")
public class MainController {

    @Autowired
    private RegisterServiceImp registerServiceImp;

    @Autowired
    private UserDetailsService userDetailsService;

    @PostMapping("/register")
    public ResponseEntity<String> register(
            @RequestBody RegisterRequest request
    ){
        return ResponseEntity.ok(registerServiceImp.register(request));
    }

    @PostMapping("/authenticate")
    public ResponseEntity<LoginResponse> authenticate(
            @RequestBody AuthenticationRequest request
    ){
        return ResponseEntity.ok(registerServiceImp.authenticate(request));
    }
}
