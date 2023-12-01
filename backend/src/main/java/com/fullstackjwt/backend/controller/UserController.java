package com.fullstackjwt.backend.controller;

import com.fullstackjwt.backend.dto.AuthenticationRequest;
import com.fullstackjwt.backend.dto.AuthenticationResponse;
import com.fullstackjwt.backend.dto.LoginResponse;
import com.fullstackjwt.backend.dto.RegisterRequest;
import com.fullstackjwt.backend.model.User.Role;
import com.fullstackjwt.backend.model.User.User;
import com.fullstackjwt.backend.service.register.RegisterServiceImp;
import com.fullstackjwt.backend.service.user.UserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/api/v1/auth/user")
public class UserController {

    @Autowired
    private UserDetailsService userDetailsService;

    @PutMapping("/editUser/{userId}")
    public ResponseEntity<String> editUser(
            @PathVariable Integer userId,
            @RequestBody RegisterRequest editData){
        return ResponseEntity.ok(userDetailsService.editUser(userId,editData));
    }

    @GetMapping("/userDetails/{userId}")
    public ResponseEntity<User> userDetails(@PathVariable Integer userId){

        return ResponseEntity.ok(userDetailsService.findUser(userId)
                .orElseGet(() -> new User("Dummy", "Dummy", "Dummy@example.com", "Dummy", Role.USER)));
    }
}
