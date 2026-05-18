import express from 'express';
import dbConnect from './connect/dbConnect.js';
import fileUpload from 'express-fileupload';
import cors from 'cors';
import userRouter from './routes/userRouter.js';
import productRouter from "./routes/productRouter.js";
import cartRouter from "./routes/cartRouter.js";
import orderRouter from "./routes/orderRouter.js"; 

const app = express();

app.use(cors());
app.use(express.json());
app.use(fileUpload());

const port = 5555;
dbConnect(); 

// Keep your original route
app.use("/user", userRouter);

// --- ADDED THIS LINE TO FIX THE 404 ERROR ---
// This allows the Dashboard to access http://localhost:5555/users/all
app.use("/users", userRouter);

app.use("/product", productRouter);
app.use("/cart", cartRouter);
app.use("/order", orderRouter); 

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});