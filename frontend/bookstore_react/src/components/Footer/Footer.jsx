import React from 'react'
import Logo from '../../assets/h-logo.png'
import './Footer.css'

const Footer = () => {
    return (
        <div className='footer'>
            <div className='section'>
                <div className='wrapper'>
                    <img src={Logo} alt='icon' />
                    <div className='right'>
                        <div> <a href='#'>Privacy policy</a> | <a href='#'>Terms and Condition</a> </div>
                        <p> ©{new Date().getFullYear()} - BookStore | All right reserved </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer
