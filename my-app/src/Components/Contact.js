import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from './CartContext'; // 1. Added Cart Hook Import

const Contant = () => {
  // 2. Added logic to get cart items and calculate count
  const { cartItems } = useCart();
  const cartCount = cartItems.reduce((acc, item) => acc + (parseInt(item.quantity) || 0), 0);

  // Function to handle search
  const handleSearch = () => {
    const query = document.getElementById('searchBox').value;
    alert('Searching for: ' + query);
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for your message! We will get back to you soon.');
  };

  return (
    <div>
      {/* Document Metadata */}
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Mobile Shop - Contact Us</title>
      <link rel="stylesheet" href="mobile.css" />

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
          
          {/* 3. Added Badge to Cart Link */}
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

      {/* CONTACT SECTION */}
      <section className="contact11">
        <div className="container11">
          <h1 className="special">Contact Us</h1>
          <p className="desc11">
            We’d love to hear from you! Reach out to us using the form below or via our contact details.
          </p>
          
          <div className="info11">
            <div className="box11">
              <h2>Address</h2>
              <p>123 Main Street, City, Country</p>
            </div>
            <div className="box11">
              <h2>Email</h2>
              <p>support@example.com</p>
            </div>
            <div className="box11">
              <h2>Phone</h2>
              <p>+1 234 567 890</p>
            </div>
          </div>
        </div>
      </section>

      <section className="contact-section14">
        <div className="container14">
          <div className="contact-map14">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.241264871843!2d-73.98784368459377!3d40.75797477932688!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25855c6480293%3A0x51174706efee326!2sTimes%20Square!5e0!3m2!1sen!2sus!4v1625000000000!5m2!1sen!2sus" />
          </div>
          <div className="contact-form14">
            <form onSubmit={handleSubmit}>
              <label htmlFor="name14">Full Name</label>
              <input type="text" id="name14" name="name14" placeholder="Your full name" required />
              <label htmlFor="email14">Email Address</label>
              <input type="email" id="email14" name="email14" placeholder="Your email" required />
              <label htmlFor="subject14">Subject</label>
              <input type="text" id="subject14" name="subject14" placeholder="Subject" required />
              <label htmlFor="message14">Message</label>
              <textarea id="message14" name="message14" placeholder="Write your message..." required defaultValue={""} />
              <button type="submit">Send Message</button>
            </form>
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

export default Contant;