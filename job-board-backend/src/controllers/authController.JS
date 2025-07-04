import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// Generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

// Signup controller
export const signup = async (req, res) => {
  const { email, password, terms } = req.body;

  if (!terms) {
    return res.status(400).json({
      success: false,
      error: 'You must accept terms and conditions'
    });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        error: 'Email already in use'
      });
    }

    const user = await User.create(req.body);
    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      token,
      user: {
        _id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName
      }
    });
  } catch (err) {
    console.error(err);

    if (err.name === 'ValidationError') {
      const errors = Object.values(err.errors).map(el => el.message);
      return res.status(400).json({
        success: false,
        error: errors.join(', ')
      });
    }

    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  console.log('Login attempt:', email);

  if (!email || !password) {
    return res.status(400).json({ success: false, error: 'Please provide email and password' });
  }

  try {
    const user = await User.findOne({ email }).select('+password');
    console.log('User found:', user);

    if (!user) {
      console.log('No user with this email');
      return res.status(401).json({ success: false, error: 'Invalid credentials' });
    }

    const isMatch = await user.matchPassword(password);
    console.log('Password match:', isMatch);

    if (!isMatch) {
      console.log('Password does not match');
      return res.status(401).json({ success: false, error: 'Invalid credentials' });
    }

    const token = generateToken(user._id);
    res.status(200).json({
      success: true,
      token,
      user: {
        _id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      },
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ success: false, error: 'Server error' });
  }
};