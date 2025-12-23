import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaEdit, FaSave, FaTimes, FaSpinner, FaSignOutAlt, FaCalendar, FaShoppingBag } from 'react-icons/fa';
import { useAuthStore } from '../context/authStore';
import { authService } from '../services/authService';

const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user, logout, checkAuth } = useAuthStore();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });

  // Fetch user data on mount if authenticated but user not in store
  useEffect(() => {
    if (isAuthenticated && !user) {
      checkAuth();
    }
  }, [isAuthenticated, user, checkAuth]);

  // Update form data when user loads
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
      });
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError(null);
    setSuccess(null);
  };

  const handleSave = async () => {
    if (!formData.name.trim()) {
      setError('Name cannot be empty');
      return;
    }

    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      await authService.updateProfile({
        name: formData.name,
        email: formData.email,
      });

      // Refresh user data
      await checkAuth();
      setIsEditing(false);
      setSuccess('Profile updated successfully!');
    } catch (err: any) {
      setError(err.message || 'Failed to update profile');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-light py-12">
        <div className="container mx-auto px-4">
          <div className="card text-center py-16 max-w-md mx-auto">
            <p className="text-4xl mb-4">🔐</p>
            <h2 className="text-2xl font-bold mb-4">Login Required</h2>
            <p className="text-gray-600 mb-6">
              Please login to view your profile.
            </p>
            <Link to="/login" className="btn btn-primary">
              Login
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-light py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col justify-center items-center h-64">
            <FaSpinner className="text-4xl text-primary animate-spin mb-4" />
            <p className="text-gray-600">Loading profile...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-light py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">My Profile</h1>

          {/* Success Message */}
          {success && (
            <div className="mb-6 p-4 bg-green-100 border border-green-300 rounded-lg text-green-700">
              {success}
            </div>
          )}

          {/* Profile Card */}
          <div className="card mb-6">
            <div className="flex items-start justify-between mb-6 pb-6 border-b border-gray-200">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center text-3xl">
                  <FaUser />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">{user.name}</h2>
                  <p className="text-gray-600">
                    Member since {new Date(user.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center gap-2 btn btn-outline"
                >
                  <FaEdit /> Edit Profile
                </button>
              ) : (
                <div className="flex gap-2">
                  <button
                    onClick={handleSave}
                    disabled={isLoading}
                    className="flex items-center gap-2 btn btn-primary"
                  >
                    {isLoading ? <FaSpinner className="animate-spin" /> : <FaSave />}
                    Save
                  </button>
                  <button
                    onClick={() => {
                      setIsEditing(false);
                      setFormData({ name: user.name, email: user.email });
                      setError(null);
                    }}
                    className="flex items-center gap-2 btn btn-outline"
                    disabled={isLoading}
                  >
                    <FaTimes /> Cancel
                  </button>
                </div>
              )}
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-4 p-3 bg-red-100 border border-red-300 rounded-lg text-red-700">
                {error}
              </div>
            )}

            {/* Profile Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name */}
              <div>
                <label className="flex items-center gap-2 text-gray-600 text-sm font-semibold mb-2">
                  <FaUser /> Full Name
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                  />
                ) : (
                  <p className="text-lg">{user.name}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="flex items-center gap-2 text-gray-600 text-sm font-semibold mb-2">
                  <FaEnvelope /> Email Address
                </label>
                {isEditing ? (
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                  />
                ) : (
                  <p className="text-lg">{user.email}</p>
                )}
              </div>

              {/* Role */}
              <div>
                <label className="text-gray-600 text-sm font-semibold mb-2 block">
                  Account Type
                </label>
                <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-semibold ${user.role === 'admin'
                    ? 'bg-purple-100 text-purple-700'
                    : 'bg-blue-100 text-blue-700'
                  }`}>
                  {user.role === 'admin' ? '👑 Admin' : '👤 Customer'}
                </span>
              </div>

              {/* Member Since */}
              <div>
                <label className="flex items-center gap-2 text-gray-600 text-sm font-semibold mb-2">
                  <FaCalendar /> Member Since
                </label>
                <p className="text-lg">
                  {new Date(user.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Link
              to="/orders"
              className="card text-center p-6 hover:shadow-lg transition cursor-pointer"
            >
              <FaShoppingBag className="text-4xl text-primary mx-auto mb-3" />
              <h3 className="font-bold mb-2">My Orders</h3>
              <p className="text-gray-600 text-sm">View order history</p>
            </Link>

            <Link
              to="/cart"
              className="card text-center p-6 hover:shadow-lg transition cursor-pointer"
            >
              <p className="text-4xl mb-3">🛒</p>
              <h3 className="font-bold mb-2">Shopping Cart</h3>
              <p className="text-gray-600 text-sm">View your cart</p>
            </Link>

            <Link
              to="/products"
              className="card text-center p-6 hover:shadow-lg transition cursor-pointer"
            >
              <p className="text-4xl mb-3">🧸</p>
              <h3 className="font-bold mb-2">Shop Products</h3>
              <p className="text-gray-600 text-sm">Browse our collection</p>
            </Link>
          </div>

          {/* Account Actions */}
          <div className="card">
            <h3 className="text-xl font-bold mb-4">Account</h3>
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 p-3 text-red-500 hover:bg-red-50 rounded-lg transition"
            >
              <FaSignOutAlt />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
