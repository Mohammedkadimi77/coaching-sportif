const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
    const { nom, prenom, email, mot_de_passe, role } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: "Email déjà utilisé" });

        const hashedPassword = await bcrypt.hash(mot_de_passe, 10);
        const newUser = await User.create({
            nom,
            prenom,
            email,
            mot_de_passe_hash: hashedPassword,
            role
        });

        const token = jwt.sign({ id: newUser._id, role: newUser.role }, process.env.JWT_SECRET, {
            expiresIn: '7d'
        });

        res.status(201).json({ user: newUser, token });
    } catch (err) {
        res.status(500).json({ message: "Erreur serveur", error: err.message });
    }
};

const login = async (req, res) => {
    const { email, mot_de_passe } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "Utilisateur introuvable" });

        const isMatch = await bcrypt.compare(mot_de_passe, user.mot_de_passe_hash);
        if (!isMatch) return res.status(400).json({ message: "Mot de passe incorrect" });

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
            expiresIn: '7d'
        });

        res.status(200).json({ user, token });
    } catch (err) {
        res.status(500).json({ message: "Erreur serveur", error: err.message });
    }
};

module.exports = { register, login };
