package com.app.bookstore.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "books")
public class Book {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String file_path;

    private Boolean isNew = true;

    private Double discountedRatio = 0.0;

    @Column(nullable = false)
    private Double price;

    private Double netPrice;

    @Column(nullable = false)
    private String title;

    private String author;

    private String language;

    private String description;

    @Column(nullable = false)
    private Integer quantity;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "status_id")
    private BookStatus bookStatus;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "category_id")
    private Category category;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "subcategory_id")
    private SubCategory subCategory;

    public void calculateNetPrice() {
        if (discountedRatio != null && price != null) {
            this.netPrice = price - (price * discountedRatio);
        }
    }


}
