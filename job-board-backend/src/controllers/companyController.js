// src/controllers/companyController.js
import Company from '../models/companyModel.js';

export const registerCompany = async (req, res) => {
  try {
    const {
      companyName,
      email,
      website,
      additionalInfo,
      description,
      agreeToTerms,
      sendEmails,
    } = req.body;

    // Debug: log what we get
    console.log("Received form data:", req.body);
    console.log("Received file:", req.file);

    // Basic validation
    if (!companyName || !email || typeof agreeToTerms === 'undefined') {
      return res.status(400).json({
        message: 'Missing required fields: companyName, email, or agreeToTerms',
      });
    }

    const newCompany = new Company({
      companyName,
      email,
      website,
      additionalInfo,
      description,
      agreeToTerms: agreeToTerms === 'true' || agreeToTerms === true,
      sendEmails: sendEmails === 'true' || sendEmails === true,
      logo: req.file ? req.file.path : null,
    });

    await newCompany.save();
    res.status(201).json({ message: 'Company registered successfully' });
  } catch (err) {
    console.error("Company registration error:", err.message);
    res.status(400).json({
      message: 'Company registration failed: ' + err.message,
    });
  }
};

export const getAllCompanies = async (req, res) => {
  try {
    const companies = await Company.find();
    res.status(200).json(companies);
  } catch (err) {
    res.status(500).json({
      message: 'Failed to get companies: ' + err.message,
    });
  }
};
