const express = require('express');
const router = express.Router();
const Patient = require('../models/Patient'); // Patient model
const authenticate = require('../middlewares/authenticate') // Middleware to protect routes

// POST /api/patients - Add new patient information
router.post('/', authenticate, async (req, res) => {
    try {
        const { firstName, lastName, contactInfo, status, currentMedications, notes } = req.body;

        // Create a new patient document
        const newPatient = new Patient({
            firstName,
            lastName,
            contactInfo,
            status,
            currentMedications,
            notes,
            createdBy: req.user.userId // Add the ID of the authenticated user as the creator
        });

        
        await newPatient.save();

        res.status(201).json({ message: 'Patient added successfully', patient: newPatient });
    } catch (error) {
        console.error('Error adding patient:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
