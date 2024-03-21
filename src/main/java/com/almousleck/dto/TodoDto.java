package com.almousleck.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * Created by Almousleck on Mar, 2024
 */

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TodoDto {
    private Long Id;
    private String title;
    private String description;
    private Boolean completed;
}
