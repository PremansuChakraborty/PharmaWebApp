const express = require("express");
const path = require("path");
const cors = require("cors");
const app = express();
const LogInCollection = require("./mongo");
const port = process.env.PORT || 8000;
const {hashPassword,comparePassword}=require("../utils/bcrypt")
app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use(express.static(path.join(path.resolve(),"../Frontend/dist")))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await LogInCollection.findOne({ email });

    if (user) {
      if (comparePassword(password,user.password)) {
        return res.status(200).json({
          message: "Login successful",
          user: { email: user.email, name: user.name } // Add additional user details here if needed
        });
      } else {
        return res.status(401).json({ error: "Incorrect password" });
      }
    } else {
      return res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({ error: "An error occurred during login" });
  }
});

app.post("/signup", async (req, res) => {
  try {
    const {name,email,password}=req.body;
    const checking = await LogInCollection.findOne({ email: req.body.email });

    if (checking) {
      // If the user already exists
      return res.send("User details already exist");
    } 
    const user=await LogInCollection.create({
      email,
      name,
      password:hashPassword(password)
    })
    return res.status(200).json({
      email:user.email,
      name:user.name,
      password:user.password
    })
  } catch (error) {
    return res.send("An error occurred");
  }
});


app.listen(port, () => {
  console.log(`${port} connected`);
});
