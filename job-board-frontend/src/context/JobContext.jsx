import React, { createContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const JobContext = createContext();

// Helper function to parse salary strings
const parseSalary = (salaryStr) => {
  if (!salaryStr) return 0;
  const match = salaryStr.match(/\$([\d,]+)/);
  return match ? parseInt(match[1].replace(/,/g, '')) : 0;
};

export const JobProvider = ({ children }) => {
  const [jobs, setJobs] = useState([]);
  const [savedJobs, setSavedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    search: '',
    location: '',
    type: '',
    experience: '',
    salaryRange: [0, 200000],
    sortBy: 'Most Recent'
  });

  // Fetch jobs with error handling and caching
  const fetchJobs = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await axios.get('http://localhost:5000/jobs');
      setJobs(data);
      localStorage.setItem('jobsCache', JSON.stringify(data));
    } catch (err) {
      console.error('Failed to fetch jobs:', err);
      const cached = localStorage.getItem('jobsCache');
      if (cached) {
        setJobs(JSON.parse(cached));
        setError('Using cached data - network issue detected');
      } else {
        setError('Failed to load jobs. Please check your connection.');
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  // Save/unsave job with optimistic UI updates
  const saveJob = async (jobId) => {
    try {
      const isSaved = savedJobs.includes(jobId);
      setSavedJobs(prev => 
        isSaved ? prev.filter(id => id !== jobId) : [...prev, jobId]
      );
      await axios.post(`http://localhost:5000/jobs/${jobId}/save`);
    } catch (err) {
      console.error('Failed to save job:', err);
      setSavedJobs(prev => 
        savedJobs.includes(jobId)
          ? prev.filter(id => id !== jobId)
          : [...prev, jobId]
      );
    }
  };

  // Filter and sort jobs based on all criteria
  const filteredJobs = jobs
    .filter(job => {
      const matchesSearch = filters.search 
        ? job.title.toLowerCase().includes(filters.search.toLowerCase()) || 
          job.company.toLowerCase().includes(filters.search.toLowerCase()) ||
          (job.description && job.description.toLowerCase().includes(filters.search.toLowerCase()))
        : true;

      const matchesLocation = filters.location
        ? job.location.toLowerCase().includes(filters.location.toLowerCase())
        : true;

      const matchesType = filters.type
        ? job.type === filters.type
        : true;

      const matchesExperience = filters.experience
        ? job.experience === filters.experience
        : true;

      const salary = parseSalary(job.salary);
      const matchesSalary = salary >= filters.salaryRange[0] && 
                          salary <= filters.salaryRange[1];

      return matchesSearch && matchesLocation && matchesType && 
             matchesExperience && matchesSalary;
    })
    .sort((a, b) => {
      switch(filters.sortBy) {
        case 'Most Recent':
          return new Date(b.createdAt) - new Date(a.createdAt);
        case 'Highest Salary':
          return parseSalary(b.salary) - parseSalary(a.salary);
        case 'Most Popular':
          return (b.applicationCount || 0) - (a.applicationCount || 0);
        case 'Top Companies':
          return (b.companyRating || 0) - (a.companyRating || 0);
        default:
          return 0;
      }
    });

  // Update filters with debouncing for search
  const updateFilters = useCallback((newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  }, []);

  return (
    <JobContext.Provider value={{
      jobs,
      filteredJobs,
      loading,
      error,
      savedJobs,
      filters,
      updateFilters,
      saveJob,
      refreshJobs: fetchJobs,
      isJobSaved: (jobId) => savedJobs.includes(jobId),
    }}>
      {children}
    </JobContext.Provider>
  );
};

export const useJobs = () => React.useContext(JobContext);