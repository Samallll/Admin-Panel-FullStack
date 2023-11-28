package com.fullstackjwt.backend.controller;

import com.fullstackjwt.backend.dto.AuthenticationRequest;
import com.fullstackjwt.backend.dto.AuthenticationResponse;
import com.fullstackjwt.backend.dto.RegisterRequest;
import com.fullstackjwt.backend.service.register.RegisterServiceImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
public class UserController {

    @Autowired
    private RegisterServiceImp registerServiceImp;

    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(
            @RequestBody RegisterRequest request
    ){
        return ResponseEntity.ok(registerServiceImp.register(request));
    }

    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> authenticate(
            @RequestBody AuthenticationRequest request
    ){
        return ResponseEntity.ok(registerServiceImp.authenticate(request));
    }

    @GetMapping("/testing")
    public ResponseEntity<String> testSecured(@RequestBody AuthenticationRequest request) {

        System.out.println("Email from the request is:"+request.getEmail());
        return ResponseEntity.ok("Hello from un-secured Endpoint");
    }
}
