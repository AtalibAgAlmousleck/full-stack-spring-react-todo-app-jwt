package com.almousleck.service;

import com.almousleck.dto.TodoDto;

import java.util.List;

/**
 * Created by Almousleck on Mar, 2024
 */
public interface TodoService {
    TodoDto addTodo(TodoDto todoDto);
    TodoDto getTodo(Long Id);
    List<TodoDto> getAllTodos();
    TodoDto updateTodo(TodoDto todo);
    void deleteTodo(Long todoId);
    TodoDto completeTodo(Long todoId);
    TodoDto inCompleteTodo(Long todoId);
}
