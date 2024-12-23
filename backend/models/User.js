const mongoose = require('mongoose');

// 1. User Schema
const userSchema = new mongoose.Schema({
    userName: { type: String, unique: true, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
    referrals: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Referral' }],
    reauthorizations: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Reauthorization' }],
    holdDischarges: [{ type: mongoose.Schema.Types.ObjectId, ref: 'HoldDischarge' }],
});

// 2. Referral Schema
const referralSchema = new mongoose.Schema({
    dateReceived: { type: Date, default:Date.now, required: true },
    rep: { type: String, required: true },
    patientName: { type: String, required: true },
    insurance: { type: String, required: true },
    benefit: { type: String, enum: ['Medical', 'Pharmacy'], required: true },
    drug: { type: String, required: true },
    md: { type: String, required: true }, 
    status: { type: String, enum: ['Approved', 'Denied', 'Initiated', 'Cancelled/No Go'], required: true },
    welcomeCall: { type: Date },
    dwo: { type: Boolean, default: false },
    deliveryDate: { type: Date },
    notes: { type: String },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Links to User
});

// 3. Reauthorization Schema
const reauthorizationSchema = new mongoose.Schema({
    dateInfoEntered: { type: Date, required: true },
    patientName: { type: String, required: true },
    drug: { type: String, required: true },
    authExpiration: { type: Date, required: true },
    md: { type: String, required: true }, // Doctor's Name
    status: { type: String, enum: ['Approved', 'Denied'], required: true },
    dwo: { type: Boolean, default: false },
    medicalRecords: { type: Boolean, default: false },
    notes: { type: String },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Links to User
});

// 4. Hold/Discharge Schema
const holdDischargeSchema = new mongoose.Schema({
    dateEntered: { type: Date, required: true },
    rep: { type: String, required: true },
    patientName: { type: String, required: true },
    insurance: { type: String, required: true },
    drug: { type: String, required: true },
    md: { type: String, required: true }, // Doctor's Name
    status: { type: String, enum: ['Hold', 'Discharge', 'Cancelled/No Go'], required: true },
    notes: { type: String },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Links to User
});

// Models
const User = mongoose.model('User', userSchema);
const Referral = mongoose.model('Referral', referralSchema);
const Reauthorization = mongoose.model('Reauthorization', reauthorizationSchema);
const HoldDischarge = mongoose.model('HoldDischarge', holdDischargeSchema);


module.exports = {
    User,
    Referral,
    Reauthorization,
    HoldDischarge,
};

