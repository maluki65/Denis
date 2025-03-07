require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const authRouter = require("./Routes/authRoute");
const chatController = require("./controllers/chatController"); // ✅ Correct Import

require("dotenv").config(); // Load environment variables

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRouter);
app.post("/api/chat", chatController); // ✅ Fix: Pass the controller function

// Database Connection
mongoose.connect("mongodb://localhost:27017/Authentication")
    .then(() => console.log("✅ Connected to Database!"))
    .catch((error) => console.error("❌ Failed to connect to Database:", error));

// Global Error Handler
app.use((err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || "error";

    res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
    });
});

// Start Server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
