package com.app.bookstore.repository;

import com.app.bookstore.entity.SubCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SubCategoryRepository extends JpaRepository<SubCategory, Integer> {
    @Query("SELECT s FROM SubCategory s WHERE s.category.id = :categoryId")
    List<SubCategory> findSubCategoriesByCategoryId(@Param("categoryId") Integer categoryId);
}
