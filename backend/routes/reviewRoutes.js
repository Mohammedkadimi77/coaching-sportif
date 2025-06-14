const express = require('express');
const router = express.Router();
const {
    getAllReviews,
    getReview,
    createReview,
    updateReview,
    deleteReview
} = require('../controllers/reviewController');

// Get all reviews
router.get('/', getAllReviews);

// Get single review
router.get('/:id', getReview);

// Create review
router.post('/', createReview);

// Update review
router.put('/:id', updateReview);

// Delete review
router.delete('/:id', deleteReview);

module.exports = router;
