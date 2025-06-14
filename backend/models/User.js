const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    nom: String,
    prenom: String,
    email: { type: String, required: true, unique: true },
    mot_de_passe_hash: { type: String, required: true },
    role: { type: String, enum: ['admin', 'coach', 'sportif'], default: 'sportif' },
    photo_profil: String,
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);
