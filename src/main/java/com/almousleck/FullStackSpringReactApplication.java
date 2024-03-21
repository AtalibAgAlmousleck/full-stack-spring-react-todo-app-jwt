package com.almousleck;

import com.almousleck.model.Role;
import com.almousleck.repository.RoleRepository;
import org.modelmapper.ModelMapper;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class FullStackSpringReactApplication {

    @Bean
    ModelMapper mapper() {
        return new ModelMapper();
    }

    @Bean
    CommandLineRunner runner(RoleRepository roleRepository) {
        return args -> {
            Role role = new Role();
            role.setName("ROLE_ADMIN");
            roleRepository.save(role);
        };
    }
    public static void main(String[] args) {
        SpringApplication.run(FullStackSpringReactApplication.class, args);
    }
}
