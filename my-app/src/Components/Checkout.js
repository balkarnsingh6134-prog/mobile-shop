import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from './CartContext';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import '../App.css'; 

function Checkout() {
  // Access cartItems and the setter function from context
  const { cartItems, setCartItems } = useCart();
  const navigate = useNavigate();
  
  // Calculate total number of items for the badge
  const cartCount = cartItems.reduce((acc, item) => acc + (parseInt(item.quantity) || 0), 0);

  // Local state for shipping information
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    address: '',
    city: '',
    zipCode: '',
    paymentMethod: 'Credit Card'
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSearch = () => {
    const query = document.getElementById('searchBox')?.value;
    console.log("Searching for:", query);
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    if (cartItems.length === 0) {
      toast.error("Your cart is empty!", { position: "top-right" });
      return;
    }

    const totalAmount = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0).toFixed(2);

    // Structure data for backend
    const orderData = {
      fullName: formData.fullName,
      email: formData.email,
      address: formData.address,
      city: formData.city,
      zipCode: formData.zipCode,
      paymentMethod: formData.paymentMethod,
      items: cartItems.map(item => ({
        name: item.name,
        quantity: item.quantity,
        price: item.price
      })),
      totalAmount: totalAmount
    };

    const toastId = toast.loading("Processing your order...", { position: "top-right" });

    try {
      // Sending request to live Render backend
      const response = await axios.post("https://mobile-shop-88re.onrender.com/order/place", orderData);

      // Checking for all typical success states safely
      if (response.status === 200 || response.status === 201 || response.data?.success) {
        
        // Update the loading toast to a success message
        toast.update(toastId, { 
          render: "Order Placed Successfully! Confirmation mail sent.", 
          type: "success", 
          isLoading: false, 
          autoClose: 3000 
        });

        // --- CLEAR CART SESSIONS ---
        setCartItems([]); // Clears global react state
        localStorage.removeItem('cartItems'); // Clears cached local storage
        
        // Smoothly redirect to Home page after a short 3-second display duration
        setTimeout(() => {
          navigate('/Home');
        }, 3000);
      } else {
        // Fallback handler if status code is unexpected
        toast.update(toastId, {
          render: "Something went wrong. Please try again.",
          type: "error",
          isLoading: false,
          autoClose: 4000
        });
      }
    } catch (error) {
      console.error("Order Error:", error);
      // Update loading toast to display the failure details cleanly
      toast.update(toastId, {
        render: error.response?.data?.message || "Failed to place order. Please check your connection.",
        type: "error",
        isLoading: false,
        autoClose: 4000
      });
    }
  };

  return (
    <div className="checkout-wrapper-19">
      <ToastContainer />
      
      {/* NAVBAR 1 */}
      <div className="navbar1">
        <div className="logo">
          <img src="https://cdn-icons-png.flaticon.com/128/644/644458.png" alt="Mobile Icon" />
          <span><span style={{ color: '#06c4dd' }}>Mobile</span> Shop</span>
        </div>
        <div className="search-box">
          <input type="text" id="searchBox" placeholder="Search product" />
          <button onClick={handleSearch}>Search</button>
        </div>
        <div className="icons">
          <Link to="/Login">
            <img src="https://cdn-icons-png.flaticon.com/128/3033/3033143.png" alt="Account" />
          </Link>
          <Link to="/Cart" style={{ position: 'relative', display: 'inline-block' }}>
            <img src="https://cdn-icons-png.flaticon.com/128/10485/10485973.png" alt="Cart" />
            <span className="cart-badge">
              {cartCount}
            </span>
          </Link>
        </div>
      </div>

      {/* NAVBAR 2 */}
      <div className="navbar2">
        <ul id="nav2">
          <li><Link to="/Home">Home</Link></li>
          <li><Link to="/latest">Latest Products</Link></li>
          <li><Link to="/shop">Shop</Link></li>
          <li><Link to="/About">About</Link></li>
          <li><Link to="/Contact">Contact Us</Link></li>
        </ul>
      </div>

      <div className="container-19" style={{ padding: "40px" }}>
        <h1 className="title-19" style={{ textAlign: "center", marginBottom: "30px" }}>Checkout</h1>
        <div className="checkout-grid-19" style={{ display: "flex", gap: "40px", maxWidth: "1200px", margin: "0 auto" }}>
          
          {/* Form Section */}
          <form className="form-section-19" onSubmit={handlePlaceOrder} style={{ flex: 2 }}>
            <h3 style={{ borderBottom: "2px solid #06c4dd", paddingBottom: "10px" }}>Shipping Details</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "15px", marginTop: "20px" }}>
              <input type="text" name="fullName" placeholder="Full Name" required onChange={handleChange} style={{ padding: "12px" }} />
              <input type="email" name="email" placeholder="Email Address" required onChange={handleChange} style={{ padding: "12px" }} />
              <input type="text" name="address" placeholder="Address" required onChange={handleChange} style={{ padding: "12px" }} />
              <input type="text" name="city" placeholder="City" required onChange={handleChange} style={{ padding: "12px" }} />
              <input type="text" name="zipCode" placeholder="Zip Code" required onChange={handleChange} style={{ padding: "12px" }} />
              
              <h3 style={{ marginTop: '20px' }}>Payment Method</h3>
              <select name="paymentMethod" onChange={handleChange} style={{ padding: "12px" }}>
                <option value="Credit Card">Credit Card</option>
                <option value="PayPal">G-pay</option>
                <option value="Cash on Delivery">Cash on Delivery</option>
              </select>

              <button type="submit" className="place-order-btn-19" style={{ padding: '15px', background: '#06c4dd', color: 'white', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>
                Place Order
              </button>
            </div>
          </form>

          {/* Summary Section */}
          <div className="summary-section-19" style={{ flex: 1, background: "#f8f9fa", padding: "20px", borderRadius: "8px" }}>
            <h3>Order Summary</h3>
            {cartItems.map(item => (
              <div key={item.id || item._id} style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px", borderBottom: "1px solid #ddd", paddingBottom: "5px" }}>
                <span>{item.name} x{item.quantity}</span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "1.2rem", marginTop: "20px", borderTop: "2px solid #06c4dd", paddingTop: "10px" }}>
              <strong>Total:</strong>
              <strong>${cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0).toFixed(2)}</strong>
            </div>
          </div>
        </div>
      </div>

      {/* FULL FOOTER SECTION */}
      <div className="box10">
        <div className="footer-container">
          <div className="footer-col">
            <h3>Contact Us</h3>
            <p><strong>Mobishop Demo</strong></p>
            <p>99 New Theme St. XY, USA 12345,<br />Beside the Sun point land.</p>
            <p>United States</p>
            <p>Call us: +00 123-456-789</p>
            <p>Email: admin@example.com</p>
          </div>
          <div className="footer-col">
            <h3>Our Company</h3>
            <p>Delivery</p>
            <p>Legal Notice</p>
            <p>Terms and Conditions</p>
            <p>Secure payment</p>
            <p>Contact Us</p>
            <p>About Us</p>
          </div>
          <div className="footer-col">
            <h3>Products</h3>
            <p>Prices drop</p>
            <p>New products</p>
            <p>Best sellers</p>
            <p>Sitemap</p>
            <p>Stores</p>
            <p>Accessories</p>
          </div>
          <div className="footer-col">
            <h3>Your Account</h3>
            <p>Sign in</p>
            <p>Order Tracking</p>
            <p>Create account</p>
            <p>Credit Slip</p>
            <p>Vouchers</p>
            <p>Wishlist</p>
          </div>
          <div className="footer-col">
            <h3>Our Newsletter</h3>
            <p>Subscribe to our latest newsletter to get news about special discounts.</p>
            <input type="email" placeholder="Your email address" style={{ width: "100%", padding: "8px", boxSizing: "border-box" }} />
            <button className="subscribe-btn" style={{ marginTop: "10px" }}>Subscribe</button>
          </div>
        </div>
        <div className="footer-bottom">
          <p>Copyright © Mobishop. All Rights Reserved.</p>
        </div>
      </div>
    </div>
  );
}

export default Checkout;