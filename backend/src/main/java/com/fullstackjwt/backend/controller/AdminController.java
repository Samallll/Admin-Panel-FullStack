package com.fullstackjwt.backend.controller;

import com.fullstackjwt.backend.dto.RegisterRequest;
import com.fullstackjwt.backend.model.User.Role;
import com.fullstackjwt.backend.model.User.User;
import com.fullstackjwt.backend.service.user.UserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.stream.DoubleStream;

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
    public ResponseEntity<String> editUser(
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
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/searchUser/{query}")
    public ResponseEntity<List<User>> searchUser(@PathVariable String query){
        return ResponseEntity.ok(userDetailsService.searchUser(query));
    }

    //=======================================================================================
    //Endpoints for download and upload the images to filesystem.
    @PostMapping("/fileSystem")
    public ResponseEntity<?> uploadImageToFIleSystem(@RequestParam("file")MultipartFile file) throws IOException {
        String uploadImage = userDetailsService.uploadImageToFileSystem(file);
        return ResponseEntity.status(HttpStatus.OK)
                .body(uploadImage);
    }

    @GetMapping("/fileSystem/{userId}")
    public ResponseEntity<?> downloadImageFromFileSystem(@PathVariable Integer userId) throws IOException {
        byte[] imageData=userDetailsService.downloadImageFromFileSystem(userId);
        return ResponseEntity.status(HttpStatus.OK)
                .contentType(MediaType.valueOf("image/jpg"))
                .body(imageData);

    }

    //Endpoints for download and upload the images to db.
    @PostMapping("/uploadImage")
    public ResponseEntity<String> uploadImageToDb(
            @RequestParam("id") Integer userId,
            @RequestParam("file") MultipartFile file) throws IOException {

        userDetailsService.uploadProfilePicture(userId, file);
        return ResponseEntity.ok("success");
    }

    //no compression method
    @GetMapping("/image/{userId}")
    public ResponseEntity<byte[]> getUserImage(@PathVariable("userId") Integer userId) {
        byte[] imageData = userDetailsService.getProfilePicture(userId);
        if (imageData != null) {
            return ResponseEntity.ok(imageData);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    //compression method
    @GetMapping("/{userId}")
    public ResponseEntity<?> downloadImage(@PathVariable Integer userId){
        byte[] imageData=userDetailsService.getProfilePicture(userId);
        return ResponseEntity.status(HttpStatus.OK)
                .contentType(MediaType.valueOf("image/jpg"))
                .body(imageData);
    }
}
