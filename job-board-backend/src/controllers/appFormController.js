import express from 'express';
import appFormModel from "../models/appFormModel.js";

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const newApp = new appFormModel(req.body);
        await newApp.save();
        res.status(201).json({ message: "application submitted successfully" });
    } catch (err) {
        res.status(400).json({
            message: "app not submitted: " + err.message
        });
    }
});

router.get('/', async (req, res) => {
    try {
        const applications = await appFormModel.find();
        res.status(200).json(applications);
    } catch (err) {
        res.status(500).json({
            message: "failed to get applications: " + err.message
        });
    }
});

export default router;