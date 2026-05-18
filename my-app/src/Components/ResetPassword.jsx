import React, { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

function ResetPassword() {
  const [password, setPassword] = useState("");
  const { id } = useParams(); // Gets the ID from the URL link
  const navigate = useNavigate();

  const handleSearch = () => {
    // Add your search logic here
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:5555/user/reset-password/${id}`, { password });
      
      if (response.data.success) {
        toast.success("Password updated! You can now login.");
        navigate("/login");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Failed to reset password. Try again.");
    }
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
            <img src="https://cdn-icons-png.flaticon.com/128/3033/3033143.png" alt="Account" />
          </Link>
          <Link to="/cart">
            <img src="https://cdn-icons-png.flaticon.com/128/10485/10485973.png" alt="Cart" title="Cart" />
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

      {/* Background Wrapper */}
      <div className="main-auth-background">
        <div className="container mt-5">
          <div className="card shadow mx-auto login-card">
            <div className="card-header text-center border-0 bg-transparent">
              <h2 className="mb-0">Reset Password</h2>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">New Password</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Enter new password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength="6"
                  />
                </div>
                <button type="submit" className="btn btn-danger w-100">
                  Update Password
                </button>
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

export default ResetPassword;