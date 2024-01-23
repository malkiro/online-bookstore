import React, { useState } from 'react'
import './LoginPage.css'
import UserIcon from './images/user.png'
import SignInImage from './images/login.jpg'
import RegisterImage from './images/register.jpg'
import { Button } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css'
import { Icon, Input } from 'semantic-ui-react'

const LoginPage = () => {
    const navigate = useNavigate();

    const [activeButton, setActiveButton] = useState('SignIn');

    const handleButtonClick = (buttonName) => {
        setActiveButton(buttonName);
    };

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");

    const [registerEnabled, setRegisterEnabled] = useState(false);


    // signin
    const handleUsernameSignIn = (event) => {
        setUsername(event.target.value);
    }

    const handlePasswordSignIn = (event) => {
        setPassword(event.target.value);
    }

    const handleSubmitSignIn = async (event) => {
        event.preventDefault();

        const data = {
            "username": username,
            "password": password
        }

        try {

            if (username.trim() === "" || password.trim() === "") {
                setError("username or password empty");
            } else {
                const response = await axios.post("http://localhost:8081/auth/login", data);
                setError("");
                setUsername("");
                setPassword("");

                sessionStorage.setItem('token', response.data.token);
                sessionStorage.setItem('username', response.data.username);
                sessionStorage.setItem('user_id', response.data.id);
                axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;

                navigate("/");
            }

        } catch (error) {
            setError("Username or Password is wrong");
        }
    }

    // register
    const handleUsernameRegister = (event) => {
        setUsername(event.target.value);

        if (username.length <= 3) {
            setRegisterEnabled(false);
        } else {
            setRegisterEnabled(true);
        }
    }

    const handlePasswordRegister = (event) => {
        setPassword(event.target.value);

        if (password.length <= 2) {
            setRegisterEnabled(false);
        } else {
            setRegisterEnabled(true);
        }
    }

    const handleEmailRegister = (event) => {
        setEmail(event.target.value);
        const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

        if (email !== "" && regex.test(email)) {
            setRegisterEnabled(true);
        } else {
            setRegisterEnabled(false);
        }
    }

    const handleRegisterRegister = async (event) => {
        event.preventDefault();

        const data = {
            'username': username,
            'password': password,
            'email': email,
        };

        try {
            const response = await axios.post('http://localhost:8081/auth/register', data);
            setActiveButton('SignIn');
            setError("");
        } catch (error) {
            setError(error.response.data.message);
        }


    }


    return (
        <div className='login-page'>
            <div className='bg-image'>
                <div className='outer-wrapper'>
                    <div className='main-wrapper'>
                        <div className='left-side'>
                            <img src={`${activeButton === 'Register' ? RegisterImage : SignInImage}`} alt="image" />
                        </div>

                        <div className='right-side'>
                            <div className='button-wrapper'>
                                <div className={`register-btn ${activeButton === 'Register' ? 'active' : ''}`}>
                                    <button
                                        className={`inner-btn ${activeButton === 'Register' ? 'active-btn' : ''}`}
                                        onClick={() => handleButtonClick('Register')}
                                    >
                                        Register
                                    </button>
                                </div>
                                <div className={`login-btn ${activeButton === 'SignIn' ? 'active' : ''}`}>
                                    <button
                                        className={`inner-btn ${activeButton === 'SignIn' ? 'active-btn' : ''}`}
                                        onClick={() => handleButtonClick('SignIn')}
                                    >
                                        Sign In
                                    </button>
                                </div>
                            </div>

                            <div className={`form-area ${activeButton === 'SignIn' ? 'transition-fade' : 'transition-slide'}`}>
                                {activeButton === 'SignIn' ?
                                    <div className='sign-in-form'>
                                        <div className='text-center mb-4'>
                                            <h5>Login Here...</h5>
                                            <img src={UserIcon} alt='icon' className='user-icon' />
                                        </div>

                                        <form onSubmit={handleSubmitSignIn}>
                                            <Input iconPosition='left' placeholder='Enter Username' value={username} onChange={handleUsernameSignIn}>
                                                <Icon name='user' />
                                                <input />
                                            </Input>
                                            <br />
                                            <br />
                                            <Input iconPosition='left' type='password' placeholder='Enter Password' value={password} onChange={handlePasswordSignIn}>
                                                <Icon name='key' />
                                                <input />
                                            </Input>
                                            <br />
                                            <br />
                                            {error &&
                                                <div className="text-danger mb-3">
                                                    {error}
                                                </div>
                                            }
                                            <div className='text-center'>
                                                <Button variant="primary" type="submit">Login</Button>
                                            </div>
                                        </form>
                                    </div>
                                    :
                                    <div className='register-form'>                                            <div className='text-center mb-4'>
                                        <h5>User Register</h5>
                                    </div>

                                        <form onSubmit={handleRegisterRegister}>
                                            <Input iconPosition='left' placeholder='Enter Username' value={username} onChange={handleUsernameRegister}>
                                                <Icon name='user' />
                                                <input />
                                            </Input>
                                            <br />
                                            <br />
                                            <Input iconPosition='left' placeholder='Enter Password' value={password} onChange={handlePasswordRegister}>
                                                <Icon name='key' />
                                                <input />
                                            </Input>
                                            <br />
                                            <br />
                                            <Input iconPosition='left' placeholder='Enter Email' value={email} onChange={handleEmailRegister}>
                                                <Icon name='at' />
                                                <input />
                                            </Input>
                                            <br />
                                            <br />
                                            {error &&
                                                <div className='text-danger mb-3'>
                                                    {error}
                                                </div>
                                            }
                                            <div className='text-center'>
                                                <Button type="submit" variant="primary" disabled={!registerEnabled}>Register</Button>
                                            </div>

                                        </form>
                                    </div>

                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginPage
