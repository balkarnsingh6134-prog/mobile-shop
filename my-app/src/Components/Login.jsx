import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useCart } from "./CartContext";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  // 1. Destructure cartItems from useCart hook
  const { processDeferredProduct, setCartItems, cartItems } = useCart();
  
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  // 2. Calculate the total quantity for the badge
  const cartCount = cartItems.reduce((acc, item) => acc + (parseInt(item.quantity) || 0), 0);

  // Handle incoming messages from navigation states (e.g., "Please login first")
  useEffect(() => {
    if (location.state && location.state.message) {
      toast.info(location.state.message, {
        toastId: "auth-redirect-message"
      });
      
      navigate(location.pathname, { 
        replace: true, 
        state: {} 
      });
    }
  }, [location, navigate]);

  const handleSearch = () => {
    const query = document.getElementById('searchBox')?.value;
    console.log("Searching for:", query);
  };

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // POST request to the backend login route
      const response = await axios.post("http://localhost:5555/user/login", data);
      const res = response.data;

      if (res.success === false) {
        toast.error(res.message || "Invalid email or password", { toastId: "err-toast" });
      } else {
        toast.success(res.message || "Login Successful!", { toastId: "success-toast" });

        // --- STORE SESSION DATA ---
        if (res.token) {
          localStorage.setItem("token", res.token);
        } else if (res.body && res.body.token) {
          localStorage.setItem("token", res.body.token);
        }
        
        // --- ADMIN & USER ROLE LOGIC ---
        const userRole = res.role || (res.body && res.body.role) || "user"; 
        const userName = res.name || (res.body && res.body.name) || "User";
        
        localStorage.setItem("userRole", userRole);
        localStorage.setItem("userName", userName);

        // Process any items added to cart while logged out
        await processDeferredProduct();

        // --- NAVIGATION LOGIC ---
        // This ensures when you click login, it opens the Shop file/route
        navigate('/shop', { replace: true });
      }
    } catch (error) {
      console.error("Login Error:", error);
      const backendMessage = error.response?.data?.message;
      toast.error(backendMessage || "Server error! Please try again later.", { toastId: "server-err" });
    }
  };

  const handleLogout = () => {
    // Clear all session-related data to ensure security
    localStorage.removeItem("token");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userName");
    localStorage.removeItem('cartItems');
    
    // Reset cart state in context
    setCartItems([]);
    
    toast.success("Logged out successfully!", { toastId: "logout-toast" });
    navigate('/signup', { replace: true });
  };

  return (
    <div>
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
          <Link to="/login">
            <img src="https://cdn-icons-png.flaticon.com/128/3033/3033143.png" alt="Account" title="Login / Account" />
          </Link>
          <Link to="/Cart" style={{ position: 'relative', display: 'inline-block' }}>
  <img 
    src="https://cdn-icons-png.flaticon.com/128/10485/10485973.png" 
    alt="Cart" 
    title="Cart" 
  />
  {/* I removed the "{cartCount > 0 &&" condition here so it shows 0 by default */}
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

      {/* LOGIN CONTENT */}
      <div className="main-auth-background" style={{ padding: "50px 0" }}>
        <div className="login-container">
          <div className="card login-card shadow mx-auto" style={{ maxWidth: "450px" }}>
            <div className="card-header text-center border-0 bg-transparent">
              <h2 className="mb-0">Login</h2>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={data.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    className="form-control"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Password</label>
                  <input
                    type="password"
                    name="password"
                    value={data.password}
                    onChange={handleChange}
                    placeholder="Enter password"
                    className="form-control"
                    required
                  />
                </div>

                <div className="form-check d-flex justify-content-between mt-3">
                  <div>
                    <input type="checkbox" className="form-check-input" id="remember" />
                    <label className="form-check-label" htmlFor="remember">Remember me</label>
                  </div> <br />
                  <Link to="/ForgotPassword" style={{ color: "#ff4b2b" }} className="text-decoration-none small">
                    Forgot password?
                  </Link>
                </div><br />

                <div className="mt-4">
                  <button type="submit" className="btn btn-danger w-100 mb-2">
                    Login
                  </button>
                  <button 
                    type="button" 
                    className="btn btn-outline-secondary w-100 mb-2"
                    onClick={() => navigate("/Signup")}
                  >
                    Create New Account
                  </button>
                  <button 
                    type="button" 
                    className="btn btn-danger w-100 mb-2"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER SECTION */}
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
            <p>Subscribe to our newsletter for special discounts.</p>
            <p>
              <input type="email" placeholder="Your email address" style={{ width: "100%", boxSizing: "border-box", padding: "8px" }} />
            </p>
            <label style={{ display: 'block', marginTop: '10px' }}>
              <input type="checkbox" /> I agree to the terms and privacy policy
            </label>
            <button className="subscribe-btn" style={{ padding: "10px 20px", background: "#06c4dd", border: "none", color: "white", borderRadius: "5px", cursor: "pointer" }}>Subscribe</button>
          </div>
        </div>
        <div className="footer-bottom" style={{ textAlign: "center", padding: "20px 0", borderTop: "1px solid #eee" }}>
          <p>Copyright © Mobishop. All Rights Reserved.</p>
        </div>
      </div>
    </div>
  );
}

export default Login;