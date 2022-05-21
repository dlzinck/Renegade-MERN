import React, { useState } from 'react';
import { Link } from 'react-router-dom'; //module react router dom
import ShoppingCart from '../ShoppingCart/ShoppingCart';

function NavBar() {

    const [isCartOpen, setIsCartOpen] = useState(false) // put in a zero for the first one,

    const show = {
      display: 'block'
    };
  
    const hide = {
      display: 'none'
    };    
    

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
                    <li><button onClick={() => {
                        setIsCartOpen(!isCartOpen);
                        console.log("in onclick listener");
                        }}>font Icon here</button>
                    </li>
                    <li><Link to="/logout">LOGOUT</Link>
                    </li>
                    <li><Link to="/login">LOGIN</Link>
                    </li>

                </ul>
            </nav>
            {/* shopping cart toggle with css needed */}
        {/* <div
          className={isCartOpen ? 'mini-cart-open' : 'hidden-mini-cart'}
          aria-hidden={`${isCartOpen ? false : true}`}
        >
          <div className='mini-cart'>
            <ShoppingCart />
          </div>
          <div
            className={
              isCartOpen ? 'drawer-backdrop dark-overflow' : 'drawer-backdrop'
            }
            onClick={() => setIsCartOpen(!isCartOpen)}
          />
        </div> */}

      {/* no css version of view hidden on shopping cart*/ }
      {
        <div style={isCartOpen ? show : hide}>
          <ShoppingCart />
        </div>
      }   
        </div>
    )
}

export default NavBar;