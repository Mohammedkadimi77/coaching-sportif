const Message = require('../models/Message');
const User = require('../models/User');

// Get all messages
const getAllMessages = async (req, res) => {
    try {
        const messages = await Message.find()
            .populate('sender_id', 'nom prenom')
            .populate('receiver_id', 'nom prenom');
        res.status(200).json(messages);
    } catch (err) {
        res.status(500).json({ message: "Erreur serveur", error: err.message });
    }
};

// Get single message
const getMessage = async (req, res) => {
    try {
        const message = await Message.findById(req.params.id)
            .populate('sender_id', 'nom prenom')
            .populate('receiver_id', 'nom prenom');
        if (!message) return res.status(404).json({ message: "Message non trouvé" });
        res.status(200).json(message);
    } catch (err) {
        res.status(500).json({ message: "Erreur serveur", error: err.message });
    }
};

// Create message
const createMessage = async (req, res) => {
    try {
        const { sender_id, receiver_id, content } = req.body;

        // Verify sender exists
        const senderExists = await User.findById(sender_id);
        if (!senderExists) return res.status(404).json({ message: "Expéditeur non trouvé" });

        // Verify receiver exists
        const receiverExists = await User.findById(receiver_id);
        if (!receiverExists) return res.status(404).json({ message: "Destinataire non trouvé" });

        const message = new Message({
            sender_id,
            receiver_id,
            content,
            is_read: false
        });

        await message.save();
        res.status(201).json({ message: "Message créé", message });
    } catch (err) {
        res.status(500).json({ message: "Erreur serveur", error: err.message });
    }
};

// Update message
const updateMessage = async (req, res) => {
    try {
        const { content, is_read } = req.body;
        const message = await Message.findById(req.params.id);

        if (!message) return res.status(404).json({ message: "Message non trouvé" });

        // Update fields
        if (content) message.content = content;
        if (typeof is_read === 'boolean') message.is_read = is_read;

        await message.save();
        res.status(200).json({ message: "Message mis à jour", message });
    } catch (err) {
        res.status(500).json({ message: "Erreur serveur", error: err.message });
    }
};

// Delete message
const deleteMessage = async (req, res) => {
    try {
        const message = await Message.findByIdAndDelete(req.params.id);
        if (!message) return res.status(404).json({ message: "Message non trouvé" });
        res.status(200).json({ message: "Message supprimé" });
    } catch (err) {
        res.status(500).json({ message: "Erreur serveur", error: err.message });
    }
};

module.exports = {
    getAllMessages,
    getMessage,
    createMessage,
    updateMessage,
    deleteMessage
};

