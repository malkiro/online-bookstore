package com.app.bookstore.service;

import com.app.bookstore.entity.WishList;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface WishListService {
    List<WishList> findAllByUserId(Integer id);

    WishList addItemToWishList(WishList wishList);

    void deleteWishListItem(Integer id);
}
