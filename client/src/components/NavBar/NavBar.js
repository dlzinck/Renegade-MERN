import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; //module react router dom
import ShoppingCart from '../ShoppingCart/ShoppingCart';
import Login from '../Login/Login';

function NavBar(props) {
  useEffect(() => {
    // checks if we have data
    // populates the underlyingArray only if it's empy
    const isLoggedIn = localStorage.getItem("isLoggedIn")
    if (isLoggedIn) {
      setDidLogin(true)
    }
  }, [props])

    const [isCartOpen, setIsCartOpen] = useState(false) // put in a zero for the first one,
    const [isLoginOpen, setIsLoginOpen] = useState(false) // put in a zero for the first one,
    const [didLogin, setDidLogin] = useState(false)
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
                        }}>
                          font Icon here
                        </button>
                    </li>
                    <li>
                    {!didLogin ? (
                      <button
                        onClick={() => {
                          setIsLoginOpen(!isLoginOpen)
                          console.log("in onclick listener")
                        }}
                      >
                        Login
                      </button>
                    ) : null}
                    {didLogin ? (
                      <button
                        onClick={() => {
                          setDidLogin(false)
                          localStorage.setItem("isLoggedIn", false)
                        }}
                      >
                        Logout
                      </button>
                    ) : null}
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
       {
        <div style={isLoginOpen ? show : hide}>
          <Login
            sendDataToParent={(event) => {
              console.log("from event")
              console.log(event)
              setDidLogin(event)
            }}
            />
        </div>
         }
         </div>
    )
}

export default NavBar;