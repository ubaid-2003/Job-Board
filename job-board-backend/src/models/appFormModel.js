import mongoose from 'mongoose';

const applicationSchema = new mongoose.Schema({
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job',
    required: true
  },
  fullName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  coverLetter: {
    type: String
  },
  linkedin: {
    type: String
  },
  portfolio: {
    type: String
  },
  howHear: {
    type: String
  },
  willingToRelocate: {
    type: Boolean,
    default: false
  },
  appliedAt: {
    type: Date,
    default: Date.now
  }
});

const Application = mongoose.model('Application', applicationSchema); // Fixed variable name from jobSchema to applicationSchema

export default Application;