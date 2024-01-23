package com.app.bookstore.controller;

import com.app.bookstore.entity.*;
import com.app.bookstore.service.BookService;
import com.app.bookstore.service.BookStatusService;
import com.app.bookstore.service.CategoryService;
import com.app.bookstore.service.SubCategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.util.List;
import java.util.NoSuchElementException;

@CrossOrigin(origins = "*")
@RestController
public class BookController {
    @Autowired
    BookService bookService;

    @Autowired
    CategoryService categoryService;

    @Autowired
    SubCategoryService subCategoryService;

    @Autowired
    BookStatusService bookStatusService;

     private final String FOLDER_PATH="/F:/Roshika/Class/Assignments/Final Project/uploads/";

    @GetMapping("/books")
    public ResponseEntity<List<Book>> getAllBooks(){
        List<Book> books = bookService.getAllBooks();
        return ResponseEntity.status(HttpStatus.OK).body(books);
    }

    @GetMapping("/books/{id}")
    public ResponseEntity<Book> getBookById(@PathVariable Integer id){
        try{
            Book book = bookService.getBookById(id);
            return ResponseEntity.status(HttpStatus.OK).body(book);
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @PostMapping("/books")
    public Book createBook(@RequestParam(value = "title", required = true) String title,
                           @RequestParam(value = "description", required = false) String description,
                           @RequestParam(value = "image", required = false) MultipartFile file,
                           @RequestParam(value = "author", required = false) String author,
                           @RequestParam(value = "language", required = false) String language,
                           @RequestParam(value = "isNew", required = false) Boolean isNew,
                           @RequestParam(value = "price", required = false) Double price,
                           @RequestParam(value = "discountedRatio", required = false) Double discountedRatio,
                           @RequestParam(value = "quantity", required = false) Integer quantity,
                           @RequestParam(value = "status_id", required = false) Integer statusId,
                           @RequestParam(value = "category_id", required = false) Integer categoryId,
                           @RequestParam(value = "subcategory_id", required = false) Integer subcategoryId) throws IOException {
        String filePath = null;
        if(file != null && !file.isEmpty()) {
            filePath = FOLDER_PATH + file.getOriginalFilename();
            file.transferTo(new File(filePath));
        }
        Book book = new Book();
        book.setTitle(title);
        book.setDescription(description);
        book.setAuthor(author);
        book.setLanguage(language);
        book.setIsNew(isNew);
        book.setDiscountedRatio(discountedRatio);
        book.setPrice(price);

        if(filePath != null) {
           book.setFile_path(file.getOriginalFilename());
        }

        if (statusId != null) {
            BookStatus bookStatus = bookStatusService.getBookStatusById(statusId);
            book.setBookStatus(bookStatus);
        }

        if (categoryId != null) {
            Category category = categoryService.getCategoryById(categoryId);
            book.setCategory(category);
        }

        if (subcategoryId != null) {
            SubCategory subCategory = subCategoryService.getSubCategoryById(subcategoryId);
            book.setSubCategory(subCategory);
        }

        // Calculate net price
        book.calculateNetPrice();

        return bookService.createBook(book);
    }

    @GetMapping("/loadcoverimage/{fileName}")
    public ResponseEntity<byte[]> downloadImage(@PathVariable String fileName) throws IOException {
        byte[] image = Files.readAllBytes(new File(FOLDER_PATH+fileName).toPath());
        return ResponseEntity.status(HttpStatus.OK).contentType(MediaType.valueOf("image/png")).body(image);
    }


    @PutMapping("/books/{id}")
    public ResponseEntity<Book> updateBook(@PathVariable Integer id, @RequestBody Book book){
        try{
            Book updateBook = bookService.updateBook(id, book);
            return ResponseEntity.status(HttpStatus.OK).body(updateBook);
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @DeleteMapping("/books/{id}")
    public ResponseEntity<Book> deleteBook(@PathVariable Integer id){
        try{
            bookService.deleteBook(id);
            return ResponseEntity.status(HttpStatus.OK).body(null);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @GetMapping("/categories/{categoryId}/books")
    public ResponseEntity<List<Book>> getBooksByCategoryId(@PathVariable Integer categoryId) {
        return ResponseEntity.status(HttpStatus.OK).body(bookService.getBooksByCategoryId(categoryId));
    }
}
