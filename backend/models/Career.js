const mongoose = require('mongoose');

const careerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    position: { type: String, required: true },
    resumeUrl: { type: String }, // This can be a link to a file or just a string for now
    message: { type: String },
    status: { type: String, enum: ['Reviewing', 'Contacted', 'Rejected', 'Hired'], default: 'Reviewing' }
}, { timestamps: true });

module.exports = mongoose.model('Career', careerSchema);
