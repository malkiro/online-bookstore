import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import './WishList.css';
import { Button, Table } from "react-bootstrap";
import { getRequest, deleteRequest, postRequest } from "../../services/ApiService";
import { IoClose } from 'react-icons/io5';
import successIcon from './images/success.png';

const WishList = () => {
    const [wishlist, setWishlist] = useState('');
    const [itemCount, setItemCount] = useState('');
    const userId = sessionStorage.getItem('user_id');
    const [successMessage, setSuccessMessage] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);

    const imgURL = 'http://localhost:8081/loadcoverimage';

    useEffect(() => {
        const getWishListItems = async () => {
            const response = await getRequest(`/wishlist/${userId}`);
            setWishlist(response.data);
            setItemCount(response.data.length);
        }
        getWishListItems();
    }, [userId]);

    const deleteWishListItem = async (itemId) => {
        try {
            const response = await deleteRequest(`/wishlist/${itemId}`);
            if (response.status === 200) {
                const getWishListItems = async () => {
                    const response = await getRequest(`/wishlist/${userId}`);
                    setWishlist(response.data);
                    setItemCount(response.data.length);
                }
                getWishListItems();
            } else {
                console.error("Failed to delete item from wishlist");
            }
        } catch (error) {
            console.error("An error occurred while deleting the item from wishlist", error);
        }
    };

    const addToCart = async (bookId, itemId) => {
        try {
            const data = {
                "book": {
                    "id": bookId,
                },
                "user": {
                    "id": userId,
                },
                "quantity": 1,
            }

            const response = await postRequest("/cart", data);

            if (response.status === 201) {
                const itemCount = response.data.quantity
                setItemCount(itemCount - 1);
                deleteWishListItem(itemId);
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

    return (
        <div className='wishlist-page'>
            {/* nav header */}
            <section className='top-nav-sec'>
                <h3>Wishlist</h3>
                <div className='path'>
                    <Link to="/">
                        Home
                    </Link>
                    <span> {">"} </span>
                    <div>Wishlist</div>
                </div>
            </section>

            <section className='section'>
                <div className='content'>
                    {wishlist && wishlist.length === 0 ? (
                        <div className="empty-wrapper">
                            <p>No Items</p>
                            <div className="continue-shopping">
                                <Link to={"/books"}>
                                    Continue Shopping {"  >>"}
                                </Link>
                            </div>
                        </div>
                    ) :
                        (<div className='content-wrapper'>
                            <div className="top-wrapper">
                                <h2 className='heading'>My Wishlist</h2>
                                <div className="item-counter"> {itemCount} Items</div>
                            </div>

                            {successMessage && <div className="success-message">
                                <img src={successIcon} alt="icon" style={{ width: "20px", height: "20px", marginRight: "10px" }} />
                                <span>{successMessage}</span>
                            </div>}
                            {errorMessage && <div className="error-message">{errorMessage}</div>}

                            <Table responsive className="details-table">
                                <thead>
                                    <tr>
                                        {/* <th>ID</th> */}
                                        <th>Item</th>
                                        <th>Category</th>
                                        <th>Price</th>
                                        <th>Status</th>
                                        <th></th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {wishlist && wishlist.map((item, idx) => {
                                        const itemId = item.id;
                                        const urlCategory = item?.book?.subCategory?.category?.name?.replace(/\s+/g, '-');
                                        const urlSubCategory = item?.book?.subCategory?.name?.replace(/\s+/g, '-');
                                        const urlpath = `/books/${urlCategory}/${urlSubCategory}/${item?.book?.id}`

                                        const isOutOfStock = item?.book?.bookStatus?.id === 2;

                                        return (
                                            <tr key={idx}>
                                                <td>
                                                    <Link to={urlpath}>
                                                        <div className="item-col">
                                                            <div className="image">
                                                                <img src={`${imgURL}/${item?.book?.file_path}`} alt="image" />
                                                            </div>
                                                            <div className="title">{item?.book?.title}</div>

                                                        </div>
                                                    </Link>
                                                </td>
                                                <td>{item?.book?.category?.name}</td>
                                                <td>
                                                    <div className="price-col">
                                                        <div className="price-before-dicount">LKR {item?.book?.price?.toFixed(2)}</div>
                                                        <div className="price-after-dicount">LKR {item?.book?.netPrice?.toFixed(2)}</div>
                                                    </div>
                                                </td>
                                                <td className={item?.book?.bookStatus?.id === 1 ? 'in-stock' : 'out-of-stock'}>
                                                    {item?.book?.bookStatus?.name}
                                                </td>
                                                <td>
                                                    <div className='addtocart-btn'>
                                                        <button
                                                            onClick={() => addToCart(item?.book?.id, itemId)}
                                                            disabled={isOutOfStock}
                                                            style={{ opacity: isOutOfStock ? '0.6' : '', cursor: isOutOfStock ? 'no-drop' : '' }}
                                                        >ADD TO CART
                                                        </button>
                                                    </div>
                                                </td>
                                                <td>
                                                    <Button variant="secondary" size="sm" onClick={() => deleteWishListItem(itemId)}>
                                                        <IoClose />
                                                    </Button>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </Table>

                            <div className="details-card ">
                                {wishlist && wishlist.map((item, idx) => {
                                    const itemId = item.id;
                                    const urlCategory = item?.book?.subCategory?.category?.name?.replace(/\s+/g, '-');
                                    const urlSubCategory = item?.book?.subCategory?.name?.replace(/\s+/g, '-');
                                    const urlpath = `/books/${urlCategory}/${urlSubCategory}/${item?.book?.id}`

                                    const isOutOfStock = item?.book?.bookStatus?.id === 2;

                                    return (
                                        <div className="card-wrapper">
                                            <div className="first-col">
                                                <div className="left-card">
                                                    <Link to={urlpath}>
                                                        <div className="image">
                                                            <img src={`${imgURL}/${item?.book?.file_path}`} alt="image" />
                                                        </div>
                                                    </Link>
                                                </div>
                                                <div className="right-card">
                                                    <Link to={urlpath}>
                                                        <div className="title">{item?.book?.title}</div>
                                                    </Link>
                                                    <div className="category-wrapper">
                                                        <span>{item?.book?.subCategory?.category?.name}</span>
                                                        <span> {" > "} </span>
                                                        <span>{item?.book?.subCategory?.name}</span>
                                                    </div>
                                                    <div className="price-wrapper">
                                                        <span>Unit Price: </span>
                                                        <span className="old-price">LKR {item?.book?.price?.toFixed(2)}</span>
                                                        <span>LKR {item?.book?.price?.toFixed(2)}</span>
                                                    </div>
    
                                                    <div className={`${item?.book?.bookStatus?.id === 1 ? 'in-stock' : 'out-of-stock'}`}>
                                                        {item?.book?.bookStatus?.name}
                                                    </div>
                                                    <div className='addtocart-btn'>
                                                        <button
                                                            onClick={() => addToCart(item?.book?.id, itemId)}
                                                            disabled={isOutOfStock}
                                                            style={{ opacity: isOutOfStock ? '0.6' : '', cursor: isOutOfStock ? 'no-drop' : '' }}
                                                        >ADD TO CART
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="last-col">
                                                <Button variant="secondary" size="sm" onClick={() => deleteWishListItem(itemId)}>
                                                    <IoClose />
                                                </Button>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>

                            <div className='bottom-wrapper'>
                                <div className="continue-shopping">
                                    <Link to={"/"}>
                                        Continue Shopping {"  >>"}
                                    </Link>
                                </div>
                            </div>

                        </div>)
                    }
                </div>
            </section>
        </div>
    )
}

export default WishList
