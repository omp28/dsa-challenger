const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const connectDB = require("../middleware/mongoose");

const router = express.Router();

router.post(
  "/register",
  connectDB(async (req, res) => {
    const { name, email, password } = req.body;

    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = new User({
        id: Date.now(),
        name,
        email,
        password: hashedPassword,
      });

      console.log("newUser", newUser);

      await newUser.save();

      res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
      console.error("Error during user registration:", error);
      res.status(500).json({ message: "Server error" });
    }
  })
);

module.exports = router;
