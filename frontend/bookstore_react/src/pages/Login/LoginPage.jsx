// import React, { useState } from 'react'
// import './LoginPage.css'
// import SignInImage from './images/login.jpg'
// import RegisterImage from './images/register.jpg'
// import { Button, Container, FloatingLabel, Form } from 'react-bootstrap';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const LoginPage = () => {
//     const navigate = useNavigate();

//     const [activeButton, setActiveButton] = useState('SignIn');

//     const [username, setUsername] = useState("");
//     const [password, setPassword] = useState("");
//     const [error, setError] = useState("");

//     const handleUsername = (event) => {
//         setUsername(event.target.value);
//     }

//     const handlePassword = (event) => {
//         setPassword(event.target.value);
//     }

//     const handleSubmit = async (event) => {
//         event.preventDefault();

//         const data = {
//             "username": username,
//             "password": password
//         }

//         try {
//             console.log(username);
//             console.log(password);

//             const response = await axios.post("http://localhost:8081/auth/login", data);
//             console.log("okk")
//             setError("");
//             setUsername("");
//             setPassword("");

//             sessionStorage.setItem('token', response.data.token);
//             sessionStorage.setItem('username', response.data.username);
//             sessionStorage.setItem('user_id', response.data.id);
//             axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;

//             navigate("/");

//         } catch (error) {
//             setError("Username or Password is wrong");
//         }
//     }

//     const handleButtonClick = (buttonName) => {
//         setActiveButton(buttonName);
//     };

//     return (
//         <div className='login-page'>
//             <div className='bg-image'>
//                 <div className='outer-wrapper'>
//                     <div className='main-wrapper'>
//                         <div className='left-side'>
//                             <img src={`${activeButton === 'Register' ? RegisterImage : SignInImage}`} alt="image" />
//                         </div>

//                         <div className='right-side'>
//                             <div className='button-wrapper'>
//                                 <div className={`register-btn ${activeButton === 'Register' ? 'active' : ''}`}>
//                                     <button
//                                         className={`inner-btn ${activeButton === 'Register' ? 'active-btn' : ''}`}
//                                         onClick={() => handleButtonClick('Register')}
//                                     >
//                                         Register
//                                     </button>
//                                 </div>
//                                 <div className={`login-btn ${activeButton === 'SignIn' ? 'active' : ''}`}>
//                                     <button
//                                         className={`inner-btn ${activeButton === 'SignIn' ? 'active-btn' : ''}`}
//                                         onClick={() => handleButtonClick('SignIn')}
//                                     >
//                                         Sign In
//                                     </button>
//                                 </div>
//                             </div>

//                             <div className='form-area'>
//                                 {activeButton === 'SignIn' ?
//                                     <div className='sign-in-form'>
//                                         <div className='text-center mb-4'>
//                                             <h4>Login Here ...</h4>
//                                         </div>

//                                         <Form onSubmit={handleSubmit}>
//                                             <FloatingLabel controlId='username' label="Enter Username" className='mb-3'>
//                                                 <Form.Control placeholder='Username' value={username} onChange={handleUsername} />
//                                             </FloatingLabel>

//                                             <FloatingLabel controlId="password" label="Enter Password" className='mb-3'>
//                                                 <Form.Control type="password" placeholder='Password' value={password} onChange={handlePassword} />
//                                             </FloatingLabel>

//                                             {error &&
//                                                 <div className="text-danger mb-3">
//                                                     {error}
//                                                 </div>
//                                             }

//                                             <Button variant="primary" type="submit">Login</Button>
//                                         </Form>
//                                     </div>
//                                     :
//                                     <div className='register-form'>
//                                         hi
//                                     </div>

//                                 }
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default LoginPage
