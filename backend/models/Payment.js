const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  program_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Program', required: true },
  montant: Number,
  methode_paiement: {type: String, enum: ['visa', 'mastercard', 'paypal']},
  date_paiement: Date,
  status_paiement: {type: String, enum: ['en attente', 'échoué', 'validé']},
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Payment', paymentSchema);
