const Footer = () => {
  return (
    <footer className="py-12 text-white bg-gray-800">
      <div className="container px-4 mx-auto">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div>
            <h3 className="mb-4 text-xl font-bold">JobFinder</h3>
            <p>Connecting talent with opportunity</p>
          </div>
          <div>
            <h4 className="mb-4 font-bold">For Job Seekers</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-blue-400">Browse Jobs</a></li>
              <li><a href="#" className="hover:text-blue-400">Career Resources</a></li>
            </ul>
          </div>
          <div>
            <h4 className="mb-4 font-bold">For Employers</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-blue-400">Post a Job</a></li>
              <li><a href="#" className="hover:text-blue-400">Find Candidates</a></li>
            </ul>
          </div>
          <div>
            <h4 className="mb-4 font-bold">Company</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-blue-400">About Us</a></li>
              <li><a href="#" className="hover:text-blue-400">Contact</a></li>
              <li><a href="#" className="hover:text-blue-400">Privacy Policy</a></li>
            </ul>
          </div>
        </div>
        <div className="pt-8 mt-8 text-center border-t border-gray-700">
          <p>© 2025 JobFinder. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;