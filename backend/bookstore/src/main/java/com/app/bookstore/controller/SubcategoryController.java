package com.app.bookstore.controller;

import com.app.bookstore.entity.SubCategory;
import com.app.bookstore.service.SubCategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.NoSuchElementException;

@CrossOrigin(origins = "*")
@RestController
public class SubcategoryController {
    @Autowired
    SubCategoryService subCategoryService;

    @GetMapping("/subcategories")
    public ResponseEntity<List<SubCategory>> getAllSubCategories(){
        List<SubCategory> subCategories = subCategoryService.getAllSubCategories();
        return ResponseEntity.status(HttpStatus.OK).body(subCategories);
    }

    @GetMapping("/subcategories/{id}")
    public ResponseEntity<SubCategory> getSubCategoryById(@PathVariable Integer id){
        try{
            SubCategory subCategory = subCategoryService.getSubCategoryById(id);
            return ResponseEntity.status(HttpStatus.OK).body(subCategory);
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @PostMapping("/subcategories")
    public ResponseEntity<SubCategory> createSubCategory(@RequestBody SubCategory subCategory){
        try{
            SubCategory subCategoryCreated = subCategoryService.createSubCategory(subCategory);
            return ResponseEntity.status(HttpStatus.CREATED).body(subCategoryCreated);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @PutMapping("/subcategories/{id}")
    public ResponseEntity<SubCategory> updateSubCategory(@PathVariable Integer id, @RequestBody SubCategory subCategory){
        try{
            SubCategory updateSubCategory = subCategoryService.updateSubCategory(id, subCategory);
            return ResponseEntity.status(HttpStatus.OK).body(updateSubCategory);
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @DeleteMapping("/subcategories/{id}")
    public ResponseEntity<SubCategory> deleteSubCategory(@PathVariable Integer id){
        try{
            subCategoryService.deleteSubCategory(id);
            return ResponseEntity.status(HttpStatus.OK).body(null);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @GetMapping("/categories/{categoryId}/subcategories")
    public ResponseEntity<List<SubCategory>> getSubCategoriesByCategoryId(@PathVariable Integer categoryId) {
        return ResponseEntity.status(HttpStatus.OK).body(subCategoryService.getSubCategoriesByCategoryId(categoryId));
    }

}
