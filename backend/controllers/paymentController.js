const Payment = require('../models/Payment');
const User = require('../models/User');
const Program = require('../models/Program');

// Get all payments
const getAllPayments = async (req, res) => {
    try {
        const payments = await Payment.find()
            .populate('user_id', 'nom prenom email')
            .populate('program_id', 'titre');
        res.status(200).json(payments);
    } catch (err) {
        res.status(500).json({ message: "Erreur serveur", error: err.message });
    }
};

// Get single payment
const getPayment = async (req, res) => {
    try {
        const payment = await Payment.findById(req.params.id)
            .populate('user_id', 'nom prenom email')
            .populate('program_id', 'titre');
        if (!payment) return res.status(404).json({ message: "Paiement non trouvé" });
        res.status(200).json(payment);
    } catch (err) {
        res.status(500).json({ message: "Erreur serveur", error: err.message });
    }
};

// Create payment
const createPayment = async (req, res) => {
    try {
        const { user_id, program_id, montant, methode_paiement, date_paiement, status_paiement } = req.body;

        // Verify user exists
        const userExists = await User.findById(user_id);
        if (!userExists) return res.status(404).json({ message: "Utilisateur non trouvé" });

        // Verify program exists
        const programExists = await Program.findById(program_id);
        if (!programExists) return res.status(404).json({ message: "Programme non trouvé" });

        // Verify payment method
        const validPaymentMethods = ['visa', 'mastercard', 'paypal'];
        if (!validPaymentMethods.includes(methode_paiement)) {
            return res.status(400).json({ message: "Méthode de paiement invalide" });
        }

        // Verify payment status
        const validStatus = ['en attente', 'échoué', 'validé'];
        if (!validStatus.includes(status_paiement)) {
            return res.status(400).json({ message: "Statut de paiement invalide" });
        }

        const payment = new Payment({
            user_id,
            program_id,
            montant,
            methode_paiement,
            date_paiement,
            status_paiement
        });

        await payment.save();
        res.status(201).json({ message: "Paiement créé", payment });
    } catch (err) {
        res.status(500).json({ message: "Erreur serveur", error: err.message });
    }
};

// Update payment
const updatePayment = async (req, res) => {
    try {
        const { user_id, program_id, montant, methode_paiement, date_paiement, status_paiement } = req.body;
        const payment = await Payment.findById(req.params.id);

        if (!payment) return res.status(404).json({ message: "Paiement non trouvé" });

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

        // Verify payment method if being updated
        if (methode_paiement) {
            const validPaymentMethods = ['visa', 'mastercard', 'paypal'];
            if (!validPaymentMethods.includes(methode_paiement)) {
                return res.status(400).json({ message: "Méthode de paiement invalide" });
            }
        }

        // Verify payment status if being updated
        if (status_paiement) {
            const validStatus = ['en attente', 'échoué', 'validé'];
            if (!validStatus.includes(status_paiement)) {
                return res.status(400).json({ message: "Statut de paiement invalide" });
            }
        }

        // Update fields
        if (user_id) payment.user_id = user_id;
        if (program_id) payment.program_id = program_id;
        if (montant) payment.montant = montant;
        if (methode_paiement) payment.methode_paiement = methode_paiement;
        if (date_paiement) payment.date_paiement = date_paiement;
        if (status_paiement) payment.status_paiement = status_paiement;

        await payment.save();
        res.status(200).json({ message: "Paiement mis à jour", payment });
    } catch (err) {
        res.status(500).json({ message: "Erreur serveur", error: err.message });
    }
};

// Delete payment
const deletePayment = async (req, res) => {
    try {
        const payment = await Payment.findByIdAndDelete(req.params.id);
        if (!payment) return res.status(404).json({ message: "Paiement non trouvé" });
        res.status(200).json({ message: "Paiement supprimé" });
    } catch (err) {
        res.status(500).json({ message: "Erreur serveur", error: err.message });
    }
};

module.exports = {
    getAllPayments,
    getPayment,
    createPayment,
    updatePayment,
    deletePayment
};
