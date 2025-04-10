const express = require("express");
const router = express.Router();
const Contact = require("../models/Contact");

router.post("/contact", async (req, res) => {
  try {
    const newMessage = new Contact(req.body);
    await newMessage.save();
    res.json({ message: "Message submitted successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to submit message." });
  }
});

module.exports = router;
