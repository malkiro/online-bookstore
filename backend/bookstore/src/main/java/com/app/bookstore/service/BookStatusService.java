package com.app.bookstore.service;

import com.app.bookstore.entity.Book;
import com.app.bookstore.entity.BookStatus;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface BookStatusService {
    List<BookStatus> getAllBookStatus();

    BookStatus getBookStatusById(Integer id);
}
