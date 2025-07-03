import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const JobDetail = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [similarJobs, setSimilarJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const jobResponse = await fetch(`http://localhost:5000/jobs/${id}`);
        if (!jobResponse.ok) throw new Error('Job not found');
        const jobData = await jobResponse.json();
        setJob(jobData);

        if (jobData.skills && jobData.skills.length > 0) {
          const skillsQuery = jobData.skills.join(',');
          const similarResponse = await fetch(`http://localhost:5000/jobs?skills=${skillsQuery}&limit=4`);
          const similarData = await similarResponse.json();
          setSimilarJobs(similarData.filter(j => j._id !== id));
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchJobDetails();
  }, [id]);

  const handleSaveJob = async () => {
    try {
      const response = await fetch(`http://localhost:5000/jobs/${id}/save`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      if (!response.ok) throw new Error('Failed to save job');
      alert('Job saved successfully!');
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="py-12 text-center">
        <div className="inline-block w-8 h-8 border-t-2 border-b-2 border-blue-500 rounded-full animate-spin"></div>
        <p className="mt-2">Loading job details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-12 text-center text-red-500">
        <p>{error}</p>
        <Link to="/jobs" className="inline-block px-4 py-2 mt-4 text-blue-600 hover:underline">Browse all jobs</Link>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="py-12 text-center">
        <p>Job not found</p>
        <Link to="/jobs" className="inline-block px-4 py-2 mt-4 text-blue-600 hover:underline">Browse all jobs</Link>
      </div>
    );
  }

  return (
    <div className="py-8">
      <div className="container flex flex-col gap-8 px-4 mx-auto md:flex-row">
        {/* Main content */}
        <div className="md:w-2/3">
          <div className="p-6 bg-white border rounded-lg shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-2xl font-bold">{job.title}</h1>
                <div className="flex items-center mt-1">
                  <span className="text-lg font-medium">{job.company}</span>
                  {job.rating && (
                    <>
                      <span className="mx-2 text-gray-400">•</span>
                      <span className="flex items-center text-yellow-500">
                        ⭐ {job.rating}
                      </span>
                    </>
                  )}
                </div>
              </div>
              <button onClick={handleSaveJob} className="p-1 text-gray-400 rounded-full hover:text-blue-600 hover:bg-blue-50">
                💾
              </button>
            </div>

            <div className="flex flex-wrap gap-2 mt-4">
              <span className="px-3 py-1 bg-gray-100 rounded-full">{job.location}</span>
              <span className="px-3 py-1 bg-gray-100 rounded-full">{job.type}</span>
              <span className="px-3 py-1 bg-gray-100 rounded-full">{job.posted}</span>
            </div>

            <div className="mt-8">
              <h2 className="mb-4 text-xl font-bold">Job Description</h2>
              <p className="whitespace-pre-line">{job.description}</p>

              {job.skills?.length > 0 && (
                <>
                  <h3 className="mt-6 mb-3 text-lg font-bold">Key Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {job.skills.map((skill, i) => (
                      <span key={i} className="px-3 py-1 text-blue-800 bg-blue-100 rounded-full">{skill}</span>
                    ))}
                  </div>
                </>
              )}

              {job.responsibilities?.length > 0 && (
                <>
                  <h3 className="mt-6 mb-3 text-lg font-bold">Responsibilities</h3>
                  <ul className="pl-5 space-y-2 list-disc">
                    {job.responsibilities.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </>
              )}

              {job.requirements?.length > 0 && (
                <>
                  <h3 className="mt-6 mb-3 text-lg font-bold">Requirements</h3>
                  <ul className="pl-5 space-y-2 list-disc">
                    {job.requirements.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </>
              )}

              {job.benefits?.length > 0 && (
                <>
                  <h3 className="mt-6 mb-3 text-lg font-bold">Benefits</h3>
                  <ul className="pl-5 space-y-2 list-disc">
                    {job.benefits.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="md:w-1/3">
          <div className="sticky p-6 bg-white border rounded-lg shadow-sm top-4">
            <div className="p-4 mb-6 rounded-lg bg-blue-50">
              <h3 className="mb-2 text-lg font-semibold">{job.salary}</h3>
              <Link to={`/apply/${job._id}`} className="block w-full px-4 py-3 text-center text-white bg-blue-600 rounded-md hover:bg-blue-700">Apply Now</Link>
              <button onClick={handleSaveJob} className="w-full px-4 py-3 mt-2 text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50">Save Job</button>
            </div>

            {similarJobs.length > 0 && (
              <div>
                <h3 className="mb-4 text-lg font-bold">Similar Jobs</h3>
                <div className="space-y-4">
                  {similarJobs.map(job => (
                    <div key={job._id} className="pb-4 border-b">
                      <h4 className="font-medium">{job.title}</h4>
                      <p className="text-sm text-gray-600">{job.company}</p>
                      <div className="flex flex-wrap gap-1 mt-2">
                        <span className="px-2 py-0.5 bg-gray-100 rounded-full text-xs">{job.location}</span>
                        <span className="px-2 py-0.5 bg-gray-100 rounded-full text-xs">{job.type}</span>
                      </div>
                      <Link to={`/jobs/${job._id}`} className="block mt-2 text-sm text-blue-600 hover:underline">View Details</Link>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetail;
