package com.app.bookstore.service;

import com.app.bookstore.entity.SubCategory;
import com.app.bookstore.repository.SubCategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SubCategoryServiceImpl implements SubCategoryService {
    @Autowired
    SubCategoryRepository subCategoryRepository;

    @Override
    public List<SubCategory> getAllSubCategories() {
        return subCategoryRepository.findAll();
    }

    @Override
    public SubCategory createSubCategory(SubCategory subCategory) {
        return subCategoryRepository.save(subCategory);
    }

    @Override
    public SubCategory getSubCategoryById(Integer id) {
        return subCategoryRepository.findById(id).orElse(null);
    }

    @Override
    public SubCategory updateSubCategory(Integer id, SubCategory subCategory) {
        SubCategory existingSubCategory = subCategoryRepository.findById(id).orElse(null);

        if(subCategory!=null) {
            existingSubCategory.setName(subCategory.getName());
            existingSubCategory.setDescription(subCategory.getDescription());

            return subCategoryRepository.save(existingSubCategory);
        } else {
            return null;
        }
    }

    @Override
    public void deleteSubCategory(Integer id) {
        subCategoryRepository.deleteById(id);
    }

    @Override
    public List<SubCategory> getSubCategoriesByCategoryId(Integer categoryId) {
        return subCategoryRepository.findSubCategoriesByCategoryId(categoryId);
    }
}
