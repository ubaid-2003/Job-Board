// src/models/companyModel.js
import mongoose from 'mongoose';

const companySchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  website: {
    type: String,
    trim: true,
  },
  additionalInfo: {
    type: String,
    trim: true,
  },
  description: {
    type: String,
    default: 'Brief description of your company and what you do...',
    trim: true,
  },
  logo: {
    type: String, // URL or path to logo file
  },
  agreeToTerms: {
    type: Boolean,
    required: true,
  },
  sendEmails: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Company = mongoose.model('Company', companySchema);

export default Company;
