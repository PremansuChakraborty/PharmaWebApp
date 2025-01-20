import chatResponse from "../models/chatbot.model.js";
import {GoogleGenerativeAI} from "@google/generative-ai";

const genAI = new GoogleGenerativeAI("AIzaSyCui2EBOBizEOjvvOlzfyn6RV6xibW2k2E"); // Replace with your Gemini API key
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
   
export const chatReply=async (req, res) => {
    const { question } = req.body;
  
    try {
      // Check MongoDB for the response
      const response = await chatResponse.findOne({
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
  };