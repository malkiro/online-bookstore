import React, { useEffect, useState } from "react";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import HeaderLogo from '../../assets/v-logo.png';
import { Link } from 'react-router-dom';
import './Header.css';
import { IoHeartOutline, IoCartOutline } from 'react-icons/io5';
import { getRequest } from "../../services/ApiService";
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useNavigate } from 'react-router-dom';

export default function Header() {
  const navigate = useNavigate();

  const currentDate = new Date();
  const day = currentDate.toLocaleDateString('defualt', { weekday: 'long' });
  const month = currentDate.toLocaleDateString('defualt', { month: 'long' });
  const date = `${day}, ${month} ${currentDate.getDate()}, ${currentDate.getFullYear()}`;

  const userId = sessionStorage.getItem('user_id');
  const [wishlist, setWishlist] = useState('');
  const [cart, setCart] = useState('');
  const [wishListCount, setWishListCount] = useState(0);
  const [cartItemCount, setCartItemCount] = useState(0);

  useEffect(() => {
    const getWishListItems = async () => {
      const response = await getRequest(`/wishlist/${userId}`);
      setWishlist(response.data);
      setWishListCount(response.data.length);

    }

    const getCartItems = async () => {
      const response = await getRequest(`/cart/${userId}`);
      setCart(response.data);
      setCartItemCount(response.data.length);
    }

    getWishListItems();
    getCartItems();

    setWishListCount(wishlist.length);
    setCartItemCount(cart.length)
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('user_id');
    navigate("/login");
  };



  return (
    <div>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container fluid>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <div className='icons mobile'>
              <Link to={'/wishlist'} className='cart-icon'>
                <IoHeartOutline size="40px" />
                <div className='counter'> {wishListCount} </div>
              </Link>
              <Link to={'/cart'} className='cart-icon'>
                <IoCartOutline size="40px" />
                <div className='counter'> {cartItemCount} </div>
              </Link>
            </div>
          <Navbar.Collapse id="navbarScroll">
            <Navbar.Brand>
              <Link to="/">
                <img src={HeaderLogo}
                  alt="Header_Logo"
                  width={'250px'}
                  style={{ marginRight: '5px' }} />
              </Link>
            </Navbar.Brand>

            <div className="headerRightWrapper">
              <div className='date'>
                <span className='text-uppercase fs-13 fw-4'>{date}</span>
              </div>
            </div>

            <Nav className="me-auto">
              <Nav.Link href="/books">Books</Nav.Link>
              <Nav.Link href="/all-categories">Categories</Nav.Link>
              <NavDropdown title="My Acount" id="basic-nav-dropdown">
                <NavDropdown.Item href="/profile">View Profile</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleLogout}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>

              <div className='icons desktop'>
              <Link to={'/wishlist'} className='cart-icon'>
                <IoHeartOutline size="40px" />
                <div className='counter'> {wishListCount} </div>
              </Link>
              <Link to={'/cart'} className='cart-icon'>
                <IoCartOutline size="40px" />
                <div className='counter'> {cartItemCount} </div>
              </Link>
            </div>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  )
}
