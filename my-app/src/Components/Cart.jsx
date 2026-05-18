import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from './CartContext';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Cart() {
  const { cartItems, removeItem, updateQuantity, loading } = useCart();
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();

  // Calculate the total price whenever cart items change
  useEffect(() => {
    const total = cartItems.reduce((acc, item) => {
      const price = parseFloat(item.price) || 0;
      const quantity = parseInt(item.quantity) || 0;
      return acc + (price * quantity);
    }, 0);
    setTotalPrice(total);
  }, [cartItems]);

  // Calculate total number of items in cart for the badge
  const cartCount = cartItems.reduce((acc, item) => acc + (parseInt(item.quantity) || 0), 0);

  // Handle Remove Item from Cart
  const handleRemove = (id) => {
    removeItem(id);
    toast.success("Item removed from cart", {
      toastId: `remove-${id}`,
      position: "top-right",
      autoClose: 2000,
      theme: "colored",
    });
  };

  // Handle Checkout Navigation (Opens Checkout.jsx)
  const handleCheckout = () => {
    const token = localStorage.getItem("token");
    
    if (!token) {
      toast.error("Please login to complete your checkout!", { 
        toastId: "checkout-login-err",
        position: "top-right" 
      });
      navigate("/Login");
    } else {
      if (cartItems.length === 0) {
        toast.warn("Your cart is empty!", { toastId: "empty-cart" });
        return;
      }
      // Redirects to your Checkout component
      navigate("/Checkout");
    }
  };

  const handleSearch = () => {
    const query = document.getElementById('Box')?.value;
    console.log("Searching for:", query);
  };

  return (
    <div>
      <ToastContainer />
      
      {/* Navigation Header */}
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
          <Link to="/Login">
            <img src="https://cdn-icons-png.flaticon.com/128/3033/3033143.png" alt="Account" />
          </Link>
          
          <Link to="/Cart" style={{ position: 'relative', display: 'inline-block' }}>
            <img 
              src="https://cdn-icons-png.flaticon.com/128/10485/10485973.png" 
              alt="Cart" 
              title="Cart" 
            />
            {/* Logic modified: Removed "cartCount > 0" so it shows 0 by default */}
            <span className="cart-badge">
              {cartCount}
            </span>
          </Link>
        </div>
      </div>

      <div className="navbar2">
        <ul id="nav2">
          <li><Link to="/Home">Home</Link></li>
          <li><Link to="/latest">Latest Products</Link></li>
          <li><Link to="/shop">Shop</Link></li>
          <li><Link to="/About">About</Link></li>
          <li><Link to="/Contact">Contact Us</Link></li>
        </ul>
      </div>

      <h1 className="special" style={{ textAlign: 'center', margin: '20px 0' }}>Your Shopping Cart</h1>

      <div className="cart-container" style={{ maxWidth: '1200px', margin: '30px auto', padding: '0 15px' }}>
        {cartItems.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '50px 0' }}>
            <h3>Your Cart is Empty</h3>
            <Link to="/shop" className="btn btn-danger" style={{ marginTop: '15px', display: 'inline-block', padding: '10px 20px', textDecoration: 'none', color: '#fff', backgroundColor: '#dc3545', borderRadius: '5px' }}>
              Go to Shop
            </Link>
          </div>
        ) : (
          <div>
            <div className="cart-items" style={{ marginBottom: '30px' }}>
              {cartItems.map((item) => (
                <div key={item.id || item._id} className="cart-item" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #ddd', padding: '15px 0' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flex: 1 }}>
                    <img 
                      src={item.image || "https://cdn.mos.cms.futurecdn.net/N8HvTtX5JAwd6C5Y2WLZZC.jpg"} 
                      alt={item.name} 
                      style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '4px' }} 
                    />
                    <div>
                      <h4 style={{ margin: '0 0 5px 0' }}>{item.name}</h4>
                      <p style={{ margin: 0, color: '#666' }}>Category: {item.category}</p>
                      <p style={{ margin: '5px 0 0 0', fontWeight: 'bold' }}>${(parseFloat(item.price) || 0).toFixed(2)}</p>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                      <button 
                        onClick={() => updateQuantity(item.id || item._id, item.quantity - 1)} 
                        disabled={loading || item.quantity <= 1}
                      >-</button>
                      <span style={{ padding: '0 10px' }}>{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id || item._id, item.quantity + 1)} 
                        disabled={loading}
                      >+</button>
                    </div>
                    <button 
                      onClick={() => handleRemove(item.id || item._id)} 
                      style={{ padding: '8px 12px', backgroundColor: '#ff4d4f', color: '#fff', border: 'none', cursor: 'pointer', borderRadius: '4px' }}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Cart Summary Section */}
            <div className="cart-summary" style={{ borderTop: '2px solid #06c4dd', paddingTop: '20px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
              <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
                <h3 style={{ margin: 0 }}>Total Amount: ${totalPrice.toFixed(2)}</h3>
              </div>
              <button 
                onClick={handleCheckout} 
                style={{ 
                  padding: '12px 25px', 
                  backgroundColor: '#06c4dd', 
                  color: '#fff', 
                  border: 'none', 
                  cursor: 'pointer', 
                  borderRadius: '4px', 
                  marginTop: '15px', 
                  fontWeight: 'bold', 
                  fontSize: '16px' 
                }}
                disabled={loading}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </div>

      {/* FOOTER SECTION */}
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
            <input type="email" placeholder="Your email address" style={{ width: "100%", padding: "8px", marginBottom: "10px" }} />
            <button className="subscribe-btn" style={{ padding: "8px 15px", backgroundColor: "#06c4dd", color: "white", border: "none", cursor: "pointer" }}>Subscribe</button>
          </div>
        </div>

        <div className="footer-bottom" style={{ textAlign: 'center', padding: '20px 0', borderTop: '1px solid #444' }}>
          <p>Copyright © Mobishop. All Rights Reserved.</p>
        </div>
      </div>
    </div>
  );
}

export default Cart;