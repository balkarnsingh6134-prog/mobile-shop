import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from './CartContext'; // Import the hook to access cart items

const Home = () => {
  // Access cartItems from your global CartContext
  const { cartItems } = useCart();

  // Calculate the total quantity of items for the badge
  const cartCount = cartItems.reduce((acc, item) => acc + (parseInt(item.quantity) || 0), 0);

  // Search function placeholder
  const handleSearch = () => {
    const query = document.getElementById('searchBox')?.value;
    console.log("Searching for:", query);
  };

  return (
    <div>
      {/* Head Metadata */}
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Mobile Shop</title>
      <link rel="stylesheet" href="mobile.css" />
      
      {/* NAVBAR 1 (TOP BAR) */}
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

      {/* NAVBAR 2 (MENU BAR) */}
      <div className="navbar2">
        <ul id="nav2">
          <li><Link to="/Home">Home</Link></li>
          <li><Link to="/latest">Latest Products</Link></li>
          <li><Link to="/shop">Shop</Link></li>
          <li><Link to="/About">About</Link></li>
          <li><Link to="/Contact">Contact Us</Link></li>
        </ul>
      </div>

      {/* HERO VIDEO SECTION */}
      <div className="video-container">
        {/* Background Video */}
        <video autoPlay muted loop playsInline className="bg-video">
          <source src="/WhatsApp Video 2026-03-25 at 9.25.03 PM.mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Content Overlay */}
        <div className="content">
          <h1>Buying a mobile help you stay connected anytime.</h1>
          <h1>It gives you instant access to information and entertainment.</h1>
          
          {/* Shop Button */}
          <Link to="/shop" className="shop-button">Shop Now</Link>
        </div>
      </div>

      {/* DISCOUNT CARDS */}
      <div className="container2">
        <div className="card2">
          <img src="https://images.pexels.com/photos/248526/pexels-photo-248526.jpeg?cs=srgb&dl=pexels-pixabay-248526.jpg&fm=jpg" alt="Image 2" />
          <div className="content2">
            <h4>Up to 30% discount</h4>
            <p>Helpful Features Just In Case. Starting $39.99</p>
             <Link to="/shop" className="see-more-link">See More</Link>
          </div>
        </div>

        <div className="card2">
          <img src="https://tse3.mm.bing.net/th/id/OIP.OHlCjV8A4iffAqa-G4RqVQHaEK?rs=1&pid=ImgDetMain&o=7&rm=3" alt="Image 3" />
          <div className="content2">
            <h4>Up to 10% discount</h4>
            <p>Hyper Realistic Ultra Smooth Starting $45.69</p>
             <Link to="/shop" className="see-more-link">See More</Link>
          </div>
        </div>

        <div className="card2">
          <img src="https://images.unsplash.com/photo-1546054454-aa26e2b734c7?q=80&w=500" alt="Product 3" />
          <div className="content2">
            <h4>Up to 20% discount</h4>
            <p>Honor Magic6 Pro 5G Starting $99.99</p>
            <Link to="/shop" className="see-more-link">See More</Link>
          </div>
        </div>
      </div>

      {/* ABOUT SECTION */}
      <section className="about-section">
        <div className="container17">
          {/* Left Side Image */}
          <div className="about-image">
            <div className="image-wrapper">
              <img src="https://tse1.mm.bing.net/th/id/OIP.nhElXNBK4-RkWVuslTtPSQHaEK?rs=1&pid=ImgDetMain&o=7&rm=3" alt="Our Store" />
              <div className="image-experience-badge">
                <span>10+</span>
                <p>Years</p>
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
              simplicity, modern design, and customer satisfaction.
            </p>
            
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

      {/* LATEST PRODUCTS SECTION */}
      <h1 className="special">Latest-Product</h1>
      <div className="container3">
        {/* Card 1 */}
        <div className="card3">
          <img src="https://cdn.mos.cms.futurecdn.net/N8HvTtX5JAwd6C5Y2WLZZC.jpg" alt="Image 1" />
          <a href="/Shop" className="see-more-link-3">See More</a>
          <div className="content3">
            <h4>Up to 30% discount</h4>
            <p>Helpful Features Just In Case. Starting $39.99</p>
          </div>
        </div>

        {/* Card 2 */}
        <div className="card3">
          <img src="https://th.bing.com/th/id/OIP.KJwN8-AFMw-dkbl7WQy1NAHaEK?w=324&h=182&c=7&r=0&o=7&pid=1.7&rm=3" alt="Image 2" />
          <a href="/Shop" className="see-more-link-3">See More</a>
          <div className="content3">
            <h4>Up to 10% discount</h4>
            <p>Hyper Realistic Ultra Smooth. Starting $45.69</p>
          </div>
        </div>

        {/* Card 3 */}
        <div className="card3">
          <img src="https://tse3.mm.bing.net/th/id/OIP.Us2FS6-pFfNW6PwRMjKpPwHaFj?rs=1&pid=ImgDetMain&o=7&rm=3" alt="Image 3" />
          <a href="/Shop" className="see-more-link-3">See More</a>
          <div className="content3">
            <h4>Up to 20% discount</h4>
            <p>Honor Magic6 Pro 5G. Starting $99.99</p>
          </div>
        </div>

        {/* Card 4 */}
        <div className="card3">
          <img src="https://i01.appmifile.com/webfile/globalimg/products/pc/mi-11-lite-5g/overview06_01.jpg" alt="Image 4" />
          <a href="/Shop" className="see-more-link-3">See More</a>
          <div className="content3">
            <h4>Up to 15% discount</h4>
            <p>Smart Design Lightweight. Starting $59.99</p>
          </div>
        </div>
      </div>

      <div className="row">
        {/* Overlay Card 1 */}
        <div className="container4">
          <img src="https://m.media-amazon.com/images/I/61I7ejSq1GL._AC_SL1500_.jpg" alt="Image 1" />
          <div className="overlay-text">The Phone For Seamless Wireless Charging</div>
          <a href="/Shop" className="see-more-link-4">See More</a>
        </div>

        {/* Overlay Card 2 */}
        <div className="container4">
          <img src="https://tse2.mm.bing.net/th/id/OIP.ASzBrGvzXlFKdh_4UvItbgHaJX?rs=1&pid=ImgDetMain&o=7&rm=3" alt="Image 2" />
          <div className="overlay-text">Samsung Galaxy Z Flip6 5G AI Smartphone</div>
          <a href="/Shop" className="see-more-link-4">See More</a>
        </div>

        {/* Overlay Card 3 */}
        <div className="container4">
          <img src="https://5.imimg.com/data5/SELLER/Default/2023/6/314623304/FT/US/PS/92394638/mobatree-blp841-original-mobile-battery-for-realme-8-5000-mah-500x500.JPG" alt="Image 3" />
          <div className="overlay-text">Extend Your Playtime & Enjoy Reliability</div>
          <a href="/Shop" className="see-more-link-4">See More</a>
        </div>

        {/* Overlay Card 4 */}
        <div className="container4">
          <img src="https://th.bing.com/th/id/OIP.WFqiV4aW5hDX16a1UQFAwAHaEO?w=305&h=180&c=7&r=0&o=7&pid=1.7&rm=3" alt="Image 4" />
          <div className="overlay-text">Phone Silent Vibration & Ringing Modes</div>
          <a href="/Shop" className="see-more-link-4">See More</a>
        </div>
      </div>

      {/* PROMOTIONAL SECTION */}
      <div className="container5">
        <div className="textblock5">
          <h3 className="text1">Dual-View Video, HDR, Night Portrait</h3>
          <h1 className="text2">OnePlus Nord Dual Sim Blue 12GB RAM</h1>
          <h3 className="text1">Starting At $299.99</h3>
          <Link to="/oneplus">
            <button className="shop-btn">Shop Now</button>
          </Link>
        </div>
      </div>

      {/* SERVICE BOXES */}
      <div className="container6">
        <div className="box6">
          <img src="https://cdn-icons-png.flaticon.com/128/11425/11425578.png" alt="Shipping" />
          <p className="text6">Free Shipping</p>
        </div>
        <div className="box6">
          <img src="https://cdn-icons-png.flaticon.com/128/19025/19025330.png" alt="Gifts" />
          <p className="text6">Special Gifts</p>
        </div>
        <div className="box6">
          <img src="https://cdn-icons-png.flaticon.com/128/4947/4947118.png" alt="Money Back" />
          <p className="text6">Money Back Guarantee</p>
        </div>
        <div className="box6">
          <img src="https://cdn-icons-png.flaticon.com/128/8480/8480947.png" alt="Discounts" />
          <p className="text6">Offers And Discounts</p>
        </div>
        <div className="box6">
          <img src="https://cdn-icons-png.flaticon.com/128/2020/2020773.png" alt="Support" />
          <p className="text6">24/7 Support Services</p>
        </div>
      </div>

      {/* SPECIAL PRODUCTS */}
      <h1 className="special">Special Products</h1>
      <div className="container7">
        {/* Box 1 - Samsung S21 */}
        <div className="box7">
          <img src="https://cdn-files.kimovil.com/default/0011/36/thumb_1035323_default_big.jpg" alt="S21" />
          <div className="content-box7">
            <h3>Samsung Galaxy S21 128GB Phantom Gray</h3>
            <Link to="/shop" className="see-more-link">See More</Link>
          </div>
        </div>

        {/* Box 2 - iPhone 14 */}
        <div className="box7">
          <img src="https://m.media-amazon.com/images/I/31MX9scnEzL._SY445_SX342_QL70_ML2_.jpg" alt="iPhone 14" />
          <div className="content-box7">
            <h3>iPhone 14 Pro 256GB Deep Purple</h3>
            <Link to="/shop" className="see-more-link">See More</Link>
          </div>
        </div>

        {/* Box 3 - Mi 11 */}
        <div className="box7">
          <img src="https://i01.appmifile.com/v1/MI_18455B3E4DA706226CF7535A58E875F0267/pms_1666344667.93946102.png" alt="Mi 11" />
          <div className="content-box7">
            <h3>Xiaomi Mi 11 8GB RAM 128GB</h3>
            <Link to="/shop" className="see-more-link">See More</Link>
          </div>
        </div>

        {/* Box 4 - Vivo */}
        <div className="box7">
          <img src="https://www.godigit.com/content/dam/godigit/directportal/en/contenthm/vivo-v21e-5g-phones.jpg" alt="Vivo" />
          <div className="content-box7">
            <h3>Vivo V21e 6GB RAM 128GB</h3>
            <Link to="/shop" className="see-more-link">See More</Link>
          </div>
        </div>

        {/* Box 5 - S23 Ultra */}
        <div className="box7">
          <img src="https://www.sammobile.com/wp-content/uploads/2023/02/Samsung-Galaxy-S23-Ultra-Pink.jpg" alt="S23 Ultra" />
          <div className="content-box7">
            <h3>Samsung Galaxy S23 Ultra 512GB Pink</h3>
            <Link to="/shop" className="see-more-link">See More</Link>
          </div>
        </div>
      </div>

      {/* GALLERY / BLOG */}
      <h1 className="special">From The Gallery</h1>
      <div className="container9">
        <div className="box9">
          <img src="https://images.pexels.com/photos/28148337/pexels-photo-28148337.jpeg?cs=srgb&dl=pexels-artofxx-325140257-28148337.jpg&fm=jpg" alt="Blog 1" />
          <p>How To Write a Blog Post Your Readers Will Love in 5 steps</p>
        </div>
        <div className="box9">
          <img src="https://images.pexels.com/photos/325876/pexels-photo-325876.jpeg?cs=srgb&dl=pexels-pixabay-325876.jpg&fm=jpg" alt="Blog 2" />
          <p>9 Content Marketing Trends and ideas to increase Traffic</p>
        </div>
        <div className="box9">
          <img src="https://png.pngtree.com/background/20230517/original/pngtree-several-business-men-and-women-sitting-around-a-conference-table-picture-image_2634547.jpg" alt="Blog 3" />
          <p>The Ultimate Guide to Marketing Strategies to improve Sales</p>
        </div>
        <div className="box9">
          <img src="https://wallpaperaccess.com/full/4121680.jpg" alt="Blog 4" />
          <p>50 Best sales Questions To Determines Your Customer's Needs</p>
        </div>
      </div>

      {/* CONTACT SECTION */}
      <h1 className="special">Contact-Us</h1>
      <section className="contact-section14">
        <div className="container14">
          <div className="contact-map14">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.241264871843!2d-73.98784368459377!3d40.75797477932688!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25855c6480293%3A0x51174706efee326!2sTimes%20Square!5e0!3m2!1sen!2sus!4v1625000000000!5m2!1sen!2sus" title="Map" />
          </div>
          <div className="contact-form14">
            <form action="#" method="post">
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

      {/* TEAM SECTION */}
      <h1 className="special">Meet Our Team</h1>
      <div className="container8">
        <div className="box8">
          <div className="stars">★★★★★</div>
          <div className="image-container">
            <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Founder" />
          </div>
          <div className="content8">
            <h3>John Doe</h3>
            <p>Founder & CEO of Company. Passionate about innovation, technology, and leadership. Loves creating solutions for modern problems.</p>
          </div>
        </div>
        <div className="box8">
          <div className="stars">★★★★★</div>
          <div className="image-container">
            <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="Manager" />
          </div>
          <div className="content8">
            <h3>Jane Smith</h3>
            <p>Operations Manager overseeing daily activities. Skilled in team management and strategy planning, ensuring smooth workflow.</p>
          </div>
        </div>
        <div className="box8">
          <div className="stars">★★★★★</div>
          <div className="image-container">
            <img src="https://randomuser.me/api/portraits/men/56.jpg" alt="CEO" />
          </div>
          <div className="content8">
            <h3>Mike Johnson</h3>
            <p>Chief Executive Officer driving company vision. Expert in business growth and development, inspiring teams to achieve excellence.</p>
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
            <input type="email" placeholder="Your email address" />
            <label>
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

export default Home;