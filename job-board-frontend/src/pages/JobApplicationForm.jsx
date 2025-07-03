import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const JobApplicationForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    coverLetter: '',
    linkedin: '',
    portfolio: '',
    howHear: '',
    willingToRelocate: false,
    agreeTerms: false,
  });

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/jobs/${id}`);
        setJob(response.data);
      } catch (err) {
        console.error('Error fetching job:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchJob();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setSubmitting(true);

  try {
    const formDataToSend = {
      jobId: id,
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      coverLetter: formData.coverLetter,
      linkedin: formData.linkedin,
      portfolio: formData.portfolio,
      howHear: formData.howHear,
      willingToRelocate: formData.willingToRelocate,
      // Don't include agreeTerms since it's not in the DB model
    };

    await axios.post('http://localhost:5000/appForm', formDataToSend, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    setSuccess(true);
    setTimeout(() => {
      navigate(`/jobs/${id}`, { state: { applicationSuccess: true } });
    }, 2000);
  } catch (err) {
    console.error('Application submission failed:', err);
    alert(err.response?.data?.message || 'Submission failed. Please try again.');
  } finally {
    setSubmitting(false);
  }
};


  if (loading) {
    return (
      <div className="py-20 text-center">
        <div className="inline-block w-8 h-8 border-4 border-blue-500 rounded-full border-t-transparent animate-spin"></div>
        <p className="mt-4">Loading job details...</p>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="py-20 text-center">
        <p className="text-gray-600">Job not found</p>
        <Link to="/jobs" className="inline-block mt-4 text-blue-600 hover:underline">Browse Available Jobs</Link>
      </div>
    );
  }

  if (success) {
    return (
      <div className="py-20 text-center">
        <div className="flex items-center justify-center w-16 h-16 mb-4 bg-green-100 rounded-full">
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold">Application Submitted Successfully!</h2>
        <p className="mt-2 text-gray-600">Thank you for applying to {job.title} at {job.company}.</p>
        <Link to={`/jobs/${id}`} className="inline-block px-6 py-2 mt-6 text-white bg-blue-600 rounded-md hover:bg-blue-700">
          Back to Job
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl px-4 py-8 mx-auto">
      <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
        <nav className="mb-6 text-sm text-gray-500">
          <Link to="/" className="hover:underline">Home</Link> /
          <Link to="/jobs" className="ml-1 hover:underline">Jobs</Link> /
          <Link to={`/jobs/${job._id}`} className="ml-1 hover:underline">{job.title}</Link> /
          <span className="ml-1 font-semibold text-blue-600">Apply</span>
        </nav>

        <h1 className="mb-1 text-2xl font-bold">Apply for {job.title}</h1>
        <p className="mb-6 text-gray-600">{job.company} • {job.location}</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="p-4 rounded-lg bg-gray-50">
            <h3 className="mb-4 text-lg font-semibold">Personal Information</h3>
            <div className="grid gap-4 sm:grid-cols-2">
              <input name="fullName" required value={formData.fullName} onChange={handleChange} type="text" placeholder="Full Name" className="input" />
              <input name="email" required value={formData.email} onChange={handleChange} type="email" placeholder="Email" className="input" />
              <input name="phone" required value={formData.phone} onChange={handleChange} type="tel" placeholder="Phone" className="input" />
            </div>
          </div>

          <div className="p-4 rounded-lg bg-gray-50">
            <h3 className="mb-4 text-lg font-semibold">Additional Information</h3>
            <textarea name="coverLetter" value={formData.coverLetter} onChange={handleChange} rows="4" placeholder="Cover Letter" className="w-full input" />
            <div className="grid gap-4 sm:grid-cols-2">
              <input name="linkedin" value={formData.linkedin} onChange={handleChange} type="url" placeholder="LinkedIn Profile" className="input" />
              <input name="portfolio" value={formData.portfolio} onChange={handleChange} type="url" placeholder="Portfolio Website" className="input" />
            </div>
            <select name="howHear" value={formData.howHear} onChange={handleChange} className="input">
              <option value="">How did you hear about us?</option>
              <option value="LinkedIn">LinkedIn</option>
              <option value="Job Board">Job Board</option>
              <option value="Company Website">Company Website</option>
              <option value="Referral">Referral</option>
              <option value="Other">Other</option>
            </select>
            <div className="flex items-center mt-2">
              <input name="willingToRelocate" type="checkbox" checked={formData.willingToRelocate} onChange={handleChange} className="mr-2" />
              <label>I am willing to relocate</label>
            </div>
          </div>

          <div className="p-4 rounded-lg bg-gray-50">
            <label className="flex items-start">
              <input
                name="agreeTerms"
                type="checkbox"
                checked={formData.agreeTerms}
                onChange={handleChange}
                required
                className="mt-1 mr-2"
              />
              <span className="text-sm text-gray-700">
                I certify that the information provided is true and complete. False statements may result in disqualification.
              </span>
            </label>
          </div>

          <div className="flex justify-between pt-4 border-t">
            <Link to={`/jobs/${job._id}`} className="px-4 py-2 text-gray-700 bg-white border rounded-md hover:bg-gray-50">
              Cancel
            </Link>
            <button type="submit" disabled={!formData.agreeTerms || submitting} className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700">
              {submitting ? 'Submitting...' : 'Submit Application'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default JobApplicationForm;
