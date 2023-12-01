package com.fullstackjwt.backend.service.user;

import com.fullstackjwt.backend.dto.RegisterRequest;
import com.fullstackjwt.backend.model.User.User;
import org.springframework.security.core.userdetails.UserDetailsService;

import java.util.List;
import java.util.Optional;

public interface UserService extends UserDetailsService {

    public List<User> getAllUsers();

    public String editUser(Integer userId, RegisterRequest editData);

    public Optional<User> findUser(Integer userId);

    public void deleteUser(Integer userId);

    /**
     * find users where the firstName,lastName or email contains query
     * @param query contains the search criteria.
     * @return list of users which satisfies the condition
     */
    public List<User> searchUser(String query);
}
