package com.app.bookstore.service;

import com.app.bookstore.entity.Category;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface CategoryService {
    List<Category> getAllCategories();
    Category createCategory(Category category);
    Category getCategoryById(Integer id);
    Category updateCategory(Integer id, Category category);
    void deleteCategory(Integer id);
}
