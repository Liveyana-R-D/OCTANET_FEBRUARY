const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const Contact = require("./models/Contact"); // Assuming you have the Contact model defined

// Initialize environment variables
dotenv.config();

// Create an instance of Express app
const app = express();

// Middleware to allow cross-origin requests from the frontend URL
app.use(cors({
  origin: "https://starbucks-frontend-rust.vercel.app", // This is your frontend URL on Vercel
}));

// Middleware to parse JSON data from incoming requests
app.use(express.json());

// Connect to MongoDB using the connection string in the .env file
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log("MongoDB connection error:", err));

// POST route to save a contact message
app.post("/api/contact", async (req, res) => {
  try {
    const { name, email, message } = req.body; // Get name, email, and message from request body
    const contact = new Contact({ name, email, message }); // Create a new Contact instance
    await contact.save(); // Save the contact to the database
    res.status(200).json({ message: "Message saved successfully" }); // Respond with success
  } catch (error) {
    res.status(500).json({ error: "Server error" }); // Handle errors
  }
});

// GET route to retrieve all contact messages
app.get("/api/contact", async (req, res) => {
  try {
    const contacts = await Contact.find(); // Fetch all messages from the Contact collection
    res.status(200).json(contacts); // Send the messages back in the response
  } catch (error) {
    res.status(500).json({ error: "Error fetching messages" }); // Handle errors
  }
});

// Basic route to check if the server is running
app.get("/", (req, res) => {
  res.send("✨ Starbucks backend is live!"); // Server status message
});

// Set the port for the backend to listen on
const PORT = process.env.PORT || 5000;

// Start the Express server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
