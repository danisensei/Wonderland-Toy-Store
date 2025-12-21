import React from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart, FaHome, FaUser, FaSignOutAlt } from 'react-icons/fa';
import { useCartStore } from '../context/cartStore';
import { useAuthStore } from '../context/authStore';

const Header: React.FC = () => {
  const totalItems = useCartStore((state) => state.getTotalItems());
  const { isAuthenticated, user, logout } = useAuthStore();

  return (
    <header className="bg-primary text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 text-2xl font-bold hover:opacity-90">
            <span className="text-3xl">🧸</span>
            Wonderland Toy Store
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/" className="flex items-center gap-1 hover:text-accent transition">
              <FaHome /> Home
            </Link>
            <Link to="/products" className="hover:text-accent transition">
              Products
            </Link>
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center gap-4">
            {/* Cart Icon */}
            <Link
              to="/cart"
              className="relative flex items-center gap-2 hover:text-accent transition"
            >
              <FaShoppingCart className="text-2xl" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-accent text-primary font-bold rounded-full w-6 h-6 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>

            {/* Auth Actions */}
            {isAuthenticated && user ? (
              <div className="flex items-center gap-4">
                <span className="text-sm">{user.name}</span>
                <Link to="/profile" className="flex items-center gap-1 hover:text-accent transition">
                  <FaUser />
                </Link>
                <button
                  onClick={logout}
                  className="flex items-center gap-1 hover:text-accent transition"
                >
                  <FaSignOutAlt />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link to="/login" className="btn btn-outline text-white border-white">
                  Login
                </Link>
                <Link to="/signup" className="btn bg-accent text-primary hover:bg-yellow-400">
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

