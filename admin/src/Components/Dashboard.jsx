import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import '../App.css';

const Dashboard = () => {
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalSaleCount, setTotalSaleCount] = useState(0);
  const [totalCatalogCount, setTotalCatalogCount] = useState(0);
  const [users, setUsers] = useState([]);

  const adminName = localStorage.getItem("userName") || "Admin";

  const fetchDashboardData = async () => {
    try {
      // 1. Fetch Sales Data & Calculate counts dynamically
      // We fetch from the orders endpoint to ensure cancelled orders aren't counted
      const orderRes = await axios.get("http://localhost:5555/order/all");
      
      if (orderRes.data && (orderRes.data.body || orderRes.data.success)) {
        const activeOrders = orderRes.data.body || [];
        
        // Calculate Revenue from current active orders
        const revenue = activeOrders.reduce((acc, order) => acc + (order.totalAmount || 0), 0);
        setTotalRevenue(revenue);
        
        // Calculate Total Sale Product Count (Sums up the quantity of each active order)
        // If an order is cancelled, it disappears from this list, reducing the count by its quantity
        const totalQty = activeOrders.reduce((acc, order) => acc + (order.quantity || 1), 0);
        setTotalSaleCount(totalQty);
      }

      // 2. Fetch Products for Catalog Count
      const productRes = await axios.get("http://localhost:5555/product/allproducts");
      const productData = productRes.data.body || productRes.data.products || productRes.data;
      if (Array.isArray(productData)) {
        setTotalCatalogCount(productData.length); 
      }

      // 3. Fetch Users
      const userRes = await axios.get("http://localhost:5555/users/all");
      const userData = userRes.data.body || userRes.data.users || userRes.data;
      
      if (Array.isArray(userData)) {
        setUsers(userData);
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(`http://localhost:5555/users/delete/${userId}`);
      setUsers(users.filter(user => user._id !== userId));
      toast.success("User removed successfully!");
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("Failed to remove user.");
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return (
    <div className="main-content">
      {/* Welcome Card */}
      <div className="glass-card mb-4" style={{
        padding: '30px', borderRadius: '20px', 
        background: 'rgba(255, 255, 255, 0.03)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(10px)', marginBottom: '30px'
      }}>
        <h2 style={{ fontSize: '2rem', fontWeight: '700' }}>
          Welcome back, <span style={{color: '#06c4dd'}}>{adminName}</span>! 👤
        </h2>
        <p style={{ color: '#94a3b8', marginTop: '10px' }}>
          Overview of your store's sales and active product catalog.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid" style={{
        display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', 
        gap: '25px', marginBottom: '40px'
      }}>
        <div className="stat-card">
          <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '10px' }}>Total Sales Revenue</p>
          <h3 style={{ fontSize: '1.8rem', color: '#06c4dd' }}>${totalRevenue.toLocaleString()}</h3>
        </div>
        <div className="stat-card">
          <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '10px' }}>Total Sale Product</p>
          <h3 style={{ fontSize: '1.8rem', color: '#ffffff' }}>{totalSaleCount}</h3>
          <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '5px' }}>Updated based on active orders</div>
        </div>
        <div className="stat-card">
          <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '10px' }}>Total Product</p>
          <h3 style={{ fontSize: '1.8rem', color: '#ffffff' }}>{totalCatalogCount}</h3>
        </div>
      </div>

      {/* User Management */}
      <div className="user-management-section">
        <h3 style={{ marginBottom: '20px', color: '#ffffff' }}>User Management</h3>
        <table className="table">
          <thead>
            <tr>
              <th style={{ color: '#94a3b8' }}>NAME</th>
              <th style={{ color: '#94a3b8' }}>EMAIL</th>
              <th style={{ color: '#94a3b8' }}>ROLE</th>
              <th style={{ color: '#94a3b8' }}>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? users.map((user) => (
              <tr key={user._id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <td style={{ padding: '15px 10px' }}>{user.name}</td>
                <td style={{ padding: '15px 10px' }}>{user.email}</td>
                <td style={{ padding: '15px 10px' }}>
                  <span className={`badge ${user.role === 'admin' ? 'bg-success' : 'bg-secondary'}`} style={{ textTransform: 'uppercase', fontSize: '0.75rem' }}>
                    {user.role}
                  </span>
                </td>
                <td style={{ padding: '15px 10px' }}>
                  <button 
                    className="delete-btn" 
                    onClick={() => handleDeleteUser(user._id)}
                    style={{ background: '#ef4444', border: 'none', color: '#fff', padding: '5px 15px', borderRadius: '5px', cursor: 'pointer' }}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan="4" style={{textAlign: 'center', padding: '30px', color: '#94a3b8'}}>
                  No users found in database.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;