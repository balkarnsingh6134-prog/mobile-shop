import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, default: "" },
    email: { type: String, default: "" },
    password: { type: String, default: "" },
    phone: { type: Number, default: "" },
    // --- ADDED LOGIC: Role field to identify Admin vs User ---
    role: {
        type: String,
        enum: ["user", "admin"], // Only allows these two values
        default: "user"          // New signups are "user" by default
    }
})

const userDataSchema = mongoose.model("user", userSchema)
export default userDataSchema;