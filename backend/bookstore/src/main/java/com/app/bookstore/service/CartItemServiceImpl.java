package com.app.bookstore.service;

import com.app.bookstore.entity.CartItem;
import com.app.bookstore.repository.CartItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CartItemServiceImpl implements CartItemService {
    @Autowired
    private  CartItemRepository cartItemRepository;

    @Override
    public List<CartItem> findAllByUserId(Integer id) {
        return cartItemRepository.findAllByUserId(id);
    }

    @Override
    public CartItem createCartItem(CartItem cartItem) {
        return cartItemRepository.save(cartItem);
    }

    @Override
    public CartItem updateQuantity(CartItem cartItem) {
        Optional<CartItem> cartItem1 = cartItemRepository.findById(cartItem.getId());
        CartItem cartItem2 = cartItem1.get();
        cartItem2.setQuantity(cartItem.getQuantity());
        return cartItemRepository.save(cartItem2);
    }

    @Override
    public void deleteCartItem(Integer id) {
        cartItemRepository.deleteById(id);
    }
}
