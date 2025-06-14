const express = require('express');
const router = express.Router();
const { 
    getAllSeances,
    getSeance,
    createSeance,
    updateSeance,
    deleteSeance
} = require('../controllers/seanceController');

// Get all seances
router.get('/', getAllSeances);

// Get single seance
router.get('/:id', getSeance);

// Create seance
router.post('/', createSeance);

// Update seance
router.put('/:id', updateSeance);

// Delete seance
router.delete('/:id', deleteSeance);

module.exports = router;
