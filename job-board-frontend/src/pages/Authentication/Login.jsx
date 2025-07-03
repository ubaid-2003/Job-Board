import { useState } from "react";
import { FaGoogle, FaLinkedin } from "react-icons/fa";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Login failed");
        setLoading(false);
        return;
      }

      login(data.user, data.token);
      setLoading(false);

      // Redirect to original path if exists
      const from = location.state?.from?.pathname || "/";
      navigate(from);
    } catch (err) {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  const handleSocialLogin = (provider) => {
    console.log(`Logging in with ${provider}`);
    navigate("/");
  };

  return (
    <section className="max-w-md p-6 mx-auto">
      <div className="p-6 bg-white rounded-md shadow-md">
        <h2 className="mb-2 text-2xl font-bold text-center text-gray-900">Welcome Back!</h2>
        <p className="mb-6 text-sm text-center text-gray-600">Sign in to continue your job search</p>

        {error && <div className="mb-4 font-semibold text-center text-red-600">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-1 text-sm font-medium text-gray-700">Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              className="w-full px-3 py-2 text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1 text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              className="w-full px-3 py-2 text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex items-center justify-between mb-6">
            <label className="inline-flex items-center text-sm text-gray-700 cursor-pointer select-none">
              <input
                type="checkbox"
                name="rememberMe"
                className="w-4 h-4 text-indigo-600 form-checkbox"
                checked={formData.rememberMe}
                onChange={handleChange}
              />
              <span className="ml-2">Remember me</span>
            </label>
            <Link to="/forgot-password" className="text-sm text-indigo-600 hover:underline">Forgot password?</Link>
          </div>

          <button
            type="submit"
            className="w-full py-2 font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-700 disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="flex items-center my-6">
          <hr className="flex-grow border-gray-300" />
          <span className="mx-3 text-sm text-gray-500">Continue with</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        <div className="flex justify-center gap-4">
          <button
            onClick={() => handleSocialLogin("google")}
            className="flex items-center justify-center w-10 h-10 text-white bg-red-600 rounded-full hover:bg-red-700"
            aria-label="Login with Google"
          >
            <FaGoogle />
          </button>

          <button
            onClick={() => handleSocialLogin("linkedin")}
            className="flex items-center justify-center w-10 h-10 text-white bg-blue-700 rounded-full hover:bg-blue-800"
            aria-label="Login with LinkedIn"
          >
            <FaLinkedin />
          </button>
        </div>

        <p className="mt-6 text-sm text-center text-gray-600">
          Don't have an account?{" "}
          <Link to="/signup" className="font-semibold text-indigo-600 hover:underline">Sign up</Link>
        </p>
      </div>
    </section>
  );
};

export default Login;
