package com.app.bookstore.controller;

import com.app.bookstore.entity.Order;
import com.app.bookstore.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins="*")
@RestController
public class OrderController {

    @Autowired
    OrderService orderService;

    @PostMapping("/orders")
    public ResponseEntity<Order> createOrder(@RequestBody Order order) {
        return new ResponseEntity<Order>(orderService.createOrder(order), HttpStatus.CREATED);
    }

    @GetMapping("/orders/{id}")
    public ResponseEntity<List<Order>> findByUser(@PathVariable Integer id){
        List<Order> cartItems = orderService.findAllByUserId(id);
        return ResponseEntity.status(HttpStatus.OK).body(cartItems);
    }
}
