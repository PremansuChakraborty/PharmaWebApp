const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
const mongoURI = "mongodb://localhost:27017/chatbot_response"; // Local MongoDB URI
mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Define Schema and Model
const responseSchema = new mongoose.Schema({
  question: String,
  answer: String,
});

const Response = mongoose.model("Response", responseSchema);

// Initialize Gemini API
const genAI = new GoogleGenerativeAI("AIzaSyA0WrjwGqK2AXwbLLGQIEQxcPw8cc-kkeU"); // Replace with your Gemini API key
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// Routes
app.post("/chat", async (req, res) => {
  const { question } = req.body;

  try {
    // Check MongoDB for the response
    const response = await Response.findOne({
      question: new RegExp(question, "i"),
    });

    if (response) {
      res.json({ answer: response.answer });
    } else {
      // If not found in MongoDB, call Gemini API
      try {
        const chat = model.startChat({
          history: [
            {
              role: "user",
              parts: [{ text: question }],
            },
          ],
        });

        const result = await chat.sendMessage(question);
        const geminiResponse = result.response.text();

        res.json({ answer: geminiResponse });
      } catch (apiError) {
        console.error("Error with Gemini API:", apiError);
        res.json({
          answer:
            "Sorry, I couldn't fetch a response at the moment. Please try again later.",
        });
      }
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// Start the Server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
