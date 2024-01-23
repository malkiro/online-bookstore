package com.app.bookstore.service;

import com.app.bookstore.entity.Category;
import com.app.bookstore.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryServiceImpl implements CategoryService{
    @Autowired
    CategoryRepository categoryRepository;

    @Override
    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    @Override
    public Category createCategory(Category category) {
        return categoryRepository.save(category);
    }

    @Override
    public Category getCategoryById(Integer id) {
        return categoryRepository.findById(id).orElse(null);
    }

    @Override
    public Category updateCategory(Integer id, Category category) {
        Category existingCategory = categoryRepository.findById(id).orElse(null);

        if(category!=null) {
            existingCategory.setName(category.getName());
            existingCategory.setDescription(category.getDescription());

            return categoryRepository.save(existingCategory);
        } else {
            return null;
        }
    }

    @Override
    public void deleteCategory(Integer id) {
        categoryRepository.deleteById(id);
    }
}
