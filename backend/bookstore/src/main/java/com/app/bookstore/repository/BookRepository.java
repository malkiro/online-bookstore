package com.app.bookstore.repository;

import com.app.bookstore.entity.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookRepository extends JpaRepository<Book, Integer> {
    @Query("SELECT b FROM Book b WHERE b.category.id = :categoryId")
    List<Book> findBooksByCategoryId(@Param("categoryId") Integer categoryId);
}
