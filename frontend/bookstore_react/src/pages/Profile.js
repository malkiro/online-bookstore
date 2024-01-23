import { useEffect, useState } from "react";
import { Button, Col, Table, Form, Row } from "react-bootstrap"
import { getRequest, postRequestFile } from "../services/ApiService";
import './Profile.css'
import { Link } from "react-router-dom";
import { IoHeartOutline, IoCartOutline, IoLogOutOutline } from 'react-icons/io5';
import { CiUser } from 'react-icons/ci';
import { useNavigate } from 'react-router-dom';
import noImage from '../assets/no-image.jpeg'


const Profile = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [profileImage, setProfileImage] = useState(null);
    const [activeTab, setActiveTab] = useState("account");
    const [order, setOrder] = useState(null);
    const userId = sessionStorage.getItem('user_id');

    useEffect(() => {

        const fetchUser = async () => {
            const response = await getRequest(`/user/${userId}`);

            if (response && response.status === 200) {
                setUser(response.data);
            }
        }

        fetchUser();

    }, [])

    useEffect(() => {
        const getOrders = async () => {
            const response = await getRequest(`/orders/${userId}`);
            setOrder(response.data);
        }
        getOrders();
    }, []);

    const handleFileChange = (event) => {
        setProfileImage(event.target.files[0]);
    }

    const handleUpload = async (event) => {
        event.preventDefault();

        const data = {
            "profileImage": profileImage
        }

        const response = await postRequestFile(`/user/${userId}/profile`, data);

        if (response && response.status === 200) {
            setUser(response.data)
        }

    }

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    }

    const handleLogout = () => {
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('username');
        sessionStorage.removeItem('user_id');
        navigate("/login");
    };


    return (
        <div className="profile-page">
            {/* nav header */}
            <section className='top-nav-sec'>
                <h3>My Profile</h3>
                <div className='path'>
                    <Link to="/">
                        Home
                    </Link>
                    <span> {">"} </span>
                    <div>My Profile</div>
                </div>
            </section>

            <section className="section">
                <h3 className="title">My Account</h3>

                <div className="content-wrapper">
                    <div className="left-wrapper">
                        <div className={`tab ${activeTab === "account" ? "active" : ""}`} onClick={() => handleTabClick("account")}>
                            <CiUser size="25px" />
                            <span>My Account</span>
                        </div>
                        <div className={`tab ${activeTab === "orders" ? "active" : ""}`} onClick={() => handleTabClick("orders")}>
                            <IoCartOutline size="25px" />
                            <span>My Orders</span>
                        </div>
                        <Link to="/wishlist">
                            <div className="tab">
                                <IoHeartOutline size="25px" />
                                <span>Wishlist</span>
                            </div>
                        </Link>
                        <div className="tab" onClick={handleLogout}>
                            <IoLogOutOutline size="25px" />
                            <span>Logout</span>
                        </div>
                    </div>

                    <div className="right-wrapper">
                        <div className="border-box">
                            {activeTab === "account" && (
                                <div className="border-box">
                                    <h2>Personal Details</h2>
                                    {user &&
                                        <Row>
                                            <Col sm={6}>
                                                Username:
                                            </Col>
                                            <Col sm={6}>
                                                {user.username}
                                            </Col>
                                            <Col sm={6}>
                                                Email:
                                            </Col>
                                            <Col sm={6}>
                                                {user.email}
                                            </Col>
                                            <Col sm={6}>
                                                Profile Image:
                                            </Col>
                                            <Col sm={6}>
                                                {/* <img src={`http://localhost:8081/uploads/${user.profileImage}`} width={250} alt="No Image" /> */}
                                                {user.profileImage ? (
                                                    <img src={`http://localhost:8081/uploads/${user.profileImage}`} width={250} />
                                                ) : (
                                                    <img src={noImage} width={250} alt="Default Profile" />
                                                )}
                                                <Form onSubmit={handleUpload}>
                                                    <Form.Group controlId="formFile" className="mb-3">
                                                        <Form.Label>Upload Image</Form.Label>
                                                        <Form.Control type="file" onChange={handleFileChange} />
                                                    </Form.Group>
                                                    <Button type="submit" variant="primary">Change</Button>
                                                </Form>
                                            </Col>
                                        </Row>
                                    }
                                </div>
                            )}
                            {activeTab === "orders" && (
                                <div className="border-box">
                                    <h2>My Orders</h2>
                                    <Table responsive className="details-table">
                                        <thead>
                                            <tr>
                                                <th>Order ID</th>
                                                <th>Total Amout</th>
                                                <th>Order Time</th>
                                                <th>Order Notes</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {order && order.map((item, idx) => {
                                                const formattedDate = new Date(item.createdAt).toLocaleString();
                                                return (
                                                    <tr key={idx}>
                                                        <td>{item?.id}</td>
                                                        <td>{item?.total.toFixed(2)}</td>
                                                        <td>{formattedDate}</td>
                                                        <td>{item?.other}</td>
                                                    </tr>
                                                )
                                            })}
                                        </tbody>
                                    </Table>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Profile;