package com.fullstackjwt.backend.repository;

import com.fullstackjwt.backend.model.User.Role;
import com.fullstackjwt.backend.model.User.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User,Integer> {
    Optional<User> findByEmail(String email);
    Optional<User> findByRole(Role role);
}
