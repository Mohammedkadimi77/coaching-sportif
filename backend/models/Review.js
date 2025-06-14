const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    program_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Program', required: true },
    rating: { type: Number, min: 1, max: 10 },
    commentaire: String,
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Review', reviewSchema);
