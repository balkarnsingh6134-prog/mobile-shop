import userDataSchema from "../model/userSchema.js";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";
import jwt from 'jsonwebtoken';

// --- SIGN UP LOGIC ---
export const signUp = async (req, res) => {
    try {
        const findEmail = await userDataSchema.findOne({ email: req.body.email });
        if (findEmail !== null) {
            return res.json({
                success: false,
                status: 400,
                message: "email already exist",
                body: {},
            });
        } else {
            const encpass = await bcrypt.hash(req.body.password, 10);
            const data = await userDataSchema.create({
                ...req.body,
                password: encpass,
            });

            return res.json({
                success: true,
                status: 200,
                message: "user created successfully",
                body: data,
            });
        }
    } catch (error) {
        console.log(error);
        return res.json({
            success: false,
            status: 400,
            message: error.message || error,
            body: {},
        });
    }
};

// --- LOGIN LOGIC ---
export const login = async (req, res) => {
    try {
        const data = await userDataSchema.findOne({
            email: req.body.email,
        });

        if (!req.body.email) {
            return res.json({
                success: false,
                status: 400,
                message: "Email is required",
                body: {},
            });
        } else if (!req.body.password) {
            return res.json({
                success: false,
                status: 400,
                message: "Password is required",
                body: {},
            });
        } else {
            if (data == null) {
                return res.json({
                    success: false,
                    status: 400,
                    message: "email is not valid",
                    body: {},
                });
            } else {
                const decpass = await bcrypt.compare(req.body.password, data.password);
                if (decpass == false) {
                    return res.json({
                        success: false,
                        status: 400,
                        message: "password is not match",
                        body: {},
                    });
                } else {
                    // Standardizing the JWT Payload and Secret
                    // Matching 'jwt_secret_123' from your authenticateToken middleware
                    const token = jwt.sign(
                        { 
                            id: data._id, 
                            email: data.email, 
                            role: data.role 
                        },
                        'jwt_secret_123',
                        { expiresIn: '1d' }
                    );

                    return res.json({
                        success: true,
                        status: 200,
                        message: "user login successfully",
                        token: token,
                        role: data.role, 
                        name: data.name, 
                        body: data,
                    });
                }
            }
        }
    } catch (error) {
        console.log(error);
        return res.json({
            success: false,
            status: 400,
            message: error.message || error,
            body: {},
        });
    }
};

// --- USER MANAGEMENT LOGIC ---
export const findUsers = async (req, res) => {
    try {
        const data = await userDataSchema.find();
        const count = await userDataSchema.countDocuments();
        return res.json({
            success: true,
            status: 200,
            message: "All users are here",
            body: data,
            count,
        });
    } catch (error) {
        console.log(error);
        return res.json({
            success: false,
            status: 400,
            message: error.message || error,
            body: {}
        });
    }
};

export const findUserByIdByBody = async (req, res) => {
    try {
        const data = await userDataSchema.findById(req.body.id);
        return res.json({
            success: true,
            status: 200,
            message: "This is a single user",
            body: data,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: error.message || "Internal Error" });
    }
};

export const findUserByIdByParams = async (req, res) => {
    try {
        const data = await userDataSchema.findById({ _id: req.params.id });
        return res.json({
            success: true,
            status: 200,
            message: "This is a single user",
            body: data,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: error.message || "Internal Error" });
    }
};

export const userUpdate = async (req, res) => {
    try {
        const encPass = await bcrypt.hash(req.body.password, 10);
        const data = await userDataSchema.findByIdAndUpdate(
            { _id: req.body.id },
            { ...req.body, password: encPass },
            { new: true }
        );
        return res.json({
            success: true,
            status: 200,
            message: "user updated successfully",
            body: data,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Update Failed" });
    }
};

export const deleteUser = async (req, res) => {
    try {
        const data = await userDataSchema.findByIdAndDelete({
            _id: req.params.id
        });
        const count = await userDataSchema.countDocuments();
        return res.json({
            success: true,
            status: 200,
            message: "user deleted successfully",
            body: count,
            data
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Delete Failed" });
    }
};

// --- PASSWORD RESET LOGIC ---
export const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await userDataSchema.findOne({ email });

        if (!user) {
            return res.json({
                success: false,
                status: 404,
                message: "User with this email does not exist",
            });
        }

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "balkarnsingh6134@gmail.com",
                pass: "nnot ggbt fivl kubw", 
            },
        });

        const resetLink = `http://localhost:3000/reset-password/${user._id}`;

        const mailOptions = {
            from: "balkarnsingh6134@gmail.com",
            to: email,
            subject: "Password Reset - Mobile Shop",
            html: `
                <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #eee;">
                    <h2>Password Reset Request</h2>
                    <p>Click the button below to reset your password. This link is valid for your account.</p>
                    <a href="${resetLink}" style="background: #ff4b2b; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Reset Password</a>
                    <p style="margin-top: 20px;">If you didn't request this, please ignore this email.</p>
                </div>
            `,
        };

        await transporter.sendMail(mailOptions);

        return res.json({
            success: true,
            status: 200,
            message: "Reset link sent to your email successfully",
        });

    } catch (error) {
        console.log(error);
        return res.json({ success: false, status: 500, message: "Internal Server Error" });
    }
};

export const resetPassword = async (req, res) => {
    try {
        const { id } = req.params;
        const { password } = req.body;

        const salt = await bcrypt.genSalt(10);
        const encryptedPassword = await bcrypt.hash(password, salt);

        const updatedUser = await userDataSchema.findByIdAndUpdate(
            id,
            { password: encryptedPassword },
            { new: true }
        );

        if (!updatedUser) {
            return res.json({
                success: false,
                status: 400,
                message: "Invalid User ID or User not found",
            });
        }

        return res.json({
            success: true,
            status: 200,
            message: "Password reset successfully! You can now login.",
        });

    } catch (error) {
        console.log(error);
        return res.json({ success: false, status: 500, message: "Internal Server Error" });
    }
};