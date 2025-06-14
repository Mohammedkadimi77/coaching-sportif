const express = require('express');
const router = express.Router();
const { 
    getAllUsers,
    getUser,
    updateUser,
    deleteUser
} = require('../controllers/userController');

// Get all users
router.get('/', getAllUsers);

// Get single user
router.get('/:id', getUser);

// Update user
router.put('/:id', updateUser);

// Delete user
router.delete('/:id', deleteUser);

module.exports = router;
