// importing react 
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

//importing CCS style 
// import './App.css'

//importing components 
import Home from './endpoints/Home/Home';
import About from './components/About/About';
import Contact from './endpoints/Contact/Contact';
import Shop from './endpoints/Shop/Shop';
import NavBar from './components/NavBar/NavBar';
import Logout from './components/Logout/Logout';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Footer from './components/Footer/Footer';


function App() {
  return (
    
    <div className="App">
      
        <BrowserRouter>
          <NavBar />

          {/* Routes will nest here with their corresponding components */}
          
            <Routes>

              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/logout" element={<Logout />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

            </Routes>
          
          <Footer />
        </BrowserRouter>

      </div>

  );
};

export default App;