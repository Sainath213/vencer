const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    contactInfo: {
        phone: { type: String },
        email: { type: String }
    },
    status: { 
        type: String, 
        enum: ['Pending', 'Approved', 'Former'], 
        default: 'Pending' 
    },
    currentMedications: [{ type: String }],
    notes: [{ 
        content: String, 
        date: { type: Date, default: Date.now } 
    }],
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    infusions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Infusion' }],
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.models.Patient || mongoose.model('Patient', patientSchema);
