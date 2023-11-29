package com.fullstackjwt.backend;

import com.fullstackjwt.backend.model.User.Role;
import com.fullstackjwt.backend.model.User.User;
import com.fullstackjwt.backend.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootApplication
public class FullstackJwtApplication {

	public static void main(String[] args) {
		SpringApplication.run(FullstackJwtApplication.class, args);
	}

	@Bean
	CommandLineRunner run(
			UserRepository userRepository,
			PasswordEncoder encoder
	){
		return args -> {
			if(userRepository.findByRole(Role.ADMIN).isPresent()) return;

//			Creating a admin role when the application executes if there is no admins.

			User admin = new User("admin","admin","admin@example.com",encoder.encode("admin"), Role.ADMIN);
			userRepository.save(admin);
		};
	}

}
