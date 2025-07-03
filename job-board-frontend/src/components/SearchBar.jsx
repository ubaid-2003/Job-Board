import { FaSearch, FaMapMarkerAlt, FaBriefcase } from 'react-icons/fa';

const SearchBar = ({
  searchTerm,
  setSearchTerm,
  location,
  setLocation,
  jobType,
  setJobType
}) => {
  return (
    <div className="w-full p-5 mx-auto border border-gray-300 shadow-xl bg-white/40 rounded-xl backdrop-blur-md">
      <div className="flex flex-col gap-4 md:flex-row">
        {/* Title / Company / Keyword */}
        <div className="relative flex-grow">
          <FaSearch className="absolute text-gray-600 transform -translate-y-1/2 left-3 top-1/2" />
          <input
            type="text"
            placeholder="Job title, keywords, or company"
            className="w-full py-2 pl-10 pr-4 text-black border border-gray-200 rounded-lg shadow-sm bg-white/80 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={setSearchTerm}  // Now using the handler from context
          />
        </div>

        {/* Location */}
        <div className="relative md:w-48">
          <FaMapMarkerAlt className="absolute text-gray-600 transform -translate-y-1/2 left-3 top-1/2" />
          <input
            type="text"
            placeholder="Location"
            className="w-full py-2 pl-10 pr-4 text-black border border-gray-200 rounded-lg shadow-sm bg-white/80 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={location}
            onChange={setLocation}  // Now using the handler from context
          />
        </div>

        {/* Job Type */}
        <div className="relative md:w-48">
          <FaBriefcase className="absolute text-gray-600 transform -translate-y-1/2 left-3 top-1/2" />
          <select
            className="w-full py-2 pl-10 pr-4 text-black border border-gray-200 rounded-lg shadow-sm bg-white/80 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
    </div>
  );
};

export default SearchBar;