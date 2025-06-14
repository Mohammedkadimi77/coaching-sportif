const express = require('express');
const router = express.Router();
const { 
    getAllPrograms,
    getProgram,
    createProgram,
    updateProgram,
    deleteProgram
} = require('../controllers/programController');

// Get all programs
router.get('/', getAllPrograms);

// Get single program
router.get('/:id', getProgram);

// Create program
router.post('/', createProgram);

// Update program
router.put('/:id', updateProgram);

// Delete program
router.delete('/:id', deleteProgram);

module.exports = router;
