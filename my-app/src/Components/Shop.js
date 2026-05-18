import React, { useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useCart } from './CartContext';
import { toast } from 'react-toastify';

const Shop = () => {
  // Added: Destructure cartItems from useCart hook
  const { addToCart, setDeferredProduct, loading, error: contextError, cartItems } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  // Added: Calculate total number of items for the badge
  const cartCount = cartItems?.reduce((acc, item) => acc + (parseInt(item.quantity) || 0), 0) || 0;

  // 1. Handle messages from navigation state (like redirects from Login)
  useEffect(() => {
    if (location.state && location.state.message) {
      toast.info(location.state.message, { 
        toastId: "shop-redirect-info",
        position: "top-right" 
      });
      // Clear navigation state so toast doesn't repeat on refresh
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location, navigate]);

  // 2. Handle Context Errors via Toast
  useEffect(() => {
    if (contextError) {
      toast.error(contextError, { 
        toastId: "shop-context-err",
        position: "top-right" 
      });
    }
  }, [contextError]);

  const handleAddToCart = (product) => {
    const userIsLoggedIn = localStorage.getItem("token");

    if (!userIsLoggedIn) {
      setDeferredProduct(product);
      // Redirect to login with a state message
      navigate('/login', { 
        state: { message: "Please login first to add items to your cart!" } 
      });
    } else {
      addToCart(product);
      // Show success toast with unique ID to prevent stacking
      toast.success(`${product.name} added successfully!`, {
        position: "top-right",
        autoClose: 2000,
        theme: "colored",
        toastId: `shop-add-${product.name}`
      });
    }
  };

  const search = () => {
    const query = document.getElementById('searchBox')?.value;
    console.log('Searching for:', query);
  };

  return (
    <div>
      <div className="navbar1">
        <div className="logo">
          <img src="https://cdn-icons-png.flaticon.com/128/644/644458.png" alt="Mobile Icon" />
          <span><span style={{ color: '#06c4dd' }}>Mobile</span> Shop</span>
        </div>

        <div className="search-box">
          <input type="text" id="searchBox" placeholder="Search product" />
          <button onClick={search}>Search</button>
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
  {/* I removed the "{cartCount > 0 &&" condition here so it shows 0 by default */}
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

      <h1 className="special">Shop Now</h1>
      <h1 className="special">Special Products</h1>
      <div className="container7">
        {/* Box 1 - Samsung S21 */}
        <div className="box7">
          <img src="https://cdn-files.kimovil.com/default/0011/36/thumb_1035323_default_big.jpg" alt="S21" />
          <div className="content-box7">
            <h3>Samsung Galaxy S21<br />128GB Phantom Gray</h3>
            
            <div className="market-prices">
              <span>Amazon: <s className="high">$895</s></span>
              <span>Flipkart: <s className="high">$850</s></span>
            </div>

            <p><span className="new-price">$699</span></p>
            <button 
              className="add-to-cart"
              onClick={() => handleAddToCart({ 
                name: "Samsung Galaxy S21", 
                price: 699, 
                category: "Smartphones", 
                image: "https://cdn-files.kimovil.com/default/0011/36/thumb_1035323_default_big.jpg" 
              })}
              disabled={loading}
            >
              Add to Cart
            </button>
          </div>
        </div>

        {/* Box 2 - iPhone 14 */}
        <div className="box7">
          <img src="https://m.media-amazon.com/images/I/31MX9scnEzL._SY445_SX342_QL70_ML2_.jpg" alt="iPhone 14" />
          <div className="content-box7">
            <h3>iPhone 14 Pro<br />256GB Deep Purple</h3>
            
            <div className="market-prices">
              <span>Amazon: <s className="high">$1050</s></span>
              <span>Flipkart: <s className="high">$1020</s></span>
            </div>

            <p><span className="new-price">$999</span></p>
            <button 
              className="add-to-cart"
              onClick={() => handleAddToCart({ 
                name: "iPhone 14 Pro", 
                price: 999, 
                category: "Smartphones", 
                image: "https://m.media-amazon.com/images/I/31MX9scnEzL._SY445_SX342_QL70_ML2_.jpg" 
              })}
              disabled={loading}
            >
              Add to Cart
            </button>
          </div>
        </div>

        {/* Box 3 - Mi 11 */}
        <div className="box7">
          <img src="https://i01.appmifile.com/v1/MI_18455B3E4DA706226CF7535A58E875F0267/pms_1666344667.93946102.png" alt="Mi 11" />
          <div className="content-box7">
            <h3>Xiaomi Mi 11<br />8GB RAM 128GB</h3>
            
            <div className="market-prices">
              <span>Amazon: <s className="high">$590</s></span>
              <span>Flipkart: <s className="high">$580</s></span>
            </div>

            <p><span className="new-price">$549</span></p>
            <button 
              className="add-to-cart"
              onClick={() => handleAddToCart({ 
                name: "Xiaomi Mi 11", 
                price: 549, 
                category: "Smartphones", 
                image: "https://i01.appmifile.com/v1/MI_18455B3E4DA706226CF7535A58E875F0267/pms_1666344667.93946102.png" 
              })}
              disabled={loading}
            >
              Add to Cart
            </button>
          </div>
        </div>

        {/* Box 4 - Vivo */}
        <div className="box7">
          <img src="https://www.godigit.com/content/dam/godigit/directportal/en/contenthm/vivo-v21e-5g-phones.jpg" alt="Vivo" />
          <div className="content-box7">
            <h3>Vivo V21e<br />6GB RAM 128GB</h3>
            
            <div className="market-prices">
              <span>Amazon: <s className="high">$380</s></span>
              <span>Flipkart: <s className="high">$370</s></span>
            </div>

            <p><span className="new-price">$349</span></p>
            <button 
              className="add-to-cart"
              onClick={() => handleAddToCart({ 
                name: "Vivo V21e", 
                price: 349, 
                category: "Smartphones", 
                image: "https://www.godigit.com/content/dam/godigit/directportal/en/contenthm/vivo-v21e-5g-phones.jpg" 
              })}
              disabled={loading}
            >
              Add to Cart
            </button>
          </div>
        </div>

        {/* Box 5 - S23 Ultra */}
        <div className="box7">
          <img src="https://www.sammobile.com/wp-content/uploads/2023/02/Samsung-Galaxy-S23-Ultra-Pink.jpg" alt="S23 Ultra" />
          <div className="content-box7">
            <h3>Samsung Galaxy S23 Ultra<br />512GB Pink</h3>
            
            <div className="market-prices">
              <span>Amazon: <s className="high">$1250</s></span>
              <span>Flipkart: <s className="high">$1230</s></span>
            </div>

            <p><span className="new-price">$1199</span></p>
            <button 
              className="add-to-cart"
              onClick={() => handleAddToCart({ 
                name: "Samsung Galaxy S23 Ultra", 
                price: 1199, 
                category: "Smartphones", 
                image: "https://www.sammobile.com/wp-content/uploads/2023/02/Samsung-Galaxy-S23-Ultra-Pink.jpg" 
              })}
              disabled={loading}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    
      <h2 className="special">OnePlus Phones</h2>
      <div className="container15">
        {/* BOX 1 */}
        <div className="box15">
          <div className="img-wrapper">
            <img src="https://fdn2.gsmarena.com/vv/pics/oneplus/oneplus-11-1.jpg" alt="OnePlus 11" />
          </div>
          <div className="content15">
            <h3>OnePlus 11<br />5G Titan Black</h3>
            <div className="market-prices">
              <span>Amazon: <s className="high">$750</s></span>
              <span>Flipkart: <s className="high">$730</s></span>
            </div>
            <p><span className="new-price">$699</span></p>
            <button 
              className="cart-btn15"
              onClick={() => handleAddToCart({ name: "OnePlus 11 5G", price: 699, category: "Smartphones", image: "https://fdn2.gsmarena.com/vv/pics/oneplus/oneplus-11-1.jpg" })}
              disabled={loading}
            >
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
            <h3>OnePlus Nord CE 3<br />8GB RAM 128GB</h3>
            <div className="market-prices">
              <span>Amazon: <s className="high">$380</s></span>
              <span>Flipkart: <s className="high">$365</s></span>
            </div>
            <p><span className="new-price">$349</span></p>
            <button 
              className="cart-btn15"
              onClick={() => handleAddToCart({ name: "OnePlus Nord CE 3", price: 349, category: "Smartphones", image: "https://tse2.mm.bing.net/th/id/OIP.8KSt5jvlMnIWZsexnhYl_QHaHa?rs=1&pid=ImgDetMain&o=7&rm=3" })}
              disabled={loading}
            >
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
            <h3>OnePlus Nord 2T<br />Jade Fog 128GB</h3>
            <div className="market-prices">
              <span>Amazon: <s className="high">$430</s></span>
              <span>Flipkart: <s className="high">$415</s></span>
            </div>
            <p><span className="new-price">$399</span></p>
            <button 
              className="cart-btn15"
              onClick={() => handleAddToCart({ name: "OnePlus Nord 2T", price: 399, category: "Smartphones", image: "https://oasis.opstatics.com/content/dam/oasis/page/2022/operation/may/karen/Karen-Green-540x540-L.png" })}
              disabled={loading}
            >
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
            <h3>OnePlus 10T<br />Moonstone Black</h3>
            <div className="market-prices">
              <span>Amazon: <s className="high">$650</s></span>
              <span>Flipkart: <s className="high">$630</s></span>
            </div>
            <p><span className="new-price">$599</span></p>
            <button 
              className="cart-btn15"
              onClick={() => handleAddToCart({ name: "OnePlus 10T", price: 599, category: "Smartphones", image: "https://tse4.mm.bing.net/th/id/OIP.2QfS0Edm5DfbWy69GxeIeAHaHa?rs=1&pid=ImgDetMain&o=7&rm=3" })}
              disabled={loading}
            >
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
            <h3>OnePlus 10 Pro<br />Volcanic Black</h3>
            <div className="market-prices">
              <span>Amazon: <s className="high">$850</s></span>
              <span>Flipkart: <s className="high">$820</s></span>
            </div>
            <p><span className="new-price">$799</span></p>
            <button 
              className="cart-btn15"
              onClick={() => handleAddToCart({ name: "OnePlus 10 Pro", price: 799, category: "Smartphones", image: "https://tse3.mm.bing.net/th/id/OIP.4tNgYyuTlQ3ojpLbQqEUfgHaIN?rs=1&pid=ImgDetMain&o=7&rm=3" })}
              disabled={loading}
            >
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
            <h3>OnePlus 9 Pro<br />Morning Mist</h3>
            <div className="market-prices">
              <span>Amazon: <s className="high">$740</s></span>
              <span>Flipkart: <s className="high">$720</s></span>
            </div>
            <p><span className="new-price">$699</span></p>
            <button 
              className="cart-btn15"
              onClick={() => handleAddToCart({ name: "OnePlus 9 Pro", price: 699, category: "Smartphones", image: "https://fdn2.gsmarena.com/vv/pics/oneplus/oneplus-9-pro-1.jpg" })}
              disabled={loading}
            >
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
            <h3>OnePlus 9<br />Arctic Sky</h3>
            <div className="market-prices">
              <span>Amazon: <s className="high">$640</s></span>
              <span>Flipkart: <s className="high">$620</s></span>
            </div>
            <p><span className="new-price">$599</span></p>
            <button 
              className="cart-btn15"
              onClick={() => handleAddToCart({ name: "OnePlus 9", price: 599, category: "Smartphones", image: "https://oasis.opstatics.com/content/dam/oasis/page/2021/9-series/spec-image/9/Arcticsky_9.png" })}
              disabled={loading}
            >
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
            <h3>OnePlus 8T<br />Aquamarine Green</h3>
            <div className="market-prices">
              <span>Amazon: <s className="high">$550</s></span>
              <span>Flipkart: <s className="high">$530</s></span>
            </div>
            <p><span className="new-price">$499</span></p>
            <button 
              className="cart-btn15"
              onClick={() => handleAddToCart({ name: "OnePlus 8T", price: 499, category: "Smartphones", image: "https://oasis.opstatics.com/content/dam/oasis/default/product-specs/8t-green.png" })}
              disabled={loading}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      <h1 className="special">iPhones</h1>
      <div className="container15">
        {/* BOX 1 - iPhone 15 Pro */}
        <div className="box15">
          <div className="img-wrapper">
            <img src="https://tse1.mm.bing.net/th/id/OIP.ScjjCWTWLCVkRHcoSihFJAHaHa?pid=Api&rs=1&c=1&qlt=95&h=180" alt="iPhone 15 Pro" />
          </div>
          <div className="content15">
            <h3>iPhone 15 Pro<br />128GB Natural Titanium</h3>
            <div className="market-prices">
              <span>Amazon: <s className="high">$1099</s></span>
              <span>Flipkart: <s className="high">$1050</s></span>
            </div>
            <p><span className="new-price">$999</span></p>
            <button 
              className="cart-btn15"
              onClick={() => handleAddToCart({ name: "iPhone 15 Pro", price: 999, category: "Smartphones", image: "https://tse1.mm.bing.net/th/id/OIP.ScjjCWTWLCVkRHcoSihFJAHaHa?pid=Api&rs=1&c=1&qlt=95&h=180" })}
              disabled={loading}
            >
              Add to Cart
            </button>
          </div>
        </div>

        {/* BOX 2 - iPhone 15 */}
        <div className="box15">
          <div className="img-wrapper">
            <img src="https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6417/6417993_sd.jpg" alt="iPhone 15" />
          </div>
          <div className="content15">
            <h3>iPhone 15<br />128GB Blue</h3>
            <div className="market-prices">
              <span>Amazon: <s className="high">$899</s></span>
              <span>Flipkart: <s className="high">$849</s></span>
            </div>
            <p><span className="new-price">$799</span></p>
            <button 
              className="cart-btn15"
              onClick={() => handleAddToCart({ name: "iPhone 15", price: 799, category: "Smartphones", image: "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6417/6417993_sd.jpg" })}
              disabled={loading}
            >
              Add to Cart
            </button>
          </div>
        </div>

        {/* BOX 3 - iPhone 14 Pro */}
        <div className="box15">
          <div className="img-wrapper">
            <img src="https://m.media-amazon.com/images/I/31MX9scnEzL._SY445_SX342_QL70_ML2_.jpg" alt="iPhone 14 Pro" />
          </div>
          <div className="content15">
            <h3>iPhone 14 Pro<br />256GB Deep Purple</h3>
            <div className="market-prices">
              <span>Amazon: <s className="high">$1050</s></span>
              <span>Flipkart: <s className="high">$1020</s></span>
            </div>
            <p><span className="new-price">$949</span></p>
            <button 
              className="cart-btn15"
              onClick={() => handleAddToCart({ name: "iPhone 14 Pro", price: 949, category: "Smartphones", image: "https://m.media-amazon.com/images/I/31MX9scnEzL._SY445_SX342_QL70_ML2_.jpg" })}
              disabled={loading}
            >
              Add to Cart
            </button>
          </div>
        </div>

        {/* BOX 4 - iPhone 14 */}
        <div className="box15">
          <div className="img-wrapper">
            <img src="https://m.media-amazon.com/images/I/61bK6PMOC3L._AC_UF1000,1000_QL80_.jpg" alt="iPhone 14" />
          </div>
          <div className="content15">
            <h3>iPhone 14<br />128GB Midnight</h3>
            <div className="market-prices">
              <span>Amazon: <s className="high">$799</s></span>
              <span>Flipkart: <s className="high">$749</s></span>
            </div>
            <p><span className="new-price">$699</span></p>
            <button 
              className="cart-btn15"
              onClick={() => handleAddToCart({ name: "iPhone 14", price: 699, category: "Smartphones", image: "https://m.media-amazon.com/images/I/61bK6PMOC3L._AC_UF1000,1000_QL80_.jpg" })}
              disabled={loading}
            >
              Add to Cart
            </button>
          </div>
        </div>

        {/* BOX 5 - iPhone 13 */}
        <div className="box15">
          <div className="img-wrapper">
            <img src="https://m.media-amazon.com/images/I/71GLMJ7TQiL._AC_UF1000,1000_QL80_.jpg" alt="iPhone 13" />
          </div>
          <div className="content15">
            <h3>iPhone 13<br />128GB Pink</h3>
            <div className="market-prices">
              <span>Amazon: <s className="high">$699</s></span>
              <span>Flipkart: <s className="high">$649</s></span>
            </div>
            <p><span className="new-price">$599</span></p>
            <button 
              className="cart-btn15"
              onClick={() => handleAddToCart({ name: "iPhone 13", price: 599, category: "Smartphones", image: "https://m.media-amazon.com/images/I/71GLMJ7TQiL._AC_UF1000,1000_QL80_.jpg" })}
              disabled={loading}
            >
              Add to Cart
            </button>
          </div>
        </div>

        {/* BOX 6 - iPhone 12 */}
        <div className="box15">
          <div className="img-wrapper">
            <img src="https://m.media-amazon.com/images/I/71ZOtNdaZCL._AC_UF1000,1000_QL80_.jpg" alt="iPhone 12" />
          </div>
          <div className="content15">
            <h3>iPhone 12<br />64GB White</h3>
            <div className="market-prices">
              <span>Amazon: <s className="high">$599</s></span>
              <span>Flipkart: <s className="high">$549</s></span>
            </div>
            <p><span className="new-price">$499</span></p>
            <button 
              className="cart-btn15"
              onClick={() => handleAddToCart({ name: "iPhone 12", price: 499, category: "Smartphones", image: "https://m.media-amazon.com/images/I/71ZOtNdaZCL._AC_UF1000,1000_QL80_.jpg" })}
              disabled={loading}
            >
              Add to Cart
            </button>
          </div>
        </div>

        {/* BOX 7 - iPhone SE */}
        <div className="box15">
          <div className="img-wrapper">
            <img src="https://m.media-amazon.com/images/I/61TOWf11+jL._AC_UF1000,1000_QL80_.jpg" alt="iPhone SE" />
          </div>
          <div className="content15">
            <h3>iPhone SE (2022)<br />64GB (Product) RED</h3>
            <div className="market-prices">
              <span>Amazon: <s className="high">$479</s></span>
              <span>Flipkart: <s className="high">$459</s></span>
            </div>
            <p><span className="new-price">$429</span></p>
            <button 
              className="cart-btn15"
              onClick={() => handleAddToCart({ name: "iPhone SE (2022)", price: 429, category: "Smartphones", image: "https://m.media-amazon.com/images/I/61TOWf11+jL._AC_UF1000,1000_QL80_.jpg" })}
              disabled={loading}
            >
              Add to Cart
            </button>
          </div>
        </div>

        {/* BOX 8 - iPhone 15 Plus */}
        <div className="box15">
          <div className="img-wrapper">
            <img src="https://m.media-amazon.com/images/I/71v2jVh6nIL._AC_UF1000,1000_QL80_.jpg" alt="iPhone 15 Plus" />
          </div>
          <div className="content15">
            <h3>iPhone 15 Plus<br />128GB Green</h3>
            <div className="market-prices">
              <span>Amazon: <s className="high">$950</s></span>
              <span>Flipkart: <s className="high">$920</s></span>
            </div>
            <p><span className="new-price">$899</span></p>
            <button 
              className="cart-btn15"
              onClick={() => handleAddToCart({ name: "iPhone 15 Plus", price: 899, category: "Smartphones", image: "https://m.media-amazon.com/images/I/71v2jVh6nIL._AC_UF1000,1000_QL80_.jpg" })}
              disabled={loading}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      <h1 className="special">Samsung Galaxy Series</h1>
      <div className="container15">
        {/* BOX 1 */}
        <div className="box15">
          <div className="img-wrapper">
            <img src="https://tse1.mm.bing.net/th/id/OIP.VPS1xMr7M4XpKCOqjHk0OQHaHa?pid=Api&P=0&h=180" alt="S24 Ultra" />
          </div>
          <div className="content15">
            <h3>Samsung S24 Ultra<br />Titanium Gray</h3>
            <div className="market-prices">
              <span>Amazon: <s className="high">$1299</s></span>
              <span>Flipkart: <s className="high">$1250</s></span>
            </div>
            <p><span className="new-price">$1199</span></p>
            <button 
              className="cart-btn15"
              onClick={() => handleAddToCart({ name: "Samsung S24 Ultra", price: 1199, category: "Smartphones", image: "https://tse1.mm.bing.net/th/id/OIP.VPS1xMr7M4XpKCOqjHk0OQHaHa?pid=Api&P=0&h=180" })}
              disabled={loading}
            >
              Add to Cart
            </button>
          </div>
        </div>

        {/* BOX 2 */}
        <div className="box15">
          <div className="img-wrapper">
            <img src="https://images.samsung.com/is/image/samsung/p6pim/id/2307/gallery/id-galaxy-z-fold5-f946-sm-f946bzkdxid-thumb-537221796" alt="Z Fold 5" />
          </div>
          <div className="content15">
            <h3>Galaxy Z Fold 5<br />Phantom Black</h3>
            <div className="market-prices">
              <span>Amazon: <s className="high">$1799</s></span>
              <span>Flipkart: <s className="high">$1750</s></span>
            </div>
            <p><span className="new-price">$1499</span></p>
            <button 
              className="cart-btn15"
              onClick={() => handleAddToCart({ name: "Galaxy Z Fold 5", price: 1499, category: "Smartphones", image: "https://images.samsung.com/is/image/samsung/p6pim/id/2307/gallery/id-galaxy-z-fold5-f946-sm-f946bzkdxid-thumb-537221796" })}
              disabled={loading}
            >
              Add to Cart
            </button>
          </div>
        </div>

        {/* BOX 3 */}
        <div className="box15">
          <div className="img-wrapper">
            <img src="https://static1.anpoimages.com/wordpress/wp-content/uploads/2023/07/galaxy-z-flip-5-mint-both-sides-render-square.jpg" alt="Z Flip 5" />
          </div>
          <div className="content15">
            <h3>Galaxy Z Flip 5<br />Mint Green</h3>
            <div className="market-prices">
              <span>Amazon: <s className="high">$999</s></span>
              <span>Flipkart: <s className="high">$920</s></span>
            </div>
            <p><span className="new-price">$849</span></p>
            <button 
              className="cart-btn15"
              onClick={() => handleAddToCart({ name: "Galaxy Z Flip 5", price: 849, category: "Smartphones", image: "https://static1.anpoimages.com/wordpress/wp-content/uploads/2023/07/galaxy-z-flip-5-mint-both-sides-render-square.jpg" })}
              disabled={loading}
            >
              Add to Cart
            </button>
          </div>
        </div>

        {/* BOX 4 */}
        <div className="box15">
          <div className="img-wrapper">
            <img src="https://images.samsung.com/is/image/samsung/p6pim/africa_en/sm-s711bzabafa/gallery/africa-en-galaxy-s23-fe-s711-sm-s711bzabafa-538424099?$650_519_PNG$" alt="S23 FE" />
          </div>
          <div className="content15">
            <h3>Samsung S23 FE<br />Graphite</h3>
            <div className="market-prices">
              <span>Amazon: <s className="high">$629</s></span>
              <span>Flipkart: <s className="high">$599</s></span>
            </div>
            <p><span className="new-price">$549</span></p>
            <button 
              className="cart-btn15"
              onClick={() => handleAddToCart({ name: "Samsung S23 FE", price: 549, category: "Smartphones", image: "https://images.samsung.com/is/image/samsung/p6pim/africa_en/sm-s711bzabafa/gallery/africa-en-galaxy-s23-fe-s711-sm-s711bzabafa-538424099?$650_519_PNG$" })}
              disabled={loading}
            >
              Add to Cart
            </button>
          </div>
        </div>

        {/* BOX 5 */}
        <div className="box15">
          <div className="img-wrapper">
            <img src="https://tse2.mm.bing.net/th/id/OIP.kgFf3L6XxAWcjVYZFPdPQwHaJM?pid=Api&P=0&h=180" alt="Galaxy A54" />
          </div>
          <div className="content15">
            <h3>Galaxy A54 5G<br />Awesome Violet</h3>
            <div className="market-prices">
              <span>Amazon: <s className="high">$449</s></span>
              <span>Flipkart: <s className="high">$420</s></span>
            </div>
            <p><span className="new-price">$379</span></p>
            <button 
              className="cart-btn15"
              onClick={() => handleAddToCart({ name: "Galaxy A54 5G", price: 379, category: "Smartphones", image: "https://tse2.mm.bing.net/th/id/OIP.kgFf3L6XxAWcjVYZFPdPQwHaJM?pid=Api&P=0&h=180" })}
              disabled={loading}
            >
              Add to Cart
            </button>
          </div>
        </div>

        {/* BOX 6 */}
        <div className="box15">
          <div className="img-wrapper">
            <img src="https://images.samsung.com/sec/smartphones/galaxy-s23-ultra/images/galaxy-s23-ultra-highlights-colors-cream-back-s.jpg" alt="S23 Ultra" />
          </div>
          <div className="content15">
            <h3>Samsung S23 Ultra<br />Cream White</h3>
            <div className="market-prices">
              <span>Amazon: <s className="high">$1100</s></span>
              <span>Flipkart: <s className="high">$1050</s></span>
            </div>
            <p><span className="new-price">$999</span></p>
            <button 
              className="cart-btn15"
              onClick={() => handleAddToCart({ name: "Samsung S23 Ultra", price: 999, category: "Smartphones", image: "https://images.samsung.com/sec/smartphones/galaxy-s23-ultra/images/galaxy-s23-ultra-highlights-colors-cream-back-s.jpg" })}
              disabled={loading}
            >
              Add to Cart
            </button>
          </div>
        </div>

        {/* BOX 7 */}
        <div className="box15">
          <div className="img-wrapper">
            <img src="https://http2.mlstatic.com/D_NQ_NP_885596-MLA54688652817_032023-O.webp" alt="Galaxy A34" />
          </div>
          <div className="content15">
            <h3>Galaxy A34 5G<br />Awesome Lime</h3>
            <div className="market-prices">
              <span>Amazon: <s className="high">$350</s></span>
              <span>Flipkart: <s className="high">$330</s></span>
            </div>
            <p><span className="new-price">$299</span></p>
            <button 
              className="cart-btn15"
              onClick={() => handleAddToCart({ name: "Galaxy A34 5G", price: 299, category: "Smartphones", image: "https://http2.mlstatic.com/D_NQ_NP_885596-MLA54688652817_032023-O.webp" })}
              disabled={loading}
            >
              Add to Cart
            </button>
          </div>
        </div>

        {/* BOX 8 */}
        <div className="box15">
          <div className="img-wrapper">
            <img src="https://tse1.mm.bing.net/th/id/OIP.zj66nWDPWUc1Vtmv6xWQiAHaF6?pid=Api&rs=1&c=1&qlt=95&w=146&h=116" alt="S21 FE" />
          </div>
          <div className="content15">
            <h3>Galaxy S21 FE<br />Lavender 128GB</h3>
            <div className="market-prices">
              <span>Amazon: <s className="high">$499</s></span>
              <span>Flipkart: <s className="high">$450</s></span>
            </div>
            <p><span className="new-price">$399</span></p>
            <button 
              className="cart-btn15"
              onClick={() => handleAddToCart({ name: "Galaxy S21 FE", price: 399, category: "Smartphones", image: "https://tse1.mm.bing.net/th/id/OIP.zj66nWDPWUc1Vtmv6xWQiAHaF6?pid=Api&rs=1&c=1&qlt=95&w=146&h=116" })}
              disabled={loading}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      <h1 className="special">Vivo Smartphone Series</h1>
      <div className="container15">
        {/* BOX 1 - Vivo X100 Pro */}
        <div className="box15">
          <div className="img-wrapper">
            <img src="https://tse2.mm.bing.net/th/id/OIP.m4CL_u0zhjWa2ZCcZMmnzgHaHa?pid=Api&P=0&h=180" alt="Vivo X100 Pro" />
          </div>
          <div className="content15">
            <h3>Vivo X100 Pro<br />ZEISS Optics 512GB</h3>
            <div className="market-prices">
              <span>Amazon: <s className="high">$999</s></span>
              <span>Flipkart: <s className="high">$980</s></span>
            </div>
            <p><span className="new-price">$929</span></p>
            <button 
              className="cart-btn15"
              onClick={() => handleAddToCart({ name: "Vivo X100 Pro", price: 929, category: "Smartphones", image: "https://tse2.mm.bing.net/th/id/OIP.m4CL_u0zhjWa2ZCcZMmnzgHaHa?pid=Api&P=0&h=180" })}
              disabled={loading}
            >
              Add to Cart
            </button>
          </div>
        </div>

        {/* BOX 2 - Vivo V30 Pro */}
        <div className="box15">
          <div className="img-wrapper">
            <img src="https://vdaadmin.venusdigitalarcade.in/media/catalog/product/cache/a4aa45628d61667009e8bfd73fcc061b/4/1/41_13_2.jpg" alt="Vivo V30 Pro" />
          </div>
          <div className="content15">
            <h3>Vivo V30 Pro<br />Andaman Blue 256GB</h3>
            <div className="market-prices">
              <span>Amazon: <s className="high">$550</s></span>
              <span>Flipkart: <s className="high">$530</s></span>
            </div>
            <p><span className="new-price">$499</span></p>
            <button 
              className="cart-btn15"
              onClick={() => handleAddToCart({ name: "Vivo V30 Pro", price: 499, category: "Smartphones", image: "https://vdaadmin.venusdigitalarcade.in/media/catalog/product/cache/a4aa45628d61667009e8bfd73fcc061b/4/1/41_13_2.jpg" })}
              disabled={loading}
            >
              Add to Cart
            </button>
          </div>
        </div>

        {/* BOX 3 - Vivo V29 */}
        <div className="box15">
          <div className="img-wrapper">
            <img src="https://tse1.mm.bing.net/th/id/OIP.udIXdG1yZDWCF39v9SdfvQHaHa?pid=Api&P=0&h=180" alt="Vivo V29" />
          </div>
          <div className="content15">
            <h3>Vivo V29 5G<br />Majestic Red</h3>
            <div className="market-prices">
              <span>Amazon: <s className="high">$420</s></span>
              <span>Flipkart: <s className="high">$410</s></span>
            </div>
            <p><span className="new-price">$389</span></p>
            <button 
              className="cart-btn15"
              onClick={() => handleAddToCart({ name: "Vivo V29 5G", price: 389, category: "Smartphones", image: "https://tse1.mm.bing.net/th/id/OIP.udIXdG1yZDWCF39v9SdfvQHaHa?pid=Api&P=0&h=180" })}
              disabled={loading}
            >
              Add to Cart
            </button>
          </div>
        </div>

        {/* BOX 4 - Vivo T2 Pro */}
        <div className="box15">
          <div className="img-wrapper">
            <img src="https://tse3.mm.bing.net/th/id/OIP.mM9-d8PtFBAh2o7yLQeS0gHaIl?pid=Api&P=0&h=180" alt="Vivo T2 Pro" />
          </div>
          <div className="content15">
            <h3>Vivo T2 Pro 5G<br />New Moon Black</h3>
            <div className="market-prices">
              <span>Amazon: <s className="high">$350</s></span>
              <span>Flipkart: <s className="high">$330</s></span>
            </div>
            <p><span className="new-price">$299</span></p>
            <button 
              className="cart-btn15"
              onClick={() => handleAddToCart({ name: "Vivo T2 Pro 5G", price: 299, category: "Smartphones", image: "https://tse3.mm.bing.net/th/id/OIP.mM9-d8PtFBAh2o7yLQeS0gHaIl?pid=Api&P=0&h=180" })}
              disabled={loading}
            >
              Add to Cart
            </button>
          </div>
        </div>

        {/* BOX 5 - Vivo Y200 */}
        <div className="box15">
          <div className="img-wrapper">
            <img src="https://tse4.mm.bing.net/th/id/OIP.fMBxUOpO-GOUzWUdDbLYCAHaHa?pid=Api&P=0&h=180" alt="Vivo Y200" />
          </div>
          <div className="content15">
            <h3>Vivo Y200 5G<br />Desert Gold</h3>
            <div className="market-prices">
              <span>Amazon: <s className="high">$300</s></span>
              <span>Flipkart: <s className="high">$280</s></span>
            </div>
            <p><span className="new-price">$249</span></p>
            <button 
              className="cart-btn15"
              onClick={() => handleAddToCart({ name: "Vivo Y200 5G", price: 249, category: "Smartphones", image: "https://tse4.mm.bing.net/th/id/OIP.fMBxUOpO-GOUzWUdDbLYCAHaHa?pid=Api&P=0&h=180" })}
              disabled={loading}
            >
              Add to Cart
            </button>
          </div>
        </div>

        {/* BOX 6 - Vivo X90 Pro */}
        <div className="box15">
          <div className="img-wrapper">
            <img src="https://tse3.mm.bing.net/th/id/OIP.2rFsZNM2f5Ucl1VDUXTDdAAAAA?pid=Api&P=0&h=180" alt="Vivo X90 Pro" />
          </div>
          <div className="content15">
            <h3>Vivo X90 Pro<br />Legendary Black</h3>
            <div className="market-prices">
              <span>Amazon: <s className="high">$850</s></span>
              <span>Flipkart: <s className="high">$820</s></span>
            </div>
            <p><span className="new-price">$799</span></p>
            <button 
              className="cart-btn15"
              onClick={() => handleAddToCart({ name: "Vivo X90 Pro", price: 799, category: "Smartphones", image: "https://tse3.mm.bing.net/th/id/OIP.2rFsZNM2f5Ucl1VDUXTDdAAAAA?pid=Api&P=0&h=180" })}
              disabled={loading}
            >
              Add to Cart
            </button>
          </div>
        </div>

        {/* BOX 7 - Vivo V21e */}
        <div className="box15">
          <div className="img-wrapper">
            <img src="https://asia-exstatic-vivofs.vivo.com/PSee2l50xoirPK7y/1625623345025/d456f80fbef8d81eb9ae2a8c31898d86.png" alt="Vivo V21" />
          </div>
          <div className="content15">
            <h3>Vivo V21 5G<br />Sunset Dazzle</h3>
            <div className="market-prices">
              <span>Amazon: <s className="high">$380</s></span>
              <span>Flipkart: <s className="high">$370</s></span>
            </div>
            <p><span className="new-price">$349</span></p>
            <button 
              className="cart-btn15"
              onClick={() => handleAddToCart({ name: "Vivo V21 5G", price: 349, category: "Smartphones", image: "https://asia-exstatic-vivofs.vivo.com/PSee2l50xoirPK7y/1625623345025/d456f80fbef8d81eb9ae2a8c31898d86.png" })}
              disabled={loading}
            >
              Add to Cart
            </button>
          </div>
        </div>

        {/* BOX 8 - Vivo Y100 */}
        <div className="box15">
          <div className="img-wrapper">
            <img src="https://tse4.mm.bing.net/th/id/OIP.7P3cADSFrKQewfJPI77NtwHaHa?pid=Api&P=0&h=180" alt="Vivo Y100" />
          </div>
          <div className="content15">
            <h3>Vivo Y100<br />Pacific Blue 128GB</h3>
            <div className="market-prices">
              <span>Amazon: <s className="high">$299</s></span>
              <span>Flipkart: <s className="high">$280</s></span>
            </div>
            <p><span className="new-price">$259</span></p>
            <button 
              className="cart-btn15"
              onClick={() => handleAddToCart({ name: "Vivo Y100", price: 259, category: "Smartphones", image: "https://tse4.mm.bing.net/th/id/OIP.7P3cADSFrKQewfJPI77NtwHaHa?pid=Api&P=0&h=180" })}
              disabled={loading}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      <h1 className="special">Xiaomi & Mi Smartphone Series</h1>
      <div className="container15">
        {/* BOX 1 - Xiaomi 14 Ultra */}
        <div className="box15">
          <div className="img-wrapper">
            <img src="https://tse3.mm.bing.net/th/id/OIP.Xc17NAPx70gVCMgWF_IumQHaE9?pid=Api&P=0&h=180" alt="Xiaomi 14 Ultra" />
          </div>
          <div className="content15">
            <h3>Xiaomi 14 Ultra<br />512GB Leica Optics</h3>
            <div className="market-prices">
              <span>Amazon: <s className="high">$1250</s></span>
              <span>Flipkart: <s className="high">$1230</s></span>
            </div>
            <p><span className="new-price">$1149</span></p>
            <button 
              className="cart-btn15"
              onClick={() => handleAddToCart({ name: "Xiaomi 14 Ultra", price: 1149, category: "Smartphones", image: "https://tse3.mm.bing.net/th/id/OIP.Xc17NAPx70gVCMgWF_IumQHaE9?pid=Api&P=0&h=180" })}
              disabled={loading}
            >
              Add to Cart
            </button>
          </div>
        </div>

        {/* BOX 2 - Redmi Note 13 Pro+ */}
        <div className="box15">
          <div className="img-wrapper">
            <img src="https://tse1.mm.bing.net/th/id/OIP.31GQVYqVXMX80GszesGG0QHaIz?pid=Api&P=0&h=180" alt="Redmi Note 13 Pro+" />
          </div>
          <div className="content15">
            <h3>Redmi Note 13 Pro+<br />200MP Curved Display</h3>
            <div className="market-prices">
              <span>Amazon: <s className="high">$420</s></span>
              <span>Flipkart: <s className="high">$410</s></span>
            </div>
            <p><span className="new-price">$389</span></p>
            <button 
              className="cart-btn15"
              onClick={() => handleAddToCart({ name: "Redmi Note 13 Pro+", price: 389, category: "Smartphones", image: "https://tse1.mm.bing.net/th/id/OIP.31GQVYqVXMX80GszesGG0QHaIz?pid=Api&P=0&h=180" })}
              disabled={loading}
            >
              Add to Cart
            </button>
          </div>
        </div>

        {/* BOX 3 - Xiaomi 14 */}
        <div className="box15">
          <div className="img-wrapper">
            <img src="https://tse1.mm.bing.net/th/id/OIP.ujy7sPeCPEhSVRlcCDbbxgHaFj?pid=Api&rs=1&c=1&qlt=95&w=136&h=102" alt="Xiaomi 14" />
          </div>
          <div className="content15">
            <h3>Xiaomi 14<br />Jade Green 512GB</h3>
            <div className="market-prices">
              <span>Amazon: <s className="high">$850</s></span>
              <span>Flipkart: <s className="high">$820</s></span>
            </div>
            <p><span className="new-price">$799</span></p>
            <button 
              className="cart-btn15"
              onClick={() => handleAddToCart({ name: "Xiaomi 14", price: 799, category: "Smartphones", image: "https://tse1.mm.bing.net/th/id/OIP.ujy7sPeCPEhSVRlcCDbbxgHaFj?pid=Api&rs=1&c=1&qlt=95&w=136&h=102" })}
              disabled={loading}
            >
              Add to Cart
            </button>
          </div>
        </div>

        {/* BOX 4 - Xiaomi 13T Pro */}
        <div className="box15">
          <div className="img-wrapper">
            <img src="https://tse1.mm.bing.net/th/id/OIP.4mehjA4NthsaWOImSlJ9QwHaHa?pid=Api&rs=1&c=1&qlt=95&w=118&h=118" alt="Xiaomi 13T Pro" />
          </div>
          <div className="content15">
            <h3>Xiaomi 13T Pro<br />Alpine Blue 256GB</h3>
            <div className="market-prices">
              <span>Amazon: <s className="high">$650</s></span>
              <span>Flipkart: <s className="high">$630</s></span>
            </div>
            <p><span className="new-price">$599</span></p>
            <button 
              className="cart-btn15"
              onClick={() => handleAddToCart({ name: "Xiaomi 13T Pro", price: 599, category: "Smartphones", image: "https://tse1.mm.bing.net/th/id/OIP.4mehjA4NthsaWOImSlJ9QwHaHa?pid=Api&rs=1&c=1&qlt=95&w=118&h=118" })}
              disabled={loading}
            >
              Add to Cart
            </button>
          </div>
        </div>

        {/* BOX 5 - Redmi Note 13 */}
        <div className="box15">
          <div className="img-wrapper">
            <img src="https://tse2.mm.bing.net/th/id/OIP.dpiHFW-1esGHLqNW3xZ3AQHaHa?pid=Api&P=0&h=180" alt="Redmi Note 13" />
          </div>
          <div className="content15">
            <h3>Redmi Note 13<br />Prism Gold 128GB</h3>
            <div className="market-prices">
              <span>Amazon: <s className="high">$250</s></span>
              <span>Flipkart: <s className="high">$230</s></span>
            </div>
            <p><span className="new-price">$209</span></p>
            <button 
              className="cart-btn15"
              onClick={() => handleAddToCart({ name: "Redmi Note 13", price: 209, category: "Smartphones", image: "https://tse2.mm.bing.net/th/id/OIP.dpiHFW-1esGHLqNW3xZ3AQHaHa?pid=Api&P=0&h=180" })}
              disabled={loading}
            >
              Add to Cart
            </button>
          </div>
        </div>

        {/* BOX 6 - Xiaomi Pad 6 */}
        <div className="box15">
          <div className="img-wrapper">
            <img src="https://tse3.mm.bing.net/th/id/OIP.L5Nwekp-mnhVvCpylDX85wHaHa?pid=Api&P=0&h=180" alt="Xiaomi Pad 6" />
          </div>
          <div className="content15">
            <h3>Xiaomi Pad 6<br />Mist Blue 256GB</h3>
            <div className="market-prices">
              <span>Amazon: <s className="high">$350</s></span>
              <span>Flipkart: <s className="high">$330</s></span>
            </div>
            <p><span className="new-price">$299</span></p>
            <button 
              className="cart-btn15"
              onClick={() => handleAddToCart({ name: "Xiaomi Pad 6", price: 299, category: "Smartphones", image: "https://tse3.mm.bing.net/th/id/OIP.L5Nwekp-mnhVvCpylDX85wHaHa?pid=Api&P=0&h=180" })}
              disabled={loading}
            >
              Add to Cart
            </button>
          </div>
        </div>

        {/* BOX 7 - Xiaomi 13 Pro */}
        <div className="box15">
          <div className="img-wrapper">
            <img src="https://m.media-amazon.com/images/I/61RvCwjI7dL._SX679_.jpg" alt="Xiaomi 13 Pro" />
          </div>
          <div className="content15">
            <h3>Xiaomi 13 Pro<br />Ceramic Black</h3>
            <div className="market-prices">
              <span>Amazon: <s className="high">$899</s></span>
              <span>Flipkart: <s className="high">$850</s></span>
            </div>
            <p><span className="new-price">$749</span></p>
            <button 
              className="cart-btn15"
              onClick={() => handleAddToCart({ name: "Xiaomi 13 Pro", price: 749, category: "Smartphones", image: "https://m.media-amazon.com/images/I/61RvCwjI7dL._SX679_.jpg" })}
              disabled={loading}
            >
              Add to Cart
            </button>
          </div>
        </div>

        {/* BOX 8 - Redmi 13C */}
        <div className="box15">
          <div className="img-wrapper">
            <img src="https://tse1.mm.bing.net/th/id/OIP.uY0aS1NxbqxkaVf_xoRrrgHaHa?pid=Api&rs=1&c=1&qlt=95&w=108&h=108" alt="Redmi 13C" />
          </div>
          <div className="content15">
            <h3>Redmi 13C 5G<br />Starlight Black</h3>
            <div className="market-prices">
              <span>Amazon: <s className="high">$150</s></span>
              <span>Flipkart: <s className="high">$140</s></span>
            </div>
            <p><span className="new-price">$129</span></p>
            <button 
              className="cart-btn15"
              onClick={() => handleAddToCart({ name: "Redmi 13C 5G", price: 129, category: "Smartphones", image: "https://tse1.mm.bing.net/th/id/OIP.uY0aS1NxbqxkaVf_xoRrrgHaHa?pid=Api&rs=1&c=1&qlt=95&w=108&h=108" })}
              disabled={loading}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      <h1 className="special">Oppo Smartphone Series</h1>
      <div className="container15">
        {/* BOX 1 - Oppo Find X7 Ultra */}
        <div className="box15">
          <div className="img-wrapper">
            <img src="https://tse2.mm.bing.net/th/id/OIP.AZ6jTBrXmL1ewFqNw-5lIwHaHa?pid=Api&P=0&h=180" alt="Oppo Find X7 Ultra" />
          </div>
          <div className="content15">
            <h3>Oppo Find X7 Ultra<br />512GB Ocean Blue</h3>
            <div className="market-prices">
              <span>Amazon: <s className="high">$1199</s></span>
              <span>Flipkart: <s className="high">$1150</s></span>
            </div>
            <p><span className="new-price">$1049</span></p>
            <button 
              className="cart-btn15"
              onClick={() => handleAddToCart({ name: "Oppo Find X7 Ultra", price: 1049, category: "Smartphones", image: "https://tse2.mm.bing.net/th/id/OIP.AZ6jTBrXmL1ewFqNw-5lIwHaHa?pid=Api&P=0&h=180" })}
              disabled={loading}
            >
              Add to Cart
            </button>
          </div>
        </div>

        {/* BOX 2 - Oppo Reno 11 Pro */}
        <div className="box15">
          <div className="img-wrapper">
            <img src="https://tse2.mm.bing.net/th/id/OIP.2YnjbS1o8GmQO98cDMFahgAAAA?pid=Api&P=0&h=180" alt="Oppo Reno 11 Pro" />
          </div>
          <div className="content15">
            <h3>Oppo Reno 11 Pro 5G<br />Pearl White 256GB</h3>
            <div className="market-prices">
              <span>Amazon: <s className="high">$550</s></span>
              <span>Flipkart: <s className="high">$520</s></span>
            </div>
            <p><span className="new-price">$499</span></p>
            <button 
              className="cart-btn15"
              onClick={() => handleAddToCart({ name: "Oppo Reno 11 Pro 5G", price: 499, category: "Smartphones", image: "https://tse2.mm.bing.net/th/id/OIP.2YnjbS1o8GmQO98cDMFahgAAAA?pid=Api&P=0&h=180" })}
              disabled={loading}
            >
              Add to Cart
            </button>
          </div>
        </div>

        {/* BOX 3 - Oppo Reno 10 */}
        <div className="box15">
          <div className="img-wrapper">
            <img src="https://tse2.mm.bing.net/th/id/OIP.i4vXANTDrttAE2uddtzBcQHaHa?pid=Api&P=0&h=180" alt="Oppo Reno 10" />
          </div>
          <div className="content15">
            <h3>Oppo Reno 10 5G<br />Ice Blue 128GB</h3>
            <div className="market-prices">
              <span>Amazon: <s className="high">$450</s></span>
              <span>Flipkart: <s className="high">$430</s></span>
            </div>
            <p><span className="new-price">$399</span></p>
            <button 
              className="cart-btn15"
              onClick={() => handleAddToCart({ name: "Oppo Reno 10 5G", price: 399, category: "Smartphones", image: "https://tse2.mm.bing.net/th/id/OIP.i4vXANTDrttAE2uddtzBcQHaHa?pid=Api&P=0&h=180" })}
              disabled={loading}
            >
              Add to Cart
            </button>
          </div>
        </div>

        {/* BOX 4 - Oppo F25 Pro */}
        <div className="box15">
          <div className="img-wrapper">
            <img src="https://tse2.mm.bing.net/th/id/OIP.f6H_uUFPZ6BeWVcUtmrt4gHaHa?pid=Api&P=0&h=180" alt="Oppo F25 Pro" />
          </div>
          <div className="content15">
            <h3>Oppo F25 Pro 5G<br />Lava Red 128GB</h3>
            <div className="market-prices">
              <span>Amazon: <s className="high">$350</s></span>
              <span>Flipkart: <s className="high">$320</s></span>
            </div>
            <p><span className="new-price">$299</span></p>
            <button 
              className="cart-btn15"
              onClick={() => handleAddToCart({ name: "Oppo F25 Pro 5G", price: 299, category: "Smartphones", image: "https://tse2.mm.bing.net/th/id/OIP.f6H_uUFPZ6BeWVcUtmrt4gHaHa?pid=Api&P=0&h=180" })}
              disabled={loading}
            >
              Add to Cart
            </button>
          </div>
        </div>

        {/* BOX 5 - Oppo A79 */}
        <div className="box15">
          <div className="img-wrapper">
            <img src="https://tse2.mm.bing.net/th/id/OIP.Qar57O50qlu2BaUMIv1CRAHaHa?pid=Api&P=0&h=180" alt="Oppo A79" />
          </div>
          <div className="content15">
            <h3>Oppo A79 5G<br />Glowing Green</h3>
            <div className="market-prices">
              <span>Amazon: <s className="high">$250</s></span>
              <span>Flipkart: <s className="high">$240</s></span>
            </div>
            <p><span className="new-price">$219</span></p>
            <button 
              className="cart-btn15"
              onClick={() => handleAddToCart({ name: "Oppo A79 5G", price: 219, category: "Smartphones", image: "https://tse2.mm.bing.net/th/id/OIP.Qar57O50qlu2BaUMIv1CRAHaHa?pid=Api&P=0&h=180" })}
              disabled={loading}
            >
              Add to Cart
            </button>
          </div>
        </div>

        {/* BOX 6 - Oppo Find N3 Flip */}
        <div className="box15">
          <div className="img-wrapper">
            <img src="https://tse4.mm.bing.net/th/id/OIP.Hxk_-FG8_FC28r5mKHKk8AHaHz?pid=Api&P=0&h=180" alt="Oppo Find N3 Flip" />
          </div>
          <div className="content15">
            <h3>Oppo Find N3 Flip<br />Cream Gold 256GB</h3>
            <div className="market-prices">
              <span>Amazon: <s className="high">$1100</s></span>
              <span>Flipkart: <s className="high">$1050</s></span>
            </div>
            <p><span className="new-price">$949</span></p>
            <button 
              className="cart-btn15"
              onClick={() => handleAddToCart({ name: "Oppo Find N3 Flip", price: 949, category: "Smartphones", image: "https://tse4.mm.bing.net/th/id/OIP.Hxk_-FG8_FC28r5mKHKk8AHaHz?pid=Api&P=0&h=180" })}
              disabled={loading}
            >
              Add to Cart
            </button>
          </div>
        </div>

        {/* BOX 7 - Oppo A58 */}
        <div className="box15">
          <div className="img-wrapper">
            <img src="https://tse4.mm.bing.net/th/id/OIP.tNJyx88dgSPHarJ5jGtKSAHaKL?pid=Api&P=0&h=180" alt="Oppo A58" />
          </div>
          <div className="content15">
            <h3>Oppo A58<br />Dazzling Green</h3>
            <div className="market-prices">
              <span>Amazon: <s className="high">$200</s></span>
              <span>Flipkart: <s className="high">$180</s></span>
            </div>
            <p><span className="new-price">$169</span></p>
            <button 
              className="cart-btn15"
              onClick={() => handleAddToCart({ name: "Oppo A58", price: 169, category: "Smartphones", image: "https://tse4.mm.bing.net/th/id/OIP.tNJyx88dgSPHarJ5jGtKSAHaKL?pid=Api&P=0&h=180" })}
              disabled={loading}
            >
              Add to Cart
            </button>
          </div>
        </div>

        {/* BOX 8 - Oppo F23 */}
        <div className="box15">
          <div className="img-wrapper">
            <img src="https://tse2.mm.bing.net/th/id/OIP.Btw5F0ktjuL3cDQrti_azAHaHa?pid=Api&P=0&h=180" alt="Oppo F23" />
          </div>
          <div className="content15">
            <h3>Oppo F23 5G<br />Bold Gold 256GB</h3>
            <div className="market-prices">
              <span>Amazon: <s className="high">$320</s></span>
              <span>Flipkart: <s className="high">$300</s></span>
            </div>
            <p><span className="new-price">$279</span></p>
            <button 
              className="cart-btn15"
              onClick={() => handleAddToCart({ name: "Oppo F23 5G", price: 279, category: "Smartphones", image: "https://tse2.mm.bing.net/th/id/OIP.Btw5F0ktjuL3cDQrti_azAHaHa?pid=Api&P=0&h=180" })}
              disabled={loading}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      <h1 className="special">Google Pixel Series</h1>
      <div className="container15">
        {/* BOX 1 - Pixel 8 Pro */}
        <div className="box15">
          <div className="img-wrapper">
            <img src="https://cf-images.dustin.eu/cdn-cgi/image/format=auto,quality=75,width=828,,fit=contain/image/d2000010011171888/google-pixel-8-pro-128gb-bay.png" alt="Pixel 8 Pro" />
          </div>
          <div className="content15">
            <h3>Google Pixel 8 Pro<br />Bay Blue 128GB</h3>
            <div className="market-prices">
              <span>Amazon: <s className="high">$999</s></span>
              <span>Flipkart: <s className="high">$950</s></span>
            </div>
            <p><span className="new-price">$899</span></p>
            <button 
              className="cart-btn15"
              onClick={() => handleAddToCart({ name: "Google Pixel 8 Pro", price: 899, category: "Smartphones", image: "https://cf-images.dustin.eu/cdn-cgi/image/format=auto,quality=75,width=828,,fit=contain/image/d2000010011171888/google-pixel-8-pro-128gb-bay.png" })}
              disabled={loading}
            >
              Add to Cart
            </button>
          </div>
        </div>

        {/* BOX 2 - Pixel 8 */}
        <div className="box15">
          <div className="img-wrapper">
            <img src="https://tse1.mm.bing.net/th/id/OIP.-wPi3vgwn7YtHFPNEBCqbAHaHa?pid=Api&P=0&h=180" alt="Pixel 8" />
          </div>
          <div className="content15">
            <h3>Google Pixel 8<br />Rose 128GB</h3>
            <div className="market-prices">
              <span>Amazon: <s className="high">$699</s></span>
              <span>Flipkart: <s className="high">$649</s></span>
            </div>
            <p><span className="new-price">$599</span></p>
            <button 
              className="cart-btn15"
              onClick={() => handleAddToCart({ name: "Google Pixel 8", price: 599, category: "Smartphones", image: "https://tse1.mm.bing.net/th/id/OIP.-wPi3vgwn7YtHFPNEBCqbAHaHa?pid=Api&P=0&h=180" })}
              disabled={loading}
            >
              Add to Cart
            </button>
          </div>
        </div>

        {/* BOX 3 - Pixel 7a */}
        <div className="box15">
          <div className="img-wrapper">
            <img src="https://dakauf.eu/wp-content/uploads/2023/11/Google-Pixel-7a-blue.jpg" alt="Pixel 7a" />
          </div>
          <div className="content15">
            <h3>Google Pixel 7a<br />Sea Blue 128GB</h3>
            <div className="market-prices">
              <span>Amazon: <s className="high">$499</s></span>
              <span>Flipkart: <s className="high">$470</s></span>
            </div>
            <p><span className="new-price">$449</span></p>
            <button 
              className="cart-btn15"
              onClick={() => handleAddToCart({ name: "Google Pixel 7a", price: 449, category: "Smartphones", image: "https://dakauf.eu/wp-content/uploads/2023/11/Google-Pixel-7a-blue.jpg" })}
              disabled={loading}
            >
              Add to Cart
            </button>
          </div>
        </div>

        {/* BOX 4 - Pixel Fold */}
        <div className="box15">
          <div className="img-wrapper">
            <img src="https://tse4.mm.bing.net/th/id/OIP.sWSNQXNE09Xw2opoL7ofkAHaHo?pid=Api&P=0&h=180" alt="Pixel Fold" />
          </div>
          <div className="content15">
            <h3>Google Pixel Fold<br />Obsidian 256GB</h3>
            <div className="market-prices">
              <span>Amazon: <s className="high">$1799</s></span>
              <span>Flipkart: <s className="high">$1720</s></span>
            </div>
            <p><span className="new-price">$1599</span></p>
            <button 
              className="cart-btn15"
              onClick={() => handleAddToCart({ name: "Google Pixel Fold", price: 1599, category: "Smartphones", image: "https://tse4.mm.bing.net/th/id/OIP.sWSNQXNE09Xw2opoL7ofkAHaHo?pid=Api&P=0&h=180" })}
              disabled={loading}
            >
              Add to Cart
            </button>
          </div>
        </div>

        {/* BOX 5 - Pixel 7 Pro */}
        <div className="box15">
          <div className="img-wrapper">
            <img src="https://tse2.mm.bing.net/th/id/OIP.9jLM-wEi-XCg50iUnWEyPQHaJN?pid=Api&P=0&h=180" alt="Pixel 7 Pro" />
          </div>
          <div className="content15">
            <h3>Google Pixel 7 Pro<br />Hazel 128GB</h3>
            <div className="market-prices">
              <span>Amazon: <s className="high">$799</s></span>
              <span>Flipkart: <s className="high">$750</s></span>
            </div>
            <p><span className="new-price">$649</span></p>
            <button 
              className="cart-btn15"
              onClick={() => handleAddToCart({ name: "Google Pixel 7 Pro", price: 649, category: "Smartphones", image: "https://tse2.mm.bing.net/th/id/OIP.9jLM-wEi-XCg50iUnWEyPQHaJN?pid=Api&P=0&h=180" })}
              disabled={loading}
            >
              Add to Cart
            </button>
          </div>
        </div>

        {/* BOX 6 - Pixel 6a */}
        <div className="box15">
          <div className="img-wrapper">
            <img src="https://tse2.mm.bing.net/th/id/OIP.wtneW3_PpJ_Ca8kcThHZXAHaHa?pid=Api&P=0&h=180" alt="Pixel 6a" />
          </div>
          <div className="content15">
            <h3>Google Pixel 6a<br />Chalk White</h3>
            <div className="market-prices">
              <span>Amazon: <s className="high">$399</s></span>
              <span>Flipkart: <s className="high">$350</s></span>
            </div>
            <p><span className="new-price">$299</span></p>
            <button 
              className="cart-btn15"
              onClick={() => handleAddToCart({ name: "Google Pixel 6a", price: 299, category: "Smartphones", image: "https://tse2.mm.bing.net/th/id/OIP.wtneW3_PpJ_Ca8kcThHZXAHaHa?pid=Api&P=0&h=180" })}
              disabled={loading}
            >
              Add to Cart
            </button>
          </div>
        </div>

        {/* BOX 7 - Pixel 7 */}
        <div className="box15">
          <div className="img-wrapper">
            <img src="https://tse3.mm.bing.net/th/id/OIP.wXXeiF_vLrFycXQ6C_RRAAHaJV?pid=Api&P=0&h=180" alt="Pixel 7" />
          </div>
          <div className="content15">
            <h3>Google Pixel 7<br />Lemongrass</h3>
            <div className="market-prices">
              <span>Amazon: <s className="high">$599</s></span>
              <span>Flipkart: <s className="high">$549</s></span>
            </div>
            <p><span className="new-price">$499</span></p>
            <button 
              className="cart-btn15"
              onClick={() => handleAddToCart({ name: "Google Pixel 7", price: 499, category: "Smartphones", image: "https://tse3.mm.bing.net/th/id/OIP.wXXeiF_vLrFycXQ6C_RRAAHaJV?pid=Api&P=0&h=180" })}
              disabled={loading}
            >
              Add to Cart
            </button>
          </div>
        </div>

        {/* BOX 8 - Pixel 8a */}
        <div className="box15">
          <div className="img-wrapper">
            <img src="https://tse1.mm.bing.net/th/id/OIP.ogZpanapgfwU3aA6nYfUjAHaI-?pid=Api&P=0&h=180" alt="Pixel 8a" />
          </div>
          <div className="content15">
            <h3>Google Pixel 8a<br />Aloe Green 128GB</h3>
            <div className="market-prices">
              <span>Amazon: <s className="high">$549</s></span>
              <span>Flipkart: <s className="high">$529</s></span>
            </div>
            <p><span className="new-price">$499</span></p>
            <button 
              className="cart-btn15"
              onClick={() => handleAddToCart({ name: "Google Pixel 8a", price: 499, category: "Smartphones", image: "https://tse1.mm.bing.net/th/id/OIP.ogZpanapgfwU3aA6nYfUjAHaI-?pid=Api&P=0&h=180" })}
              disabled={loading}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      <h1 className="special">POCO Series</h1>
      <div className="container15">
        {/* BOX 1 - POCO X8 Pro Max */}
        <div className="box15">
          <div className="img-wrapper">
            <img src="https://fdn2.gsmarena.com/vv/bigpic/xiaomi-poco-x6-pro.jpg" alt="POCO X8 Pro Max" />
          </div>
          <div className="content15">
            <h3>POCO X8 Pro Max<br />Midnight Blue 512GB</h3>
            <div className="market-prices">
              <span>Amazon: <s className="high">$549</s></span>
              <span>Flipkart: <s className="high">$530</s></span>
            </div>
            <p><span className="new-price">$499</span></p>
            <button 
              className="cart-btn15"
              onClick={() => handleAddToCart({ name: "POCO X8 Pro Max", price: 499, category: "Smartphones", image: "https://fdn2.gsmarena.com/vv/bigpic/xiaomi-poco-x6-pro.jpg" })}
              disabled={loading}
            >
              Add to Cart
            </button>
          </div>
        </div>

        {/* BOX 2 - POCO F7 5G */}
        <div className="box15">
          <div className="img-wrapper">
            <img src="https://fdn2.gsmarena.com/vv/bigpic/xiaomi-poco-f6.jpg" alt="POCO F7" />
          </div>
          <div className="content15">
            <h3>POCO F7 5G<br />Titanium Silver 256GB</h3>
            <div className="market-prices">
              <span>Amazon: <s className="high">$450</s></span>
              <span>Flipkart: <s className="high">$435</s></span>
            </div>
            <p><span className="new-price">$399</span></p>
            <button 
              className="cart-btn15"
              onClick={() => handleAddToCart({ name: "POCO F7 5G", price: 399, category: "Smartphones", image: "https://fdn2.gsmarena.com/vv/bigpic/xiaomi-poco-f6.jpg" })}
              disabled={loading}
            >
              Add to Cart
            </button>
          </div>
        </div>

        {/* BOX 3 - POCO X8 Pro */}
        <div className="box15">
          <div className="img-wrapper">
            <img src="https://fdn2.gsmarena.com/vv/bigpic/xiaomi-poco-x6.jpg" alt="POCO X8 Pro" />
          </div>
          <div className="content15">
            <h3>POCO X8 Pro<br />Spectra Black 256GB</h3>
            <div className="market-prices">
              <span>Amazon: <s className="high">$420</s></span>
              <span>Flipkart: <s className="high">$410</s></span>
            </div>
            <p><span className="new-price">$379</span></p>
            <button 
              className="cart-btn15"
              onClick={() => handleAddToCart({ name: "POCO X8 Pro", price: 379, category: "Smartphones", image: "https://fdn2.gsmarena.com/vv/bigpic/xiaomi-poco-x6.jpg" })}
              disabled={loading}
            >
              Add to Cart
            </button>
          </div>
        </div>

        {/* BOX 4 - POCO M8 Pro */}
        <div className="box15">
          <div className="img-wrapper">
            <img src="https://fdn2.gsmarena.com/vv/bigpic/xiaomi-poco-m6-pro.jpg" alt="POCO M8 Pro" />
          </div>
          <div className="content15">
            <h3>POCO M8 Pro<br />Power Black 128GB</h3>
            <div className="market-prices">
              <span>Amazon: <s className="high">$299</s></span>
              <span>Flipkart: <s className="high">$285</s></span>
            </div>
            <p><span className="new-price">$249</span></p>
            <button 
              className="cart-btn15"
              onClick={() => handleAddToCart({ name: "POCO M8 Pro", price: 249, category: "Smartphones", image: "https://fdn2.gsmarena.com/vv/bigpic/xiaomi-poco-m6-pro.jpg" })}
              disabled={loading}
            >
              Add to Cart
            </button>
          </div>
        </div>

        {/* BOX 5 - POCO X7 Pro */}
        <div className="box15">
          <div className="img-wrapper">
            <img src="https://fdn2.gsmarena.com/vv/bigpic/xiaomi-poco-x5-pro-5g.jpg" alt="POCO X7 Pro" />
          </div>
          <div className="content15">
            <h3>POCO X7 Pro<br />POCO Yellow 256GB</h3>
            <div className="market-prices">
              <span>Amazon: <s className="high">$320</s></span>
              <span>Flipkart: <s className="high">$300</s></span>
            </div>
            <p><span className="new-price">$279</span></p>
            <button 
              className="cart-btn15"
              onClick={() => handleAddToCart({ name: "POCO X7 Pro", price: 279, category: "Smartphones", image: "https://fdn2.gsmarena.com/vv/bigpic/xiaomi-poco-x5-pro-5g.jpg" })}
              disabled={loading}
            >
              Add to Cart
            </button>
          </div>
        </div>

        {/* BOX 6 - POCO M8 5G */}
        <div className="box15">
          <div className="img-wrapper">
            <img src="https://www.gizmochina.com/wp-content/uploads/2026/01/Poco-M8-5G-blue.png?x10805" alt="POCO M8" />
          </div>
          <div className="content15">
            <h3>POCO M8 5G<br />Ocean Blue 128GB</h3>
            <div className="market-prices">
              <span>Amazon: <s className="high">$220</s></span>
              <span>Flipkart: <s className="high">$210</s></span>
            </div>
            <p><span className="new-price">$189</span></p>
            <button 
              className="cart-btn15"
              onClick={() => handleAddToCart({ name: "POCO M8 5G", price: 189, category: "Smartphones", image: "https://www.gizmochina.com/wp-content/uploads/2026/01/Poco-M8-5G-blue.png?x10805" })}
              disabled={loading}
            >
              Add to Cart
            </button>
          </div>
        </div>

        {/* BOX 7 - POCO C81 Pro */}
        <div className="box15">
          <div className="img-wrapper">
            <img src="https://fdn2.gsmarena.com/vv/bigpic/xiaomi-poco-c65.jpg" alt="POCO C81 Pro" />
          </div>
          <div className="content15">
            <h3>POCO C81 Pro<br />Forest Green 128GB</h3>
            <div className="market-prices">
              <span>Amazon: <s className="high">$160</s></span>
              <span>Flipkart: <s className="high">$150</s></span>
            </div>
            <p><span className="new-price">$129</span></p>
            <button 
              className="cart-btn15"
              onClick={() => handleAddToCart({ name: "POCO C81 Pro", price: 129, category: "Smartphones", image: "https://fdn2.gsmarena.com/vv/bigpic/xiaomi-poco-c65.jpg" })}
              disabled={loading}
            >
              Add to Cart
            </button>
          </div>
        </div>

        {/* BOX 8 - POCO C81 */}
        <div className="box15">
          <div className="img-wrapper">
            <img src="https://fdn2.gsmarena.com/vv/bigpic/xiaomi-poco-c55.jpg" alt="POCO C81" />
          </div>
          <div className="content15">
            <h3>POCO C81<br />Cool Blue 64GB</h3>
            <div className="market-prices">
              <span>Amazon: <s className="high">$130</s></span>
              <span>Flipkart: <s className="high">$125</s></span>
            </div>
            <p><span className="new-price">$109</span></p>
            <button 
              className="cart-btn15"
              onClick={() => handleAddToCart({ name: "POCO C81", price: 109, category: "Smartphones", image: "https://fdn2.gsmarena.com/vv/bigpic/xiaomi-poco-c55.jpg" })}
              disabled={loading}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      <h1 className="special">TECNO Series</h1>
      <div className="container15">
        {/* BOX 1 - Tecno Phantom V Fold 2 */}
        <div className="box15">
          <div className="img-wrapper">
            <img src="https://cdn.beebom.com/mobile/tecno-phantom-v-fold-2/tecno-phantom-v-fold2-front-back-1.png" alt="Phantom V Fold 2" />
          </div>
          <div className="content15">
            <h3>Tecno Phantom V Fold 2<br />Karst Green 512GB</h3>
            <div className="market-prices">
              <span>Amazon: <s className="high">$1299</s></span>
              <span>Flipkart: <s className="high">$1250</s></span>
            </div>
            <p><span className="new-price">$1199</span></p>
            <button 
              className="cart-btn15"
              onClick={() => handleAddToCart({ name: "Tecno Phantom V Fold 2", price: 1199, category: "Smartphones", image: "https://cdn.beebom.com/mobile/tecno-phantom-v-fold-2/tecno-phantom-v-fold2-front-back-1.png" })}
              disabled={loading}
            >
              Add to Cart
            </button>
          </div>
        </div>

        {/* BOX 2 - Tecno Camon 30 Premier */}
        <div className="box15">
          <div className="img-wrapper">
            <img src="https://assets.boutique.orange.sn/files/2024-10/tecno-camon-30-premier-5g_SNOWY_SILVER_4.png" alt="Camon 30 Premier" />
          </div>
          <div className="content15">
            <h3>Tecno Camon 30 Premier<br />Snowy Silver 512GB</h3>
            <div className="market-prices">
              <span>Amazon: <s className="high">$549</s></span>
              <span>Flipkart: <s className="high">$499</s></span>
            </div>
            <p><span className="new-price">$479</span></p>
            <button 
              className="cart-btn15"
              onClick={() => handleAddToCart({ name: "Tecno Camon 30 Premier", price: 479, category: "Smartphones", image: "https://assets.boutique.orange.sn/files/2024-10/tecno-camon-30-premier-5g_SNOWY_SILVER_4.png" })}
              disabled={loading}
            >
              Add to Cart
            </button>
          </div>
        </div>

        {/* BOX 3 - Tecno Pova 7 Pro 5G */}
        <div className="box15">
          <div className="img-wrapper">
            <img src="https://tse3.mm.bing.net/th/id/OIP.sqjyq1ro0akk02yklUfT-gHaHa?pid=Api&P=0&h=180" alt="Pova 7 Pro" />
          </div>
          <div className="content15">
            <h3>Tecno Pova 7 Pro 5G<br />Meteorite Gray 256GB</h3>
            <div className="market-prices">
              <span>Amazon: <s className="high">$299</s></span>
              <span>Flipkart: <s className="high">$280</s></span>
            </div>
            <p><span className="new-price">$249</span></p>
            <button 
              className="cart-btn15"
              onClick={() => handleAddToCart({ name: "Tecno Pova 7 Pro 5G", price: 249, category: "Smartphones", image: "https://tse3.mm.bing.net/th/id/OIP.sqjyq1ro0akk02yklUfT-gHaHa?pid=Api&P=0&h=180" })}
              disabled={loading}
            >
              Add to Cart
            </button>
          </div>
        </div>

        {/* BOX 4 - Tecno Spark 20 Pro+ */}
        <div className="box15">
          <div className="img-wrapper">
            <img src="https://tse2.mm.bing.net/th/id/OIP.isA7c08PnZzEoOknA8EyJAHaHa?pid=Api&P=0&h=180" alt="Spark 20 Pro+" />
          </div>
          <div className="content15">
            <h3>Tecno Spark 20 Pro+<br />Lunar Frost 256GB</h3>
            <div className="market-prices">
              <span>Amazon: <s className="high">$220</s></span>
              <span>Flipkart: <s className="high">$210</s></span>
            </div>
            <p><span className="new-price">$189</span></p>
            <button 
              className="cart-btn15"
              onClick={() => handleAddToCart({ name: "Tecno Spark 20 Pro+", price: 189, category: "Smartphones", image: "https://tse2.mm.bing.net/th/id/OIP.isA7c08PnZzEoOknA8EyJAHaHa?pid=Api&P=0&h=180" })}
              disabled={loading}
            >
              Add to Cart
            </button>
          </div>
        </div>

        {/* BOX 5 - Tecno Phantom X2 Pro */}
        <div className="box15">
          <div className="img-wrapper">
            <img src="https://fdn2.gsmarena.com/vv/bigpic/tecno-phantom-x2-pro.jpg" alt="Phantom X2 Pro" />
          </div>
          <div className="content15">
            <h3>Tecno Phantom X2 Pro<br />Mars Orange 256GB</h3>
            <div className="market-prices">
              <span>Amazon: <s className="high">$699</s></span>
              <span>Flipkart: <s className="high">$650</s></span>
            </div>
            <p><span className="new-price">$599</span></p>
            <button 
              className="cart-btn15"
              onClick={() => handleAddToCart({ name: "Tecno Phantom X2 Pro", price: 599, category: "Smartphones", image: "https://fdn2.gsmarena.com/vv/bigpic/tecno-phantom-x2-pro.jpg" })}
              disabled={loading}
            >
              Add to Cart
            </button>
          </div>
        </div>

        {/* BOX 6 - Tecno Camon 30 5G */}
        <div className="box15">
          <div className="img-wrapper">
            <img src="https://fdn2.gsmarena.com/vv/bigpic/tecno-camon-30-5g.jpg" alt="Camon 30 5G" />
          </div>
          <div className="content15">
            <h3>Tecno Camon 30 5G<br />Iceland Ice Blue 256GB</h3>
            <div className="market-prices">
              <span>Amazon: <s className="high">$350</s></span>
              <span>Flipkart: <s className="high">$330</s></span>
            </div>
            <p><span className="new-price">$299</span></p>
            <button 
              className="cart-btn15"
              onClick={() => handleAddToCart({ name: "Tecno Camon 30 5G", price: 299, category: "Smartphones", image: "https://fdn2.gsmarena.com/vv/bigpic/tecno-camon-30-5g.jpg" })}
              disabled={loading}
            >
              Add to Cart
            </button>
          </div>
        </div>

        {/* BOX 7 - Tecno Spark 50 5G */}
        <div className="box15">
          <div className="img-wrapper">
            <img src="https://fdn2.gsmarena.com/vv/bigpic/tecno-spark-20.jpg" alt="Spark 50" />
          </div>
          <div className="content15">
            <h3>Tecno Spark 50 5G<br />Neon Gold 128GB</h3>
            <div className="market-prices">
              <span>Amazon: <s className="high">$199</s></span>
              <span>Flipkart: <s className="high">$185</s></span>
            </div>
            <p><span className="new-price">$159</span></p>
            <button 
              className="cart-btn15"
              onClick={() => handleAddToCart({ name: "Tecno Spark 50 5G", price: 159, category: "Smartphones", image: "https://fdn2.gsmarena.com/vv/bigpic/tecno-spark-20.jpg" })}
              disabled={loading}
            >
              Add to Cart
            </button>
          </div>
        </div>

        {/* BOX 8 - Tecno Pop 9 5G */}
        <div className="box15">
          <div className="img-wrapper">
            <img src="https://tse2.mm.bing.net/th/id/OIP.S91SyNKU2NpRzjOtUXNNUQHaHa?pid=Api&P=0&h=180" alt="Pop 9" />
          </div>
          <div className="content15">
            <h3>Tecno Pop 9 5G<br />Mystery White 128GB</h3>
            <div className="market-prices">
              <span>Amazon: <s className="high">$150</s></span>
              <span>Flipkart: <s className="high">$140</s></span>
            </div>
            <p><span className="new-price">$119</span></p>
            <button 
              className="cart-btn15"
              onClick={() => handleAddToCart({ name: "Tecno Pop 9 5G", price: 119, category: "Smartphones", image: "https://tse2.mm.bing.net/th/id/OIP.S91SyNKU2NpRzjOtUXNNUQHaHa?pid=Api&P=0&h=180" })}
              disabled={loading}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      <h1 className="special">Motorola Series</h1>
      <div className="container15">
        {/* BOX 1 - Motorola Razr 2026 */}
        <div className="box15">
          <div className="img-wrapper">
            <img src="https://tse1.mm.bing.net/th/id/OIP.YH2Xkl42MfICyTER3CDjTQHaGL?pid=Api&P=0&h=180" alt="Razr 2026" />
          </div>
          <div className="content15">
            <h3>Motorola Razr 2026<br />Orient Blue Alcantara</h3>
            <div className="market-prices">
              <span>Amazon: <s className="high">$899</s></span>
              <span>Flipkart: <s className="high">$850</s></span>
            </div>
            <p><span className="new-price">$799</span></p>
            <button 
              className="cart-btn15"
              onClick={() => handleAddToCart({ name: "Motorola Razr 2026", price: 799, category: "Smartphones", image: "https://tse1.mm.bing.net/th/id/OIP.YH2Xkl42MfICyTER3CDjTQHaGL?pid=Api&P=0&h=180" })}
              disabled={loading}
            >
              Add to Cart
            </button>
          </div>
        </div>

        {/* BOX 2 - Motorola Edge 60 Pro */}
        <div className="box15">
          <div className="img-wrapper">
            <img src="https://tse4.mm.bing.net/th/id/OIP.WeRPzpZeUkXwemIWzssSSQHaHa?pid=Api&P=0&h=180" alt="Edge 60 Pro" />
          </div>
          <div className="content15">
            <h3>Motorola Edge 60 Pro<br />Sparkling Grape 512GB</h3>
            <div className="market-prices">
              <span>Amazon: <s className="high">$649</s></span>
              <span>Flipkart: <s className="high">$599</s></span>
            </div>
            <p><span className="new-price">$549</span></p>
            <button 
              className="cart-btn15"
              onClick={() => handleAddToCart({ name: "Motorola Edge 60 Pro", price: 549, category: "Smartphones", image: "https://tse4.mm.bing.net/th/id/OIP.WeRPzpZeUkXwemIWzssSSQHaHa?pid=Api&P=0&h=180" })}
              disabled={loading}
            >
              Add to Cart
            </button>
          </div>
        </div>

        {/* BOX 3 - Motorola Razr+ 2026 */}
        <div className="box15">
          <div className="img-wrapper">
            <img src="https://tse3.mm.bing.net/th/id/OIP.O3cbZWpi577st7NNqPybAwHaHa?pid=Api&P=0&h=180" alt="Razr+ 2026" />
          </div>
          <div className="content15">
            <h3>Motorola Razr+ 2026<br />Cocoa Wood 256GB</h3>
            <div className="market-prices">
              <span>Amazon: <s className="high">$1199</s></span>
              <span>Flipkart: <s className="high">$1150</s></span>
            </div>
            <p><span className="new-price">$1099</span></p>
            <button 
              className="cart-btn15"
              onClick={() => handleAddToCart({ name: "Motorola Razr+ 2026", price: 1099, category: "Smartphones", image: "https://tse3.mm.bing.net/th/id/OIP.O3cbZWpi577st7NNqPybAwHaHa?pid=Api&P=0&h=180" })}
              disabled={loading}
            >
              Add to Cart
            </button>
          </div>
        </div>

        {/* BOX 4 - Moto G86 Power */}
        <div className="box15">
          <div className="img-wrapper">
            <img src="https://tse3.mm.bing.net/th/id/OIP.nK6Jj4K_92bMgpSOP2XX_AHaHa?pid=Api&P=0&h=180" alt="Moto G86 Power" />
          </div>
          <div className="content15">
            <h3>Moto G86 Power<br />Forest Green 256GB</h3>
            <div className="market-prices">
              <span>Amazon: <s className="high">$349</s></span>
              <span>Flipkart: <s className="high">$320</s></span>
            </div>
            <p><span className="new-price">$299</span></p>
            <button 
              className="cart-btn15"
              onClick={() => handleAddToCart({ name: "Moto G86 Power", price: 299, category: "Smartphones", image: "https://tse3.mm.bing.net/th/id/OIP.nK6Jj4K_92bMgpSOP2XX_AHaHa?pid=Api&P=0&h=180" })}
              disabled={loading}
            >
              Add to Cart
            </button>
          </div>
        </div>

        {/* BOX 5 - Motorola Edge 60 Fusion */}
        <div className="box15">
          <div className="img-wrapper">
            <img src="https://tse3.mm.bing.net/th/id/OIP.LdzGQ1kMMnKM5SnygM-kpgHaHa?pid=Api&P=0&h=180" alt="Edge 60 Fusion" />
          </div>
          <div className="content15">
            <h3>Motorola Edge 60 Fusion<br />Marshmallow Blue</h3>
            <div className="market-prices">
              <span>Amazon: <s className="high">$449</s></span>
              <span>Flipkart: <s className="high">$420</s></span>
            </div>
            <p><span className="new-price">$379</span></p>
            <button 
              className="cart-btn15"
              onClick={() => handleAddToCart({ name: "Motorola Edge 60 Fusion", price: 379, category: "Smartphones", image: "https://tse3.mm.bing.net/th/id/OIP.LdzGQ1kMMnKM5SnygM-kpgHaHa?pid=Api&P=0&h=180" })}
              disabled={loading}
            >
              Add to Cart
            </button>
          </div>
        </div>

        {/* BOX 6 - Moto G67 Power 5G */}
        <div className="box15">
          <div className="img-wrapper">
            <img src="https://fdn2.gsmarena.com/vv/bigpic/motorola-moto-g64.jpg" alt="Moto G67 Power" />
          </div>
          <div className="content15">
            <h3>Moto G67 Power 5G<br />Ink Blue 128GB</h3>
            <div className="market-prices">
              <span>Amazon: <s className="high">$279</s></span>
              <span>Flipkart: <s className="high">$250</s></span>
            </div>
            <p><span className="new-price">$229</span></p>
            <button 
              className="cart-btn15"
              onClick={() => handleAddToCart({ name: "Moto G67 Power 5G", price: 229, category: "Smartphones", image: "https://fdn2.gsmarena.com/vv/bigpic/motorola-moto-g64.jpg" })}
              disabled={loading}
            >
              Add to Cart
            </button>
          </div>
        </div>

        {/* BOX 7 - Motorola Signature */}
        <div className="box15">
          <div className="img-wrapper">
            <img src="https://fdn2.gsmarena.com/vv/bigpic/motorola-edge-50-ultra.jpg" alt="Motorola Signature" />
          </div>
          <div className="content15">
            <h3>Motorola Signature<br />Nordic Wood Edition</h3>
            <div className="market-prices">
              <span>Amazon: <s className="high">$799</s></span>
              <span>Flipkart: <s className="high">$780</s></span>
            </div>
            <p><span className="new-price">$749</span></p>
            <button 
              className="cart-btn15"
              onClick={() => handleAddToCart({ name: "Motorola Signature", price: 749, category: "Smartphones", image: "https://fdn2.gsmarena.com/vv/bigpic/motorola-edge-50-ultra.jpg" })}
              disabled={loading}
            >
              Add to Cart
            </button>
          </div>
        </div>

        {/* BOX 8 - Moto G06 Power */}
        <div className="box15">
          <div className="img-wrapper">
            <img src="https://tse4.mm.bing.net/th/id/OIP.5zCJQQmkTTO4BsRGiF11RgHaF7?pid=Api&P=0&h=180" alt="Moto G06 Power" />
          </div>
          <div className="content15">
            <h3>Moto G06 Power<br />Satin Blue 64GB</h3>
            <div className="market-prices">
              <span>Amazon: <s className="high">$149</s></span>
              <span>Flipkart: <s className="high">$130</s></span>
            </div>
            <p><span className="new-price">$119</span></p>
            <button 
              className="cart-btn15"
              onClick={() => handleAddToCart({ name: "Moto G06 Power", price: 119, category: "Smartphones", image: "https://tse4.mm.bing.net/th/id/OIP.5zCJQQmkTTO4BsRGiF11RgHaF7?pid=Api&P=0&h=180" })}
              disabled={loading}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      <h1 className="special">Infinix Series</h1>
      <div className="container15">
        {/* BOX 1 - Infinix Note 40 Pro+ 5G */}
        <div className="box15">
          <div className="img-wrapper">
            <img src="https://tse2.mm.bing.net/th/id/OIP.stL4WgtJRiLrLE0_lcDR7AHaHa?pid=Api&P=0&h=180" alt="Note 40 Pro+" />
          </div>
          <div className="content15">
            <h3>Infinix Note 40 Pro+<br />Vintage Green 256GB</h3>
            <div className="market-prices">
              <span>Amazon: <s className="high">$329</s></span>
              <span>Flipkart: <s className="high">$310</s></span>
            </div>
            <p><span className="new-price">$299</span></p>
            <button 
              className="cart-btn15"
              onClick={() => handleAddToCart({ name: "Infinix Note 40 Pro+", price: 299, category: "Smartphones", image: "https://tse2.mm.bing.net/th/id/OIP.stL4WgtJRiLrLE0_lcDR7AHaHa?pid=Api&P=0&h=180" })}
              disabled={loading}
            >
              Add to Cart
            </button>
          </div>
        </div>

        {/* BOX 2 - Infinix GT 20 Pro */}
        <div className="box15">
          <div className="img-wrapper">
            <img src="https://fdn2.gsmarena.com/vv/bigpic/infinix-gt-20-pro.jpg" alt="GT 20 Pro" />
          </div>
          <div className="content15">
            <h3>Infinix GT 20 Pro<br />Mecha Blue 256GB</h3>
            <div className="market-prices">
              <span>Amazon: <s className="high">$350</s></span>
              <span>Flipkart: <s className="high">$335</s></span>
            </div>
            <p><span className="new-price">$319</span></p>
            <button 
              className="cart-btn15"
              onClick={() => handleAddToCart({ name: "Infinix GT 20 Pro", price: 319, category: "Smartphones", image: "https://fdn2.gsmarena.com/vv/bigpic/infinix-gt-20-pro.jpg" })}
              disabled={loading}
            >
              Add to Cart
            </button>
          </div>
        </div>

        {/* BOX 3 - Infinix Zero 30 5G */}
        <div className="box15">
          <div className="img-wrapper">
            <img src="https://tse3.mm.bing.net/th/id/OIP.ikJ3hErzIF-xSXoqCDr8iwHaJq?pid=Api&P=0&h=180" alt="Zero 30 5G" />
          </div>
          <div className="content15">
            <h3>Infinix Zero 30 5G<br />Golden Hour 256GB</h3>
            <div className="market-prices">
              <span>Amazon: <s className="high">$299</s></span>
              <span>Flipkart: <s className="high">$285</s></span>
            </div>
            <p><span className="new-price">$269</span></p>
            <button 
              className="cart-btn15"
              onClick={() => handleAddToCart({ name: "Infinix Zero 30 5G", price: 269, category: "Smartphones", image: "https://tse3.mm.bing.net/th/id/OIP.ikJ3hErzIF-xSXoqCDr8iwHaJq?pid=Api&P=0&h=180" })}
              disabled={loading}
            >
              Add to Cart
            </button>
          </div>
        </div>

        {/* BOX 4 - Infinix Note 40 Pro */}
        <div className="box15">
          <div className="img-wrapper">
            <img src="https://tse4.mm.bing.net/th/id/OIP.0A4QS1r0RzeYOStTJS-yqgHaHa?pid=Api&P=0&h=180" alt="Note 40 Pro" />
          </div>
          <div className="content15">
            <h3>Infinix Note 40 Pro<br />Titan Gold 256GB</h3>
            <div className="market-prices">
              <span>Amazon: <s className="high">$259</s></span>
              <span>Flipkart: <s className="high">$240</s></span>
            </div>
            <p><span className="new-price">$229</span></p>
            <button 
              className="cart-btn15"
              onClick={() => handleAddToCart({ name: "Infinix Note 40 Pro", price: 229, category: "Smartphones", image: "https://tse4.mm.bing.net/th/id/OIP.0A4QS1r0RzeYOStTJS-yqgHaHa?pid=Api&P=0&h=180" })}
              disabled={loading}
            >
              Add to Cart
            </button>
          </div>
        </div>

        {/* BOX 5 - Infinix GT 20 Pro (Orange) */}
        <div className="box15">
          <div className="img-wrapper">
            <img src="https://tse1.mm.bing.net/th/id/OIP.iMB6W7O6LFedADR1uPiKLAHaHa?pid=Api&P=0&h=180" alt="GT 20 Pro Orange" style={{filter: "hue-rotate(160deg)"}} />
          </div>
          <div className="content15">
            <h3>Infinix GT 20 Pro<br />Mecha Orange 256GB</h3>
            <div className="market-prices">
              <span>Amazon: <s className="high">$355</s></span>
              <span>Flipkart: <s className="high">$340</s></span>
            </div>
            <p><span className="new-price">$319</span></p>
            <button 
              className="cart-btn15"
              onClick={() => handleAddToCart({ name: "Infinix GT 20 Pro", price: 319, category: "Smartphones", image: "https://tse1.mm.bing.net/th/id/OIP.iMB6W7O6LFedADR1uPiKLAHaHa?pid=Api&P=0&h=180" })}
              disabled={loading}
            >
              Add to Cart
            </button>
          </div>
        </div>

        {/* BOX 6 - Infinix Hot 40 Pro */}
        <div className="box15">
          <div className="img-wrapper">
            <img src="https://tse4.mm.bing.net/th/id/OIP.UojPw_2k8a4nhmO6R1wuiQHaJK?pid=Api&P=0&h=180" alt="Hot 40 Pro" />
          </div>
          <div className="content15">
            <h3>Infinix Hot 40 Pro<br />Palm Blue 128GB</h3>
            <div className="market-prices">
              <span>Amazon: <s className="high">$199</s></span>
              <span>Flipkart: <s className="high">$180</s></span>
            </div>
            <p><span className="new-price">$169</span></p>
            <button 
              className="cart-btn15"
              onClick={() => handleAddToCart({ name: "Infinix Hot 40 Pro", price: 169, category: "Smartphones", image: "https://tse4.mm.bing.net/th/id/OIP.UojPw_2k8a4nhmO6R1wuiQHaJK?pid=Api&P=0&h=180" })}
              disabled={loading}
            >
              Add to Cart
            </button>
          </div>
        </div>

        {/* BOX 7 - Infinix Smart 8 */}
        <div className="box15">
          <div className="img-wrapper">
            <img src="https://tse2.mm.bing.net/th/id/OIP.W3XIxZkkVDAjuPm9PnFjZQHaFh?pid=Api&P=0&h=180" alt="Smart 8" />
          </div>
          <div className="content15">
            <h3>Infinix Smart 8<br />Shiny Gold 64GB</h3>
            <div className="market-prices">
              <span>Amazon: <s className="high">$119</s></span>
              <span>Flipkart: <s className="high">$110</s></span>
            </div>
            <p><span className="new-price">$99</span></p>
            <button 
              className="cart-btn15"
              onClick={() => handleAddToCart({ name: "Infinix Smart 8", price: 99, category: "Smartphones", image: "https://tse2.mm.bing.net/th/id/OIP.W3XIxZkkVDAjuPm9PnFjZQHaFh?pid=Api&P=0&h=180" })}
              disabled={loading}
            >
              Add to Cart
            </button>
          </div>
        </div>

        {/* BOX 8 - Infinix Note 40 Pro+ (Black) */}
        <div className="box15">
          <div className="img-wrapper">
            <img src="https://tse2.mm.bing.net/th/id/OIP.TylLIU-UuKdp-KqC8cQTSgAAAA?pid=Api&P=0&h=180" alt="Note 40 Pro+ Black" style={{filter: "grayscale(100%)"}} />
          </div>
          <div className="content15">
            <h3>Infinix Note 40 Pro+<br />Obsidian Black 256GB</h3>
            <div className="market-prices">
              <span>Amazon: <s className="high">$329</s></span>
              <span>Flipkart: <s className="high">$315</s></span>
            </div>
            <p><span className="new-price">$299</span></p>
            <button 
              className="cart-btn15"
              onClick={() => handleAddToCart({ name: "Infinix Note 40 Pro+", price: 299, category: "Smartphones", image: "https://tse2.mm.bing.net/th/id/OIP.TylLIU-UuKdp-KqC8cQTSgAAAA?pid=Api&P=0&h=180" })}
              disabled={loading}
            >
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

          {/* Newsletter Column */}
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

export default Shop;