import React, { useEffect, useState } from "react";
import SingleBook from "./components/SingleBook";
import { getRequest } from "../../services/ApiService";
import './CategorySingle.css'
import { Link } from "react-router-dom";

const CategorySingle = () => {
    const currentPath = window.location.pathname;
    let categoryId;

    if (currentPath.includes("/books/fiction")) {
        categoryId = "1";
    } else if (currentPath.includes("/books/novel")) {
        categoryId = "2";
    } else if (currentPath.includes("/books/short-story")) {
        categoryId = "3";
    } else if (currentPath.includes("/books/children")) {
        categoryId = "4";
    } else if (currentPath.includes("/books/education")) {
        categoryId = "5";
    } else if (currentPath.includes("/books/translation")) {
        categoryId = "6";
    }

    const categoryNames = {
        "1": "Fiction",
        "2": "Novel",
        "3": "Short Story",
        "4": "Children",
        "5": "Education",
        "6": "Translation",
    };

    const [booksByCategory, setBooksByCategory] = useState(null);
    const [fillteredSubCategories, setFillteredSubCategories] = useState(null);
    const [isInWishlist, setIsInWishlist] = useState([]);
    const [isInCart, setIsInCart] = useState([]);
    const [activeFilter, setActiveFilter] = useState("View All");
    const [filteredBooks, setFilteredBooks] = useState([]);

    const userId = sessionStorage.getItem('user_id');

    useEffect(() => {
        const getBooksByCategory = async () => {
            const response = await getRequest(`/categories/${categoryId}/books`);
            setBooksByCategory(response.data);

            // Fetch the wishlist items
            const wishlistResponse = await getRequest(`/wishlist/${userId}`);
            const wishlistItems = wishlistResponse.data.map(item => item.book.id);
            setIsInWishlist(wishlistItems);

            // Fetch the cart items
            const cartResponse = await getRequest(`/cart/${userId}`);
            const cartItems = cartResponse.data.map(item => item.book.id);
            setIsInCart(cartItems);
        }
        getBooksByCategory();
    }, [categoryId, userId]);

    useEffect(() => {
        const getSubCategoriesByCategory = async () => {
            const response = await getRequest(`/categories/${categoryId}/subcategories`);
            setFillteredSubCategories(response.data);
        }
        getSubCategoriesByCategory();
    }, [categoryId]);


    // Function to filter books by subcategory
    const filterBooksBySubcategory = (subcategoryName) => {
        if (subcategoryName === "View All") {
            setFilteredBooks(booksByCategory);
        } else {
            // Filter books by subcategory name
            const filtered = booksByCategory.filter((item) => item.subCategory.name === subcategoryName);
            setFilteredBooks(filtered);
        }
    };

    // Handle filter clicks
    const handleFilterClick = (subcategoryName) => {
        setActiveFilter(subcategoryName);
        filterBooksBySubcategory(subcategoryName);
    };

    // Use the filteredBooks state to map and display books
    const booksToDisplay = activeFilter === "View All" ? booksByCategory : filteredBooks;

    // Create an array of subcategory names
    const subCategoryNames = fillteredSubCategories?.map(item => item.name);
    const filtersArray = Array.from(new Set(subCategoryNames));
    filtersArray.unshift("View All");




    return (
        <div className='category-single'>
            <section className='top-nav-sec'>
                {/* Want to set Category Name here */}
                <h3> {categoryNames[categoryId]} Category</h3>
                <div className='path'>
                    <Link to="/">
                        Home
                    </Link>
                    <span> {">"} </span>
                    <Link to="/books">
                        Books
                    </Link>
                    <span> {">"} </span>
                    <div> {categoryNames[categoryId]} </div>
                </div>
            </section>
            <section className='section'>
                <div className="subcategory-wrapper">
                    <ul className='subcategory-list'>
                        {filtersArray?.map((item, idx) => {
                            return (
                                <li
                                    className={`category-name ${item === activeFilter ? "active-filter" : ""}`}
                                    onClick={() => handleFilterClick(item)}
                                    key={idx}
                                >
                                    {item}
                                </li>
                            )
                        })}

                    </ul>
                </div>

                <div className='wrapper'>
                    {booksToDisplay?.map((item, idx) => {
                        const urlCategory = item?.subCategory?.category?.name?.replace(/\s+/g, '-')
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
            </section>
        </div>
    )
}

export default CategorySingle
