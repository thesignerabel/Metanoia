const Donation = require('../models/Donation');

// Get all donations (admin functionality)
const getAllDonations = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const donations = await Donation.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Donation.countDocuments();

    res.json({
      donations,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalDonations: total,
        hasNext: page * limit < total,
        hasPrev: page > 1
      }
    });
  } catch (error) {
    console.error('Get all donations error:', error);
    res.status(500).json({ error: 'Failed to retrieve donations' });
  }
};

// Get donations by email
const getDonationsByEmail = async (req, res) => {
  try {
    const { email } = req.params;
    const donations = await Donation.find({ email }).sort({ createdAt: -1 });
    res.json(donations);
  } catch (error) {
    console.error('Get donations by email error:', error);
    res.status(500).json({ error: 'Failed to retrieve donations' });
  }
};

// Get donation statistics
const getDonationStats = async (req, res) => {
  try {
    const totalDonations = await Donation.countDocuments();
    const completedDonations = await Donation.countDocuments({ paymentStatus: 'completed' });
    const totalAmount = await Donation.aggregate([
      { $match: { paymentStatus: 'completed' } },
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ]);

    const monthlyStats = await Donation.aggregate([
      {
        $match: {
          paymentStatus: 'completed',
          createdAt: { $gte: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000) }
        }
      },
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' }
          },
          count: { $sum: 1 },
          amount: { $sum: '$amount' }
        }
      },
      { $sort: { '_id.year': -1, '_id.month': -1 } }
    ]);

    res.json({
      totalDonations,
      completedDonations,
      totalAmount: totalAmount[0]?.total || 0,
      monthlyStats
    });
  } catch (error) {
    console.error('Get donation stats error:', error);
    res.status(500).json({ error: 'Failed to retrieve statistics' });
  }
};

// Create donation (alternative to payment controller for simple donations)
const createDonation = async (req, res) => {
  try {
    const donation = new Donation(req.body);
    await donation.save();
    res.status(201).json(donation);
  } catch (error) {
    console.error('Create donation error:', error);
    res.status(500).json({ error: 'Failed to create donation' });
  }
};

// Update donation status
const updateDonationStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { paymentStatus, transactionId } = req.body;

    const donation = await Donation.findByIdAndUpdate(
      id,
      { paymentStatus, transactionId },
      { new: true }
    );

    if (!donation) {
      return res.status(404).json({ error: 'Donation not found' });
    }

    res.json(donation);
  } catch (error) {
    console.error('Update donation status error:', error);
    res.status(500).json({ error: 'Failed to update donation' });
  }
};

module.exports = {
  getAllDonations,
  getDonationsByEmail,
  getDonationStats,
  createDonation,
  updateDonationStatus
};