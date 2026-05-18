import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Toastify setup
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Styles
import './App.css';

// Components
import Home from './Components/Home';
import Latest from './Components/Latest';
import Shop from './Components/Shop';
import About from './Components/About';
import Contact from './Components/Contact';
import Cart from './Components/Cart';
import Oneplus from './Components/Oneplus';

// Auth Components
import Signup from './Components/Signup';
import Login from './Components/Login';
import ForgotPassword from './Components/ForgotPassword';
import ResetPassword from './Components/ResetPassword';

// Import Cart Provider
import { CartProvider } from './Components/CartContext';
import Checkout from './Components/Checkout';


function App() {
  return (
    <CartProvider>
      <Router>
        {/* ToastContainer is declared here once globally */}
        <ToastContainer 
          position="top-right" 
          autoClose={3000} 
          hideProgressBar={false}
          newestOnTop={true}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />

        <Routes>
          {/* --- Main Website Routes --- */}
          <Route path="/" element={<Home />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/latest" element={<Latest />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/About" element={<About />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/Cart" element={<Cart />} />
          <Route path="/Oneplus" element={<Oneplus />} />


          {/* --- Authentication Routes --- */}
          <Route path="/Signup" element={<Signup />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/ForgotPassword" element={<ForgotPassword />} />
          <Route path="/reset-password/:id" element={<ResetPassword />} />
          <Route path="/Checkout" element={<Checkout />} />
          
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;