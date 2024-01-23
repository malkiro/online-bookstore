package com.app.bookstore.service;

import com.app.bookstore.entity.WishList;
import com.app.bookstore.repository.WishListRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WishListServiceImpl implements WishListService {
    @Autowired
    private WishListRepository wishListRepository;

    @Override
    public List<WishList> findAllByUserId(Integer id) {
        return wishListRepository.findAllByUserId(id);
    }

    @Override
    public WishList addItemToWishList(WishList wishList) {
        return wishListRepository.save(wishList);
    }

    @Override
    public void deleteWishListItem(Integer id) {
        wishListRepository.deleteById(id);
    }
}
