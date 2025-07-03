import express from "express";
import multer from "multer";
import { registerCompany, getAllCompanies } from "../controllers/companyController.js";

const companyRouter = express.Router();

// Multer setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Ensure this directory exists
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage });

// Routes
companyRouter.post('/', upload.single('logo'), registerCompany);
companyRouter.get('/', getAllCompanies);

export default companyRouter;
