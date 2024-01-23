package com.app.bookstore.service;

import com.app.bookstore.entity.Book;
import com.app.bookstore.repository.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookServiceImpl implements BookService {

    @Autowired
    BookRepository bookRepository;

    @Value("${upload.directory}")
    private String uploadDirectory;

    @Override
    public List<Book> getAllBooks() {
        return bookRepository.findAll();
    }

    @Override
    public Book createBook(Book book) {
        book.calculateNetPrice();
        return bookRepository.save(book);
    }

    @Override
    public Book getBookById(Integer id) {
        return bookRepository.findById(id).orElse(null);
    }

    @Override
    public Book updateBook(Integer id, Book book) {
        Book existingBook = bookRepository.findById(id).orElse(null);

        if (book!=null) {
            existingBook.setFile_path(book.getFile_path());
            existingBook.setIsNew(book.getIsNew());
            existingBook.setDiscountedRatio(book.getDiscountedRatio());
            existingBook.setTitle(book.getTitle());
            existingBook.setAuthor(book.getAuthor());
            existingBook.setPrice(book.getPrice());
            existingBook.setQuantity(book.getQuantity());
            existingBook.setBookStatus(book.getBookStatus());
            existingBook.setCategory(book.getCategory());
            existingBook.setSubCategory(book.getSubCategory());
            existingBook.calculateNetPrice();
            return bookRepository.save(existingBook);

        } else {
            return null;
        }
    }

    @Override
    public void deleteBook(Integer id) {
        bookRepository.deleteById(id);
    }

    @Override
    public List<Book> getBooksByCategoryId(Integer categoryId) {
        return bookRepository.findBooksByCategoryId(categoryId);
    }
}
