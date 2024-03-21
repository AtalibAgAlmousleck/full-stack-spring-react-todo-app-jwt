package com.almousleck.repository;

import com.almousleck.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Created by Almousleck on Mar, 2024
 */
public interface RoleRepository extends JpaRepository<Role, Long> {
    Role findByName(String name);
}
