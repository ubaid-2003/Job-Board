import { useState, useEffect } from 'react';
import { useJobs } from '../context/JobContext';
import SearchBar from '../components/SearchBar';
import JobList from '../components/JobList';

const Dashboard = () => {
  const {
    loading,
    filteredJobs,
    jobs,
    filters,
    updateFilters,
    refreshJobs
  } = useJobs();

  // Calculate real-time stats
  const getLiveStats = () => {
    const uniqueCompanies = new Set(jobs.map(job => job.companyId)).size;
    const todayApplications = jobs.reduce((total, job) => total + (job.applicationCount || 0), 0);

    return {
      jobs: filteredJobs.length,
      companies: uniqueCompanies,
      applications: todayApplications,
    };
  };

  const [stats, setStats] = useState(getLiveStats());

  useEffect(() => {
    setStats(getLiveStats());
  }, [jobs, filteredJobs]);

  const handleSortChange = (value) => {
    updateFilters({ sortBy: value });
  };

  const handleSearchChange = (e) => {
    updateFilters({ search: e.target.value });
  };

  const handleLocationChange = (e) => {
    updateFilters({ location: e.target.value });
  };

  const handleJobTypeChange = (value) => {
    updateFilters({ type: value });
  };

  return (
    <div className="px-4 py-6 md:px-6 lg:px-8">
      {/* Hero Banner */}
      <div className="relative p-8 mb-8 overflow-hidden text-white shadow-2xl rounded-2xl bg-gradient-to-br from-indigo-600 via-blue-700 to-purple-800 backdrop-blur-sm bg-opacity-90">
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl" />
        <div className="relative z-10">
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-transparent md:text-5xl lg:text-6xl bg-gradient-to-r from-yellow-300 via-white to-cyan-300 bg-clip-text">
            Discover Your <span className="animate-pulse">Dream Job</span>
          </h1>
          <p className="mb-6 text-lg font-medium md:text-xl text-white/90">
            Find purpose. Grow your career. Unlock your future.
          </p>

          <div className="max-w-4xl mx-auto">
            <SearchBar
              searchTerm={filters.search}
              setSearchTerm={handleSearchChange}
              location={filters.location}
              setLocation={handleLocationChange}
              jobType={filters.type}
              setJobType={handleJobTypeChange}
            />
          </div>
        </div>
      </div>

      {/* Real-Time Stats Cards */}
      <div className="grid grid-cols-1 gap-6 mb-8 sm:grid-cols-3">
        {[
          {
            title: 'Available Jobs',
            value: stats.jobs,
            icon: '💼',
            color: 'from-blue-500 to-blue-600',
            description: 'Matching your criteria'
          },
          {
            title: 'Active Companies',
            value: stats.companies,
            icon: '🏢',
            color: 'from-purple-500 to-purple-600',
            description: 'Hiring right now'
          },
          {
            title: 'Daily Applications',
            value: stats.applications,
            icon: '📈',
            color: 'from-indigo-500 to-indigo-600',
            description: 'Submitted today'
          },
        ].map((stat, index) => (
          <div
            key={index}
            className="p-5 transition-all duration-300 bg-white shadow-lg rounded-xl hover:shadow-xl hover:-translate-y-1"
          >
            <div className="flex items-center">
              <div className={`flex items-center justify-center w-12 h-12 mr-4 rounded-lg bg-gradient-to-br ${stat.color} text-white text-xl`}>
                {stat.icon}
              </div>
              <div>
                <h2 className="text-sm font-medium tracking-wider text-gray-500 uppercase">
                  {stat.title}
                </h2>
                <p className="mt-1 text-2xl font-bold text-gray-800">
                  {stat.value.toLocaleString()}
                </p>
                <p className="mt-1 text-xs text-gray-400">{stat.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Job List Section */}
      <div className="flex flex-col mb-6 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 md:text-3xl">
            {filteredJobs.length} Jobs Available
          </h2>
          <p className="text-gray-500">Based on your preferences</p>
        </div>
        <div className="flex items-center mt-4 space-x-3 md:mt-0">
          <label className="text-sm font-medium text-gray-700">Sort by:</label>
          <select
            className="px-4 py-2 text-sm transition-all bg-white border border-gray-200 shadow-sm rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={filters.sortBy || 'Most Recent'}
            onChange={(e) => handleSortChange(e.target.value)}
          >
            <option>🆕 Most Recent</option>
            <option>💸 Highest Salary</option>
            <option>🔥 Most Popular</option>
            <option>🏢 Top Companies</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-64 rounded-xl bg-white/80 backdrop-blur-sm">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 border-t-4 border-blue-500 border-solid rounded-full animate-spin" />
            <p className="mt-3 text-gray-600">Loading jobs...</p>
          </div>
        </div>
      ) : (
        <div className="p-6 bg-white shadow-lg rounded-2xl">
          <JobList limit={5} />
          {filteredJobs.length > 5 && (
            <div className="mt-6 text-center">
              <button className="px-5 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-xl hover:bg-blue-700 transition-all duration-300 shadow-md hover:shadow-lg">
                View All Jobs ({filteredJobs.length})
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Dashboard;