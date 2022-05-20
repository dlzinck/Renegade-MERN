
import './App.css'
import './style.css';
import {BrowserRouter,  Routes,  Route} from "react-router-dom";
import Home from './app/components/Home/Home';
import About from './app/components/About/About';
import Contact from './app/components/Contact/Contact';
import Shop from './app/components/Shop/Shop';
import NavBar from './app/components/NavBar/NavBar';
import Logout from './app/components/Logout/Logout';
import Login from './app/components/Login/Login';
import Register from './app/components/Register/Register';
import ShoppingCart from './app/components/ShoppingCart/ShoppingCart';
import Footer from './app/components/Footer/Footer';
// ** <> this means that there will be a bunch of elements before because in react you can't just add elements the diomond on't appear in the dom and then you can just render the elements needed 
function App() {
  return (
    <> 
    <div className="App">     
       <h1>Renegade Attire Main</h1>
    </div>
    
    <BrowserRouter>
    <NavBar />
    <Routes>
      
      <Route path="/" element={ <Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/shop" element={<Shop />} />
      <Route path="/shoppingcart" element={<ShoppingCart />} />
      <Route path="/logout" element={<Logout/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/register" element={<Register/>} />
      
    </Routes>
    <Footer />
    </BrowserRouter>
    
    </>
  );
}

export default App;
