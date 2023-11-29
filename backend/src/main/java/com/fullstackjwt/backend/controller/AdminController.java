package com.fullstackjwt.backend.controller;

import com.fullstackjwt.backend.dto.RegisterRequest;
import com.fullstackjwt.backend.model.User.Role;
import com.fullstackjwt.backend.model.User.User;
import com.fullstackjwt.backend.service.user.UserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/auth/admin")
public class AdminController {

    @Autowired
    private UserDetailsService userDetailsService;

    @GetMapping("/users")
    public ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity.ok(userDetailsService.getAllUsers());
    }

    @GetMapping("/userDetails/{userId}")
    public ResponseEntity<User> userDetails(@PathVariable Integer userId){

        return ResponseEntity.ok(userDetailsService.findUser(userId)
                .orElseGet(() -> new User("Dummy", "Dummy", "Dummy@example.com", "Dummy", Role.USER)));
    }

    @PutMapping("/editUser/{userId}")
    public ResponseEntity<User> editUser(
            @PathVariable Integer userId,
            @RequestBody RegisterRequest editData){
        return ResponseEntity.ok(userDetailsService.editUser(userId,editData));
    }

    @DeleteMapping("/deleteUser/{userId}")
    public ResponseEntity<Void> deleteUser(@PathVariable Integer userId) {
        try {
            userDetailsService.deleteUser(userId);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (RuntimeException e) {
            // Handle exceptions and return an appropriate response
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
