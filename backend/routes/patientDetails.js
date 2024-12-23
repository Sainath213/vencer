const express = require('express');
const router = express.Router();
const { Referral } = require('../models/User'); // Import the Referral model
const authenticate = require('../middlewares/authenticate'); // Middleware to protect routes

// GET /api/patients/:id - Fetch patient details by ID
router.get('/patients/:id', authenticate, async (req, res) => {
  try {
    const { id } = req.params; // Extract patient ID from the URL
    const patient = await Referral.findById(id); // Query the Referral collection

    if (!patient) {
      return res.status(404).json({ success: false, message: "Patient not found" });
    }

    res.status(200).json({ success: true, patient });
  } catch (error) {
    console.error("Error fetching patient details:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// PUT /api/patients/:id - Update patient details by ID
router.put('/patients/:id', authenticate, async (req, res) => {
  try {
    const { id } = req.params; // Extract patient ID from the URL
    const updatedData = req.body; // Get updated data from the request body

    const updatedPatient = await Referral.findByIdAndUpdate(
      id,
      updatedData,
      { new: true, runValidators: true } // Return the updated document and apply validation
    );

    if (!updatedPatient) {
      return res.status(404).json({ success: false, message: "Patient not found" });
    }

    res.status(200).json({ success: true, patient: updatedPatient });
  } catch (error) {
    console.error("Error updating patient details:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// DELETE /api/patients/:id - Delete patient by ID
router.delete('/patients/:id', authenticate, async (req, res) => {
  try {
    const { id } = req.params; // Extract patient ID from the URL
    const deletedPatient = await Referral.findByIdAndDelete(id); // Delete the patient

    if (!deletedPatient) {
      return res.status(404).json({ success: false, message: "Patient not found" });
    }

    res.status(200).json({ success: true, message: "Patient deleted successfully" });
  } catch (error) {
    console.error("Error deleting patient:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;
