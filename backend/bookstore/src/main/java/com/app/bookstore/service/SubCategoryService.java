package com.app.bookstore.service;

import com.app.bookstore.entity.SubCategory;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface SubCategoryService {
    List<SubCategory> getAllSubCategories();
    SubCategory createSubCategory(SubCategory subCategory);
    SubCategory getSubCategoryById(Integer id);
    SubCategory updateSubCategory(Integer id, SubCategory subCategory);
    void deleteSubCategory(Integer id);
    List<SubCategory> getSubCategoriesByCategoryId(Integer categoryId);
}
