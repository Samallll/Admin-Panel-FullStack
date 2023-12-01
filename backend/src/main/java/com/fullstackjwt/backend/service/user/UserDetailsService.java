package com.fullstackjwt.backend.service.user;

import com.fullstackjwt.backend.dto.RegisterRequest;
import com.fullstackjwt.backend.model.User.User;
import com.fullstackjwt.backend.repository.UserRepository;
import com.fullstackjwt.backend.service.register.RegisterService;
import com.fullstackjwt.backend.service.register.RegisterServiceImp;
import org.apache.tomcat.util.codec.binary.Base64;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class UserDetailsService implements UserService{

    @Autowired
    private UserRepository userRepository;

    private final String FOLDER_PATH="E:/Projects/Brocamp/Full Stack Projects/";

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return userRepository.findByEmail(username)
                .orElseThrow(()->new UsernameNotFoundException("UserName not found"));
    }

    public User userExists(String email) {
        Optional<User> existingUser = userRepository.findByEmail(email);
        if(existingUser.isPresent()){
            return userRepository.findByEmail(email).get();
        }
        return null;
    }

    public List<User> userExistsList(String email) {
        return userRepository.findAllByEmail(email);
    }

    public List<User> getAllUsers(){
        return userRepository.findAll();
    }

    public Optional<User> findUser(Integer userId) {
        return userRepository.findById(userId);
    }

    public String editUser(Integer userId, RegisterRequest editData) {
        Optional<User> optionalUser = userRepository.findById(userId);

        if (optionalUser.isPresent()) {
            User editUser = optionalUser.get();

            // Check if the new email is already used by another user
            User existingUser = userExists(editData.getEmail());

            if (existingUser == null || existingUser.getId().equals(userId)) {
                // Either no user with the new email or it's the same user (same ID)
                editUser.setEmail(editData.getEmail());
                editUser.setFirstName(editData.getFirstName());
                editUser.setLastName(editData.getLastName());
                userRepository.save(editUser);
                return "success";
            } else {
                // Another user with the same email exists, but with a different ID
                return "failure";
            }
        } else {
            // User with the given ID not found
            return "failure";
        }
    }

    public void deleteUser(Integer userId) {
        userRepository.deleteById(userId);
    }

    public List<User> searchUser(String query) {

        if(query.isBlank()){
            return userRepository.findAll();
        }
        return userRepository.findByFirstNameContainingIgnoreCaseOrLastNameContainingIgnoreCaseOrEmailContainingIgnoreCase(query,query,query);
    }


    //upload image to file system
    public String uploadImageToFileSystem(MultipartFile file) throws IOException {
        String filePath=FOLDER_PATH+file.getOriginalFilename();

        User editUser = userRepository.findById(1).get();
        editUser.setFilePath(filePath);
        userRepository.save(editUser);
        file.transferTo(new File(filePath));

        if (editUser != null) {
            return "file uploaded successfully : " + filePath;
        }
        return null;
    }

    public byte[] downloadImageFromFileSystem(Integer userId) throws IOException {
        User user = userRepository.findById(userId).get();
        String filePath=user.getFilePath();
        byte[] images = Files.readAllBytes(new File(filePath).toPath());
        return images;
    }


    // Upload and download the image in a database;
    public void uploadProfilePicture(Integer userId, MultipartFile file) throws IOException {

        User editUser = findUser(userId).get();
        editUser.setProfilePicture(file.getBytes());
        userRepository.save(editUser);
    }

    public byte[] getProfilePicture(Integer userId) {
        User user = findUser(userId).get();
        return user.getProfilePicture();
    }

}
