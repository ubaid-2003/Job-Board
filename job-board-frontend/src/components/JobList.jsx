import React, { useEffect, useState } from 'react';
import JobCard from './JobCard';
import { Link } from 'react-router-dom';
import { FaMapMarkerAlt, FaBriefcase } from 'react-icons/fa';

const JobList = ({ limit }) => {
  const [jobs, setJobs] = useState([]);
  const [location, setLocation] = useState('');
  const [jobType, setJobType] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/jobs')
      .then(res => res.json())
      .then(data => setJobs(data))
      .catch(console.error);
  }, []);

  const filteredJobs = jobs.filter(job => {
    const locationMatch = job.location.toLowerCase().includes(location.toLowerCase());
    const typeMatch = jobType ? job.type === jobType : true;
    return locationMatch && typeMatch;
  });

  const displayedJobs = limit ? filteredJobs.slice(0, limit) : filteredJobs;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row">
        <div className="relative md:w-48">
          <FaMapMarkerAlt className="absolute text-gray-600 transform -translate-y-1/2 left-3 top-1/2" />
          <input
            type="text"
            placeholder="Location"
            className="w-full py-2 pl-10 pr-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
        <div className="relative md:w-48">
          <FaBriefcase className="absolute text-gray-600 transform -translate-y-1/2 left-3 top-1/2" />
          <select
            className="w-full py-2 pl-10 pr-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={jobType}
            onChange={(e) => setJobType(e.target.value)}
          >
            <option value="">All Job Types</option>
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Remote">Remote</option>
            <option value="Internship">Internship</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {displayedJobs.map(job => (
          <JobCard key={job._id} job={job} />
        ))}
      </div>

      {limit && filteredJobs.length > limit && (
        <div className="mt-8 text-center">
          <Link to="/jobs" className="inline-block px-6 py-3 text-white bg-blue-500 rounded-md hover:bg-blue-600">
            View All Jobs ({filteredJobs.length - limit} more)
          </Link>
        </div>
      )}
    </div>
  );
};

export default JobList;
