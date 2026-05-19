import React, { useState, useEffect } from 'react'; // Added useEffect
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
  
  // 1. Manage authentication with dynamic state
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("token"));

  // 2. Listen to localStorage changes across updates
  useEffect(() => {
    const checkAuth = () => {
      setIsAuthenticated(!!localStorage.getItem("token"));
    };

    // Check auth status immediately on frame updates
    window.addEventListener('storage', checkAuth);
    const interval = setInterval(checkAuth, 500); // Actively polling checks for immediate local updates

    return () => {
      window.removeEventListener('storage', checkAuth);
      clearInterval(interval);
    };
  }, []);

  // --- LOGIC FOR ADMIN LOGOUT ---
  const handleLogout = () => {
    toast.success("Admin Logout Successfully!", {
      position: "top-right",
      autoClose: 1500,
      theme: "dark",
    });

    setTimeout(() => {
      localStorage.clear(); 
      setIsAuthenticated(false); // Update state instantly on logout
      window.location.href = "https://mobile-shop-2.onrender.com"; 
    }, 1500);
  };

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
          {/* If already authenticated, redirect away from login page to dashboard */}
          <Route 
            path="/login" 
            element={isAuthenticated ? <Navigate to="/Dashboard" replace /> : <Login />} 
          />

          <Route 
            path="/Dashboard" 
            element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" replace />} 
          />
          
          <Route 
            path="/orders" 
            element={isAuthenticated ? <Order /> : <Navigate to="/login" replace />} 
          />
          
          <Route 
            path="/add" 
            element={isAuthenticated ? <AddProduct /> : <Navigate to="/login" replace />} 
          />
          
          <Route 
            path="/all" 
            element={isAuthenticated ? <AllProduct /> : <Navigate to="/login" replace />} 
          />
          
          <Route 
            path="/edit-product/:id" 
            element={isAuthenticated ? <EditProduct /> : <Navigate to="/login" replace />} 
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