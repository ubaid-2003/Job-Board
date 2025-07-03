import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

const Layout = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="sticky top-0 flex-shrink-0 w-64 h-screen text-white bg-gray-800">
        <Sidebar />
      </div>

      {/* Content area */}
      <div className="flex-1 overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
