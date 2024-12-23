// const express = require('express');
// const jwt = require('jsonwebtoken');
// const router = express.Router();
// const User = require('../models/User');

// const JWT_SECRET = 'vencer_';

// // POST /api/auth/login - Login Route
// router.post('/login', async (req, res) => {
//     const { emailOrUserName, password } = req.body;

//     try {
//         // Find user by email or username
//         const user = await User.findOne({ 
//             $or: [{ email: emailOrUserName }, { userName: emailOrUserName }]
//         });

//         if (!user || user.password !== password) { // Directly compare plain-text passwords
//             return res.status(400).json({ message: 'Invalid credentials' });
//         }

//         // Generate JWT
//         const token = jwt.sign({ userId: user._id, isAdmin: user.isAdmin }, JWT_SECRET, { expiresIn: '1h' });
//         console.log(token);
//         res.json({ token, message: 'Login successful' });
//     } catch (error) {
//         console.error('Error during login:', error);
//         res.status(500).send('Server error');
//     }
// });

// module.exports = router;
