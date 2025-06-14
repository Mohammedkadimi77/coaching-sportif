const Seance = require('../models/Seance');
const Program = require('../models/Program');

// Get all seances
const getAllSeances = async (req, res) => {
    try {
        const seances = await Seance.find()
            .populate('program_id', 'titre description');
        res.status(200).json(seances);
    } catch (err) {
        res.status(500).json({ message: "Erreur serveur", error: err.message });
    }
};

// Get single seance
const getSeance = async (req, res) => {
    try {
        const seance = await Seance.findById(req.params.id)
            .populate('program_id', 'titre description');
        if (!seance) return res.status(404).json({ message: "Séance non trouvée" });
        res.status(200).json(seance);
    } catch (err) {
        res.status(500).json({ message: "Erreur serveur", error: err.message });
    }
};

// Create seance
const createSeance = async (req, res) => {
    try {
        const { program_id, titre, description, photo_url, duration, day_number } = req.body;

        // Verify program exists
        const programExists = await Program.findById(program_id);
        if (!programExists) return res.status(404).json({ message: "Programme non trouvé" });

        const seance = new Seance({
            program_id,
            titre,
            description,
            photo_url,
            duration,
            day_number
        });

        await seance.save();
        res.status(201).json({ message: "Séance créée", seance });
    } catch (err) {
        res.status(500).json({ message: "Erreur serveur", error: err.message });
    }
};

// Update seance
const updateSeance = async (req, res) => {
    try {
        const { program_id, titre, description, photo_url, duration, day_number } = req.body;
        const seance = await Seance.findById(req.params.id);

        if (!seance) return res.status(404).json({ message: "Séance non trouvée" });

        // If program_id is being updated, verify it exists
        if (program_id) {
            const programExists = await Program.findById(program_id);
            if (!programExists) return res.status(404).json({ message: "Programme non trouvé" });
        }

        // Update fields
        if (program_id) seance.program_id = program_id;
        if (titre) seance.titre = titre;
        if (description) seance.description = description;
        if (photo_url) seance.photo_url = photo_url;
        if (duration) seance.duration = duration;
        if (day_number) seance.day_number = day_number;

        await seance.save();
        res.status(200).json({ message: "Séance mise à jour", seance });
    } catch (err) {
        res.status(500).json({ message: "Erreur serveur", error: err.message });
    }
};

// Delete seance
const deleteSeance = async (req, res) => {
    try {
        const seance = await Seance.findByIdAndDelete(req.params.id);
        if (!seance) return res.status(404).json({ message: "Séance non trouvée" });
        res.status(200).json({ message: "Séance supprimée" });
    } catch (err) {
        res.status(500).json({ message: "Erreur serveur", error: err.message });
    }
};

module.exports = {
    getAllSeances,
    getSeance,
    createSeance,
    updateSeance,
    deleteSeance
};
