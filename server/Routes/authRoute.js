const express = require("express");
const authController = require("../controllers/authController");
const chatController = require("../controllers/chatController"); // Import Chat Controller

const router = express.Router();

// Authentication Routes
router.post("/signup", authController.signup);
router.post("/login", authController.login);

// Chat Route
router.post("/chat", chatController); // ChatGPT API route

module.exports = router;
