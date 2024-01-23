package com.app.bookstore.service;

import com.app.bookstore.entity.BookStatus;
import com.app.bookstore.repository.BookStatusRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookStatusServiceImpl implements BookStatusService {
    @Autowired
    BookStatusRepository bookStatusRepository;

    @Override
    public List<BookStatus> getAllBookStatus() {
        return bookStatusRepository.findAll();
    }

    @Override
    public BookStatus getBookStatusById(Integer id) {
        return bookStatusRepository.findById(id).orElse(null);
    }
}
