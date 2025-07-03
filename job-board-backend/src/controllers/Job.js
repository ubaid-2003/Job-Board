import mongoose  from "mongoose";
import Job from "../models/Job.js";

export const createJob = async (req, res) => {
  try {
    const {title,description,salary,requirements,company,jobType,location,postedBy} = req.body;

    const existJob = await Job.findOne({ title, company });
    if (existJob) {
      return res.status(409).json({
        message: "Job already exists"
      });
    }

    const newJob = new Job({
      title,
      description,
      salary,
      requirements,
      company,
      jobType,
      location,
      postedBy
    });

    await newJob.save();

    res.status(201).json({
      message: "Job created successfully",
      data: newJob
    });

  } catch (err) {
    console.error("Create Job Error:", err.message);
    res.status(500).json({
      message: "Something went wrong in create API: " + err.message
    });
  }
};

export const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find();
    res.status(200).json(jobs);
  } catch (err) {
    res.status(500).json({
      message: "Something went wrong in getAllJobs: " + err.message
    });
  }
};

export const getJobById = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid job ID format" });
    }

    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }
    res.status(200).json(job);
  } catch (err) {
    res.status(500).json({
      message: "Error fetching job: " + err.message
    });
  }
};

export const updateJob = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid job ID format" });
    }

    const job = await Job.findByIdAndUpdate(
      req.params.id, 
      req.body,
      { 
        new: true, 
        runValidators: true 
      }
    );

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.status(200).json({
      message: "Job updated successfully",
      data: job
    });
  } catch (err) {
    res.status(500).json({
      message: "Error updating job: " + err.message
    });
  }
};

export const deleteJob = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid job ID format" });
    }

    const job = await Job.findByIdAndDelete(req.params.id);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }
    res.status(200).json({ 
      message: "Job deleted successfully",
      data: job 
    });
  } catch (err) {
    res.status(500).json({
      message: "Error deleting job: " + err.message
    });
  }
};