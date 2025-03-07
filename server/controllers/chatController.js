require("dotenv").config(); // ✅ Load environment variables
const axios = require("axios");

const chatController = async (req, res) => {
    try {
        const { message } = req.body;

        if (!message) {
            return res.status(400).json({ error: "Message is required" });
        }

        if (!process.env.OPENROUTER_API_KEY) {
            return res.status(500).json({ error: "API key is missing or not set" });
        }

        console.log("🔑 API Key:", process.env.OPENROUTER_API_KEY); // Debugging output

        const response = await axios.post(
            "https://openrouter.ai/api/v1/chat/completions",
            {
                model: "mistralai/mistral-7b-instruct",
                messages: [{ role: "user", content: message }],
                max_tokens: 100,
            },
            {
                headers: {
                    "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
                    "Content-Type": "application/json",
                },
            }
        );

        if (!response.data.choices || response.data.choices.length === 0) {
            return res.status(500).json({ error: "Invalid response from OpenRouter" });
        }

        res.json({ response: response.data.choices[0].message.content });
    } catch (error) {
        console.error("❌ OpenRouter API Error:", error?.response?.data || error.message);
        res.status(500).json({ error: "Failed to get response from OpenRouter" });
    }
};

module.exports = chatController;
