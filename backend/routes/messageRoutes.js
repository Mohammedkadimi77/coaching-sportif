const express = require('express');
const router = express.Router();
const {
    getAllMessages,
    getMessage,
    createMessage,
    updateMessage,
    deleteMessage
} = require('../controllers/messageController');

// Get all messages
router.get('/', getAllMessages);

// Get single message
router.get('/:id', getMessage);

// Create message
router.post('/', createMessage);

// Update message
router.put('/:id', updateMessage);

// Delete message
router.delete('/:id', deleteMessage);

module.exports = router;
