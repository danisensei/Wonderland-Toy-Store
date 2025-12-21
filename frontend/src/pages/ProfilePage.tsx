import React from 'react';
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaEdit } from 'react-icons/fa';
import { useAuthStore } from '../context/authStore';
import { Link } from 'react-router-dom';

const ProfilePage: React.FC = () => {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated || !user) {
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

  return (
    <div className="min-h-screen bg-light py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">My Profile</h1>

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
              <button className="flex items-center gap-2 btn btn-outline">
                <FaEdit /> Edit Profile
              </button>
            </div>

            {/* Contact Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Email */}
              <div>
                <label className="flex items-center gap-2 text-gray-600 text-sm font-semibold mb-2">
                  <FaEnvelope /> Email Address
                </label>
                <p className="text-lg">{user.email}</p>
              </div>

              {/* Phone */}
              <div>
                <label className="flex items-center gap-2 text-gray-600 text-sm font-semibold mb-2">
                  <FaPhone /> Phone Number
                </label>
                <p className="text-lg">(555) 123-4567</p>
              </div>

              {/* Role */}
              <div>
                <label className="text-gray-600 text-sm font-semibold mb-2">Account Type</label>
                <p className="text-lg capitalize">{user.role}</p>
              </div>

              {/* Address */}
              <div>
                <label className="flex items-center gap-2 text-gray-600 text-sm font-semibold mb-2">
                  <FaMapMarkerAlt /> Delivery Address
                </label>
                <p className="text-lg">123 Main Street, City, ST 12345</p>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Link
              to="/orders"
              className="card text-center p-6 hover:shadow-lg transition cursor-pointer"
            >
              <p className="text-4xl mb-3">📦</p>
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

            <div className="card text-center p-6 hover:shadow-lg transition cursor-pointer">
              <p className="text-4xl mb-3">❤️</p>
              <h3 className="font-bold mb-2">Favorites</h3>
              <p className="text-gray-600 text-sm">View wishlist</p>
            </div>
          </div>

          {/* Account Settings */}
          <div className="card">
            <h3 className="text-xl font-bold mb-4">Account Settings</h3>
            <div className="space-y-3">
              <button className="w-full text-left p-3 hover:bg-light rounded-lg transition">
                Change Password
              </button>
              <button className="w-full text-left p-3 hover:bg-light rounded-lg transition">
                Email Preferences
              </button>
              <button className="w-full text-left p-3 hover:bg-light rounded-lg transition">
                Privacy Settings
              </button>
              <button className="w-full text-left p-3 text-red-500 hover:bg-red-50 rounded-lg transition">
                Delete Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

