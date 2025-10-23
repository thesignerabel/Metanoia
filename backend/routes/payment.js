const express = require('express');
const router = express.Router();
const {
  initializePaystackPayment,
  verifyPaystackPayment,
  getDonation
} = require('../controllers/paymentController');


// Paystack routes
router.post('/paystack/initialize', initializePaystackPayment);
router.post('/paystack/verify', verifyPaystackPayment);

// Get Paystack public key (safe to expose to frontend)
router.get('/paystack/config', (req, res) => {
  res.json({
    publicKey: process.env.PAYSTACK_PUBLIC_KEY
  });
});

// General routes
router.get('/donation/:id', getDonation);

module.exports = router;