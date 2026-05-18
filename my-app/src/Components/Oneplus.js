import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useCart } from './CartContext';
import { toast } from 'react-toastify';

const Oneplus = () => {
  // Added: Destructure cartItems from useCart hook
  const { addToCart, setDeferredProduct, loading, error: contextError, cartItems } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

  // Added: Calculate total number of items for the badge
  const cartCount = cartItems?.reduce((acc, item) => acc + (parseInt(item.quantity) || 0), 0) || 0;

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, [location]);

  // Handle messages coming from navigation state (Green Success Toast)
  useEffect(() => {
    if (location.state && location.state.message) {
      toast.success(location.state.message, { 
        toastId: "oneplus-redirect-info",
        position: "top-right",
        theme: "colored"
      });
      // Clear navigation state
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location, navigate]);

  // Handle Context Errors via Toast
  useEffect(() => {
    if (contextError) {
      toast.error(contextError, { 
        toastId: "oneplus-context-err",
        position: "top-right",
        theme: "colored"
      });
    }
  }, [contextError]);

  const handleAddToCart = (product) => {
    const userToken = localStorage.getItem("token");

    if (!userToken) {
      setDeferredProduct(product);
      navigate('/login', { 
        state: { message: "Please login first to add items to your cart!" } 
      });
    } else {
      if (typeof addToCart === 'function') {
        addToCart(product);
        toast.success(`${product.name} added successfully!`, {
          position: "top-right",
          autoClose: 2000,
          theme: "colored",
          toastId: `add-success-${product.name}`
        });
      }
    }
  };

  const handleSearch = () => {
    const query = document.getElementById('searchBox')?.value;
    console.log("Searching for:", query);
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
          
          {/* UPDATED: Cart Link with Notification Badge */}
          <Link to="/cart" style={{ position: 'relative', display: 'inline-block' }}>
            <img src="https://cdn-icons-png.flaticon.com/128/10485/10485973.png" alt="Cart" title="Cart" />
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

      <h2 className="special">OnePlus Phones</h2>
      <div className="container15">
        {/* BOX 1 */}
        <div className="box15">
          <div className="img-wrapper">
            <img src="https://fdn2.gsmarena.com/vv/pics/oneplus/oneplus-11-1.jpg" alt="OnePlus 11" />
          </div>
          <div className="content15">
            <h3>OnePlus 11 5G Titan Black</h3>
            <div className="market-prices">
              <span>Amazon: <s className="high">$750</s></span>
              <span>Flipkart: <s className="high">$730</s></span>
            </div>
            <p><span className="new-price">$699</span></p>
            <button className="cart-btn15" onClick={() => handleAddToCart({ name: "OnePlus 11", price: 699, category: "Smartphone", image: "https://fdn2.gsmarena.com/vv/pics/oneplus/oneplus-11-1.jpg" })}>
              Add to Cart
            </button>
          </div>
        </div>

        {/* BOX 2 */}
        <div className="box15">
          <div className="img-wrapper">
            <img src="https://tse2.mm.bing.net/th/id/OIP.8KSt5jvlMnIWZsexnhYl_QHaHa?rs=1&pid=ImgDetMain&o=7&rm=3" alt="OnePlus Nord CE 3" />
          </div>
          <div className="content15">
            <h3>OnePlus Nord CE 3</h3>
            <div className="market-prices">
              <span>Amazon: <s className="high">$380</s></span>
              <span>Flipkart: <s className="high">$365</s></span>
            </div>
            <p><span className="new-price">$349</span></p>
            <button className="cart-btn15" onClick={() => handleAddToCart({ name: "OnePlus Nord CE 3", price: 349, category: "Smartphone", image: "https://tse2.mm.bing.net/th/id/OIP.8KSt5jvlMnIWZsexnhYl_QHaHa?rs=1&pid=ImgDetMain&o=7&rm=3" })}>
              Add to Cart
            </button>
          </div>
        </div>

        {/* BOX 3 */}
        <div className="box15">
          <div className="img-wrapper">
            <img src="https://oasis.opstatics.com/content/dam/oasis/page/2022/operation/may/karen/Karen-Green-540x540-L.png" alt="OnePlus Nord 2T" />
          </div>
          <div className="content15">
            <h3>OnePlus Nord 2T</h3>
            <div className="market-prices">
              <span>Amazon: <s className="high">$430</s></span>
              <span>Flipkart: <s className="high">$415</s></span>
            </div>
            <p><span className="new-price">$399</span></p>
            <button className="cart-btn15" onClick={() => handleAddToCart({ name: "OnePlus Nord 2T", price: 399, category: "Smartphone", image: "https://oasis.opstatics.com/content/dam/oasis/page/2022/operation/may/karen/Karen-Green-540x540-L.png" })}>
              Add to Cart
            </button>
          </div>
        </div>

        {/* BOX 4 */}
        <div className="box15">
          <div className="img-wrapper">
            <img src="https://tse4.mm.bing.net/th/id/OIP.2QfS0Edm5DfbWy69GxeIeAHaHa?rs=1&pid=ImgDetMain&o=7&rm=3" alt="OnePlus 10T" />
          </div>
          <div className="content15">
            <h3>OnePlus 10T</h3>
            <div className="market-prices">
              <span>Amazon: <s className="high">$650</s></span>
              <span>Flipkart: <s className="high">$630</s></span>
            </div>
            <p><span className="new-price">$599</span></p>
            <button className="cart-btn15" onClick={() => handleAddToCart({ name: "OnePlus 10T", price: 599, category: "Smartphone", image: "https://tse4.mm.bing.net/th/id/OIP.2QfS0Edm5DfbWy69GxeIeAHaHa?rs=1&pid=ImgDetMain&o=7&rm=3" })}>
              Add to Cart
            </button>
          </div>
        </div>

        {/* BOX 5 */}
        <div className="box15">
          <div className="img-wrapper">
            <img src="https://tse3.mm.bing.net/th/id/OIP.4tNgYyuTlQ3ojpLbQqEUfgHaIN?rs=1&pid=ImgDetMain&o=7&rm=3" alt="OnePlus 10 Pro" />
          </div>
          <div className="content15">
            <h3>OnePlus 10 Pro</h3>
            <div className="market-prices">
              <span>Amazon: <s className="high">$850</s></span>
              <span>Flipkart: <s className="high">$820</s></span>
            </div>
            <p><span className="new-price">$799</span></p>
            <button className="cart-btn15" onClick={() => handleAddToCart({ name: "OnePlus 10 Pro", price: 799, category: "Smartphone", image: "https://tse3.mm.bing.net/th/id/OIP.4tNgYyuTlQ3ojpLbQqEUfgHaIN?rs=1&pid=ImgDetMain&o=7&rm=3" })}>
              Add to Cart
            </button>
          </div>
        </div>

        {/* BOX 6 */}
        <div className="box15">
          <div className="img-wrapper">
            <img src="https://fdn2.gsmarena.com/vv/pics/oneplus/oneplus-9-pro-1.jpg" alt="OnePlus 9 Pro" />
          </div>
          <div className="content15">
            <h3>OnePlus 9 Pro</h3>
            <div className="market-prices">
              <span>Amazon: <s className="high">$740</s></span>
              <span>Flipkart: <s className="high">$720</s></span>
            </div>
            <p><span className="new-price">$699</span></p>
            <button className="cart-btn15" onClick={() => handleAddToCart({ name: "OnePlus 9 Pro", price: 699, category: "Smartphone", image: "https://fdn2.gsmarena.com/vv/pics/oneplus/oneplus-9-pro-1.jpg" })}>
              Add to Cart
            </button>
          </div>
        </div>

        {/* BOX 7 */}
        <div className="box15">
          <div className="img-wrapper">
            <img src="https://oasis.opstatics.com/content/dam/oasis/page/2021/9-series/spec-image/9/Arcticsky_9.png" alt="OnePlus 9" />
          </div>
          <div className="content15">
            <h3>OnePlus 9</h3>
            <div className="market-prices">
              <span>Amazon: <s className="high">$640</s></span>
              <span>Flipkart: <s className="high">$620</s></span>
            </div>
            <p><span className="new-price">$599</span></p>
            <button className="cart-btn15" onClick={() => handleAddToCart({ name: "OnePlus 9", price: 599, category: "Smartphone", image: "https://oasis.opstatics.com/content/dam/oasis/page/2021/9-series/spec-image/9/Arcticsky_9.png" })}>
              Add to Cart
            </button>
          </div>
        </div>

        {/* BOX 8 */}
        <div className="box15">
          <div className="img-wrapper">
            <img src="https://oasis.opstatics.com/content/dam/oasis/default/product-specs/8t-green.png" alt="OnePlus 8T" />
          </div>
          <div className="content15">
            <h3>OnePlus 8T</h3>
            <div className="market-prices">
              <span>Amazon: <s className="high">$550</s></span>
              <span>Flipkart: <s className="high">$530</s></span>
            </div>
            <p><span className="new-price">$499</span></p>
            <button className="cart-btn15" onClick={() => handleAddToCart({ name: "OnePlus 8T", price: 499, category: "Smartphone", image: "https://oasis.opstatics.com/content/dam/oasis/default/product-specs/8t-green.png" })}>
              Add to Cart
            </button>
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
            <p>Delivery</p><p>Legal Notice</p><p>Terms and Conditions</p>
            <p>Secure payment</p><p>Contact Us</p><p>About Us</p>
          </div>
          <div className="footer-col">
            <h3>Products</h3>
            <p>Prices drop</p><p>New products</p><p>Best sellers</p>
            <p>Sitemap</p><p>Stores</p><p>Accessories</p>
          </div>
          <div className="footer-col">
            <h3>Your Account</h3>
            <p>Sign in</p><p>Order Tracking</p><p>Create account</p>
            <p>Credit Slip</p><p>Vouchers</p><p>Wishlist</p>
          </div>
          <div className="footer-col">
            <h3>Our Newsletter</h3>
            <p>Subscribe to our latest newsletter for special discounts.</p>
            <input type="email" placeholder="Your email address" style={{ width: "100%", padding: "10px", boxSizing: "border-box" }} />
            <button className="subscribe-btn" style={{ marginTop: "10px" }}>Subscribe</button>
          </div>
        </div>
        <div className="footer-bottom">
          <p>Copyright © Mobishop. All Rights Reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default Oneplus;