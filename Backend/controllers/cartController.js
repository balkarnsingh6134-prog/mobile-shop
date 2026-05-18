import Cart from '../model/cartSchema.js';

// Add to Cart
export const addToCart = async (req, res) => {
  try {
    const { name, price, quantity, category, image } = req.body;

    if (!name || !price) {
      return res.status(400).json({ message: "Missing required fields: name and price" });
    }

    const existingItem = await Cart.findOne({ name });

    if (existingItem) {
      existingItem.quantity += (quantity || 1);
      const updatedItem = await existingItem.save();
      return res.status(200).json({ message: "Quantity updated", data: updatedItem });
    }

    const newItem = new Cart({
      name,
      price,
      quantity: quantity || 1,
      category,
      image
    });

    const savedItem = await newItem.save();
    res.status(201).json({ message: "Product added to cart", data: savedItem });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get all items in the cart (Standard User View)
export const getCartItems = async (req, res) => {
  try {
    const items = await Cart.find();
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Remove from Cart
export const removeFromCart = async (req, res) => {
  try {
    const itemId = req.params.id;
    
    // Attempt to delete using standard mongoose _id
    let deletedItem = await Cart.findByIdAndDelete(itemId);

    if (!deletedItem) {
      // Fallback: search by custom string identifier if _id does not match
      deletedItem = await Cart.findOneAndDelete({ _id: itemId });
    }

    if (!deletedItem) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product removed from cart", data: deletedItem });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

/* =========================================================
    ADMIN ONLY: Fetch all products currently in any user's cart
   ========================================================= */
export const getAllUserCarts = async (req, res) => {
  try {
    // This finds every single item saved in the Cart collection across all users
    const allCarts = await Cart.find(); 
    
    if (!allCarts || allCarts.length === 0) {
      return res.status(200).json({ success: true, message: "No active carts found", body: [] });
    }

    res.status(200).json({ 
      success: true, 
      message: "All cart items retrieved for Admin", 
      body: allCarts 
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// --- ADDED THIS TO FIX YOUR SYNTAX ERROR ---
// This maps the function to the name your router is importing
export const getAllActiveCarts = getAllUserCarts; 

export default {
  addToCart,
  getCartItems,
  removeFromCart,
  getAllUserCarts,
  getAllActiveCarts // Fix for the "does not provide an export named..." error
};