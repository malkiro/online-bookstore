package com.app.bookstore.repository;

import com.app.bookstore.entity.Book;
import com.app.bookstore.entity.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@EnableJpaRepositories
public interface CartItemRepository extends JpaRepository<CartItem, Integer> {
    List<CartItem> findAllByUserId(Integer id);


}
