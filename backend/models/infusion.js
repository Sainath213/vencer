const mongoose = require('mongoose');

const infusionSchema = new mongoose.Schema({
    patientId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Patient', 
        required: true 
    },
    scheduledBy: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User' 
    },
    administeredBy: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User' 
    },
    medication: { 
        type: String, 
        required: true 
    },
    colorCode: { 
        type: String, 
        required: true 
    },
    date: { 
        type: Date, 
        required: true 
    },
    timeSlot: { 
        type: String, 
        required: true 
    },
    frequency: { 
        type: String, 
        enum: ['Daily', 'Weekly', 'Bi-Weekly', 'Monthly', 'One-Time', 'Custom'], 
        required: true 
    },
    status: { 
        type: String, 
        enum: ['Scheduled', 'Completed', 'Cancelled'], 
        default: 'Scheduled' 
    },
    notes: { 
        type: String 
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    }
});

module.exports = mongoose.models.Infusion || mongoose.model('Infusion', infusionSchema);
