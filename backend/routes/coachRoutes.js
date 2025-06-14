const express = require('express');
const router = express.Router();
const { 
    getAllCoaches,
    getCoach,
    updateCoach,
    deleteCoach
} = require('../controllers/coachController');

// Get all coaches
router.get('/', getAllCoaches);

// Get single coach
router.get('/:id', getCoach);

// Update coach
router.put('/:id', updateCoach);

// Delete coach
router.delete('/:id', deleteCoach);

module.exports = router;
