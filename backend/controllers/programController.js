const Program = require('../models/Program');
const User = require('../models/User');

// Get all programs
const getAllPrograms = async (req, res) => {
    try {
        const programs = await Program.find();
        res.status(200).json(programs);
    } catch (err) {
        res.status(500).json({ message: "Erreur serveur", error: err.message });
    }
};

// Get single program
const getProgram = async (req, res) => {
    try {
        // const program = await Program.findById(req.params.id).populate('coach_id');
        const program = await Program.findById(req.params.id);
        if (!program) return res.status(404).json({ message: "Programme non trouvé" });
        res.status(200).json(program);
    } catch (err) {
        res.status(500).json({ message: "Erreur serveur", error: err.message });
    }
};

// Create program
const createProgram = async (req, res) => {
    try {
        const { titre, description, difficulte, duree, prix } = req.body;

        // Verify coach exists
        const coachExists = await User.findOne({ role: 'coach' })
        if (!coachExists) return res.status(404).json({ message: "Coach non trouvé" });

        const program = await Program.create({
            titre,
            description,
            difficulte,
            duree,
            prix,
            coach_id: coachExists._id
        });

        res.status(201).json({ message: "Programme créé", program });
    } catch (err) {
        res.status(500).json({ message: "Erreur serveur", error: err.message });
    }
};

// Update program
const updateProgram = async (req, res) => {
    try {
        const { titre, description, difficulte, duree, prix, coach_id } = req.body;
        const program = await Program.findById(req.params.id);

        if (!program) return res.status(404).json({ message: "Programme non trouvé" });

        // If coach is being updated, verify it exists
        if (coach_id) {
            const coachExists = await User.findOne({ _id: coach_id, role: 'coach' });
            if (!coachExists) return res.status(404).json({ message: "Coach non trouvé" });
        }

        // Update fields
        if (titre) program.titre = titre;
        if (description) program.description = description;
        if (difficulte) program.difficulte = difficulte;
        if (duree) program.duree = duree;
        if (prix) program.prix = prix;
        if (coach_id) program.coach_id = coach_id;

        await program.save();
        res.status(200).json({ message: "Programme mis à jour", program });
    } catch (err) {
        res.status(500).json({ message: "Erreur serveur", error: err.message });
    }
};

// Delete program
const deleteProgram = async (req, res) => {
    try {
        const program = await Program.findByIdAndDelete(req.params.id);
        if (!program) return res.status(404).json({ message: "Programme non trouvé" });
        res.status(200).json({ message: "Programme supprimé" });
    } catch (err) {
        res.status(500).json({ message: "Erreur serveur", error: err.message });
    }
};

module.exports = {
    getAllPrograms,
    getProgram,
    createProgram,
    updateProgram,
    deleteProgram
};
