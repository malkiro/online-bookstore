package com.app.bookstore.controller;

import com.app.bookstore.entity.CartItem;
import com.app.bookstore.service.CartItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.NoSuchElementException;

@CrossOrigin(origins = "*")
@RestController
public class CartItemController {
    @Autowired
    private CartItemService cartItemService;

    @GetMapping("/cart/{id}")
    public ResponseEntity<List<CartItem>> findByUser(@PathVariable Integer id){
        List<CartItem> cartItems = cartItemService.findAllByUserId(id);
        return ResponseEntity.status(HttpStatus.OK).body(cartItems);
    }

    @PostMapping("/cart")
    public ResponseEntity<CartItem> createCartItem(@RequestBody  CartItem cartItem){
        try{
            CartItem cartItemCreated = cartItemService.createCartItem(cartItem);
            return ResponseEntity.status(HttpStatus.CREATED).body(cartItemCreated);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @PutMapping("/cart/{id}")
    public ResponseEntity<CartItem> updateQuantity(@RequestBody CartItem cartItem){
        try{
            CartItem updatedQuantity = cartItemService.updateQuantity(cartItem);
            return ResponseEntity.status(HttpStatus.OK).body(updatedQuantity);
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @DeleteMapping("/cart/{id}")
    public ResponseEntity<CartItem> deleteCartItem(@PathVariable Integer id){
        try{
            cartItemService.deleteCartItem(id);
            return ResponseEntity.status(HttpStatus.OK).build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

}
