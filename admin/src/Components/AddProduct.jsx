import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const AddProduct = () => {
  const [formData, setFormData] = useState({ 
    name: '', 
    price: '', 
    category: '', 
    image: '',
    desc: 'New Mobile' 
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const token = localStorage.getItem('token') || 
                    localStorage.getItem('admin_token') || 
                    localStorage.getItem('user');

      if (!token) {
        toast.error("Security token missing! Please login again.", { theme: "colored" });
        return;
      }

      const response = await axios.post("http://localhost:5555/product/add", formData, {
        headers: {
          'token': token,
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.data.success || response.data) {
        toast.success(`${formData.name} added successfully!`, {
          position: "top-right",
          autoClose: 3000,
          theme: "colored",
        });
        
        // --- UPDATED: Navigate to All Products instead of Dashboard ---
        navigate('/all'); 
      }
    } catch (error) {
      console.error("DETAILED ERROR:", error);
      const errorMsg = error.response?.data?.message || "Server Error";
      toast.error("Failed to add product: " + errorMsg, { theme: "colored" });
    }
  };

  const inputStyle = {
    width: '100%', 
    padding: '12px', 
    borderRadius: '8px', 
    border: '1px solid #334155', 
    background: '#1e293b', 
    color: 'white', 
    marginBottom: '15px',
    outline: 'none',
    boxSizing: 'border-box'
  };

  const labelStyle = {
    color: '#94a3b8',
    fontSize: '14px',
    marginBottom: '8px',
    display: 'block',
    fontWeight: '600'
  };

  return (
    <div className="main-content" style={{ padding: '20px' }}>
      <h2 style={{ color: 'white', marginBottom: '25px', textAlign: 'center' }}>➕ Add New Mobile</h2>
      
      <div className="stat-card" style={{
        maxWidth: '600px', 
        padding: '30px', 
        background: '#0f172a', 
        borderRadius: '12px', 
        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.5)',
        margin: '0 auto'
      }}>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label style={labelStyle}>Product Name</label>
            <input 
              type="text" 
              style={inputStyle} 
              placeholder="Enter product name"
              value={formData.name} 
              onChange={(e) => setFormData({...formData, name: e.target.value})} 
              required 
            />
          </div>

          <div className="input-group">
            <label style={labelStyle}>Category</label>
            <input 
              type="text" 
              style={inputStyle} 
              placeholder="e.g. Smartphone"
              value={formData.category} 
              onChange={(e) => setFormData({...formData, category: e.target.value})} 
              required 
            />
          </div>

          <div className="input-group">
            <label style={labelStyle}>Price ($)</label>
            <input 
              type="number" 
              style={inputStyle} 
              placeholder="0.00"
              value={formData.price} 
              onChange={(e) => setFormData({...formData, price: e.target.value})} 
              required 
            />
          </div>

          <div className="input-group">
            <label style={labelStyle}>Image URL</label>
            <input 
              type="text" 
              style={inputStyle} 
              placeholder="Paste image link"
              value={formData.image} 
              onChange={(e) => setFormData({...formData, image: e.target.value})} 
              required 
            />
          </div>

          {/* --- UPDATED: Button text changed to Upload --- */}
          <button 
            type="submit" 
            style={{
              width: '100%', 
              padding: '15px', 
              background: '#3b82f6', 
              border: 'none', 
              color: 'white', 
              fontWeight: 'bold', 
              borderRadius: '8px',
              cursor: 'pointer'
            }}
          >
            Upload
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;