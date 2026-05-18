import express from "express";
import { 
    addProduct, 
    getAllProducts, 
    removeProduct, 
    updateProduct 
} from "../controllers/productController.js";
import authenticateToken from "../middleware/authMiddleware.js";

const router = express.Router();

// Get all products (Public)
router.get("/allproducts", getAllProducts);

// Protected routes (Require valid token)
router.post("/add", authenticateToken, addProduct);
router.put("/update/:id", authenticateToken, updateProduct);

// DELETE ROUTE - Ensure the controller matches 'removeProduct'
router.delete("/removeproduct/:id", authenticateToken, removeProduct);

export default router;