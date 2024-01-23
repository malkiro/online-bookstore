package com.app.bookstore.controller;

import com.app.bookstore.entity.WishList;
import com.app.bookstore.service.WishListService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
public class WishListController {
    @Autowired
    private WishListService wishListService;

    @GetMapping("/wishlist/{id}")
    public ResponseEntity<List<WishList>> findByUser(@PathVariable Integer id){
        List<WishList> wishLists = wishListService.findAllByUserId(id);
        return ResponseEntity.status(HttpStatus.OK).body(wishLists);
    }

    @PostMapping("/wishlist")
    public ResponseEntity<WishList> addItemToWishList(@RequestBody  WishList wishList){
        try{
            WishList wishListItemCreated = wishListService.addItemToWishList(wishList);
            return ResponseEntity.status(HttpStatus.CREATED).body(wishListItemCreated);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @DeleteMapping("/wishlist/{id}")
    public ResponseEntity<WishList> deleteCartItem(@PathVariable Integer id){
        try{
            wishListService.deleteWishListItem(id);
            return ResponseEntity.status(HttpStatus.OK).build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
}
