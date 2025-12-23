import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart, FaHome, FaUser, FaSignOutAlt, FaBars, FaTimes } from 'react-icons/fa';
import { useCartStore } from '../context/cartStore';
import { useAuthStore } from '../context/authStore';

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const totalItems = useCartStore((state) => state.getTotalItems());
  const { isAuthenticated, user, logout } = useAuthStore();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="bg-gradient-to-r from-blue-600 via-blue-500 to-blue-700 text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 text-2xl font-bold hover:opacity-90 transition-opacity group"
          >
            <span className="text-3xl group-hover:animate-float">🧸</span>
            <div className="hidden sm:block">
              <div className="font-display text-2xl">Wonderland</div>
              <div className="text-xs text-gray-100 font-semibold">Toy Store</div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            <Link
              to="/"
              className="flex items-center gap-2 hover:text-accent transition-all duration-300 group"
            >
              <FaHome className="group-hover:scale-110" /> Home
            </Link>
            <Link
              to="/products"
              className="hover:text-accent transition-all duration-300 group relative"
            >
              Products
              <span className="absolute bottom-0 left-0 w-0 h-1 bg-accent group-hover:w-full transition-all duration-300 rounded-full"></span>
            </Link>
            <Link
              to="/faq"
              className="hover:text-accent transition-all duration-300 group relative"
            >
              FAQ
              <span className="absolute bottom-0 left-0 w-0 h-1 bg-accent group-hover:w-full transition-all duration-300 rounded-full"></span>
            </Link>
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center gap-4">
            {/* Cart Icon */}
            <Link
              to="/cart"
              className="relative flex items-center gap-2 hover:text-accent transition-all group"
            >
              <div className="relative">
                <FaShoppingCart className="text-2xl group-hover:scale-110 transition-transform" />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-accent text-primary font-bold rounded-full w-6 h-6 flex items-center justify-center text-xs animate-pulse">
                    {totalItems}
                  </span>
                )}
              </div>
            </Link>

            {/* Auth Actions */}
            {isAuthenticated && user ? (
              <div className="hidden md:flex items-center gap-4">
                <div className="text-sm font-semibold hidden lg:block">
                  Welcome, {user.name?.split(' ')[0]}!
                </div>
                <Link
                  to="/profile"
                  className="flex items-center gap-1 hover:text-accent transition-all group"
                >
                  <FaUser className="group-hover:scale-110 transition-transform" />
                </Link>
                <button
                  onClick={logout}
                  className="flex items-center gap-1 hover:text-accent transition-all group"
                >
                  <FaSignOutAlt className="group-hover:scale-110 transition-transform" />
                </button>
              </div>
            ) : (
              <div className="hidden md:flex items-center gap-2">
                <Link
                  to="/login"
                  className="btn bg-white bg-opacity-20 backdrop-blur hover:bg-opacity-30 text-white border border-white"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="btn bg-accent text-primary hover:shadow-glow font-bold"
                >
                  Sign Up
                </Link>
              </div>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={toggleMobileMenu}
              className="lg:hidden text-2xl hover:text-accent transition"
            >
              {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <nav className="lg:hidden mt-4 pb-4 border-t border-white border-opacity-20 pt-4 space-y-3 animate-scale-pop">
            <Link
              to="/"
              className="block hover:text-accent transition py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/products"
              className="block hover:text-accent transition py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Products
            </Link>
            <Link
              to="/faq"
              className="block hover:text-accent transition py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              FAQ
            </Link>
            {isAuthenticated && user && (
              <>
                <Link
                  to="/profile"
                  className="block hover:text-accent transition py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  My Profile
                </Link>
                <button
                  onClick={() => {
                    logout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="block w-full text-left hover:text-accent transition py-2"
                >
                  Logout
                </button>
              </>
            )}
            {!isAuthenticated && (
              <>
                <Link
                  to="/login"
                  className="block hover:text-accent transition py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="block hover:text-accent transition py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </>
            )}
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;

