//importing CCS style 
import './App.css'
import './style.css'
// importing react 
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import '@stripe/stripe-js';


//importing components 
import Home from './endpoints/Home/Home';
import About from './components/About/About';
import Contact from './endpoints/Contact/Contact';
import Shop from './endpoints/Shop/Shop';
import NavBar from './components/NavBar/NavBar';
import Logout from './components/Logout/Logout';
// import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Footer from './components/Footer/Footer';
import Checkout from './components/Elements/Checkout';
import Success from './components/Elements/Success';
import Canceled from './components/Elements/Canceled';

function App() {
  return (
    <>
    {/* <div className="App"> */}
      
        <BrowserRouter>
          <NavBar />

          {/* Routes will nest here with their corresponding components */}
          
            <Routes>

              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/logout" element={<Logout />} />
              {/* <Route path="/login" element={<Login />} /> */}
              <Route path="/register" element={<Register />} />
              <Route path="/success" element={<Success />} />
              <Route path="/canceled" element={<Canceled />} />
              <Route path="/checkout" element={<Checkout />} />

            </Routes>
          
          <Footer />
        </BrowserRouter>
      
      {/* </div> */}
      </>
  );
};

export default App;