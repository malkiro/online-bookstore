import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import './Cart.css';
import { Button, Table } from "react-bootstrap";
import { getRequest, deleteRequest, updateRequest } from "../../services/ApiService";
import { IoClose } from 'react-icons/io5';

const Cart = () => {
    const [cart, setCart] = useState(null);
    const userId = sessionStorage.getItem('user_id');
    const imgURL = 'http://localhost:8081/loadcoverimage';

    useEffect(() => {
        const getCartItems = async () => {
            const response = await getRequest(`/cart/${userId}`);
            setCart(response.data);
        }
        getCartItems();
    }, []);

    const handleChange = async (item, d) => {
        const updatedCart = cart.map(cartItem => {
            if (cartItem.id === item.id) {
                const updatedQuantity = cartItem.quantity + d;
                const newQuantity = Math.min(Math.max(updatedQuantity, 1), 5);

                // Call updateQuantity
                updateQuantity(item.id, newQuantity);

                return {
                    ...cartItem,
                    quantity: newQuantity
                };
            }
            return cartItem;

        });

        setCart(updatedCart);
    };

    const updateQuantity = async (itemId, newQuantity) => {
        try {
            const data = {
                "id": itemId,
                "user": {
                    "id": userId,
                },
                "quantity": newQuantity,
            }

            const response = await updateRequest(`/cart/${itemId}`, data);
            if (response.status !== 200) {
                console.error("Failed to update item quantity");
            }
        } catch (error) {
            console.error("An error occurred while updating the item quantity", error);
        }
    };

    const deleteCartItem = async (itemId) => {
        try {
            const response = await deleteRequest(`/cart/${itemId}`);
            if (response.status === 200) {
                const getCartItems = async () => {
                    const response = await getRequest(`/cart/${userId}`);
                    setCart(response.data);
                }
                getCartItems();
            } else {
                console.error("Failed to delete item from cart");
            }
        } catch (error) {
            console.error("An error occurred while deleting the item from cart", error);
        }
    };

    // Calculate the FinalSubtotal by summing up individual row subtotals
    const FinalSubtotal = cart ? cart.reduce((total, item) => {
        const quantity = item.quantity;
        const subtotal = (item?.book?.netPrice * quantity);
        return total + subtotal;
    }, 0) : 0;

    return (
        <div className='cart-page'>
            {/* nav header */}
            <section className='top-nav-sec'>
                <h3>Cart</h3>
                <div className='path'>
                    <Link to="/">
                        Home
                    </Link>
                    <span> {">"} </span>
                    <div>Cart</div>
                </div>
            </section>

            <section className='section'>
                <div className='content'>
                    {cart && cart.length === 0 ? (
                        <div className="empty-wrapper">
                            <p>Your Cart is empty</p>
                            <div className="continue-shopping">
                                <Link to={"/books"}>
                                    Continue Shopping {"  >>"}
                                </Link>
                            </div>
                        </div>
                    ) :
                        (<div className='content-wrapper'>
                            <h3 className='heading'>Items In Your Cart</h3>
                            <Table responsive className="details-table">
                                <thead>
                                    <tr>
                                        {/* <th>ID</th> */}
                                        <th>Item</th>
                                        <th>Category</th>
                                        <th>Subcategory</th>
                                        <th>Price</th>
                                        <th>Quantity</th>
                                        <th>Subtotal</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {cart && cart.map((item, idx) => {
                                        const itemId = item.id;
                                        const quantity = item.quantity;
                                        const subtotal = (item?.book?.netPrice * quantity).toFixed(2);

                                        const urlCategory = item?.book?.subCategory?.category?.name?.replace(/\s+/g, '-');
                                        const urlSubCategory = item?.book?.subCategory?.name?.replace(/\s+/g, '-');
                                        const urlpath = `/books/${urlCategory}/${urlSubCategory}/${item?.book?.id}`

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
                                                <td>{item?.book?.subCategory?.name}</td>
                                                <td>
                                                    <div className="price-col">
                                                        <div className="price-before-dicount">LKR {item?.book?.price?.toFixed(2)}</div>
                                                        <div className="price-after-dicount">LKR {item?.book?.netPrice?.toFixed(2)}</div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className='qty-btn'>
                                                        <button
                                                            disabled={quantity === 1}
                                                            // onClick={() => handleChange(itemId, -1)}
                                                            onClick={() => handleChange(item, -1)}
                                                            style={{ backgroundColor: quantity === 1 ? "#E4E4E4" : "", cursor: quantity === 1 ? "no-drop" : "pointer", color: quantity === 1 ? "#fff" : "" }}
                                                        > - </button>
                                                        <div>{item.quantity}</div>
                                                        <button
                                                            disabled={quantity === 5}
                                                            // onClick={() => handleChange(itemId, 1)}
                                                            onClick={() => handleChange(item, +1)}
                                                            style={{ backgroundColor: quantity === 5 ? "#E4E4E4" : "", cursor: quantity === 5 ? "no-drop" : "pointer", color: quantity === 5 ? "#fff" : "" }}
                                                        > + </button>
                                                    </div>
                                                </td>
                                                <td>{subtotal}</td>
                                                <td>
                                                    <Button variant="secondary" size="sm" onClick={() => deleteCartItem(itemId)}>
                                                        <IoClose />
                                                    </Button>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </Table>

                            <div className="details-card ">
                                {cart && cart.map((item, idx) => {
                                    const itemId = item.id;
                                    const quantity = item.quantity;
                                    const subtotal = (item?.book?.netPrice * quantity).toFixed(2);

                                    const urlCategory = item?.book?.subCategory?.category?.name?.replace(/\s+/g, '-');
                                    const urlSubCategory = item?.book?.subCategory?.name?.replace(/\s+/g, '-');
                                    const urlpath = `/books/${urlCategory}/${urlSubCategory}/${item?.book?.id}`

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
                                                        <span>{item?.book?.category?.name}</span>
                                                        <span> {' > '} </span>
                                                        <span>{item?.book?.subCategory?.name}</span>
                                                    </div>
                                                    <div className="price-wrapper">
                                                        <span>Unit Price: </span>
                                                        <span className="old-price">LKR {item?.book?.price?.toFixed(2)}</span>
                                                        <span>LKR {item?.book?.price?.toFixed(2)}</span>
                                                    </div>
                                                    <div className='qty-btn'>
                                                        <button
                                                            disabled={quantity === 1}
                                                            onClick={() => handleChange(item, -1)}
                                                            style={{ backgroundColor: quantity === 1 ? "#E4E4E4" : "", cursor: quantity === 1 ? "no-drop" : "pointer", color: quantity === 1 ? "#fff" : "" }}
                                                        > - </button>
                                                        <div>{item.quantity}</div>
                                                        <button
                                                            disabled={quantity === 5}
                                                            onClick={() => handleChange(item, +1)}
                                                            style={{ backgroundColor: quantity === 5 ? "#E4E4E4" : "", cursor: quantity === 5 ? "no-drop" : "pointer", color: quantity === 5 ? "#fff" : "" }}
                                                        > + </button>
                                                    </div>
                                                    <div className="total-wraper">
                                                        <span>Total Price:</span>
                                                        <span>LKR {subtotal}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="last-col">
                                                <Button variant="secondary" size="sm" onClick={() => deleteCartItem(itemId)}>
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
                                <div className='price-details-wrapper'>
                                    <h6 className='price-heading'>Price Details</h6>
                                    <div className="price-details">
                                        <div>Total :</div>
                                        <div>LKR {FinalSubtotal?.toFixed(2)} </div>
                                    </div>
                                    <Link to={"/checkout"}>
                                        <button>
                                            PROCEED TO CHECKOUT
                                        </button>
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

export default Cart
