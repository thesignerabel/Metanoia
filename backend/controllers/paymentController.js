const https = require('https')
const Donation = require('../models/Donation');


// Initialize Paystack Transaction
const initializePaystackPayment = async (req, res) => {
  try {
    const { amount, firstName, lastName, email, frequency, designation } = req.body;

    // Validate required fields
    if (!amount || !firstName || !lastName || !email) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Convert amount to kobo for Paystack (merchant only supports USD, so use NGN)
    const amountInKobo = Math.round(parseFloat(amount) * 100);

    const params = JSON.stringify({
      "email": email,
      "amount": amountInKobo.toString(),
      "currency": 'GHS', // Use GHS for Ghanaian Cedi
      "reference": `don_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      "metadata": {
        firstName,
        lastName,
        frequency,
        designation: designation || ''
      }
    })

    const options = {
      hostname: 'api.paystack.co',
      port: 443,
      path: '/transaction/initialize',
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        'Content-Type': 'application/json'
      }
    }

    const req_paystack = https.request(options, res_paystack => {
      let data = ''

      res_paystack.on('data', (chunk) => {
        data += chunk
      });

      res_paystack.on('end', async () => {
        try {
          const response = JSON.parse(data)

          if (!response.status) {
            console.error('Paystack API error:', response);
            return res.status(500).json({ error: 'Paystack API error' });
          }

          // Save donation record (only if database is connected)
          let donation = null;
          try {
            donation = new Donation({
              amount: parseFloat(amount),
              currency: 'GHS', // Use GHS for Ghanaian Cedi
              firstName,
              lastName,
              email,
              frequency,
              designation,
              paymentMethod: 'paystack',
              paymentProvider: 'paystack',
              transactionId: response.data.reference,
              metadata: { paystackData: response.data }
            });
            await donation.save();
          } catch (dbError) {
            console.log('Database not available, proceeding without saving donation record');
          }

          res.json({
            authorization_url: response.data.authorization_url,
            reference: response.data.reference,
            donationId: donation ? donation._id : null
          });
        } catch (parseError) {
          console.error('Error parsing Paystack response:', parseError);
          res.status(500).json({ error: 'Invalid response from payment provider' });
        }
      })
    }).on('error', error => {
      console.error('Paystack payment initialization error:', error);
      res.status(500).json({ error: 'Failed to initialize payment' });
    })

    req_paystack.write(params)
    req_paystack.end()
  } catch (error) {
    console.error('Paystack payment initialization error:', error);
    res.status(500).json({ error: 'Failed to initialize payment' });
  }
};

// Verify Paystack Payment
const verifyPaystackPayment = async (req, res) => {
  try {
    const { reference, donationId } = req.body;

    if (!reference) {
      return res.status(400).json({ error: 'Reference is required' });
    }

    const options = {
      hostname: 'api.paystack.co',
      port: 443,
      path: `/transaction/verify/${reference}`,
      method: 'GET',
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        'Content-Type': 'application/json'
      }
    }

    const req_paystack = https.request(options, res_paystack => {
      let data = ''

      res_paystack.on('data', (chunk) => {
        data += chunk
      });

      res_paystack.on('end', async () => {
        try {
          const response = JSON.parse(data)

          if (!response.status) {
            console.error('Paystack verification API error:', response);
            return res.status(500).json({ error: 'Paystack verification API error' });
          }

          // Update donation status (only if database is connected and donationId provided)
          let donation = null;
          if (donationId) {
            try {
              donation = await Donation.findById(donationId);
              if (donation) {
                donation.paymentStatus = response.data.status === 'success' ? 'completed' : 'failed';
                donation.metadata = { ...donation.metadata, verificationData: response.data };
                await donation.save();
              }
            } catch (dbError) {
              console.log('Database not available, skipping donation update');
            }
          }

          res.json({
            status: response.data.status,
            donation: donation
          });
        } catch (parseError) {
          console.error('Error parsing Paystack verification response:', parseError);
          res.status(500).json({ error: 'Invalid response from payment provider' });
        }
      })
    }).on('error', error => {
      console.error('Paystack payment verification error:', error);
      res.status(500).json({ error: 'Failed to verify payment' });
    })

    req_paystack.end()
  } catch (error) {
    console.error('Paystack payment verification error:', error);
    res.status(500).json({ error: 'Failed to verify payment' });
  }
};

// Get donation by ID
const getDonation = async (req, res) => {
  try {
    const donation = await Donation.findById(req.params.id);
    if (!donation) {
      return res.status(404).json({ error: 'Donation not found' });
    }
    res.json(donation);
  } catch (error) {
    console.error('Get donation error:', error);
    res.status(500).json({ error: 'Failed to retrieve donation' });
  }
};

module.exports = {
  initializePaystackPayment,
  verifyPaystackPayment,
  getDonation
};