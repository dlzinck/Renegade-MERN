import React from 'react';
import { Link } from 'react-router-dom';

function NavBar() {
    return (
        <div>
            <nav className='navbar'>
                <ul>
                    <li><Link to="/">HOME</Link>
                    </li>
                    <li><Link to="/about ">ABOUT</Link>
                    </li>
                    <li><Link to="/contact">CONTACT US</Link>
                    </li>
                    <li><Link to="/shop">SHOP</Link>
                    </li>
                    <li><Link to="/shoppingcart">font Icon here</Link>
                    </li>
                    <li><Link to="/logout">LOGOUT</Link>
                    </li>
                    <li><Link to="/login">LOGIN</Link>
                    </li>

                </ul>
            </nav>
        </div>
    )
}

export default NavBar;