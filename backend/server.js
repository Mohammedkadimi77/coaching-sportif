const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const { protect } = require('./middleware/authMiddleware');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
// MongoDB connection
connectDB();

// Routes
const userRoutes = require('./routes/userRoutes');
const messageRoutes = require('./routes/messageRoutes');
const seanceRoutes = require('./routes/seanceRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const authRoutes = require('./routes/authRoutes');
const coachRoutes = require('./routes/coachRoutes');
const programRoutes = require('./routes/programRoutes');
const subscriptionRoutes = require('./routes/subscriptionRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const adminRoutes = require('./routes/adminRoutes');

app.use('/api/auth', authRoutes);   // Authentification X
app.use('/api/users', protect, userRoutes);  // Gestion des utilisateurs X
app.use('/api/messages', protect, messageRoutes); // Gestion des messages X
app.use('/api/seances', protect, seanceRoutes); // Gestion des séances X
app.use('/api/reviews', protect, reviewRoutes); // Gestion des avis X
app.use('/api/coaches', protect, coachRoutes); // Gestion des coaches X
app.use('/api/programs', protect, programRoutes); // Gestion des programmes X
app.use('/api/subscriptions', protect, subscriptionRoutes); // Gestion des abonnements X
app.use('/api/payments', protect, paymentRoutes); // Gestion des paiements X
app.use('/api/admin', protect, adminRoutes); // Gestion des statistiques X
// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "Quelque chose s'est mal passé !" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
