package com.app.bookstore.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "orders")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String firstName;

    private String lastName;

    private String phone;

    private String address;

    private String other;

    private Double total;

    @Column(updatable = false)
    private LocalDateTime createdAt;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id") //Foreign key of User Entity
    private User user;

    @ManyToMany(cascade = { CascadeType.ALL}, fetch = FetchType.EAGER)
    @JoinTable(
            name = "order_cartitems",
            joinColumns = { @JoinColumn(name = "order_id")},
            inverseJoinColumns = { @JoinColumn(name = "cartitem_id") }
    )
    private Set<CartItem> cartItemSet = new HashSet<>();

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
    }

}
