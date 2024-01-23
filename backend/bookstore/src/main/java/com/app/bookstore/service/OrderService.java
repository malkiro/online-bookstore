package com.app.bookstore.service;

import com.app.bookstore.entity.Order;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface OrderService {
    Order createOrder(Order order);
    List<Order> findAllByUserId(Integer id);
}
