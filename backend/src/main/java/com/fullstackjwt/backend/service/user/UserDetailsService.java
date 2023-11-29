package com.fullstackjwt.backend.service.user;

import com.fullstackjwt.backend.dto.RegisterRequest;
import com.fullstackjwt.backend.model.User.User;
import com.fullstackjwt.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserDetailsService implements UserService{

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return userRepository.findByEmail(username)
                .orElseThrow(()->new UsernameNotFoundException("UserName not found"));
    }

    public List<User> getAllUsers(){
        return userRepository.findAll();
    }

    public Optional<User> findUser(Integer userId) {
        return userRepository.findById(userId);
    }

    public User editUser(Integer userId, RegisterRequest editData) {
        User editUser = userRepository.findById(userId).get();
        editUser.setEmail(editData.getEmail());
        editUser.setFirstName(editData.getFirstname());
        editUser.setLastName(editData.getLastname());
        return userRepository.save(editUser);
    }

    public void deleteUser(Integer userId) {
        userRepository.deleteById(userId);
    }
}
