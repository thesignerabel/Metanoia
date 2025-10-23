const express = require('express');
const router = express.Router();
const {
  getAllDonations,
  getDonationsByEmail,
  getDonationStats,
  createDonation,
  updateDonationStatus
} = require('../controllers/donationController');

// Get all donations (admin)
router.get('/', getAllDonations);

// Get donation statistics
router.get('/stats', getDonationStats);

// Get donations by email
router.get('/email/:email', getDonationsByEmail);

// Create donation
router.post('/', createDonation);

// Update donation status
router.patch('/:id/status', updateDonationStatus);

module.exports = router;