import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
    return (
        <div>
            <nav>
                <ul>
                    <li><Link to="/">HOME</Link>
                    </li>
                    <li><Link to="/about ">ABOUT</Link>
                    </li>
                    <li><Link to="/contact">CONTACT US</Link>
                    </li>
                    <li><Link to="/shop">SHOP</Link>
                    </li>             
                </ul>
            </nav>
        </div>
    )
}

export default Footer;