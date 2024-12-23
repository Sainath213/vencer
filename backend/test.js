const jwt = require('jsonwebtoken');
const JWT_SECRET = 'vencer'; // Ensure this matches the exact secret you’re using in your app

// Generate a token
const token = jwt.sign({ userId: 'testUserId' }, JWT_SECRET, { expiresIn: '1h' });
console.log('Generated Token:', token);

// Verify the token
try {
    const decoded = jwt.verify(token, JWT_SECRET);
    console.log('Token is valid. Decoded data:', decoded);
} catch (error) {
    console.error('Token verification failed:', error.message);
}
