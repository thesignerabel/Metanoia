const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true,
    min: 0.01
  },
  currency: {
    type: String,
    default: 'USD'
  },
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  frequency: {
    type: String,
    enum: ['one-time', 'monthly', 'annual'],
    default: 'one-time'
  },
  designation: {
    type: String,
    trim: true
  },
  paymentMethod: {
    type: String,
    enum: ['card', 'paystack'],
    required: true
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'completed', 'failed', 'cancelled'],
    default: 'pending'
  },
  transactionId: {
    type: String,
    trim: true
  },
  paymentProvider: {
    type: String,
    enum: ['stripe', 'paystack'],
    required: true
  },
  metadata: {
    type: mongoose.Schema.Types.Mixed
  }
}, {
  timestamps: true
});

// Index for efficient queries
donationSchema.index({ email: 1, createdAt: -1 });
donationSchema.index({ paymentStatus: 1 });

module.exports = mongoose.model('Donation', donationSchema);