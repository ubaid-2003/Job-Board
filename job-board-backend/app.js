import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';

// Load environment variables
dotenv.config();

// Import routes
import jobRoutes from './src/routes/Jobs.js';
import appRouter from './src/controllers/appFormController.js';
import authRoutes from './src/routes/auth.js';
import companyRouter from './src/routes/companyRoutes.js';

// Initialize express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/jobs', jobRoutes);               // Example: GET http://localhost:5000/jobs
app.use('/appForm', appRouter);            // Example: POST http://localhost:5000/appForm
app.use('/auth', authRoutes);          // Example: POST http://localhost:5000/auth/login
app.use('/companies', companyRouter);      // Example: GET http://localhost:5000/companies

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    error: 'Server Error',
    message: err.message
  });
});

// MongoDB Connection + Start server only if DB is connected
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000
})
  .then(() => {
    console.log('✅ MongoDB connected successfully');
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error('❌ MongoDB connection error:', err.message);
  });
