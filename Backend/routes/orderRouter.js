import express from 'express';
import nodemailer from 'nodemailer';
import Order from '../model/ordersSchema.js'; // FIXED: Changed OrderSchema.js to ordersSchema.js to match your model folder file name

const router = express.Router();

// 1. Configure Nodemailer (Using your credentials)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'balkarnsingh6134@gmail.com',
    pass: 'nnot ggbt fivl kubw' // Your 16-digit App Password
  }
});

// 2. GET Route: Fetch all orders for the admin/order page
router.get("/all", async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.status(200).json({ body: orders });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching orders", error: error.message });
  }
});

// 3. DELETE Route: Handle Order Cancellation
router.delete("/cancel/:id", async (req, res) => {
  try {
    const deletedOrder = await Order.findByIdAndDelete(req.params.id);
    if (!deletedOrder) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }
    res.status(200).json({ success: true, message: "Order cancelled successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// 4. POST Route: Place Order (Saves to MongoDB + Sends Email)
router.post("/place", async (req, res) => {
  const { fullName, email, address, city, items, totalAmount } = req.body;

  try {
    // --- Save each product in the cart as an individual order entry ---
    for (const item of items) {
      const newOrder = new Order({
        userName: fullName,
        productName: item.name,
        quantity: item.quantity,
        totalAmount: totalAmount, // You can also use (item.price * item.quantity)
      });
      await newOrder.save();
    }

    // --- Prepare and Send the Email ---
    const mailOptions = {
      from: '"Mobile Shop" <balkarnsingh6134@gmail.com>',
      to: email, 
      subject: 'Order Confirmed! - Mobile Shop',
      html: `
        <div style="font-family: Arial, sans-serif; border: 2px solid #06c4dd; padding: 20px; border-radius: 10px;">
          <h2 style="color: #06c4dd;">Hello ${fullName},</h2>
          <p>Your order has been received and is being processed.</p>
          <hr />
          <h3>Order Summary:</h3>
          <ul>
            ${items.map(item => `<li>${item.name} (x${item.quantity}) - $${item.price}</li>`).join('')}
          </ul>
          <h3>Total Amount: $${totalAmount}</h3>
          <p><strong>Shipping Address:</strong> ${address}, ${city}</p>
          <hr />
          <p>Thank you for shopping with us!</p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ success: true, message: "Order placed and confirmation mail sent!" });
  } catch (error) {
    console.error("Order Error:", error);
    res.status(500).json({ success: false, message: "Error processing order" });
  }
});

export default router;