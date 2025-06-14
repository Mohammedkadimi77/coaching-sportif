const Review = require('../models/Review');
const User = require('../models/User');
const Program = require('../models/Program');

// Get all reviews
const getAllReviews = async (req, res) => {
    try {
        const reviews = await Review.find()
            .populate('user_id', 'nom prenom')
            .populate('program_id', 'titre');
        res.status(200).json(reviews);
    } catch (err) {
        res.status(500).json({ message: "Erreur serveur", error: err.message });
    }
};

// Get single review
const getReview = async (req, res) => {
    try {
        const review = await Review.findById(req.params.id)
            .populate('user_id', 'nom prenom')
            .populate('program_id', 'titre');
        if (!review) return res.status(404).json({ message: "Avis non trouvé" });
        res.status(200).json(review);
    } catch (err) {
        res.status(500).json({ message: "Erreur serveur", error: err.message });
    }
};

// Create review
const createReview = async (req, res) => {
    try {
        const { user_id, program_id, rating, commentaire } = req.body;

        // Verify user exists
        const userExists = await User.findById(user_id);
        if (!userExists) return res.status(404).json({ message: "Utilisateur non trouvé" });

        // Verify program exists
        const programExists = await Program.findById(program_id);
        if (!programExists) return res.status(404).json({ message: "Programme non trouvé" });

        // Verify rating is between 1 and 10
        if (rating < 1 || rating > 10) {
            return res.status(400).json({ message: "La note doit être comprise entre 1 et 10" });
        }

        const review = new Review({
            user_id,
            program_id,
            rating,
            commentaire
        });

        await review.save();
        res.status(201).json({ message: "Avis créé", review });
    } catch (err) {
        res.status(500).json({ message: "Erreur serveur", error: err.message });
    }
};

// Update review
const updateReview = async (req, res) => {
    try {
        const { user_id, program_id, rating, commentaire } = req.body;
        const review = await Review.findById(req.params.id);

        if (!review) return res.status(404).json({ message: "Avis non trouvé" });

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

        // If rating is being updated, verify it's valid
        if (rating && (rating < 1 || rating > 10)) {
            return res.status(400).json({ message: "La note doit être comprise entre 1 et 10" });
        }

        // Update fields
        if (user_id) review.user_id = user_id;
        if (program_id) review.program_id = program_id;
        if (rating) review.rating = rating;
        if (commentaire) review.commentaire = commentaire;

        await review.save();
        res.status(200).json({ message: "Avis mis à jour", review });
    } catch (err) {
        res.status(500).json({ message: "Erreur serveur", error: err.message });
    }
};

// Delete review
const deleteReview = async (req, res) => {
    try {
        const review = await Review.findByIdAndDelete(req.params.id);
        if (!review) return res.status(404).json({ message: "Avis non trouvé" });
        res.status(200).json({ message: "Avis supprimé" });
    } catch (err) {
        res.status(500).json({ message: "Erreur serveur", error: err.message });
    }
};

module.exports = {
    getAllReviews,
    getReview,
    createReview,
    updateReview,
    deleteReview
};
