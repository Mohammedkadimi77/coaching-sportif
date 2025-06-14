const mongoose = require('mongoose');

const seanceSchema = new mongoose.Schema({
    program_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Program', required: true },
    titre: String,
    description: String,
    photo_url: String,
    duration: Number,
    day_number: Number,
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Seance', seanceSchema);
