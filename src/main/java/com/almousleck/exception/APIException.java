package com.almousleck.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

/**
 * Created by Almousleck on Mar, 2024
 */

@Getter
@AllArgsConstructor
public class APIException extends RuntimeException{
    private HttpStatus status;
    private String message;
}
