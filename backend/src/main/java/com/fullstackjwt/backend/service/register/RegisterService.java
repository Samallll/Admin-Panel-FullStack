package com.fullstackjwt.backend.service.register;

import com.fullstackjwt.backend.dto.AuthenticationRequest;
import com.fullstackjwt.backend.dto.AuthenticationResponse;
import com.fullstackjwt.backend.dto.LoginResponse;
import com.fullstackjwt.backend.dto.RegisterRequest;
import org.springframework.stereotype.Service;

@Service
public interface RegisterService {

    public String register(RegisterRequest request);

    public LoginResponse authenticate(AuthenticationRequest request);
}
