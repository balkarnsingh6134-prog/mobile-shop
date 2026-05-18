import express from 'express';
import { 
    signUp, 
    login, 
    findUsers, 
    findUserByIdByBody, 
    findUserByIdByParams, 
    userUpdate, 
    deleteUser,
    forgotPassword, 
    resetPassword 
} from '../controllers/userController.js'; 

const userRouter = express.Router();

userRouter.post("/signup", signUp);
userRouter.post("/login", login);

// --- ADD THIS LINE: Matches Dashboard.jsx fetch ---
userRouter.get("/all", findUsers); 

userRouter.get("/findUsers", findUsers);
userRouter.post("/findUserByIdByBody", findUserByIdByBody);
userRouter.get("/findUserByIdByParams/:id", findUserByIdByParams);
userRouter.put("/userUpdate", userUpdate);

// --- ADD THIS LINE: Matches Dashboard.jsx delete ---
userRouter.delete("/delete/:id", deleteUser);

userRouter.delete("/deleteUser/:id", deleteUser);

// Added routes for password management
userRouter.post("/forgot-password", forgotPassword);
userRouter.post("/reset-password/:id", resetPassword);

export default userRouter;