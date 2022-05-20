// importing react 
import React from 'react';
import { BrowserRouter, Routes, Route, Switch } from "react-router-dom";

//importing components 
import Home from './app/components/Home/Home';
import About from './app/components/About/About';
import Contact from './app/components/Contact/Contact';
import Shop from './app/components/Shop/Shop';
import NavBar from './app/components/NavBar/NavBar';
import Logout from './app/components/Logout/Logout';
import Login from './app/components/Login/Login';
import Register from './app/components/Register/Register';
import Footer from './app/components/Footer/Footer';

// ** <> this means that there will be a bunch of elements before because in react you can't just 
//add elements the diomond on't appear in the dom and then you can just render the elements needed 
function App() {
  return (
    // <>
      <div className="App">
        <BrowserRouter>
          <NavBar />

          {/* Routes will nest here with their corresponding components */}
          <Switch>
            <Routes>

              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/logout" element={<Logout />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

            </Routes>
          </Switch>
          <Footer />
        </BrowserRouter>

      </div>

      );
};

      export default App;
