const Subscription = require('../models/Subscription');
const User = require('../models/User');
const Program = require('../models/Program');

// Get all subscriptions
const getAllSubscriptions = async (req, res) => {
    try {
        const subscriptions = await Subscription.find()
            .populate('user_id', 'nom prenom email')
            .populate('program_id', 'titre description');
        res.status(200).json(subscriptions);
    } catch (err) {
        res.status(500).json({ message: "Erreur serveur", error: err.message });
    }
};

// Get single subscription
const getSubscription = async (req, res) => {
    try {
        const subscription = await Subscription.findById(req.params.id)
            .populate('user_id', 'nom prenom email')
            .populate('program_id', 'titre description');
        if (!subscription) return res.status(404).json({ message: "Abonnement non trouvé" });
        res.status(200).json(subscription);
    } catch (err) {
        res.status(500).json({ message: "Erreur serveur", error: err.message });
    }
};

// Create subscription
const createSubscription = async (req, res) => {
    try {
        const { user_id, program_id, start_date, end_date, status } = req.body;

        // Verify user exists
        const userExists = await User.findById(user_id);
        if (!userExists) return res.status(404).json({ message: "Utilisateur non trouvé" });

        // Verify program exists
        const programExists = await Program.findById(program_id);
        if (!programExists) return res.status(404).json({ message: "Programme non trouvé" });

        // Verify status
        const validStatus = ['active', 'expiré', 'annulé'];
        if (!validStatus.includes(status)) {
            return res.status(400).json({ message: "Statut d'abonnement invalide" });
        }

        const subscription = new Subscription({
            user_id,
            program_id,
            start_date,
            end_date,
            status
        });

        await subscription.save();
        res.status(201).json({ message: "Abonnement créé", subscription });
    } catch (err) {
        res.status(500).json({ message: "Erreur serveur", error: err.message });
    }
};

// Update subscription
const updateSubscription = async (req, res) => {
    try {
        const { user_id, program_id, start_date, end_date, status } = req.body;
        const subscription = await Subscription.findById(req.params.id);

        if (!subscription) return res.status(404).json({ message: "Abonnement non trouvé" });

        // If user_id is being updated, verify it exists
        if (user_id) {
            const userExists = await User.findById(user_id);
            if (!userExists) return res.status(404).json({ message: "Utilisateur non trouvé" });
        }

        // If program_id is being updated, verify it exists
        if (program_id) {
            const programExists = await Program.findById(program_id);
            if (!programExists) return res.status(404).json({ message: "Programme non trouvé" });
        }

        // Verify status if being updated
        if (status) {
            const validStatus = ['active', 'expiré', 'annulé'];
            if (!validStatus.includes(status)) {
                return res.status(400).json({ message: "Statut d'abonnement invalide" });
            }
        }

        // Update fields
        if (user_id) subscription.user_id = user_id;
        if (program_id) subscription.program_id = program_id;
        if (start_date) subscription.start_date = start_date;
        if (end_date) subscription.end_date = end_date;
        if (status) subscription.status = status;

        await subscription.save();
        res.status(200).json({ message: "Abonnement mis à jour", subscription });
    } catch (err) {
        res.status(500).json({ message: "Erreur serveur", error: err.message });
    }
};

// Delete subscription
const deleteSubscription = async (req, res) => {
    try {
        const subscription = await Subscription.findByIdAndDelete(req.params.id);
        if (!subscription) return res.status(404).json({ message: "Abonnement non trouvé" });
        res.status(200).json({ message: "Abonnement supprimé" });
    } catch (err) {
        res.status(500).json({ message: "Erreur serveur", error: err.message });
    }
};

module.exports = {
    getAllSubscriptions,
    getSubscription,
    createSubscription,
    updateSubscription,
    deleteSubscription
};
