const express = require('express');
const router = express.Router();
const { User } = require('../models/User');
const authenticate = require('../middlewares/authenticate'); // Middleware to protect routes

// GET /api/dashboard - Retrieve dashboard data
router.get('/', authenticate, async (req, res) => {
    try {
        // Fetch the specific user and populate their referrals
        const user = await User.findById(req.user.id).populate("referrals");

        // console.log("Dashboard User Data:", user);

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Extract the user's referrals
        const referrals = user.referrals || [];

        // Filter referrals based on status and deliveryDate
        const pendingPatients = referrals.filter(ref => ref.status === "Approved");
        const allPatients = referrals; // Return all referrals
        const initialPatients = referrals.filter(ref => ref.status === "Initiated");
        const deliveryDates = referrals.filter(ref => ref.deliveryDate);

        // Send the filtered data to the frontend
        res.status(200).json({
            success: true,
            allPatients,       // All referrals
            pendingPatients,   // Patients pending approval
            initialPatients,   // Patients in "Initiated" status
            deliveryDates,     // Patients with delivery dates
        });
    } catch (error) {
        console.error("Error fetching dashboard data:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
});

module.exports = router;
