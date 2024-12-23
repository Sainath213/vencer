const express = require('express');
const router = express.Router();
const { Referral, User } = require('../models/User'); // Import models
const authenticate = require('../middlewares/authenticate'); // Auth middleware

// POST: Add a referral for a specific user
router.post('/users/:userId/referrals', authenticate, async (req, res) => {
    const userId = req.params.userId; // User ID from the URL
    const referralData = req.body;   // Referral data from the request body
    // console.log(referralData);
    try {
        // Step 1: Find the user
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        // Step 2: Create the referral
        const referral = new Referral({
            ...referralData,
            createdBy: userId, // Link to the user who created this referral
        });

        // Step 3: Save the referral to the database
        const savedReferral = await referral.save();

        // Step 4: Update the user's referrals array
        user.referrals.push(savedReferral._id);
        await user.save();

        // Step 5: Respond with the saved referral
        res.status(201).json({
            success: true,
            message: 'Referral added successfully',
            referral: savedReferral,
        });
    } catch (error) {
        console.error('Error adding referral:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message,
        });
    }
});

module.exports = router ;
