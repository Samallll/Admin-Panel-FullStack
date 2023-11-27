package com.fullstackjwt.backend.service.register;

import com.fullstackjwt.backend.dto.AuthenticationRequest;
import com.fullstackjwt.backend.dto.AuthenticationResponse;
import com.fullstackjwt.backend.dto.RegisterRequest;
import org.springframework.stereotype.Service;

@Service
public interface RegisterService {

    public AuthenticationResponse register(RegisterRequest request);

    public AuthenticationResponse authenticate(AuthenticationRequest request);
}
