import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a job title'],
  },
  description: {
    type: String,
    required: [true, 'Please add a description'],
  },
  salary: {
    type: String,
    required: [true, 'Please add expected salary'],
  },
  requirements: {
    type: [String],
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  jobType: {
    type: String,
    enum: ['Full-time', 'Part-time', 'Remote', 'Internship'],
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  postedBy: {
    type: String,
    required: true,
  },
  skills: {
    type: [String],
    required: true,
    default: []
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: false
  },
  posted: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true,
});

const Job = mongoose.model('Job', jobSchema);

export default Job;