const jwt = require('jsonwebtoken');
const { User } = require('../models/User'); // Import your User model
const JWT_SECRET = "vencer";

const authenticate = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Token not found' });
    }

    try {
        // Decode the token
        const decoded = jwt.verify(token, JWT_SECRET);
        console.log('Decoded Token:', decoded);

        // Fetch the user from the database
        const user = await User.findById(decoded.userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Attach user information to the request
        req.user = {
            id: user._id,
            userName: user.userName,
            email: user.email,
            isAdmin: user.isAdmin
        };

        console.log('User Details from DB:', req.user);

        next(); // Proceed to the next middleware
    } catch (err) {
        console.error('Authentication Error:', err.message);
        res.status(403).json({ message: 'Invalid or expired token' });
    }
};

module.exports = authenticate;
