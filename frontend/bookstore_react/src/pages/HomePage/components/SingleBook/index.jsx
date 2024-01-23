import React, { useState } from 'react'
import './index.css'
import { Link } from 'react-router-dom'
import { IoHeart, IoHeartOutline, IoCart, IoCartOutline } from 'react-icons/io5';
import { postRequest } from '../../../../services/ApiService';
import { toast } from 'react-toastify';

const SingleBook = ({ id, image, isNew, discount, title, author, priceBeforeDiscount, priceAfterDiscount, category, subCategory, bookStatus, link, isBookWishlist, isBookCart }) => {
  const discoutPercentage = discount * 100;
  const imgURL = 'http://localhost:8081/loadcoverimage';
  const userId = sessionStorage.getItem('user_id');
  const [isInWishlist, setIsInWishlist] = useState(isBookWishlist);
  const [isWishlistButtonDisabled, setIsWishlistButtonDisabled] = useState(false);
  const [isInCart, setIsInCart] = useState(isBookCart);
  const [isCartButtonDisabled, setCartButtonDisabled] = useState(false);

  const isOutOfStock = bookStatus === 2;

  const addToWishlist = async (event) => {
    event.preventDefault();
    try {
        const data = {
            "book": {
                "id": id,
            },
            "user": {
                "id": userId,
            },
        }

        const response = await postRequest(`/wishlist`, data);

        if (response.status === 201) {
            setIsInWishlist(true); 
            setIsWishlistButtonDisabled(true);
            toast.success('Added to wishlist', {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
              });
        } else {
            toast.error('Failed to add to wishlist', {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
              });
        }
    } catch (error) {
        toast.error('An error occurred while adding to wishlist', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          });
    }
};

const addToCart = async (event) => {
  event.preventDefault();
  try {
      const data = {
          "book": {
              "id": id,
          },
          "user": {
              "id": userId,
          },
          "quantity": 1,
      }

      const response = await postRequest(`/cart`, data);

      if (response.status === 201) {
        setIsInCart(true); 
        setCartButtonDisabled(true);
          toast.success('Added to cart', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            });
      } else {
          toast.error('Failed to add to cart', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            });
      }
  } catch (error) {
      toast.error('An error occurred while adding to cart', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        });
  }
};

  return (
    <div className='singleBook'>
      <Link to={link}>
        <div className='book-wrapper'>
          <div className='pre-header'>
            <div className={`new ${isNew ? '' : 'bg-remove'}`}>
              {isNew && <span>{isNew ? "New" : ""}</span>}
            </div>
            <div className={`discount ${discount ? '' : 'bg-remove'}`}>
              {discount !== 0 && <span>{discoutPercentage}%</span>}
            </div>
          </div>
          <div className='cover-image'>
            <img src={`${imgURL}/${image}`} alt='image' />
          </div>
          <div className='book-details'>
            <div className='hover-buttons'>
              <button className='favourite-icon'  
              onClick={(event) => addToWishlist(event)}
              disabled={isBookWishlist || isWishlistButtonDisabled}
              >
                {isBookWishlist || isInWishlist ? (
                  <IoHeart size="30px" />
                ) : (
                  <IoHeartOutline size="30px" />
                )}
              </button>
              <button className='cart-icon'  
              onClick={(event) => addToCart(event)}
              disabled={isBookCart || isCartButtonDisabled || isOutOfStock}
              style={{cursor : isOutOfStock ? "no-drop" : "" }}
              >
                {isBookCart || isInCart ? (
                  <IoCart size="30px" />
                ) : (
                  <IoCartOutline size="30px" />
                )}
              </button>
            </div>
            <div className='book-title'> {title} </div>
            <div className='book-author'>By: <span> {author} </span> </div>
            <div className='price-without-discount'> LKR <span> {priceBeforeDiscount} </span> </div>
            <div className='price-with-discount'> LKR <span> {priceAfterDiscount} </span> </div>

            <div className='category-details'>
              <div className='category'> {category} </div>
              <div className='arrow'> {'>'} </div>
              <div className='sub-category'> {subCategory} </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default SingleBook
