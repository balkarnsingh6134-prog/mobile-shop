import React, { createContext, useState, useContext, useEffect } from 'react';

// Create the Context
const CartContext = createContext();

// 1. Export the Provider as a NAMED EXPORT
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    // Load existing cart from storage
    const savedCart = localStorage.getItem('cartItems');
    return savedCart ? JSON.parse(savedCart) : [];
  });
  
  const [pendingProduct, setPendingProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_BASE_URL = "https://mobile-shop-88re.onrender.com/cart";

  // Sync cart to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  // Function to empty the cart after a successful order
  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem('cartItems');
  };

  // Add product to cart logic with Backend API support
  const addToCart = async (productData) => {
    try {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem('token');

      // Sync with Backend API
      const response = await fetch(`${API_BASE_URL}/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          name: productData.name,
          price: productData.price,
          quantity: productData.quantity || 1,
          category: productData.category || "Smartphones",
          image: productData.image || "https://cdn.mos.cms.futurecdn.net/N8HvTtX5JAwd6C5Y2WLZZC.jpg"
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Failed to add product");

      // Update Local State
      setCartItems(prev => {
        const existingItem = prev.find(item => item.name === productData.name);
        if (existingItem) {
          return prev.map(item =>
            item.name === productData.name
              ? { ...item, quantity: item.quantity + (productData.quantity || 1) }
              : item
          );
        }
        
        const itemIdentifier = data.data?._id || data.data?.id || Date.now();
        return [...prev, { id: itemIdentifier, ...productData, quantity: productData.quantity || 1 }];
      });
    } catch (err) {
      setError(err.message);
      console.error("Error adding product:", err);
    } finally {
      setLoading(false);
    }
  };

  // Restoring the deferred product functions to fix the "is not a function" error
  const setDeferredProduct = (product) => {
    setPendingProduct(product);
  };

  const processDeferredProduct = async () => {
    if (pendingProduct) {
      await addToCart(pendingProduct);
      setPendingProduct(null);
    }
  };

  // Remove product from cart with API call
  const removeItem = async (id) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(`${API_BASE_URL}/removeproduct/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (response.ok) {
        setCartItems(prevItems => prevItems.filter(item => item.id !== id && item._id !== id));
      } else {
        const data = await response.json();
        setError(data.message || "Could not delete product");
      }
    } catch (err) {
      console.error("Error deleting product:", err);
      setError("Error connecting to the server");
    } finally {
      setLoading(false);
    }
  };

  // Update item quantity
  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems(prevItems =>
      prevItems.map(item =>
        (item.id === id || item._id === id) ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  return (
    <CartContext.Provider value={{
      cartItems,
      setCartItems,
      addToCart,
      removeItem,
      updateQuantity,
      clearCart,
      setDeferredProduct,
      processDeferredProduct,
      pendingProduct,
      loading,
      error
    }}>
      {children}
    </CartContext.Provider>
  );
};

// 2. Export the Custom Hook as a NAMED EXPORT
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};