import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import '../App.css'; 

const Login = () => {
  const [data, setData] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://mobile-shop-88re.onrender.com/user/login", data);
      
      if (res.data.success) {
        // 1. Store the exact keys your app expects
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('role', res.data.role);
        
        toast.success(res.data.message || "Welcome, Admin!", { theme: "colored" });
        
        // 2. Wait 1 second so you can see the toast, then force redirect
        setTimeout(() => {
          window.location.href = "/Dashboard"; 
        }, 1000);

      } else {
        toast.error(res.data.message || "Invalid Email or Password!");
      }
    } catch (error) {
      const errorMsg = error.response?.data?.message || "Login Failed! Check your Backend.";
      toast.error(errorMsg);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <div className="login-header">
          <h2>Admin Login</h2>
          <p>Please enter your credentials to continue</p>
        </div>

        <form onSubmit={handleLogin} className="login-form">
          <div className="input-group">
            <label>Email Address</label>
            <input 
              name="email" 
              type="email" 
              placeholder="admin@example.com"
              value={data.email}
              onChange={handleChange} 
              required 
            />
          </div>
          
          <div className="input-group">
            <label>Password</label>
            <input 
              name="password" 
              type="password" 
              placeholder="••••••••"
              value={data.password}
              onChange={handleChange} 
              required 
            />
          </div>
          
          <button type="submit" className="login-btn">
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;