const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const Contact = require("./models/Contact");

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Allow CORS for both local and deployed frontend
app.use(cors({
  origin: [
    "http://localhost:3000", // local frontend
    "https://starbucks-frontend-rust.vercel.app" // live frontend
  ]
}));

// Middleware to parse JSON
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// POST route
app.post("/api/contact", async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const contact = new Contact({ name, email, message });
    await contact.save();
    res.status(200).json({ message: "Message saved successfully" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// GET route to check if backend is running
app.get("/", (req, res) => {
  res.send("✨ Starbucks backend is live!");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
