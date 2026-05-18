import express from 'express';
import cartController from '../controllers/cartController.js';

const router = express.Router();

// Route for users to add products to their cart
router.post('/add', cartController.addToCart);

// Route for a user to see their own cart items
router.get('/allproducts', cartController.getCartItems);

// Route to remove a specific product from the cart
router.delete('/removeproduct/:id', cartController.removeFromCart);

/* =========================================================
    NEW ADMIN ROUTE: Fetch all active carts for Admin Panel
   ========================================================= */
// Use this route in your Admin frontend to show "All Product" cart data
router.get('/admin/all-active-carts', cartController.getAllUserCarts);

export default router;