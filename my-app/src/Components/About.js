import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from './CartContext'; // Import the hook to access cart state

const About = () => {
  // Access cartItems from your global CartContext
  const { cartItems } = useCart();

  // Calculate the total quantity of items for the badge
 // Calculate total number of items in cart for the badge
const cartCount = cartItems.reduce((acc, item) => acc + (parseInt(item.quantity) || 0), 0);

  // Search function placeholder
  const handleSearch = () => {
    const query = document.getElementById('searchBox').value;
    console.log("Searching for:", query);
  };

  return (
    <div>
      {/* Head Tags (Usually managed in index.html or via react-helmet) */}
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Mobile Shop</title>
      <link rel="stylesheet" href="mobile.css" />

      {/* NAVBAR 1 */}
      <div className="navbar1">
        {/* LEFT: Logo */}
        <div className="logo">
          <img src="https://cdn-icons-png.flaticon.com/128/644/644458.png" alt="Mobile Icon" />
          <span><span style={{ color: '#06c4dd' }}>Mobile</span> Shop</span>
        </div>

        {/* SEARCH BOX */}
        <div className="search-box">
          <input type="text" id="searchBox" placeholder="Search product" />
          <button onClick={handleSearch}>Search</button>
        </div>

        {/* RIGHT: Icons */}
        <div className="icons">
          <Link to="/login">
            <img src="https://cdn-icons-png.flaticon.com/128/3033/3033143.png" alt="Account" />
          </Link>
          
          {/* CART LINK WITH NOTIFICATION BADGE */}
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

      {/* ABOUT SECTION */}
      <section className="about-section">
        <div className="container17">
          {/* Left side image - Enlarged */}
          <div className="about-image">
            <div className="image-wrapper">
              <img src="https://tse1.mm.bing.net/th/id/OIP.nhElXNBK4-RkWVuslTtPSQHaEK?rs=1&pid=ImgDetMain&o=7&rm=3" alt="Our Store" />
              <div className="image-experience-badge">
                <span>10+</span>
                <p>Years Experience</p>
              </div>
            </div>
          </div>

          {/* Right side content */}
          <div className="about-content">
            <h1>About Our Store</h1>
            <p className="highlight-text">
              Welcome to our store! We are committed to providing high-quality products 
              with a smooth and enjoyable shopping experience.
            </p>
            <p>
              Our website is designed to be fast, user-friendly, and fully responsive, 
              so you can browse easily on mobile, tablet, or desktop. We focus on 
              simplicity, modern design, and customer satisfaction to make your online 
              shopping better every day.
            </p>
            <p>
              Whether you're exploring new products or making a quick purchase, our 
              platform ensures secure transactions, easy navigation, and reliable service.
            </p>
            
            {/* Stats Section added for visual appeal */}
            <div className="about-stats">
              <div className="stat-item">
                <h4>50k+</h4>
                <p>Happy Clients</p>
              </div>
              <div className="stat-item">
                <h4>24/7</h4>
                <p>Support</p>
              </div>
            </div>
          </div>
        </div>
      </section>

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
            <input type="email" placeholder="Your email address" />
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
};

export default About;