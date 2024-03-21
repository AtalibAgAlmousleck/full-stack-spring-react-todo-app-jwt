package com.almousleck.service;

import com.almousleck.dto.TodoDto;
import com.almousleck.exception.ResourceNotFoundException;
import com.almousleck.model.Todo;
import com.almousleck.repository.TodoRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

/**
 * Created by Almousleck on Mar, 2024
 */

@Service
@RequiredArgsConstructor
public class TodoServiceImpl implements TodoService {

    private final TodoRepository todoRepository;
    private final ModelMapper modelMapper;

    @Override
    public TodoDto addTodo(TodoDto todoDto) {
        Todo todo = modelMapper.map(todoDto, Todo.class);
        Todo saved = todoRepository.save(todo);
        TodoDto savedDto = modelMapper.map(saved, TodoDto.class);

        return savedDto;
    }

    @Override
    public TodoDto getTodo(Long Id) {
        List<Todo> todos = todoRepository.findAll();
        return (TodoDto) todos.stream().map((todo) -> modelMapper.map(todo, TodoDto.class))
                .collect(Collectors.toList());
    }

    @Override
    public List<TodoDto> getAllTodos() {
        return null;
    }

    @Override
    public TodoDto updateTodo(TodoDto todo) {
        Todo existingTodo = todoRepository.findById(todo.getId()).get();
        existingTodo.setTitle(todo.getTitle());
        existingTodo.setDescription(todo.getDescription());
        existingTodo.setCompleted(todo.getCompleted());
        Todo updatedTodo = todoRepository.save(existingTodo);
        return modelMapper.map(updatedTodo, TodoDto.class);
    }

    @Override
    public void deleteTodo(Long todoId) {
        Todo todo = todoRepository.findById(todoId)
                .orElseThrow(() -> new ResourceNotFoundException("Todo with id " + todoId + " " + "does not exist"));
        todoRepository.deleteById(todoId);
    }

    @Override
    public TodoDto completeTodo(Long todoId) {
        Todo todo = todoRepository.findById(todoId)
                .orElseThrow(() -> new ResourceNotFoundException("Todo with id " + todoId + " " + "does not exist"));
        todo.setCompleted(Boolean.TRUE);

        Todo updatedTodo = todoRepository.save(todo);
        return modelMapper.map(updatedTodo, TodoDto.class);
    }

    @Override
    public TodoDto inCompleteTodo(Long todoId) {
        Todo todo = todoRepository.findById(todoId)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Todo with the given id: %s not found".formatted(todoId)
                ));
        todo.setCompleted(Boolean.FALSE);

        Todo update = todoRepository.save(todo);
        return modelMapper.map(update, TodoDto.class);
    }
}
