# Metanoia Foundation

A comprehensive web application for Metanoia Foundation, a non-profit organization dedicated to transforming lives through quality education in underserved communities. The platform enables donations, volunteer recruitment, and showcases the foundation's impact through an interactive website.

## 🌟 Features

### Frontend (HTML/CSS/JavaScript)
- **Responsive Design**: Mobile-first approach with Bootstrap framework
- **Interactive Donation System**: Secure payment processing via Paystack
- **Volunteer Recruitment**: Easy-to-use forms for volunteer applications
- **Gallery & Blog**: Showcase foundation activities and stories
- **Contact Forms**: Multiple contact forms for different purposes
- **Dynamic Content**: Animated counters, carousels, and modals

### Backend (Node.js/Express)
- **RESTful API**: Well-structured API endpoints for payments and donations
- **Database Integration**: MongoDB with Mongoose ODM
- **Payment Processing**: Paystack integration for secure transactions
- **Security**: Helmet middleware for security headers
- **CORS Support**: Cross-origin resource sharing enabled

## 🏗️ Architecture

```
unicare-master/
├── backend/
│   ├── config/
│   │   └── database.js          # MongoDB connection
│   ├── controllers/
│   │   ├── donationController.js # Donation logic
│   │   └── paymentController.js  # Payment processing
│   ├── models/
│   │   └── Donation.js          # Donation schema
│   ├── routes/
│   │   ├── donations.js         # Donation routes
│   │   └── payment.js           # Payment routes
│   ├── server.js                # Main server file
│   ├── package.json             # Backend dependencies
│   └── .env                     # Environment variables
└── frontend/
    ├── css/                     # Stylesheets
    ├── js/                      # JavaScript files
    ├── images/                  # Static images
    ├── fonts/                   # Custom fonts
    ├── scss/                    # SCSS source files
    ├── index.html               # Homepage
    ├── about.html               # About page
    ├── contact.html             # Contact page
    ├── donate.html              # Donation page
    ├── volunteer.html           # Volunteer page
    ├── causes.html              # Causes page
    ├── gallery.html             # Gallery page
    ├── blog.html                # Blog page
    └── blog-single.html         # Individual blog post
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- Paystack account for payment processing

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Environment Configuration:**
   Create a `.env` file in the backend directory:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/metanoia
   PAYSTACK_SECRET_KEY=sk_test_your_secret_key_here
   PAYSTACK_PUBLIC_KEY=pk_test_your_public_key_here
   ```

4. **Start the backend server:**
   ```bash
   # Development mode
   npm run dev

   # Production mode
   npm start
   ```

The server will start on `http://localhost:5000`

### Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Open index.html in your browser:**
   - Simply open `frontend/index.html` in any modern web browser
   - No build process required for the frontend

## 💳 Payment Integration

The application integrates with Paystack for secure payment processing:

- **Supported Currency**: Ghanaian Cedi (GHS)
- **Payment Methods**: Card payments, mobile money
- **Donation Types**: One-time, monthly, annual
- **Security**: PCI DSS compliant payment processing

### Payment Flow
1. User fills donation form on frontend
2. Frontend sends data to backend API
3. Backend initializes payment with Paystack
4. User completes payment on Paystack's secure platform
5. Backend verifies payment and records donation
6. User receives confirmation

## 📊 API Endpoints

### Payment Endpoints
- `POST /api/payments/paystack/initialize` - Initialize payment
- `POST /api/payments/paystack/verify` - Verify payment completion

### Donation Endpoints
- `GET /api/donations` - Retrieve donations
- `POST /api/donations` - Create new donation record

### Health Check
- `GET /health` - Server health status

## 🎨 Frontend Features

### Pages
- **Home**: Hero carousel, donation form, impact statistics
- **About**: Foundation story and mission
- **Causes**: Different charitable initiatives
- **Gallery**: Photo gallery of activities
- **Volunteer**: Volunteer application form
- **Contact**: Contact information and forms
- **Donate**: Dedicated donation page
- **Blog**: News and updates

### Interactive Elements
- Animated counters showing impact metrics
- Image carousels and galleries
- Modal windows for detailed information
- Responsive navigation menu
- Form validation and feedback

## 🔧 Development

### Technologies Used
- **Backend**: Node.js, Express.js, MongoDB, Mongoose
- **Frontend**: HTML5, CSS3, JavaScript, Bootstrap 4
- **Payment**: Paystack API
- **Styling**: Custom CSS with SCSS compilation
- **Icons**: Font Awesome, Flaticon

### Key Dependencies
```json
{
  "express": "^5.1.0",
  "mongoose": "^8.19.1",
  "cors": "^2.8.5",
  "helmet": "^8.1.0",
  "dotenv": "^17.2.3",
  "@paystack/inline-js": "^2.22.7"
}
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License - see the package.json file for details.

## 📞 Contact

**Metanoia Foundation**
- Email: info@metanoia.com
- Phone: +233 000 000 000
- Location: Accra, Ghana

## 🙏 Acknowledgments

- Designed by SkyRon
- Built with Bootstrap framework
- Payment processing by Paystack
- Icons by Font Awesome and Flaticon

---

*Transforming lives through education, one donation at a time.*"# Metanoia"  
"# Metanoia"  
