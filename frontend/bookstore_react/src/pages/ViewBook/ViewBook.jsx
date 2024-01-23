import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import './ViewBook.css'
import { BiSolidRightArrow } from 'react-icons/bi';
import image1 from '../HomePage/images/test-image2.jpg'
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import { grey, pink, red } from '@mui/material/colors';
import { getRequest, postRequest } from "../../services/ApiService";
import successIcon from './images/success.png';
import { IoHeartOutline, IoHeart } from 'react-icons/io5';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
const imgURL = 'http://localhost:8081/loadcoverimage';

const ViewBook = () => {
    const { id } = useParams();
    const [bookDetails, setBookDetails] = useState('');
    const [successMessage, setSuccessMessage] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [count, setCount] = useState(1);
    const [isInWishlist, setIsInWishlist] = useState(false);
    const [isWishlistButtonDisabled, setIsWishlistButtonDisabled] = useState(false);

    const userId = sessionStorage.getItem('user_id');

    useEffect(() => {
        const getBookDetails = async () => {
            const response = await getRequest(`/books/${id}`);
            setBookDetails(response.data);
        }
        getBookDetails();

        //check withlist
        const checkWishlist = async () => {
            try {
                const response = await getRequest(`/wishlist/${userId}`);
                const wishlistItems = response.data;
                const isInWishlist = wishlistItems.some(item => item.book.id === bookDetails.id);
                setIsInWishlist(isInWishlist);
            } catch (error) {
                console.error('Error checking wishlist:', error);
            }
        }
        checkWishlist();
    }, [id, userId, bookDetails.id]);

    const addToWishlist = async () => {
        try {
            const data = {
                "book": {
                    "id": bookDetails.id,
                },
                "user": {
                    "id": userId,
                },
            }

            const response = await postRequest(`/wishlist`, data);

            if (response.status === 201) {
                setIsInWishlist(true);
                setIsWishlistButtonDisabled(true);
                setSuccessMessage('Added to wishlist');
            } else {
                setErrorMessage('Failed to add to wishlist');
            }

            setTimeout(() => {
                setSuccessMessage(null);
                setErrorMessage(null);
            }, 5000);
        } catch (error) {
            setErrorMessage('An error occurred while adding to wishlist');
        }
    };



    const handleChange = (currentCount, change) => {
        const newCount = currentCount + change;
        if (newCount >= 1) {
            setCount(newCount);
        }
    };



    const addToCart = async () => {
        try {
            const data = {
                "book": {
                    "id": bookDetails.id,
                },
                "user": {
                    "id": userId,
                },
                "quantity": count,
            }

            const response = await postRequest("/cart", data);

            if (response.status === 201) {
                const itemCount = response.data.quantity
                setSuccessMessage(`${itemCount} item added to cart`);
            } else {
                setErrorMessage('Failed to add item to cart');
            }

            setTimeout(() => {
                setSuccessMessage(null);
                setErrorMessage(null);
            }, 5000);
        } catch (error) {
            setErrorMessage('An error occurred while adding the item to the cart');
        }
    };

    const urlNameCategory = bookDetails?.subCategory?.category?.name.replace(/\s+/g, '-').toLowerCase();;
    // const urlNameSubCategory = bookDetails?.subCategory?.name.replace(/\s+/g, '-');
    const isOutOfStock = bookDetails?.bookStatus?.id === 2;

    return (
        <div className='view-book'>
            <section className="path">
                <div><Link to={"/"}> Home </Link></div>
                <span> {">"} </span>
                <div><Link to={"/books"}> Books </Link></div>
                <span> {">"} </span>
                <div> <Link to={`/books/${urlNameCategory}`}> {bookDetails?.subCategory?.category?.name} </Link> </div>
                <span> {">"} </span>
                <div> <Link to={`/books/${urlNameCategory}`}> {bookDetails?.subCategory?.name} </Link> </div>
                <span> {">"} </span>
                <div>{bookDetails?.title}</div>
            </section>

            {/* desktop view */}
            <div className='book-details-wrapper section'>
                <div className='book-details-wrapper-bg'>
                    <div className='image-wrapper'>
                        <img src={`${imgURL}/${bookDetails?.file_path}`} alt='image' />
                    </div>

                    <div className='book-details'>
                        <h1 className='title'> {bookDetails?.title} </h1>
                        <div className='bottom-border-line'></div>
                        <div className='book-status' style={{ color: isOutOfStock ? '#ff5757' : '#0fb985' }}>
                            {bookDetails?.bookStatus?.name}
                        </div>
                        <div className='old-price'> LKR {bookDetails?.price?.toFixed(2)} </div>
                        <div className='new-price'> LKR {bookDetails?.netPrice?.toFixed(2)} </div>
                        <h6>INFORMATION</h6>

                        <div className='details-line'>
                            <table>
                                <tr>
                                    <td className='left'>
                                        <div>
                                            <BiSolidRightArrow />
                                            Language
                                        </div>
                                    </td>
                                    <td className='right'>
                                        <div className='right'>
                                            <span>: {" "} </span> {bookDetails?.language}
                                        </div>
                                    </td>
                                </tr>

                                <tr>
                                    <td className='left'>
                                        <div>
                                            <BiSolidRightArrow />
                                            Author
                                        </div>
                                    </td>
                                    <td className='right'>
                                        <div className='right'>
                                            <span>: {" "} </span> {bookDetails?.author}
                                        </div>
                                    </td>
                                </tr>

                                <tr>
                                    <td className='left'>
                                        <div>
                                            <BiSolidRightArrow />
                                            Category
                                        </div>
                                    </td>
                                    <td className='right'>
                                        <div className='right'>
                                            <span>: {" "} </span> {bookDetails?.subCategory?.category?.name}
                                        </div>
                                    </td>
                                </tr>

                                <tr>
                                    <td className='left'>
                                        <div>
                                            <BiSolidRightArrow />
                                            Sub Category
                                        </div>
                                    </td>
                                    <td className='right'>
                                        <div className='right'>
                                            <span>: {" "} </span> {bookDetails?.subCategory?.name}
                                        </div>
                                    </td>
                                </tr>

                                {bookDetails?.description &&
                                    <tr>
                                        <td className='left'>
                                            <div>
                                                <BiSolidRightArrow />
                                                Description
                                            </div>
                                        </td>
                                        <td className='right'>
                                            <div className='right'>
                                                <span>: {" "} </span> {bookDetails?.description}
                                            </div>
                                        </td>
                                    </tr>
                                }
                            </table>
                        </div>

                        <div className='btn-row'>
                            <div className='btn1'>
                                <button
                                    disabled={count === 1}
                                    onClick={() => handleChange(count, -1)}
                                    style={{ backgroundColor: count === 1 ? "#eee" : "", cursor: count === 1 ? "no-drop" : "pointer", color: count === 1 ? "#aaa" : "" }}
                                > - </button>
                                <div>{count}</div>
                                <button
                                    disabled={count === 5}
                                    onClick={() => handleChange(count, +1)}
                                    style={{ backgroundColor: count === 5 || isOutOfStock ? "#eee" : "", cursor: count === 5 || isOutOfStock ? "no-drop" : "pointer", color: count === 5 || isOutOfStock ? "#aaa" : "" }}
                                > + </button>
                            </div>
                            <div className='btn2'>
                                <button
                                    onClick={addToCart}
                                    style={{ opacity: isOutOfStock ? '0.6' : '', cursor: isOutOfStock ? 'no-drop' : '' }}
                                > ADD TO CART </button>
                            </div>
                            <div className='btn3'>
                                <Link to={`/cart`}>
                                    <button> VIEW CART </button>
                                </Link>
                            </div>
                        </div>

                        {successMessage && <div className="success-message">
                            <img src={successIcon} alt="icon" style={{ width: "20px", height: "20px", marginRight: "10px" }} />
                            <span>{successMessage}</span>
                        </div>}
                        {errorMessage && <div className="error-message">{errorMessage}</div>}

                        <button
                            className='wish-list-btn'
                            onClick={addToWishlist}
                            disabled={isInWishlist}
                        >
                            {isInWishlist ? (
                                <IoHeart size="30px" />
                            ) : (
                                <IoHeartOutline size="30px" />
                            )}
                            <span>{isInWishlist ? 'ADDED TO WISHLIST' : 'ADD TO WISHLIST'}</span>
                        </button>

                    </div>
                </div>
            </div>

            {/* mobile view */}
            <div className='book-details-wrapper-sm section'>
                <div className='book-details-wrapper-bg-sm'>
                    <div className='image-wrapper'>
                        <img src={`${imgURL}/${bookDetails?.file_path}`} alt='image' />
                    </div>

                    <div className='book-details'>
                        <h1 className='title'> {bookDetails?.title} </h1>
                        <div className='bottom-border-line'></div>
                        <div className='book-status' style={{ color: isOutOfStock ? '#ff5757' : '#0fb985' }}>
                            {bookDetails?.bookStatus?.name}
                        </div>
                        <div className='old-price'> LKR {bookDetails?.price?.toFixed(2)} </div>
                        <div className='new-price'> LKR {bookDetails?.netPrice?.toFixed(2)} </div>
                        <h6>INFORMATION</h6>

                        <div className='details-line'>
                            <table>
                                <tr>
                                    <td className='left'>
                                        <div>
                                            <BiSolidRightArrow />
                                            Language
                                        </div>
                                    </td>
                                    <td className='right'>
                                        <div className='right'>
                                            <span>: {" "} </span> {bookDetails?.language}
                                        </div>
                                    </td>
                                </tr>

                                <tr>
                                    <td className='left'>
                                        <div>
                                            <BiSolidRightArrow />
                                            Author
                                        </div>
                                    </td>
                                    <td className='right'>
                                        <div className='right'>
                                            <span>: {" "} </span> {bookDetails?.author}
                                        </div>
                                    </td>
                                </tr>

                                <tr>
                                    <td className='left'>
                                        <div>
                                            <BiSolidRightArrow />
                                            Category
                                        </div>
                                    </td>
                                    <td className='right'>
                                        <div className='right'>
                                            <span>: {" "} </span> {bookDetails?.subCategory?.category?.name}
                                        </div>
                                    </td>
                                </tr>

                                <tr>
                                    <td className='left'>
                                        <div>
                                            <BiSolidRightArrow />
                                            Sub Category
                                        </div>
                                    </td>
                                    <td className='right'>
                                        <div className='right'>
                                            <span>: {" "} </span> {bookDetails?.subCategory?.name}
                                        </div>
                                    </td>
                                </tr>

                                {bookDetails?.description &&
                                    <tr>
                                        <td className='left'>
                                            <div>
                                                <BiSolidRightArrow />
                                                Description
                                            </div>
                                        </td>
                                        <td className='right'>
                                            <div className='right'>
                                                <span>: {" "} </span> {bookDetails?.description}
                                            </div>
                                        </td>
                                    </tr>
                                }
                            </table>
                        </div>

                        <div className='btn-row'>
                            <div className='btn1'>
                                <button
                                    disabled={count === 1}
                                    onClick={() => handleChange(count, -1)}
                                    style={{ backgroundColor: count === 1 ? "#eee" : "", cursor: count === 1 ? "no-drop" : "pointer", color: count === 1 ? "#aaa" : "" }}
                                > - </button>
                                <div>{count}</div>
                                <button
                                    disabled={count === 5}
                                    onClick={() => handleChange(count, +1)}
                                    style={{ backgroundColor: count === 5 || isOutOfStock ? "#eee" : "", cursor: count === 5 || isOutOfStock ? "no-drop" : "pointer", color: count === 5 || isOutOfStock ? "#aaa" : "" }}
                                > + </button>
                            </div>
                            <div className='btn2'>
                                <button
                                    onClick={addToCart}
                                    style={{ opacity: isOutOfStock ? '0.6' : '', cursor: isOutOfStock ? 'no-drop' : '' }}
                                > ADD TO CART </button>
                            </div>
                            <div className='btn3'>
                                <Link to={`/cart`}>
                                    <button> VIEW CART </button>
                                </Link>
                            </div>
                        </div>

                        {successMessage && <div className="success-message">
                            <img src={successIcon} alt="icon" style={{ width: "20px", height: "20px", marginRight: "10px" }} />
                            <span>{successMessage}</span>
                        </div>}
                        {errorMessage && <div className="error-message">{errorMessage}</div>}

                        <button
                            className='wish-list-btn'
                            onClick={addToWishlist}
                            disabled={isInWishlist}
                        >
                            {isInWishlist ? (
                                <IoHeart size="30px" />
                            ) : (
                                <IoHeartOutline size="30px" />
                            )}
                            <span>{isInWishlist ? 'ADDED TO WISHLIST' : 'ADD TO WISHLIST'}</span>
                        </button>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default ViewBook
