import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useCart } from "./CartContext"; // Access global cart state

function Signup() {
  const navigate = useNavigate();
  const { cartItems } = useCart();

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    role: "user", // Default role
  });

  // Calculate total number of items for the badge
  const cartCount = cartItems.reduce((acc, item) => acc + (parseInt(item.quantity) || 0), 0);

  // Search button functionality
  const handleSearch = () => {
    const query = document.getElementById('searchBox')?.value;
    console.log("Searching for:", query);
  };

  // Handle input changes dynamically
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      /* FIX: Restored your original backend URL path (/user/Login) 
        to resolve the 404 error seen in your console.
      */
      const res = await axios.post("https://mobile-shop-88re.onrender.com/user/Login", data);

      if (res.status === 200 || res.status === 201) {
        toast.success(res.data.message || "Signup Successful!");
        
        // Store user info to localStorage
        localStorage.setItem("userName", data.name);
        localStorage.setItem("userEmail", data.email);
        localStorage.setItem("userRole", data.role);

        /* ROLE-BASED REDIRECTION:
          If admin is selected, break out to your admin app's login URL.
          Otherwise, use local SPA routing for normal users.
        */
        if (data.role === "admin") {
          window.location.href = "https://mobile-shop-1-30bp.onrender.com/Login";
        } else {
          navigate("/login");
        }
      } else {
        toast.error(res.data.message || "Signup failed");
      }
    } catch (error) {
      console.error(error);
      const errorMsg = error.response?.data?.message || "Something went wrong!";
      toast.error(errorMsg);
    }
  };

  return (
    <div>
      {/* NAVBAR 1 - Original Class Names */}
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
            <img src="https://cdn-icons-png.flaticon.com/128/3033/3033143.png" alt="Account" />
          </Link>
          <Link to="/Cart" style={{ position: 'relative', display: 'inline-block' }}>
            <img 
              src="https://cdn-icons-png.flaticon.com/128/10485/10485973.png" 
              alt="Cart" 
              title="Cart" 
            />
            <span className="cart-badge">
              {cartCount}
            </span>
          </Link>
        </div>
      </div>

      {/* NAVBAR 2 - Original Class Names */}
      <div className="navbar2">
        <ul id="nav2">
          <li><Link to="/Home">Home</Link></li>
          <li><Link to="/latest">Latest Products</Link></li>
          <li><Link to="/shop">Shop</Link></li>
          <li><Link to="/About">About</Link></li>
          <li><Link to="/Contact">Contact Us</Link></li>
        </ul>
      </div>

      {/* Main Authentication Background Container */}
      <div className="main-auth-background">
        <div className="container-22">
          <div className="row-22">
            <div className="card-22 shadow">
              <h2 className="text-center">Create an account</h2>
              <form className="mt-4" onSubmit={handleSubmit}>
                
                {/* Name Input */}
                <div className="mb-3">
                  <label className="label-22">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={data.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    className="form-control"
                    required
                  />
                </div>

                {/* Email Input */}
                <div className="mb-3">
                  <label className="label-22">Email</label>
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

                {/* Password Input */}
                <div className="mb-3">
                  <label className="label-22">Password</label>
                  <input
                    type="password"
                    name="password"
                    value={data.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    className="form-control"
                    required
                  />
                </div>

                {/* Phone Input */}
                <div className="mb-3">
                  <label className="label-22">Phone Number</label>
                  <input
                    type="text"
                    name="phone"
                    value={data.phone}
                    onChange={handleChange}
                    placeholder="Enter your phone number"
                    className="form-control"
                    required
                  />
                </div>

                {/* Role Selection Dropdown */}
                <div className="mb-3">
                  <label className="label-22">Register As</label>
                  <select 
                    name="role" 
                    className="form-select" 
                    value={data.role} 
                    onChange={handleChange}
                  >
                    <option value="user">User (Customer)</option>
                    <option value="admin">Admin (Manager)</option>
                  </select>
                </div>

                <button type="submit" className="signup-btn-22">
                  Signup
                </button>

                <p className="text-center mt-4">
                  Already have an account?{" "}
                  <span
                    style={{ cursor: "pointer", color: "#06c4dd", textDecoration: "underline" }}
                    onClick={() => {
                      if (data.role === "admin") {
                        window.location.href = "https://mobile-shop-1-30bp.onrender.com/login";
                      } else {
                        navigate("/login");
                      }
                    }}
                  >
                    Login
                  </span>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER SECTION - Original Class Names */}
      <div className="box10">
        <div className="footer-container">
          <div className="footer-col">
            <h3>Contact Us</h3>
            <p><strong>Mobishop Demo</strong></p>
            <p>Bathinda, Punjab, India</p>
            <p>Call us: +91 123-456-789</p>
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
            <p>
              <input type="email" placeholder="Your email address" style={{ width: "100%", boxSizing: "border-box" }} />
            </p>
            <label style={{ display: 'block', marginTop: '10px' }}>
              <input type="checkbox" /> I agree to the terms and the privacy policy
            </label>
            <button className="subscribe-btn">Subscribe</button>
          </div>
        </div>

        <div className="footer-bottom">
          <p>Copyright © Mobishop. All Rights Reserved.</p>
        </div>
      </div>
    </div>
  );
}

export default Signup;