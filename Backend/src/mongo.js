const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/PharmaApplication")
  .then(() => {
    console.log("mongoose connected");
  })
  .catch((e) => {
    console.log("failed");
  });

const logInSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    match: [/\S+@\S+\.\S+/, 'Please provide a valid email address'], // Regex to validate email format
  },
  password: {
    type: String,
    required: true,
  },
});

const LogInCollection = new mongoose.model("Logincollections", logInSchema);

module.exports = LogInCollection;
