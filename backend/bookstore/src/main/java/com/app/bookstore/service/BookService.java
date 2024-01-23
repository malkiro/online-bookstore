package com.app.bookstore.service;

import com.app.bookstore.entity.Book;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface BookService {
    List<Book> getAllBooks();
    Book createBook(Book book);
    Book getBookById(Integer id);
    Book updateBook(Integer id, Book book);
    void deleteBook(Integer id);
    List<Book> getBooksByCategoryId(Integer categoryId);
}
