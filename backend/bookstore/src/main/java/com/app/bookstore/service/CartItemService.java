package com.app.bookstore.service;

import com.app.bookstore.entity.CartItem;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface CartItemService {
    List<CartItem> findAllByUserId(Integer id);

    CartItem createCartItem(CartItem cartItem);

    CartItem updateQuantity(CartItem cartItem);

    void deleteCartItem(Integer id);
}
