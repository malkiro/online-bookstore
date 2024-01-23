package com.app.bookstore.service;


import com.app.bookstore.entity.Order;
import com.app.bookstore.repository.BookRepository;
import com.app.bookstore.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderServiceImpl implements OrderService {

    @Autowired
    OrderRepository orderRepository;

    @Autowired
    CartItemService cartItemService;

    @Autowired
    BookRepository bookRepository;

    @Override
    public Order createOrder(Order order) {
        return orderRepository.save(order);
    }

    @Override
    public List<Order> findAllByUserId(Integer id) {
        return orderRepository.findAllByUserId(id);
    }


}
