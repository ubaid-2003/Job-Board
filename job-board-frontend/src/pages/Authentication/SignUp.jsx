import { useState } from "react";
import { FaGoogle, FaLinkedin } from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    jobTitle: "",
    experience: "",
    location: "",
    skills: "",
    linkedIn: "",
    github: "",
    portfolio: "",
    bio: "",
    jobType: "",
    salaryRange: "",
    remoteWork: false,
    terms: false,
    updates: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (step === 1) {
      if (formData.password !== formData.confirmPassword) {
        alert("Passwords don't match!");
        return;
      }
      setStep(2);
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        alert("Signup successful!");
        navigate("/login");
      } else {
        alert(result.message || "Signup failed");
      }
    } catch (error) {
      console.error(error);
      alert("Error connecting to the server");
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = (provider) => {
    console.log(`Logging in with ${provider}`);
    navigate("/home");
  };

  return (
    <section className="max-w-md p-6 mx-auto">
      <div className="p-6 bg-white rounded-lg shadow-md">
        <h2 className="mb-2 text-2xl font-bold text-center text-gray-900">
          {step === 1 ? "Create Your Account" : "Professional Details"}
        </h2>
        <p className="mb-6 text-sm text-center text-gray-600">
          {step === 1 ? "Basic information to get started" : "Professional details to enhance your profile"}
        </p>

        <form onSubmit={handleSubmit}>
          {step === 1 ? (
            <>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-600">First Name</label>
                  <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required className="w-full px-3 py-2 border rounded" />
                </div>
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-600">Last Name</label>
                  <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required className="w-full px-3 py-2 border rounded" />
                </div>
              </div>

              <div className="mb-4">
                <label className="block mb-1 text-sm font-medium text-gray-600">Email Address</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} required className="w-full px-3 py-2 border rounded" />
              </div>

              <div className="mb-4">
                <label className="block mb-1 text-sm font-medium text-gray-600">Phone Number</label>
                <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full px-3 py-2 border rounded" />
              </div>

              <div className="mb-4">
                <label className="block mb-1 text-sm font-medium text-gray-600">Password</label>
                <input type="password" name="password" value={formData.password} onChange={handleChange} required minLength={8} className="w-full px-3 py-2 border rounded" />
              </div>

              <div className="mb-6">
                <label className="block mb-1 text-sm font-medium text-gray-600">Confirm Password</label>
                <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required className="w-full px-3 py-2 border rounded" />
              </div>

              <button type="submit" disabled={loading} className="w-full py-2 text-white bg-indigo-600 rounded hover:bg-indigo-700">
                Continue
              </button>

              <div className="flex items-center my-6">
                <div className="flex-grow border-t border-gray-300" />
                <span className="mx-4 text-sm text-gray-500">Or register with</span>
                <div className="flex-grow border-t border-gray-300" />
              </div>

              <div className="flex justify-center gap-4">
                <button type="button" onClick={() => handleSocialLogin("google")} className="flex items-center justify-center w-10 h-10 p-2 text-white bg-red-600 rounded-full hover:bg-red-700" aria-label="Sign up with Google">
                  <FaGoogle />
                </button>
                <button type="button" onClick={() => handleSocialLogin("linkedin")} className="flex items-center justify-center w-10 h-10 p-2 text-white bg-blue-700 rounded-full hover:bg-blue-800" aria-label="Sign up with LinkedIn">
                  <FaLinkedin />
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="mb-4">
                <label className="block mb-1 text-sm font-medium text-gray-600">Current Job Title</label>
                <input type="text" name="jobTitle" value={formData.jobTitle} onChange={handleChange} className="w-full px-3 py-2 border rounded" />
              </div>

              <div className="mb-4">
                <label className="block mb-1 text-sm font-medium text-gray-600">Experience Level</label>
                <select name="experience" value={formData.experience} onChange={handleChange} className="w-full px-3 py-2 border rounded">
                  <option value="">Select experience</option>
                  <option value="0-1">0-1 years</option>
                  <option value="1-3">1-3 years</option>
                  <option value="3-5">3-5 years</option>
                  <option value="5+">5+ years</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="block mb-1 text-sm font-medium text-gray-600">Location</label>
                <input type="text" name="location" value={formData.location} onChange={handleChange} className="w-full px-3 py-2 border rounded" />
              </div>

              <div className="mb-4">
                <label className="block mb-1 text-sm font-medium text-gray-600">Key Skills</label>
                <input type="text" name="skills" value={formData.skills} onChange={handleChange} className="w-full px-3 py-2 border rounded" />
              </div>

              <div className="mb-4">
                <label className="block mb-1 text-sm font-medium text-gray-600">LinkedIn Profile</label>
                <input type="url" name="linkedIn" value={formData.linkedIn} onChange={handleChange} className="w-full px-3 py-2 border rounded" />
              </div>

              <div className="mb-4">
                <label className="block mb-1 text-sm font-medium text-gray-600">GitHub Profile</label>
                <input type="url" name="github" value={formData.github} onChange={handleChange} className="w-full px-3 py-2 border rounded" />
              </div>

              <div className="mb-4">
                <label className="block mb-1 text-sm font-medium text-gray-600">Portfolio URL</label>
                <input type="url" name="portfolio" value={formData.portfolio} onChange={handleChange} className="w-full px-3 py-2 border rounded" />
              </div>

              <div className="mb-4">
                <label className="block mb-1 text-sm font-medium text-gray-600">Bio / Summary</label>
                <textarea name="bio" value={formData.bio} onChange={handleChange} rows={3} className="w-full px-3 py-2 border rounded" />
              </div>

              <div className="mb-4">
                <label className="flex items-center space-x-2">
                  <input type="checkbox" name="terms" checked={formData.terms} onChange={handleChange} required className="text-indigo-600 rounded" />
                  <span className="text-sm text-gray-600">I agree to the terms and conditions</span>
                </label>
              </div>

              <button type="submit" disabled={loading} className="w-full py-2 text-white bg-indigo-600 rounded hover:bg-indigo-700">
                {loading ? "Registering..." : "Complete Registration"}
              </button>
            </>
          )}
        </form>

        <p className="mt-6 text-center text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-700">Log in</Link>
        </p>
      </div>
    </section>
  );
};

export default SignUp;
