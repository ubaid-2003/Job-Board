import React from 'react';
import { useJobs } from '../context/JobContext';
import JobCard from '../components/JobCard';
import { FiSearch, FiMapPin, FiBriefcase, FiFilter } from 'react-icons/fi';

const Jobs = () => {
  const {
    filteredJobs,
    loading,
    error,
    filters,
    setFilters,
    refreshJobs
  } = useJobs();

  const jobTypes = ['Full-time', 'Part-time', 'Remote', 'Contract', 'Internship'];
  const experienceLevels = ['Entry', 'Mid', 'Senior', 'Executive'];

  return (
    <div className="min-h-screen bg-gray-50">
     <div className="relative px-4 py-12 overflow-hidden sm:px-6 lg:px-8">
  {/* Background */}
  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-700" />
  
  <div className="relative z-10 max-w-4xl mx-auto"> {/* Reduced container width */}
    {/* Title in single row */}
    <h1 className="text-3xl font-bold text-white sm:text-4xl whitespace-nowrap">
      Find Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-cyan-300">Dream Job</span>
    </h1>
    
    {/* Paragraph in single row */}
    <p className="mt-2 text-lg text-blue-100 whitespace-nowrap">
      Browse thousands of full-time and part-time opportunities
    </p>
    
    {/* Search bar */}
    <div className="p-4 mt-6 border bg-white/10 backdrop-blur-sm rounded-xl border-white/20">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-4">
        {/* Search */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <FiSearch className="w-4 h-4 text-white/80" />
          </div>
          <input
            type="text"
            placeholder="Job or company"
            className="w-full py-2 pr-3 text-sm text-white border rounded-lg pl-9 placeholder-white/70 bg-white/10 border-white/20 focus:ring-1 focus:ring-white/50 focus:border-white/50"
            value={filters.search}
            onChange={(e) => setFilters({...filters, search: e.target.value})}
          />
        </div>
        
        {/* Location */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <FiMapPin className="w-4 h-4 text-white/80" />
          </div>
          <input
            type="text"
            placeholder="Location"
            className="w-full py-2 pr-3 text-sm text-white border rounded-lg pl-9 placeholder-white/70 bg-white/10 border-white/20 focus:ring-1 focus:ring-white/50 focus:border-white/50"
            value={filters.location}
            onChange={(e) => setFilters({...filters, location: e.target.value})}
          />
        </div>
        
        {/* Job Type */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <FiBriefcase className="w-4 h-4 text-white/80" />
          </div>
          <select
            className="w-full py-2 pr-3 text-sm text-white border rounded-lg appearance-none pl-9 bg-white/10 border-white/20 focus:ring-1 focus:ring-white/50 focus:border-white/50"
            value={filters.type}
            onChange={(e) => setFilters({...filters, type: e.target.value})}
          >
            <option value="">All Types</option>
            {jobTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>
        
        {/* Experience */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <FiFilter className="w-4 h-4 text-white/80" />
          </div>
          <select
            className="w-full py-2 pr-3 text-sm text-white border rounded-lg appearance-none pl-9 bg-white/10 border-white/20 focus:ring-1 focus:ring-white/50 focus:border-white/50"
            value={filters.experience}
            onChange={(e) => setFilters({...filters, experience: e.target.value})}
          >
            <option value="">All Levels</option>
            {experienceLevels.map(level => (
              <option key={level} value={level}>{level}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  </div>
</div>

      {/* Main Content */}
      <div className="px-4 py-8 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {/* Stats and Actions */}
        <div className="flex flex-col items-start justify-between mb-8 sm:flex-row sm:items-center">
          <div className="mb-4 sm:mb-0">
            <h2 className="text-2xl font-bold text-gray-900">
              {filteredJobs.length} Jobs Available
            </h2>
            <p className="text-gray-500">
              Showing {filteredJobs.length} of {filteredJobs.length} jobs
            </p>
          </div>
          <button
            onClick={refreshJobs}
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Refresh Jobs
          </button>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center py-12">
            <div className="w-12 h-12 border-t-2 border-b-2 border-blue-500 rounded-full animate-spin"></div>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="p-4 mb-6 rounded-md bg-red-50">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="w-5 h-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">{error}</h3>
              </div>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!loading && filteredJobs.length === 0 && (
          <div className="py-12 text-center">
            <svg
              className="w-12 h-12 mx-auto text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h3 className="mt-2 text-lg font-medium text-gray-900">No jobs found</h3>
            <p className="mt-1 text-sm text-gray-500">
              Try adjusting your search or filter to find what you're looking for.
            </p>
            <div className="mt-6">
              <button
                onClick={() => setFilters({
                  search: '',
                  location: '',
                  type: '',
                  experience: '',
                  salaryRange: [0, 200000]
                })}
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Reset Filters
              </button>
            </div>
          </div>
        )}

        {/* Jobs Grid */}
        {!loading && filteredJobs.length > 0 && (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredJobs.map(job => (
              <JobCard key={job._id} job={job} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Jobs;