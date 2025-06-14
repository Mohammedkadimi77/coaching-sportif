const express = require('express');
const router = express.Router();
const {
    getAllSubscriptions,
    getSubscription,
    createSubscription,
    updateSubscription,
    deleteSubscription
} = require('../controllers/subscriptionController');

// Get all subscriptions
router.get('/', getAllSubscriptions);

// Get single subscription
router.get('/:id', getSubscription);

// Create subscription
router.post('/', createSubscription);

// Update subscription
router.put('/:id', updateSubscription);

// Delete subscription
router.delete('/:id', deleteSubscription);

module.exports = router;
