package com.app.bookstore.service;

import org.springframework.stereotype.Service;

import com.app.bookstore.dto.UserProfileDTO;
import com.app.bookstore.entity.User;

@Service
public interface UserService {
    User updateUser(Integer id, UserProfileDTO userProfileDTO);
    User getUserById(Integer id);
}
