const User = require('../models/User');
const Coach = require('../models/Coach');
const Program = require('../models/Program');
const Subscription = require('../models/Subscription');
const Payment = require('../models/Payment');
const Review = require('../models/Review');

exports.getDashboardStats = async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();
        const totalCoaches = await User.countDocuments({ role: 'coach' });
        const totalSportifs = await User.countDocuments({ role: 'sportif' });

        const totalPrograms = await Program.countDocuments();
        const activeSubscriptions = await Subscription.countDocuments({ status: 'active' });

        const totalPayments = await Payment.aggregate([
            { $match: { status_paiement: 'validé' } },
            { $group: { _id: null, total: { $sum: '$montant' } } }
        ]);

        const avgRatingData = await Review.aggregate([
            { $group: { _id: null, moyenne: { $avg: '$rating' } } }
        ]);

        res.status(200).json({
            totalUsers,
            totalCoaches,
            totalSportifs,
            totalPrograms,
            activeSubscriptions,
            totalPayments: totalPayments[0]?.total || 0,
            averageRating: avgRatingData[0]?.moyenne?.toFixed(2) || 'N/A'
        });

    } catch (err) {
        res.status(500).json({ message: 'Erreur lors du chargement des statistiques', error: err.message });
    }
};
