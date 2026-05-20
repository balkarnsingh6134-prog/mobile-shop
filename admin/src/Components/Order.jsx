import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Order = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await axios.get("https://mobile-shop-88re.onrender.com/order/all");
      setOrders(res.data.body || []);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  // Function to determine Order Status based on date
  const getOrderStatus = (orderDate) => {
    const today = new Date();
    const createdDate = new Date(orderDate);
    const diffTime = Math.abs(today - createdDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    // Logic: 5+ days = Delivered, Less than 5 days = Cancelable
    if (diffDays >= 5) {
      return "Delivered";
    } else {
      return "Cancel Order";
    }
  };

  // Handle Order Cancellation
  const handleCancelOrder = async (orderId) => {
    try {
      // This call deletes the order. 
      // When you return to the Dashboard, fetchDashboardData will pull the new, reduced count.
      // Changed from localhost to your live Render backend URL:
      await axios.delete(`https://mobile-shop-88re.onrender.com/order/cancel/${orderId}`);
      
      toast.success("Order cancelled successfully!", { 
        position: "top-right",
        autoClose: 3000,
        theme: "dark", 
      });

      // Refresh the local list so the UI updates immediately
      fetchOrders(); 
    } catch (error) {
      toast.error("Failed to cancel order.");
      console.error("Cancellation error:", error);
    }
  };

  return (
    <div className="main-content" style={{ padding: '20px' }}>
      <ToastContainer />
      <h2 style={{ color: 'white' }}>📦 Customer Orders</h2>
      
      <div className="table-responsive mt-4">
        <table className="table table-dark table-hover border-secondary">
          <thead>
            <tr>
              <th>Product</th>
              <th>Qty</th>
              <th>Price</th>
              <th>Status / Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? (
              orders.map((order) => {
                const status = getOrderStatus(order.createdAt);

                return (
                  <tr key={order._id} className="align-middle">
                    <td>{order.productName}</td>
                    <td>{order.quantity || 1}</td> 
                    <td>${order.totalAmount}</td>
                    <td>
                      {status === "Delivered" ? (
                        <span className="badge bg-success" style={{ padding: '10px 15px', borderRadius: '5px' }}>
                          ✅ Delivered
                        </span>
                      ) : (
                        <button 
                          style={{ 
                            background: 'linear-gradient(135deg, #ff4b2b 0%, #ff416c 100%)',
                            color: 'white',
                            border: 'none',
                            padding: '8px 18px',
                            borderRadius: '8px',
                            fontWeight: '600',
                            fontSize: '14px',
                            cursor: 'pointer',
                            boxShadow: '0 4px 15px rgba(255, 75, 43, 0.3)',
                            transition: '0.3s'
                          }}
                          onMouseOver={(e) => e.target.style.filter = 'brightness(1.1)'}
                          onMouseOut={(e) => e.target.style.filter = 'brightness(1)'}
                          onClick={() => handleCancelOrder(order._id)}
                        >
                          Cancel Order
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-4">No orders found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Order;