const express = require('express');
const mongoose = require('mongoose');
require('./db/connection'); // Connect to MongoDB
const { User } = require('./models/User'); // Import User model
const authRoutes = require('./routes/auth'); // Authentication routes
const adminRoutes = require('./routes/admin'); // Admin routes
const dashboardRoutes = require('./routes/dashboard'); // Dashboard routes
const loginValidation = require('./middlewares/LoginValidation');
const patientRoutes = require('./routes/patients');
const patientInfusionRoutes = require('./routes/patientInfusion'); // Renamed for clarity
const referralRoutes = require('./routes/referrals'); // Referral routes
const patientDetailRoute=require('./routes/patientDetails');
// console.log("referralRoutes:", referralRoutes);
const cors = require('cors');
require('dotenv').config(); // Load environment variables from .env

const app = express();
const PORT = process.env.PORT || 3000; // Use environment variable for PORT

// Middleware
app.use(express.json());
app.use(cors());

// Default route
app.get('/', (req, res) => {
    res.send('Server is up and running!');
});

// Auth routes
// app.use('/api/auth', authRoutes);

// Login route
app.post('/login', loginValidation, async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user || user.password !== req.body.password) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        res.json({ userId: user._id, message: 'success' });
    } catch (error) {
        console.error('Error in /login:', error);
        res.status(500).send('Server error');
    }
});

// // Admin routes (for creating users, protected by admin-only middleware)
app.use('/api/admin', adminRoutes);


app.use('/api',patientDetailRoute);
// Patient routes
app.use('/api/patients', patientRoutes);

// Patient and Infusion combined route
app.use('/api/patient-infusion', patientInfusionRoutes);

// Dashboard routes
app.use('/api/dashboard', dashboardRoutes);

// Referrals routes
app.use('/api/initialReferral', referralRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
// require('dotenv').config();
// const express = require('express');
// const mongoose = require('mongoose');
// require('./db/connection'); // Connect to MongoDB
// const cors = require('cors');

// const { User } = require('./models/User'); // Import User model
// const authRoutes = require('./routes/auth');
// const adminRoutes = require('./routes/admin');
// const dashboardRoutes = require('./routes/dashboard');
// const loginValidation = require('./middlewares/LoginValidation');
// const patientRoutes = require('./routes/patients');
// const patientInfusionRoutes = require('./routes/patientInfusion');
// const referralRoutes = require('./routes/referrals');
// console.log('Type of referralRoutes:', typeof referralRoutes);

// console.log("referralRoutes:", referralRoutes);

// const app = express();
// const PORT = process.env.PORT || 3000;

// // Middleware
// app.use(express.json());
// app.use(cors());

// // Default route
// app.get('/', (req, res) => {
//     res.send('Server is up and running!');
// });

// // // Routes
// // app.use('/api/auth', authRoutes);
// //  app.use('/api/admin', adminRoutes);
// //  app.use('/api/initialReferral', referralRoutes);

// // Login route
// app.post('/login', loginValidation, async (req, res) => {
//     try {
//         const user = await User.findOne({ email: req.body.email });
//         if (!user || user.password !== req.body.password) {
//             return res.status(401).json({ message: 'Invalid credentials' });
//         }
//         res.json({ userId: user._id, message: 'success' });
//     } catch (error) {
//         console.error('Error in /login:', error);
//         res.status(500).send('Server error');
//     }
// });

// // Error handling middleware
// app.use((err, req, res, next) => {
//     console.error(err.stack);
//     res.status(500).send({ message: 'Internal server error' });
// });

// // Start server
// app.listen(PORT, () => {
//     console.log(`Server is running on http://localhost:${PORT}`);
// });
