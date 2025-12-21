import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import { useAuthStore } from '../context/authStore';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const setUser = useAuthStore((state) => state.setUser);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Validation
    if (!formData.email || !formData.password) {
      setError('Email and password are required');
      setLoading(false);
      return;
    }

    // Simulate API call
    setTimeout(() => {
      const user = {
        id: Math.random().toString(36).substr(2, 9),
        name: formData.email.split('@')[0],
        email: formData.email,
        role: 'customer' as const,
        createdAt: new Date().toISOString(),
      };

      setUser(user);
      localStorage.setItem('authToken', 'mock-token-' + Math.random());
      navigate('/');
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-light to-white py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto">
          <Link to="/" className="flex items-center gap-2 justify-center text-2xl font-bold mb-8">
            <span className="text-3xl">🧸</span>
            Wonderland
          </Link>

          <div className="card">
            <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

            {error && (
              <div className="mb-4 p-4 bg-red-100 border border-red-300 rounded-lg text-red-700">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email Input */}
              <div>
                <label className="block text-sm font-semibold mb-2">Email Address</label>
                <div className="relative">
                  <FaEnvelope className="absolute left-3 top-3.5 text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div>
                <label className="block text-sm font-semibold mb-2">Password</label>
                <div className="relative">
                  <FaLock className="absolute left-3 top-3.5 text-gray-400" />
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex justify-between items-center">
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="cursor-pointer" />
                  <span className="text-sm text-gray-600">Remember me</span>
                </label>
                <Link to="#" className="text-sm text-primary hover:underline">
                  Forgot password?
                </Link>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full btn btn-primary py-3 mt-6 disabled:opacity-50"
              >
                {loading ? 'Logging in...' : 'Login'}
              </button>
            </form>

            {/* Sign Up Link */}
            <p className="text-center text-gray-600 mt-6">
              Don't have an account?{' '}
              <Link to="/signup" className="text-primary font-semibold hover:underline">
                Sign up here
              </Link>
            </p>

            {/* Demo Account Info */}
            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-700">
              <p className="font-semibold mb-2">Demo Account:</p>
              <p>Email: demo@example.com</p>
              <p>Password: demo123</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

