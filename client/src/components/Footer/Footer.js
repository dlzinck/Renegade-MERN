// importing react
import React from 'react';

// importing link for footer linking 
import { Link } from 'react-router-dom';

// footer component
const Footer = () => {
    //needing to add links to respective components 
    return (
        <footer className = 'footer' >
            <div className='footer-logo'>
                <img src='/images/RA-Logo-White.png'></img>
            </div>
            <ul className='footer-title'>

                <li><Link to="/">HOME</Link></li>
            
            
                <li><a href='#about'>ABOUT</a></li>
            
            
                <li><Link to="/contact">CONTACT US</Link></li>
            
            
                <li><Link to="/shop">SHOP</Link></li>
            </ul>
                <div className='footer-copyright'>
                <span>RENEGADE ATTIRE, LLC | © {new Date().getFullYear()} </span>
                </div>
        </footer>        


    );
};

export default Footer; 