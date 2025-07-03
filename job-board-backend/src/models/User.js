import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true, trim: true },
  lastName: { type: String, required: true, trim: true },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email']
  },
  phone: { type: String, trim: true },
  password: { type: String, required: true, minlength: 8, select: false },
  jobTitle: { type: String, trim: true },
  experience: {
    type: String,
    enum: ['0-1', '1-3', '3-5', '5+', ''],
    default: ''
  },
  location: { type: String, trim: true },
  skills: { type: [String], default: [] },
  linkedIn: { type: String, default: '' },
  github: { type: String, default: '' },
  portfolio: { type: String, default: '' },
  bio: { type: String, default: '' },
  jobType: {
    type: String,
    enum: ['full-time', 'part-time', 'contract', 'internship', ''],
    default: ''
  },
  salaryRange: {
    type: String,
    enum: ['0-50k', '50-100k', '100-150k', '150k+', ''],
    default: ''
  },
  remoteWork: { type: Boolean, default: false },
  terms: { type: Boolean, required: true },
  updates: { type: Boolean, default: false }
}, { timestamps: true });

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Method to compare password
userSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);
export default User;
