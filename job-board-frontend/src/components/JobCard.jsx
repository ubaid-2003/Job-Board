import React from 'react';
import { Link } from 'react-router-dom';
import { useJobs } from '../context/JobContext';
import { FiMapPin, FiBriefcase, FiClock, FiDollarSign } from 'react-icons/fi';

const JobCard = ({ job }) => {
  const { saveJob, savedJobs } = useJobs();
  const isSaved = savedJobs.includes(job._id);

  return (
    <div className="flex flex-col h-full overflow-hidden transition-shadow duration-300 bg-white border border-gray-200 shadow-sm rounded-xl hover:shadow-md">
      {/* Header */}
      <div className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center">
            {job.logo ? (
              <img 
                className="object-cover w-12 h-12 mr-4 border border-gray-200 rounded-lg" 
                src={job.logo} 
                alt={job.company}
              />
            ) : (
              <div className="flex items-center justify-center w-12 h-12 mr-4 text-lg font-bold text-blue-600 bg-blue-100 rounded-lg">
                {job.company.charAt(0)}
              </div>
            )}
            <div>
              <h3 className="text-lg font-bold text-gray-900">{job.title}</h3>
              <p className="text-gray-700">{job.company}</p>
            </div>
          </div>
          <button
            onClick={() => saveJob(job._id)}
            className={`p-2 rounded-full ${isSaved ? 'text-yellow-500 hover:text-yellow-600' : 'text-gray-400 hover:text-gray-500'}`}
            aria-label={isSaved ? 'Unsave job' : 'Save job'}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              viewBox="0 0 20 20"
              fill={isSaved ? 'currentColor' : 'none'}
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
              />
            </svg>
          </button>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-4">
          {job.skills?.slice(0, 3).map((skill, index) => (
            <span
              key={index}
              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
            >
              {skill}
            </span>
          ))}
          {job.skills?.length > 3 && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
              +{job.skills.length - 3} more
            </span>
          )}
        </div>

        {/* Details */}
        <div className="mt-4 space-y-2">
          <div className="flex items-center text-sm text-gray-600">
            <FiMapPin className="mr-2 text-blue-500" />
            <span>{job.location}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <FiBriefcase className="mr-2 text-blue-500" />
            <span>{job.type}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <FiClock className="mr-2 text-blue-500" />
            <span>{job.posted}</span>
          </div>
          {job.salary && (
            <div className="flex items-center text-sm text-gray-600">
              <FiDollarSign className="mr-2 text-blue-500" />
              <span>{job.salary}</span>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="px-6 py-4 mt-auto border-t border-gray-100 bg-gray-50">
        <div className="flex items-center justify-between">
          <Link
            to={`/jobs/${job._id}`}
            className="text-sm font-medium text-blue-600 hover:text-blue-700 hover:underline"
          >
            View details
          </Link>
          <Link
            to={`/apply/${job._id}`}
            className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-full shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Apply now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default JobCard;