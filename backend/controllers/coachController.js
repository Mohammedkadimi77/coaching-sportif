const User = require('../models/User');

// Get all coaches
const getAllCoaches = async (req, res) => {
    try {
        const coaches = await User.find({ role: 'coach' }).select('-mot_de_passe_hash');
        res.status(200).json(coaches);
    } catch (err) {
        res.status(500).json({ message: "Erreur serveur", error: err.message });
    }
};

// Get single coach
const getCoach = async (req, res) => {
    try {
        const coach = await User.findOne({ _id: req.params.id, role: 'coach' }).select('-mot_de_passe_hash');
        if (!coach) return res.status(404).json({ message: "Coach non trouvé" });
        res.status(200).json(coach);
    } catch (err) {
        res.status(500).json({ message: "Erreur serveur", error: err.message });
    }
};

// Update coach
const updateCoach = async (req, res) => {
    try {
        const { nom, prenom, email } = req.body;
        const coach = await User.findOne({ _id: req.params.id, role: 'coach' });

        if (!coach) return res.status(404).json({ message: "Coach non trouvé" });

        // Update fields
        if (nom) coach.nom = nom;
        if (prenom) coach.prenom = prenom;
        if (email) coach.email = email;

        await coach.save();
        res.status(200).json({ message: "Coach mis à jour", coach });
    } catch (err) {
        res.status(500).json({ message: "Erreur serveur", error: err.message });
    }
};

// Delete coach
const deleteCoach = async (req, res) => {
    try {
        const coach = await User.findOneAndDelete({ _id: req.params.id, role: 'coach' });
        if (!coach) return res.status(404).json({ message: "Coach non trouvé" });
        res.status(200).json({ message: "Coach supprimé" });
    } catch (err) {
        res.status(500).json({ message: "Erreur serveur", error: err.message });
    }
};

module.exports = {
    getAllCoaches,
    getCoach,
    updateCoach,
    deleteCoach
};
