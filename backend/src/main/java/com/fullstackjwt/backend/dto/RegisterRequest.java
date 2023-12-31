package com.fullstackjwt.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RegisterRequest {

    private Integer id;

    private String firstName;

    private String lastName;

    private String email;

    private String password;

}
