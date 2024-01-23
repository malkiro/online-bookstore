package com.app.bookstore.dto;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
public class UserLoginDTO {
    private String username;
    private String password;
}
