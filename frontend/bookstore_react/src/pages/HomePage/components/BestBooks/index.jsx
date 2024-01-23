import React, { useEffect, useState } from 'react'
import SingleBook from '../SingleBook';
import DoubleArrow from '../../images/doubleArrow.svg'
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';


// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Link } from 'react-router-dom';
import './index.css'
import { getRequest } from '../../../../services/ApiService';

const BestBooks = ({ subTitle, title, exploreLink, bgColor, categoryId }) => {
    const [bestBooks, setBestBooks] = useState(null);
    const [isInWishlist, setIsInWishlist] = useState([]);
    const [isInCart, setIsInCart] = useState([]);
    const userId = sessionStorage.getItem('user_id');

    useEffect(() => {
        const fetchBestBooks = async () => {
            // Use the categoryId prop to fetch data
            const response = await getRequest(`/categories/${categoryId}/books`);
            setBestBooks(response.data);

            // Fetch the wishlist items
            const wishlistResponse = await getRequest(`/wishlist/${userId}`);
            const wishlistItems = wishlistResponse.data.map(item => item.book.id);
            setIsInWishlist(wishlistItems);

            // Fetch the cart items
            const cartResponse = await getRequest(`/cart/${userId}`);
            const cartItems = cartResponse.data.map(item => item.book.id);
            setIsInCart(cartItems);
        }
        fetchBestBooks();
    }, [categoryId, userId]);

    return (
        <div className={`${bgColor}`}>
        <div className={`best-children-books-wrapper section ${bgColor} `}>
            <div className='heading-area'>
                <div className='left'>

                </div>
                <div className='middle'>
                    <h5> {subTitle} </h5>
                    <h2> {title} </h2>
                </div>
                <Link to={exploreLink} className='right'>
                    <div className='explore-btn'>
                        <span>EXPLORE ALL</span>
                        <img src={DoubleArrow} alt='icon' />
                    </div>
                </Link>
            </div>

            <div className={"carousel_wrapper"}>
                <Swiper
                    slidesPerView={"auto"}
                    spaceBetween={20}
                    loop={true}
                    pagination={{
                        clickable: true,
                    }}
                    navigation={true}
                    modules={[Navigation, Pagination, Scrollbar, A11y]}
                    className="mySwiper"
                    breakpoints={{
                        320: {
                            slidesPerView: 1,
                        },
                        420: {
                            slidesPerView: 2,
                        },
                        576: {
                            slidesPerView: 3,
                        },
                        840: {
                            slidesPerView: 4,
                        },
                        1200: {
                            slidesPerView: 5,
                        },
                    }}
                >

                    <div className='book-area'>
                        {bestBooks?.map((item, index) => {
                            const urlCategory = item?.subCategory?.category?.name?.replace(/\s+/g, '-').toLowerCase();
                            const urlSubCategory = item?.subCategory?.name?.replace(/\s+/g, '-').toLowerCase();
                            const urlpath = `/books/${urlCategory}/${urlSubCategory}/${item.id}`

                            // Check if the book is in the wishlist
                            const bookIsInWishlist = isInWishlist.includes(item.id);

                             // Check if the book is in the cart
                             const bookIsInCart = isInCart.includes(item.id);


                            return (
                                <SwiperSlide
                                    className=""
                                    key={index}
                                >
                                    <SingleBook
                                        id={item.id}
                                        image={item.file_path}
                                        isNew={item.isNew}
                                        discount={item.discountedRatio}
                                        title={item.title}
                                        author={item.author}
                                        priceBeforeDiscount={item.price?.toFixed(2)}
                                        priceAfterDiscount={item.netPrice?.toFixed(2)}
                                        category={item.subCategory.category.name}
                                        subCategory={item.subCategory.name}
                                        bookStatus={item.bookStatus.id}
                                        link={urlpath}
                                        isBookWishlist={bookIsInWishlist}
                                        isBookCart={bookIsInCart}
                                    />
                                </SwiperSlide>
                            );
                        })}
                    </div>
                </Swiper>
            </div>
        </div>
        </div>
    )
}

export default BestBooks
