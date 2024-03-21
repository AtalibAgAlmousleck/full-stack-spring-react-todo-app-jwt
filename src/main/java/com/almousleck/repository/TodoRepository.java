package com.almousleck.repository;

import com.almousleck.model.Todo;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Created by Almousleck on Mar, 2024
 */
public interface TodoRepository extends JpaRepository<Todo, Long> {
}
