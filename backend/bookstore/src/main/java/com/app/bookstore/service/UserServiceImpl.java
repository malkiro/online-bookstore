package com.app.bookstore.service;

import java.io.File;
import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.app.bookstore.dto.UserProfileDTO;
import com.app.bookstore.entity.User;
import com.app.bookstore.repository.UserRepository;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    UserRepository userRepository;


    @Value("${upload.directory}")
    private String uploadDirectory;

    @Override
    public User updateUser(Integer id, UserProfileDTO userProfileDTO) {
        User existingUser = userRepository.findById(id).orElse(null);

        if(existingUser != null) {

            MultipartFile file = userProfileDTO.getProfileImage();
            String filename = file.getOriginalFilename();
            String filePath = uploadDirectory + File.separator + filename;

            try {
                file.transferTo(new File(filePath));
            } catch (IllegalStateException e) {

                e.printStackTrace();
            } catch (IOException e) {

                e.printStackTrace();
            }

            existingUser.setProfileImage(filename);
            return userRepository.save(existingUser);
        }

        return null;
    }

    @Override
    public User getUserById(Integer id) {
        return userRepository.findById(id).orElse(null);
    }
}
