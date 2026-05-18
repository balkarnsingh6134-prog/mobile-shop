import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useCart } from './CartContext';
import { toast } from 'react-toastify';
import axios from 'axios';

const Latest = () => {
  // Added: Destructure cartItems from useCart hook
  const { addToCart, setDeferredProduct, loading, error: contextError, cartItems } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  const [dbProducts, setDbProducts] = useState([]); // Dynamic products from Admin

  // Added: Calculate total number of items for the badge
  const cartCount = cartItems?.reduce((acc, item) => acc + (parseInt(item.quantity) || 0), 0) || 0;

  // --- FETCH PRODUCTS ADDED FROM ADMIN ---
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("https://mobile-shop-88re.onrender.com/product/allproducts");
        // Handling both possible response structures
        const data = response.data.body || response.data;
        if (Array.isArray(data)) {
          setDbProducts(data);
        }
      } catch (err) {
        console.error("Error fetching dynamic products:", err);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, [location]);

  // Handle messages coming from navigation state
  useEffect(() => {
    if (location.state && location.state.message) {
      toast.success(location.state.message, { 
        toastId: "latest-redirect-info",
        position: "top-right",
        theme: "colored", 
        autoClose: 3000
      });
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location, navigate]);

  // Handle Context Errors
  useEffect(() => {
    if (contextError) {
      toast.error(contextError, { 
        toastId: "latest-context-err",
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
    const query = document.getElementById('Box')?.value || document.getElementById('searchBox')?.value;
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
          <input type="text" id="Box" placeholder="Search product" />
          <button onClick={handleSearch}>Search</button>
        </div>
        
        <div className="icons">
          <Link to="/login">
            <img src="https://cdn-icons-png.flaticon.com/128/3033/3033143.png" alt="Account" />
          </Link>
          {/* UPDATED: Cart Link with Notification Badge */}
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

      <h1 className="special">Latest Products</h1>

      <div className="container3">
        {/* --- 1. ORIGINAL HARDCODED CARDS --- */}
        <div className="card3">
          <img src="https://cdn.mos.cms.futurecdn.net/N8HvTtX5JAwd6C5Y2WLZZC.jpg" alt="Image 1" />
          <button 
            className="btn-cart-3" 
            onClick={() => handleAddToCart({ 
              name: "I Phone ", 
              price: 39.99,
              category: "Tablet",
              image: "https://cdn.mos.cms.futurecdn.net/N8HvTtX5JAwd6C5Y2WLZZC.jpg"
            })}
          >
            Add to Cart
          </button>
          <div className="content3">
            <h4>I Phone</h4>
            <p>Helpful Features Just In Case. Starting $39.99</p>
          </div>
        </div>

        <div className="card3">
          <img src="https://th.bing.com/th/id/OIP.KJwN8-AFMw-dkbl7WQy1NAHaEK?w=324&h=182&c=7&r=0&o=7&pid=1.7&rm=3" alt="Image 2" />
          <button 
            className="btn-cart-3" 
            onClick={() => handleAddToCart({ 
              name: "Samsung", 
              price: 45.69,
              category: "Smartphone",
              image: "https://th.bing.com/th/id/OIP.KJwN8-AFMw-dkbl7WQy1NAHaEK?w=324&h=182&c=7&r=0&o=7&pid=1.7&rm=3"
            })}
          >
            Add to Cart
          </button>
          <div className="content3">
            <h4>Samsung</h4>
            <p>Hyper Realistic Ultra Smooth. Starting $45.69</p>
          </div>
        </div>

        <div className="card3">
          <img src="https://tse3.mm.bing.net/th/id/OIP.Us2FS6-pFfNW6PwRMjKpPwHaFj?rs=1&pid=ImgDetMain&o=7&rm=3" alt="Image 3" />
          <button 
            className="btn-cart-3" 
            onClick={() => handleAddToCart({ 
              name: "Honor Magic6 ", 
              price: 99.99,
              category: "Smartphone",
              image: "https://tse3.mm.bing.net/th/id/OIP.Us2FS6-pFfNW6PwRMjKpPwHaFj?rs=1&pid=ImgDetMain&o=7&rm=3"
            })}
          >
            Add to Cart
          </button>
          <div className="content3">
            <h4>Honor Magic6 </h4>
            <p>Honor Magic6 Pro 5G. Starting $99.99</p>
          </div>
        </div>

        <div className="card3">
          <img src="https://i01.appmifile.com/webfile/globalimg/products/pc/mi-11-lite-5g/overview06_01.jpg" alt="Image 4" />
          <button 
            className="btn-cart-3" 
            onClick={() => handleAddToCart({ 
              name: "Redmi", 
              price: 59.99,
              category: "Smartphone",
              image: "https://i01.appmifile.com/webfile/globalimg/products/pc/mi-11-lite-5g/overview06_01.jpg"
            })}
          >
            Add to Cart
          </button>
          <div className="content3">
            <h4>Redmi</h4>
            <p>Smart Design Lightweight. Starting $59.99</p>
          </div>
        </div>

        {/* --- 2. DYNAMIC PRODUCTS (NOW MOVED AFTER ORIGINAL CARDS TO SHOW AT THE END) --- */}
        {dbProducts.map((product) => (
          <div className="card3" key={product._id}>
            <img src={product.image} alt={product.name} />
            <button 
              className="btn-cart-3" 
              onClick={() => handleAddToCart({
                name: product.name,
                price: product.price,
                category: product.category,
                image: product.image
              })}
              disabled={loading}
            >
              {loading ? "Adding..." : "Add to Cart"}
            </button>
            <div className="content3">
              <h4>{product.name}</h4>
              <p>{product.category}. Starting ₹{product.price}</p>
            </div>
          </div>
        ))}
      </div>

      {/* BANNER SECTION */}
      <div className="row">
        <div className="container4">
          <img src="https://m.media-amazon.com/images/I/61I7ejSq1GL._AC_SL1500_.jpg" alt="Image 1" />
          <div className="overlay-text">The Phone For Seamless Wireless Charging</div>
          <button 
            className="btn-cart-4" 
            onClick={() => handleAddToCart({ 
              name: "Wireless Charging Phone", 
              price: 199.99,
              category: "Smartphone",
              image: "https://m.media-amazon.com/images/I/61I7ejSq1GL._AC_SL1500_.jpg"
            })}
          >
            Add to Cart
          </button>
        </div>

        <div className="container4">
          <img src="https://tse2.mm.bing.net/th/id/OIP.ASzBrGvzXlFKdh_4UvItbgHaJX?rs=1&pid=ImgDetMain&o=7&rm=3" alt="Image 2" />
          <div className="overlay-text">Samsung Galaxy Z Flip6 5G AI Smartphone</div>
          <button 
            className="btn-cart-4" 
            onClick={() => handleAddToCart({ 
              name: "Samsung Galaxy Z Flip6", 
              price: 999.99,
              category: "Smartphone",
              image: "https://tse2.mm.bing.net/th/id/OIP.ASzBrGvzXlFKdh_4UvItbgHaJX?rs=1&pid=ImgDetMain&o=7&rm=3"
            })}
          >
            Add to Cart
          </button>
        </div>

        <div className="container4">
          <img src="https://5.imimg.com/data5/SELLER/Default/2023/6/314623304/FT/US/PS/92394638/mobatree-blp841-original-mobile-battery-for-realme-8-5000-mah-500x500.JPG" alt="Image 3" />
          <div className="overlay-text">Extend Your Playtime & Enjoy Reliability</div>
          <button 
            className="btn-cart-4" 
            onClick={() => handleAddToCart({ 
              name: "Realme 8 Battery", 
              price: 19.99,
              category: "Accessories",
              image: "https://5.imimg.com/data5/SELLER/Default/2023/6/314623304/FT/US/PS/92394638/mobatree-blp841-original-mobile-battery-for-realme-8-5000-mah-500x500.JPG"
            })}
          >
            Add to Cart
          </button>
        </div>

        <div className="container4">
          <img src="https://th.bing.com/th/id/OIP.WFqiV4aW5hDX16a1UQFAwAHaEO?w=305&h=180&c=7&r=0&o=7&pid=1.7&rm=3" alt="Image 4" />
          <div className="overlay-text">Phone Silent Vibration & Ringing Modes</div>
          <button 
            className="btn-cart-4" 
            onClick={() => handleAddToCart({ 
              name: "Mobile Vibration Feature", 
              price: 29.99,
              category: "Accessories",
              image: "https://th.bing.com/th/id/OIP.WFqiV4aW5hDX16a1UQFAwAHaEO?w=305&h=180&c=7&r=0&o=7&pid=1.7&rm=3"
            })}
          >
            Add to Cart
          </button>
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
              <input type="email" placeholder="Your email address" style={{ width: "100%", boxSizing: "border-box", padding: "8px" }} />
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
};

export default Latest;