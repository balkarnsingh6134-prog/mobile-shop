import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useCart } from "./CartContext";

const Logout = () => {
  const navigate = useNavigate();
  const { setCartItems } = useCart();

  useEffect(() => {
    // Clear the token and cart items from localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("cartItems");
    
    // Clear context state
    setCartItems([]);
    
    toast.success("Logged out successfully!");
    
    // Redirect to the login page
    navigate('/login');
  }, [navigate, setCartItems]);

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2>Logging out...</h2>
    </div>
  );
};

export default Logout;