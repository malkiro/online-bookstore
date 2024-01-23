import React, { useEffect, useState } from "react";
import { getRequest } from "../../services/ApiService";
import SingleBook from "./components/SingleBook";
import './AllBooks.css'
import { Link } from "react-router-dom";
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

const AllBooks = () => {
    const [allBooks, setAllBooks] = useState([]);
    const [isInWishlist, setIsInWishlist] = useState([]);
    const [isInCart, setIsInCart] = useState([]);
    const userId = sessionStorage.getItem('user_id');
    const [categories, setCategories] = useState(null);
    const [selectedCategories, setSelectedCategories] = useState([]);

    const handleCategoryCheckboxChange = (event) => {
        const categoryName = event.target.name;
        if (event.target.checked) {
            setSelectedCategories([...selectedCategories, categoryName]);
        } else {
            setSelectedCategories(selectedCategories.filter(cat => cat !== categoryName));
        }
    };



    useEffect(() => {
        const getAllBooks = async () => {
            const response = await getRequest("/books");
            setAllBooks(response.data);

            // Fetch the wishlist items
            const wishlistResponse = await getRequest(`/wishlist/${userId}`);
            const wishlistItems = wishlistResponse.data.map(item => item.book.id);
            setIsInWishlist(wishlistItems);

            // Fetch the cart items
            const cartResponse = await getRequest(`/cart/${userId}`);
            const cartItems = cartResponse.data.map(item => item.book.id);
            setIsInCart(cartItems);
        }
        getAllBooks();
    }, []);

    useEffect(() => {
        const getAllCategories = async () => {
            const response = await getRequest("/categories");
            setCategories(response.data);
        }
        getAllCategories();
    }, []);

    // Filter books based on selected categories
    const filteredBooks = allBooks.filter(book => {
        if (selectedCategories.length === 0) {
            return true;
        }
        return selectedCategories.includes(book.subCategory.category.name);
    });

    return (
        <div className='all-books'>
            <section className='top-nav-sec'>
                <h3>All Books</h3>
                <div className='path'>
                    <Link to="/">
                        Home
                    </Link>
                    <span> {">"} </span>
                    <div>Books</div>
                </div>
            </section>

            <section className='section'>
                <div className='wrapper'>
                    <div className='filter-wrapper'>
                        <h5>Filter By Category: </h5>
                        <div>
                            <FormGroup>
                                {categories?.map(({ name }, idx) => {
                                    return (
                                        <FormControlLabel
                                            key={idx}
                                            control={
                                                <Checkbox
                                                    checked={selectedCategories.includes(name)}
                                                    onChange={handleCategoryCheckboxChange}
                                                    name={name}
                                                />
                                            }
                                            label={name}
                                        />
                                    );
                                })}
                            </FormGroup>
                        </div>
                    </div>

                    <div className="book-set">
                    {filteredBooks?.map((item, idx) => {
                            const urlCategory = item?.subCategory?.category?.name?.replace(/\s+/g, '-');
                            const urlSubCategory = item?.subCategory?.name?.replace(/\s+/g, '-');
                            const urlpath = `/books/${urlCategory}/${urlSubCategory}/${item.id}`

                            // Check if the book is in the wishlist
                            const bookIsInWishlist = isInWishlist.includes(item.id);

                            // Check if the book is in the cart
                            const bookIsInCart = isInCart.includes(item.id);

                            return (
                                <SingleBook
                                    key={idx}
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
                            );
                        })}
                    </div>

                </div>
            </section>
        </div>
    )
}

export default AllBooks
