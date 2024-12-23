const express = require('express');
const { User } = require('../models/User');
const authenticate = require('../middlewares/authenticate');
const checkAdmin = require('../middlewares/checkAdmin');

const router = express.Router();

// Admin route to create a user
router.post('/create-user', authenticate, checkAdmin, async (req, res) => {
    const { userName, email, password, isAdmin = false } = req.body;

    try {
        // Check if the username or email already exists
        const existingUser = await User.findOne({ $or: [{ email }, { userName }] });
        if (existingUser) {
            return res.status(400).json({ message: 'User with this email or username already exists' });
        }

        // Create new user
        const newUser = new User({ userName, email, password, isAdmin });
        await newUser.save();

        res.status(201).json({ success: true, message: 'User created successfully', data: { userId: newUser._id } });
    } catch (error) {
        console.error('Error creating user:', error.message);
        res.status(500).json({ message: 'An error occurred while creating the user' });
    }
});

module.exports = router;
