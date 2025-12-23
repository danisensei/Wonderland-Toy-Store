import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaCalendar, FaShoppingBag, FaSignOutAlt, FaEdit, FaSave, FaTimes, FaSpinner } from 'react-icons/fa';
import { useAuthStore } from '../context/authStore';
import { authService } from '../services/authService';

const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user, logout, checkAuth } = useAuthStore();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
<<<<<<< Updated upstream
<<<<<<< Updated upstream
  const [success, setSuccess] = useState<string | null>(null);
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });

<<<<<<< Updated upstream
<<<<<<< Updated upstream
=======
  // Fetch user data on mount
>>>>>>> Stashed changes
=======
  // Fetch user data on mount
>>>>>>> Stashed changes
  useEffect(() => {
    if (isAuthenticated && !user) {
      checkAuth();
    }
  }, [isAuthenticated, user, checkAuth]);

<<<<<<< Updated upstream
<<<<<<< Updated upstream
=======
  // Update form data when user loads
>>>>>>> Stashed changes
=======
  // Update form data when user loads
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
<<<<<<< Updated upstream
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
=======
=======
>>>>>>> Stashed changes
  };

  const handleSave = async () => {
    setIsLoading(true);
    setError(null);
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes

    try {
      await authService.updateProfile({
        name: formData.name,
        email: formData.email,
      });
<<<<<<< Updated upstream
<<<<<<< Updated upstream
      await checkAuth();
      setIsEditing(false);
      setSuccess('Profile updated successfully!');
=======
=======
>>>>>>> Stashed changes

      // Refresh user data
      await checkAuth();
      setIsEditing(false);
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
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
            <p className="text-gray-600 mb-6">Please login to view your profile.</p>
            <Link to="/login" className="btn btn-primary">Login</Link>
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
        <h1 className="text-4xl font-bold mb-8">My Profile</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
<<<<<<< Updated upstream
<<<<<<< Updated upstream
=======
          {/* Profile Card */}
>>>>>>> Stashed changes
=======
          {/* Profile Card */}
>>>>>>> Stashed changes
          <div className="md:col-span-2">
            <div className="card">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Profile Information</h2>
                {!isEditing ? (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="btn btn-outline flex items-center gap-2"
                  >
                    <FaEdit /> Edit
                  </button>
                ) : (
                  <div className="flex gap-2">
                    <button
                      onClick={handleSave}
                      disabled={isLoading}
                      className="btn btn-primary flex items-center gap-2"
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
                      className="btn btn-outline flex items-center gap-2"
                      disabled={isLoading}
                    >
                      <FaTimes /> Cancel
                    </button>
                  </div>
                )}
              </div>

<<<<<<< Updated upstream
<<<<<<< Updated upstream
              {success && (
                <div className="mb-4 p-3 bg-green-100 border border-green-300 rounded-lg text-green-700">
                  {success}
                </div>
              )}

              {error && (
                <div className="mb-4 p-3 bg-red-100 border border-red-300 rounded-lg text-red-700">
                  {error}
                </div>
              )}

              <div className="space-y-6">
=======
              {error && (
                <div className="mb-4 p-3 bg-red-100 border border-red-300 rounded-lg text-red-700">
                  {error}
                </div>
              )}

              <div className="space-y-6">
                {/* Name */}
>>>>>>> Stashed changes
=======
              {error && (
                <div className="mb-4 p-3 bg-red-100 border border-red-300 rounded-lg text-red-700">
                  {error}
                </div>
              )}

              <div className="space-y-6">
                {/* Name */}
>>>>>>> Stashed changes
                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-600 mb-2">
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

<<<<<<< Updated upstream
<<<<<<< Updated upstream
=======
                {/* Email */}
>>>>>>> Stashed changes
=======
                {/* Email */}
>>>>>>> Stashed changes
                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-600 mb-2">
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

<<<<<<< Updated upstream
<<<<<<< Updated upstream
                <div>
                  <label className="text-sm font-semibold text-gray-600 mb-2 block">Role</label>
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${user.role === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'}`}>
=======
=======
>>>>>>> Stashed changes
                {/* Role */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-600 mb-2">
                    Role
                  </label>
                  <span className={`badge ${user.role === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'}`}>
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
                    {user.role === 'admin' ? '👑 Admin' : '👤 Customer'}
                  </span>
                </div>

<<<<<<< Updated upstream
<<<<<<< Updated upstream
=======
                {/* Member Since */}
>>>>>>> Stashed changes
=======
                {/* Member Since */}
>>>>>>> Stashed changes
                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-600 mb-2">
                    <FaCalendar /> Member Since
                  </label>
                  <p className="text-lg">
                    {user.createdAt
                      ? new Date(user.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })
                      : 'N/A'}
                  </p>
                </div>
              </div>
            </div>
          </div>

<<<<<<< Updated upstream
<<<<<<< Updated upstream
=======
          {/* Quick Actions */}
>>>>>>> Stashed changes
=======
          {/* Quick Actions */}
>>>>>>> Stashed changes
          <div className="md:col-span-1 space-y-4">
            <div className="card">
              <h3 className="text-lg font-bold mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Link
                  to="/orders"
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-light transition"
                >
                  <FaShoppingBag className="text-primary" />
                  <span>View My Orders</span>
                </Link>
                <Link
                  to="/products"
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-light transition"
                >
                  <span className="text-primary">🧸</span>
                  <span>Browse Products</span>
                </Link>
              </div>
            </div>

            <div className="card">
              <h3 className="text-lg font-bold mb-4">Account</h3>
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
    </div>
  );
};

export default ProfilePage;
