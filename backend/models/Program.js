const mongoose = require('mongoose');

const programSchema = new mongoose.Schema({
    coach_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Coach', required: true },
    titre: String,
    description: String,
    difficulte: { type: String, enum: ['débutant', 'intermédiaire', 'avancé'] },
    duree: Number, // en jours
    prix: Number,
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Program', programSchema);
