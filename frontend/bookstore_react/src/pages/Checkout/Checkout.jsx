import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import './Checkout.css';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { getRequest, postRequest } from "../../services/ApiService";
import { ToastContainer, toast } from 'react-toastify';

const Checkout = () => {
    const [cartItems, setCartItems] = useState(null);
    const userId = sessionStorage.getItem('user_id');
    const userEmail = Array.from(new Set(cartItems?.map(item => item.user.email)));
    const imgURL = 'http://localhost:8081/loadcoverimage';

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [address, setAddress] = useState("");
    const [orderNotes, setOrderNotes] = useState("");

    let total = 0;

    useEffect(() => {
        const getCartItems = async () => {
            const response = await getRequest(`/cart/${userId}`);
            setCartItems(response.data);
        }
        getCartItems();
    }, [userId]);

    // Calculate the subtotal for the items in the cart
    if (cartItems) {
        cartItems.forEach((item) => {
            const quantity = item.quantity;
            const subtotal = (item?.book?.netPrice * quantity).toFixed(2);
            total += parseFloat(subtotal);
        });
    }

    // Shipping cost
    const shippingCost = 400.00;

    // Calculate the total by adding subtotal and shipping cost
    const totalPrice = (total + shippingCost).toFixed(2);

    // Handle input changes
    const handleFirstNameChange = (e) => {
        setFirstName(e.target.value);
    };

    const handleLastNameChange = (e) => {
        setLastName(e.target.value);
    };

    const handlePhoneNumberChange = (e) => {
        setPhoneNumber(e.target.value);
    };

    const handleAddressChange = (e) => {
        setAddress(e.target.value);
    };

    const handleOrderNotesChange = (e) => {
        setOrderNotes(e.target.value);
    };

    const handlePlaceOrderClick = async (event) => {
        event.preventDefault();

        const data = {
            'firstName': firstName,
            'lastName': lastName,
            'phone': phoneNumber,
            'address': address,
            'other': orderNotes,
            'total': totalPrice,
            'user': {
                'id': userId,
            },
            'cartItems': cartItems
        };

        try {
            const response = await postRequest("/orders", data)
            if (response.status === 201) {
                toast.success('Order placed successfully!', {
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
                toast.error('Failed to place the order. Please try again later.', {
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
            toast.error("Error placing the order:", error, {
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


    }

    return (
        <div className='checkout-page'>
            {/* nav header */}
            <ToastContainer />
            <section className='top-nav-sec'>
                <h3>Checkout</h3>
                <div className='path'>
                    <Link to="/">
                        Home
                    </Link>
                    <span> {">"} </span>
                    <div>Checkout</div>
                </div>
            </section>

            <section className='section'>
                <Link to="/cart">
                    <h4 className='backto-page'> {"<< "}  Back to Cart </h4>
                </Link>

                <form onSubmit={handlePlaceOrderClick}>
                    <div className='content'>
                        <div className='left'>
                            <h3 className='heading'>Billing Details</h3>
                            <div className="form-fields">
                                <div className='name-area'>
                                    <FloatingLabel
                                        controlId="floatingInput"
                                        label="First Name"
                                        className="mb-3"
                                    >
                                        <Form.Control type="text" placeholder="Enter your first name"
                                            value={firstName}
                                            onChange={handleFirstNameChange}
                                        />
                                    </FloatingLabel>

                                    <FloatingLabel
                                        controlId="floatingInput"
                                        label="Last Name"
                                        className="mb-3"
                                    >
                                        <Form.Control type="text" placeholder="Enter your last name"
                                            value={lastName}
                                            onChange={handleLastNameChange}
                                        />
                                    </FloatingLabel>
                                </div>

                                <div>
                                    <FloatingLabel
                                        controlId="floatingInput"
                                        label="Email address"
                                        className="mb-3"
                                    >
                                        <Form.Control type="email" placeholder="Enter your email address" defaultValue={userEmail} disabled />
                                    </FloatingLabel>

                                    <FloatingLabel
                                        controlId="floatingInput"
                                        label="Phone Number"
                                        className="mb-3"
                                    >
                                        <Form.Control type="text" placeholder="Enter your phone number"
                                            value={phoneNumber}
                                            onChange={handlePhoneNumberChange}
                                        />
                                    </FloatingLabel>
                                </div>

                                <div className="address-area">
                                    <FloatingLabel controlId="floatingTextarea1" label="Address">
                                        <Form.Control
                                            as="textarea"
                                            placeholder="Enter your address"
                                            style={{ height: '100px' }}
                                            value={address}
                                            onChange={handleAddressChange}

                                        />
                                    </FloatingLabel>
                                </div>

                                <div>
                                    <FloatingLabel controlId="floatingTextarea2" label="Order Notes (Optional)">
                                        <Form.Control
                                            as="textarea"
                                            placeholder="Order Notes (Optional)"
                                            style={{ height: '100px' }}

                                            value={orderNotes}
                                            onChange={handleOrderNotesChange}
                                        />
                                    </FloatingLabel>
                                </div>
                            </div>

                        </div>
                        <div className='right'>
                            <div className='price-details-wrapper'>
                                <h6 className='order-heading'>Order Summarys</h6>

                                {cartItems && cartItems.map((item, idx) => {
                                    const itemId = item.id;
                                    const quantity = item.quantity;
                                    const subtotal = (item?.book?.netPrice * quantity).toFixed(2);

                                    const urlCategory = item?.book?.subCategory?.category?.name?.replace(/\s+/g, '-');
                                    const urlSubCategory = item?.book?.subCategory?.name?.replace(/\s+/g, '-');
                                    const urlpath = `/books/${urlCategory}/${urlSubCategory}/${item?.book?.id}`

                                    return (
                                        <div className='order-card'>
                                            <div className='left'>
                                                <div className='col-1'>
                                                    <img src={`${imgURL}/${item?.book?.file_path}`} alt="image" />
                                                </div>
                                                <div className='details'>
                                                    <div className='title'> {item.book.title} </div>
                                                    <div className='qty'>x {item.quantity} </div>
                                                    <div className='old-price'>LKR {item.book.price.toFixed(2)}</div>
                                                    <div className='new-price'>LKR {item.book.netPrice.toFixed(2)}</div>
                                                </div>
                                            </div>

                                            <div className='right'>LKR {subtotal} </div>
                                        </div>
                                    )
                                })}



                                <table>
                                    <tr>
                                        <td className='left'> Subtotal</td>
                                        <td className='right'>
                                            {`LKR ${total.toFixed(2)}`}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className='left'>Shipping</td>
                                        <td className='right'>LKR 400.00</td>
                                    </tr>
                                    <tr>
                                        <td className='left'>Total</td>
                                        <td className='right'>
                                            LKR {totalPrice}
                                        </td>
                                    </tr>
                                </table>
                                <button>PROCEED TO PLACE ORDER</button>
                            </div>
                        </div>
                    </div>
                </form>

            </section>
        </div>
    )
}

export default Checkout
