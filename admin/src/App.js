import React, { useState } from 'react';
import { Routes, Route, Link, Navigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 

// Component Imports
import Dashboard from './Components/Dashboard'; 
import Order from './Components/Order';
import AddProduct from './Components/AddProduct';
import AllProduct from './Components/AllProduct';
import Login from './Components/Login'; 
import EditProduct from './Components/EditProduct';

import './App.css';

function App() {
  const [isOpen, setIsOpen] = useState(false);

  // --- LOGIC FOR ADMIN LOGOUT ---
  const handleLogout = () => {
    // 1. Fire the success notification toast instantly
    toast.success("Admin Logout Successfully!", {
      position: "top-right",
      autoClose: 1500,
      theme: "dark",
    });

    // 2. Redirect straight out to the other port after 1.5 seconds
    setTimeout(() => {
      localStorage.clear(); 
      window.location.href = "https://mobile-shop-2.onrender.com"; 
    }, 1500);
  };

  const isAuthenticated = !!localStorage.getItem("token");

  return (
    <div className="admin-wrapper">
      <ToastContainer />

      {isAuthenticated && (
        <>
          <button className="hamburger" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? '✕' : '☰'}
          </button>
          
          <aside className={`sidebar ${isOpen ? 'active' : ''}`}>
            <div className="sidebar-brand">Admin Panel</div>
            <nav className="nav-menu">
              <Link to="/Dashboard" onClick={() => setIsOpen(false)}>📊 Dashboard</Link>
              <Link to="/orders" onClick={() => setIsOpen(false)}>📦 Orders</Link>
              <Link to="/add" onClick={() => setIsOpen(false)}>➕ Add Product</Link>
              <Link to="/all" onClick={() => setIsOpen(false)}>📱 All Products</Link>
              
              <div className="sidebar-footer">
                <button 
                  onClick={handleLogout} 
                  className="exit-link"
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: '#ff4b2b',
                    cursor: 'pointer',
                    textAlign: 'left',
                    padding: '15px 25px',
                    fontSize: 'inherit',
                    width: '100%',
                    fontWeight: 'bold'
                  }}
                >
                  Logout 🚪
                </button>
              </div>
            </nav>
          </aside>
          {isOpen && <div className="sidebar-overlay" onClick={() => setIsOpen(false)}></div>}
        </>
      )}

      <main className={isAuthenticated ? "main-content" : "login-content"}>
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route 
            path="/Dashboard" 
            element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} 
          />
          
          <Route 
            path="/orders" 
            element={isAuthenticated ? <Order /> : <Navigate to="/login" />} 
          />
          
          <Route 
            path="/add" 
            element={isAuthenticated ? <AddProduct /> : <Navigate to="/login" />} 
          />
          
          <Route 
            path="/all" 
            element={isAuthenticated ? <AllProduct /> : <Navigate to="/login" />} 
          />
          
          <Route 
            path="/edit-product/:id" 
            element={isAuthenticated ? <EditProduct /> : <Navigate to="/login" />} 
          />

          <Route 
            path="/" 
            element={<Navigate to={isAuthenticated ? "/Dashboard" : "/login"} replace />} 
          />

          <Route 
            path="*" 
            element={<Navigate to={isAuthenticated ? "/Dashboard" : "/login"} replace />} 
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;