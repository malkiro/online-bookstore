package com.app.bookstore.repository;

import com.app.bookstore.entity.WishList;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@EnableJpaRepositories
public interface WishListRepository extends JpaRepository<WishList, Integer> {
    List<WishList> findAllByUserId(Integer id);
}
