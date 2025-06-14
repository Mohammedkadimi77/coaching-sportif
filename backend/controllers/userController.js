const User = require('../models/User');

// Get all users
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select('-mot_de_passe_hash');
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ message: "Erreur serveur", error: err.message });
    }
};

// Get single user
const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-mot_de_passe_hash');
        if (!user) return res.status(404).json({ message: "Utilisateur non trouvé" });
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ message: "Erreur serveur", error: err.message });
    }
};

// Update user
const updateUser = async (req, res) => {
    try {
        const { nom, prenom, email, role } = req.body;
        const user = await User.findById(req.params.id);

        if (!user) return res.status(404).json({ message: "Utilisateur non trouvé" });

        // Update fields
        if (nom) user.nom = nom;
        if (prenom) user.prenom = prenom;
        if (email) user.email = email;
        if (role) user.role = role;

        await user.save();
        res.status(200).json({ message: "Utilisateur mis à jour", user });
    } catch (err) {
        res.status(500).json({ message: "Erreur serveur", error: err.message });
    }
};

// Delete user
const deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) return res.status(404).json({ message: "Utilisateur non trouvé" });
        res.status(200).json({ message: "Utilisateur supprimé" });
    } catch (err) {
        res.status(500).json({ message: "Erreur serveur", error: err.message });
    }
};

module.exports = {
    getAllUsers,
    getUser,
    updateUser,
    deleteUser
};
