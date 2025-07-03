import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  FiLayout, FiBriefcase, FiUsers, FiTrendingUp, FiSettings,
  FiLogIn, FiUserPlus, FiUser, FiLogOut, FiChevronRight
} from 'react-icons/fi';
import { useEffect, useState } from 'react';

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [hoveredItem, setHoveredItem] = useState(null);

  // Brand: Jobzila
  const brand = { name: "Jobzila", emoji: "🦾" };

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) setUser(storedUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/login');
  };

  const navLinks = [
    { to: '/', label: 'Dashboard', icon: <FiLayout /> },
    { to: '/jobs', label: 'Jobs', icon: <FiBriefcase /> },
    { to: '/companies', label: 'Companies', icon: <FiUsers /> },
    { to: '/analytics', label: 'Analytics', icon: <FiTrendingUp /> },
    { to: '/settings', label: 'Settings', icon: <FiSettings /> },
  ];

  return (
    <aside
      className="sticky top-0 flex flex-col w-64 h-screen border-r border-gray-100 shadow-lg bg-gradient-to-b from-indigo-50 via-purple-50 to-white"
    >
      {/* Brand Header */}
      <div className="flex items-center px-5 py-5 border-b border-gray-100">
        <div className="flex items-center justify-center mr-3 text-lg text-white rounded-lg shadow-md w-9 h-9 bg-gradient-to-br from-purple-500 to-pink-500">
          {brand.emoji}
        </div>
        <span className="text-xl font-semibold text-gray-800">
          {brand.name}
        </span>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-2.5 py-4 space-y-1 overflow-y-auto">
        {navLinks.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className={`flex items-center px-3 py-2.5 rounded-lg transition-all duration-200 group
              ${
                location.pathname === link.to
                  ? 'bg-purple-100 text-purple-700 font-medium border-l-4 border-purple-500'
                  : 'text-gray-700 hover:bg-purple-50 hover:text-purple-800'
              }`}
            onMouseEnter={() => setHoveredItem(link.to)}
            onMouseLeave={() => setHoveredItem(null)}
          >
            <span className={`text-lg mr-3 ${
              location.pathname === link.to ? 'text-purple-600' : 'text-gray-500 group-hover:text-purple-600'
            }`}>
              {link.icon}
            </span>
            <span>{link.label}</span>
            <FiChevronRight 
              className={`ml-auto text-xs transition-all duration-200 ${
                hoveredItem === link.to || location.pathname === link.to 
                  ? 'opacity-100 translate-x-0 text-purple-500' 
                  : 'opacity-0 -translate-x-1'
              }`}
            />
          </Link>
        ))}
      </nav>

      {/* User Section */}
      <div className="p-4 border-t border-gray-100">
        {user ? (
          <>
            <div className="flex items-center px-3 py-2.5 mb-2 rounded-lg bg-purple-50 group">
              <div className="relative">
                <div className="flex items-center justify-center text-purple-500 rounded-full w-9 h-9 bg-gradient-to-br from-purple-100 to-purple-50">
                  <FiUser className="text-lg" />
                </div>
                <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-400 rounded-full border-2 border-white"></div>
              </div>
              <div className="ml-3">
                <div className="text-sm font-medium text-gray-800">{user.name}</div>
                <div className="text-xs text-gray-500">{user.email}</div>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center w-full px-3 py-2.5 text-red-500 rounded-lg hover:bg-red-50 transition-all duration-200 group"
            >
              <FiLogOut className="mr-3 text-red-400 group-hover:text-red-500" />
              <span className="text-sm font-medium">Logout</span>
              <FiChevronRight className="ml-auto text-xs text-red-400 transition-all duration-200 opacity-0 group-hover:opacity-100" />
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className={`flex items-center px-3 py-2.5 rounded-lg transition-all duration-200 group
                ${
                  location.pathname === '/login'
                    ? 'bg-purple-100 text-purple-700 font-medium border-l-4 border-purple-500'
                    : 'text-gray-700 hover:bg-purple-50 hover:text-purple-800'
                }`}
            >
              <FiLogIn className={`mr-3 text-lg ${
                location.pathname === '/login' ? 'text-purple-600' : 'text-gray-500 group-hover:text-purple-600'
              }`} />
              <span>Login</span>
              <FiChevronRight 
                className={`ml-auto text-xs transition-all duration-200 ${
                  location.pathname === '/login' || hoveredItem === '/login'
                    ? 'opacity-100 translate-x-0 text-purple-500' 
                    : 'opacity-0 -translate-x-1'
                }`}
              />
            </Link>
            <Link
              to="/signup"
              className={`flex items-center px-3 py-2.5 mt-1 rounded-lg transition-all duration-200 group
                ${
                  location.pathname === '/signup'
                    ? 'bg-purple-100 text-purple-700 font-medium border-l-4 border-purple-500'
                    : 'text-gray-700 hover:bg-purple-50 hover:text-purple-800'
                }`}
            >
              <FiUserPlus className={`mr-3 text-lg ${
                location.pathname === '/signup' ? 'text-purple-600' : 'text-gray-500 group-hover:text-purple-600'
              }`} />
              <span>Sign Up</span>
              <FiChevronRight 
                className={`ml-auto text-xs transition-all duration-200 ${
                  location.pathname === '/signup' || hoveredItem === '/signup'
                    ? 'opacity-100 translate-x-0 text-purple-500' 
                    : 'opacity-0 -translate-x-1'
                }`}
              />
            </Link>
          </>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
