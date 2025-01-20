import mongoose from "mongoose";
const responseSchema = new mongoose.Schema({
    question: String,
    answer: String,
  });
  
  const chatResponse = mongoose.model("chat_response", responseSchema);
  export default chatResponse
