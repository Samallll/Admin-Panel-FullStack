package com.fullstackjwt.backend.service.register;

import com.fullstackjwt.backend.dto.AuthenticationRequest;
import com.fullstackjwt.backend.dto.LoginResponse;
import com.fullstackjwt.backend.dto.RegisterRequest;
import com.fullstackjwt.backend.model.User.Role;
import com.fullstackjwt.backend.model.User.User;
import com.fullstackjwt.backend.repository.UserRepository;
import com.fullstackjwt.backend.service.JwtService;
import com.fullstackjwt.backend.service.user.UserDetailsService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

/**
 * This service provides the method for registering an user and
 * handling the login.
 */
@Service
@RequiredArgsConstructor
public class RegisterServiceImp implements RegisterService{

    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    private final JwtService jwtService;

    private final AuthenticationManager authManager;

    private final UserDetailsService userDetailsService;

    @Override
    public String register(RegisterRequest request) {

        if(userDetailsService.userExists(request.getEmail()) != null){
            return "failure";
        }
        var user = User
                .builder()
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.USER)
                .build();
        userRepository.save(user);
        return "success";
    }

    @Override
    public LoginResponse authenticate(AuthenticationRequest request) {

        authManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );

        var user = userRepository.findByEmail(request.getEmail())
                        .orElseThrow(()->new UsernameNotFoundException("User Not Found"));
        String jwtToken = jwtService.generateToken(user);
        return LoginResponse.builder()
                .token(jwtToken)
                .user(user)
                .build();
    }
}
