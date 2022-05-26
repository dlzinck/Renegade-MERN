import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; //module react router dom
import ShoppingCart from '../ShoppingCart/ShoppingCart';
import Login from '../Login/Login';
import ReactDOM from 'react-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCreditCard } from '@fortawesome/free-solid-svg-icons'
const shoppingCartEl = <FontAwesomeIcon icon={faCreditCard} />

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
    // const [closeToggle, setcloseToggle] = useState(true)
  //  for the show and hide on login w/o css
    // const show = {
    //   display: 'block'
    // };
  
    // const hide = {
    //   display: 'none'
    // };    
    
//trying to implement the logo as a link
    return (
        <div>
            <nav className='navbar'>
              <div className='logoLink' style={{ display: "inline" }}>
              <Link to='/'>
                <img className='navBarLogo' src='/images/RA-Logo-White.png'></img>
              </Link>
              </div>
                <ul style={{ whiteSpace: "nowrap" }}>
                    <li><Link to="/">HOME</Link>
                    </li>
                    <li><a href='#about'>ABOUT</a>
                    </li>
                    <li><Link to="/contact">CONTACT US</Link>
                    </li>
                    <li><Link to="/shop">SHOP</Link>
                    </li>
                    <li><button onClick={() => {
                        setIsCartOpen(!isCartOpen);
                        console.log("in onclick listener");
                        }}>
                         <i class="far fa-credit-card"><FontAwesomeIcon icon={faCreditCard} /></i>
                        </button>
                    </li>
                    <li>
                      {/* for use with css  */}
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
        <div
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
        </div>

      {/* version of view hidden on shopping cart WITHOUT CSS*/ }
      {/* {
        <div style={isCartOpen ? show : hide}>
          <ShoppingCart />
        </div>
      }    */}
       {<div
          className={isLoginOpen ? 'login-open' : 'login-hidden'}
          aria-hidden={`${isLoginOpen ? false : true}`}
        >
        <div class="login-menu">
          
          <Login
            sendDataToParent={(event) => {
              console.log("from event")
              console.log(event)
              setDidLogin(event)
            }}
            />
        </div>
        </div>
         }
         </div>
    )
}

export default NavBar;