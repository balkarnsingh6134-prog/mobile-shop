import Product from "../model/productSchema.js";

// Logic for Admin to Add a Product to Global Inventory
export const addProduct = async (req, res) => {
    try {
        console.log("Data Received:", req.body);

        const { name, price, category, image, description } = req.body;

        // Validation check for required fields
        if (!name || !category || !image) {
            return res.status(400).json({ success: false, message: "Missing required fields" });
        }

        const product = new Product({
            name,
            price,
            category,
            image,
            description
        });

        await product.save();
        res.status(201).json({ success: true, message: "Product Added Successfully!", product });
    } catch (error) {
        console.error("Error:", error.message);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Logic for Admin/User to fetch all available shop products
export const getAllProducts = async (req, res) => {
    try {
        let products = await Product.find({});
        console.log("Products fetched successfully");
        res.status(200).json(products);
    } catch (error) {
        console.log("Error fetching products:", error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

// Logic for Admin to Delete a Product from Global Inventory
export const removeProduct = async (req, res) => {
    try {
        const { id } = req.params;
        console.log("Deleting product with ID:", id);

        const deletedProduct = await Product.findByIdAndDelete(id);

        if (!deletedProduct) {
            return res.status(404).json({
                status: 404,
                message: "Product not found in database",
            });
        }

        res.json({
            status: 200,
            success: true,
            message: "Product deleted successfully",
            product: deletedProduct,
        });
    } catch (error) {
        console.error("Error deleting product:", error);
        res.status(500).json({
            status: 500,
            message: "Error deleting product",
        });
    }
};

// Logic to Update Global Product Details
export const updateProduct = async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!updatedProduct) {
            return res.status(404).json({
                status: 404,
                message: "Product not found",
            });
        }

        console.log("Product updated successfully:", updatedProduct);

        res.json({
            status: 200,
            message: "Product updated successfully",
            product: updatedProduct,
        });
    } catch (error) {
        console.error("Error updating product:", error);
        res.status(500).json({
            status: 500,
            message: "Error updating product",
        });
    }
};

// Logic to Fetch Specific Cart Items for a specific User
export const getCartItems = async (req, res) => {
    try {
        const { userId } = req.params;
        const items = await Product.find({ userId: userId });

        console.log(`Fetched ${items.length} cart items for user: ${userId}`);

        res.json({
            status: 200,
            products: items,
        });
    } catch (error) {
        console.error("Error fetching cart items:", error);
        res.status(500).json({
            status: 500,
            message: "Error fetching cart items",
        });
    }
};

// Logic to Remove an item from a specific User's cart
export const removeFromCart = async (req, res) => {
    try {
        const deletedItem = await Product.findByIdAndDelete(req.params.id);

        if (!deletedItem) {
            return res.status(404).json({ status: 404, message: "Item not found" });
        }

        res.json({
            status: 200,
            message: "Item removed from cart successfully",
        });
    } catch (error) {
        res.status(500).json({ status: 500, message: "Error removing item" });
    }
};

// --- NEW LOGIC: ADD PRODUCT TO CART/PURCHASE WITH USER DETAILS ---
// This ensures that when User A buys a phone, their name is attached to the record
export const addToCartWithUser = async (req, res) => {
    try {
        const { name, price, category, image, userId, userName } = req.body;

        const cartItem = new Product({
            name,
            price,
            category,
            image,
            userId, // The unique ID of the user (User A or B)
            userName // The actual name of the user for Admin to see
        });

        await cartItem.save();
        res.status(201).json({ success: true, message: "Added to cart successfully!", cartItem });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error adding to cart" });
    }
};

// --- NEW LOGIC: ADMIN VIEW ALL USER PURCHASES/ORDERS ---
// This lets you see every product that has a 'userName' attached to it
export const getAdminOrders = async (req, res) => {
    try {
        // We find all items in the Product collection that have a userId 
        // (meaning they belong to a customer, not just global inventory)
        const orders = await Product.find({ userId: { $exists: true } });
        
        res.status(200).json({
            success: true,
            count: orders.length,
            body: orders
        });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error fetching orders" });
    }
};