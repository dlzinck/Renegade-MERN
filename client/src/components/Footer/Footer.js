// importing react
import React from 'react';

// importing link for footer linking 
import { Link } from 'react-router-dom';

// footer component
const Footer = () => {
    //needing to add links to respective components 
    return (
        <footer className = 'footer' >
            <div className='footer-title'>
                <h3><Link to="/">HOME</Link></h3>
            </div>
            <div className='footer-title'>
                <h3><Link to="/about ">ABOUT</Link></h3>
            </div>
            <div className='footer-title'>
                <h3><Link to="/contact">CONTACT US</Link></h3>
            </div>
            <div className='footer-title'>
                <h3><Link to="/shop">SHOP</Link></h3>
            </div>
                <div className='footer-copyright'>
                <span>RENEGADE ATTIRE, LLC | © {new Date().getFullYear()} </span>
                </div>
        </footer>        


    );
};

export default Footer; 