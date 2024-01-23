package com.app.bookstore.repository;

import com.app.bookstore.entity.BookStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BookStatusRepository extends JpaRepository<BookStatus, Integer> {
}
