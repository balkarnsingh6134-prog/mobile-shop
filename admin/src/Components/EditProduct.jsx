import React, { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const EditProduct = () => {
  const { state } = useLocation();
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: state?.product?.name || '',
    price: state?.product?.price || '',
    category: state?.product?.category || '',
    image: state?.product?.image || '',
    desc: state?.product?.desc || 'Updated Mobile'
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token') || localStorage.getItem('admin_token');
      
      const res = await axios.put(`http://localhost:5555/product/update/${id}`, formData, {
        headers: { 
          'token': token,
          'Authorization': `Bearer ${token}` 
        }
      });

      if (res.data) {
        toast.success("Product updated successfully!", { theme: "colored" });
        // FIXED: Navigating to '/all' to match your App.js route
        navigate('/all'); 
      }
    } catch (error) {
      console.error("Update error:", error);
      toast.error("Failed to update product");
    }
  };

  const inputStyle = {
    width: '100%',
    padding: '12px',
    borderRadius: '8px',
    border: '1px solid #334155',
    background: '#1e293b',
    color: 'white',
    marginBottom: '20px',
    outline: 'none'
  };

  return (
    <div className="main-content" style={{ padding: '40px' }}>
      <h2 style={{ color: 'white', marginBottom: '30px', textAlign: 'center' }}>✏️ Edit Product</h2>
      
      <div className="stat-card" style={{ maxWidth: '600px', margin: '0 auto', padding: '30px', background: '#0f172a', borderRadius: '15px' }}>
        <form onSubmit={handleSubmit}>
          <label style={{ color: '#94a3b8', display: 'block', marginBottom: '8px' }}>Product Name</label>
          <input 
            style={inputStyle}
            type="text" 
            value={formData.name} 
            onChange={(e) => setFormData({...formData, name: e.target.value})} 
            required 
          />

          <label style={{ color: '#94a3b8', display: 'block', marginBottom: '8px' }}>Category</label>
          <input 
            style={inputStyle}
            type="text" 
            value={formData.category} 
            onChange={(e) => setFormData({...formData, category: e.target.value})} 
            required 
          />

          <label style={{ color: '#94a3b8', display: 'block', marginBottom: '8px' }}>Price (₹)</label>
          <input 
            style={inputStyle}
            type="number" 
            value={formData.price} 
            onChange={(e) => setFormData({...formData, price: e.target.value})} 
            required 
          />

          <label style={{ color: '#94a3b8', display: 'block', marginBottom: '8px' }}>Image URL</label>
          <input 
            style={inputStyle}
            type="text" 
            value={formData.image} 
            onChange={(e) => setFormData({...formData, image: e.target.value})} 
            required 
          />

          <div style={{ display: 'flex', gap: '15px' }}>
            <button 
              type="submit" 
              style={{ flex: 1, padding: '12px', background: '#06c4dd', border: 'none', borderRadius: '8px', color: 'black', fontWeight: 'bold', cursor: 'pointer' }}
            >
              Save Changes
            </button>
            <button 
              type="button"
              onClick={() => navigate('/all')}
              style={{ flex: 1, padding: '12px', background: 'transparent', border: '1px solid #ef4444', borderRadius: '8px', color: '#ef4444', cursor: 'pointer' }}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProduct;