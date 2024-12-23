const express = require('express');
const router = express.Router();
const Patient = require('../models/Patient'); // Patient model
//const Infusion = require('../models/infusion'); // Infusion model
const authenticate = require('../middlewares/authenticate'); // Middleware to protect routes

// POST /api/add-patient-and-infusion - Add a new patient and schedule an infusion
router.post('/', authenticate, async (req, res) => {
    try {
        const { 
            patientDetails: { firstName, lastName, contactInfo, status, currentMedications, notes },
            infusionDetails: { medication, colorCode, date, timeSlot, frequency, status: infusionStatus, notes: infusionNotes }
        } = req.body;

        // Step 1: Create a new patient document
        const newPatient = new Patient({
            firstName,
            lastName,
            contactInfo,
            status,
            currentMedications,
            notes,
            createdBy: req.user.userId // Attach the ID of the authenticated user as the creator
        });

        // Save the new patient to the database
        const savedPatient = await newPatient.save();

        // Step 2: Create a new infusion document associated with this patient
        const newInfusion = new Infusion({
            patientId: savedPatient._id, // Reference to the created patient's ID
            scheduledBy: req.user.userId, // ID of the user who scheduled the infusion
            medication,
            colorCode,
            date,
            timeSlot,
            frequency,
            status: infusionStatus || 'Scheduled', // Default to 'Scheduled' if not provided
            notes: infusionNotes
        });

        // Save the new infusion to the database
        const savedInfusion = await newInfusion.save();

        // Step 3: Add the infusion ID to the patient's infusion array
        savedPatient.infusions.push(savedInfusion._id);
        await savedPatient.save();

        // Send a success response
        res.status(201).json({
            message: 'Patient and infusion added successfully',
            patient: savedPatient,
            infusion: savedInfusion
        });
    } catch (error) {
        console.error('Error adding patient and infusion:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
