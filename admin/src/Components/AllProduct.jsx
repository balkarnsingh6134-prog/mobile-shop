import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // 1. Fetch Inventory from your backend
  const fetchInventory = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token') || localStorage.getItem('admin_token');
      
      const res = await axios.get("http://localhost:5555/product/allproducts", {
        headers: { 
          'Authorization': `Bearer ${token}`, 
          'token': token 
        }
      });

      const data = res.data.body || res.data.products || res.data;
      
      if (Array.isArray(data)) {
        setProducts(data);
      } else {
        setProducts([]);
      }
    } catch (error) {
      console.error("Fetch error:", error);
      toast.error("Failed to sync inventory", { toastId: "sync-error" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInventory();
  }, []);

  // 2. Handle Delete Logic (Direct delete with Toast only)
  const handleDelete = async (id, productName) => {
    try {
      const token = localStorage.getItem('token') || localStorage.getItem('admin_token');
      const res = await axios.delete(`http://localhost:5555/product/removeproduct/${id}`, {
        headers: { 'token': token, 'Authorization': `Bearer ${token}` }
      });

      if (res.data.success || res.status === 200) {
        // Success Toast Notification
        toast.success(`${productName} deleted successfully!`, { 
            position: "top-right",
            theme: "dark",
            autoClose: 2000
        });
        // Update UI immediately
        setProducts(products.filter(item => item._id !== id));
      }
    } catch (error) {
      console.error("Delete Error:", error);
      toast.error("Error deleting product");
    }
  };

  // 3. Handle Edit Logic
  const handleEdit = (product) => {
    navigate(`/edit-product/${product._id}`, { state: { product } });
  };

  return (
    <div className="main-content">
      <div style={{ marginBottom: '30px' }}>
        <h2 style={{ color: 'white', fontWeight: '700' }}>📦 Full Shop Inventory ({products.length})</h2>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', marginTop: '50px', color: '#06c4dd' }}>
           <div className="spinner-border text-info"></div>
           <p style={{marginTop: '10px'}}>Syncing Shop Data...</p>
        </div>
      ) : products.length > 0 ? (
        <div className="table-responsive">
          <table className="table table-dark table-hover" style={{ background: 'rgba(255,255,255,0.02)', borderRadius: '15px' }}>
            <thead>
              <tr style={{ textAlign: 'center', background: 'rgba(255,255,255,0.05)' }}>
                <th>IMAGE</th>
                <th>PRODUCT NAME</th>
                <th>CATEGORY</th>
                <th>PRICE</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id} style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                  <td>
                    <img 
                      src={product.image} 
                      alt="" 
                      style={{ width: '50px', height: '50px', objectFit: 'contain', background: '#fff', padding: '2px', borderRadius: '5px' }} 
                    />
                  </td>
                  <td style={{ fontWeight: '500' }}>{product.name}</td>
                  <td>
                    <span style={{ 
                        background: '#06c4dd', 
                        color: '#000', 
                        padding: '4px 12px', 
                        borderRadius: '6px', 
                        fontSize: '0.8rem', 
                        fontWeight: '700' 
                    }}>
                      {product.category}
                    </span>
                  </td>
                  <td style={{ color: '#10b981', fontWeight: 'bold' }}>${product.price}</td>
                  <td>
                    <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                      <button 
                        onClick={() => handleEdit(product)} 
                        style={{ background: 'rgba(6, 196, 221, 0.1)', color: '#06c4dd', border: '1px solid #06c4dd', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer', fontWeight: '600' }}
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => handleDelete(product._id, product.name)} 
                        style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', border: '1px solid #ef4444', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer', fontWeight: '600' }}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="glass-card text-center p-5" style={{background: 'rgba(255,255,255,0.03)', borderRadius: '15px', border: '1px dashed rgba(255,255,255,0.1)' }}>
          <h4 style={{ color: '#94a3b8' }}>Your inventory is currently empty.</h4>
        </div>
      )}
    </div>
  );
};

export default AllProducts;