import express from 'express';
import dbConnect from './connect/dbConnect.js';
import fileUpload from 'express-fileupload';
import cors from 'cors';
import userRouter from './routes/userRouter.js';
import productRouter from "./routes/productRouter.js";
import cartRouter from "./routes/cartRouter.js";
import orderRouter from "./routes/orderRouter.js"; 

const app = express();

// --- OPTIMIZED CORS CONFIGURATION ---
// Allows your local apps and deployed services to safely send requests
app.use(cors({
    origin: [
        "http://localhost:3000", // Standard React App Port
        "http://localhost:5173", // Vite Frontend Port
    ],
    credentials: true
}));

app.use(express.json());
app.use(fileUpload());

// --- DYNAMIC PORT BINDING FOR RENDER ---
// Render automatically sets process.env.PORT, falling back to 5555 locally
const port = process.env.PORT || 5555;

dbConnect(); 

// Routers
app.use("/user", userRouter);
app.use("/users", userRouter); // Supports /users/all queries for your Admin Dashboard
app.use("/product", productRouter);
app.use("/cart", cartRouter);
app.use("/order", orderRouter); 

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});