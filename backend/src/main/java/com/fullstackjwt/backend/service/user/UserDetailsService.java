package com.fullstackjwt.backend.service.user;

import com.fullstackjwt.backend.model.User.User;
import com.fullstackjwt.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

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
}
