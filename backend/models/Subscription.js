const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    program_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Program', required: true },
    start_date: Date,
    end_date: Date,
    status: { type: String, enum: ['active', 'expiré', 'annulé'] },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Subscription', subscriptionSchema);
