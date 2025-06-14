const express = require('express');
const router = express.Router();
const {
    getAllPayments,
    getPayment,
    createPayment,
    updatePayment,
    deletePayment
} = require('../controllers/paymentController');

// Get all payments
router.get('/', getAllPayments);

// Get single payment
router.get('/:id', getPayment);

// Create payment
router.post('/', createPayment);

// Update payment
router.put('/:id', updatePayment);

// Delete payment
router.delete('/:id', deletePayment);

module.exports = router;
