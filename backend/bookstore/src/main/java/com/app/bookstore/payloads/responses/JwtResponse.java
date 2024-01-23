package com.app.bookstore.payloads.responses;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class JwtResponse {
    private String token;
    private Integer id;
    private String username;
    private String email;

    public JwtResponse(String token, Integer id, String username, String email) {
        this.token = token;
        this.id = id;
        this.username = username;
        this.email = email;
    }

}
