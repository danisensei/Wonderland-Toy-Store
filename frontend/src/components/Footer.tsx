import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark text-white py-12 mt-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <span className="text-3xl">🧸</span>
              Wonderland Toy Store
            </h3>
            <p className="text-gray-300">
              Your one-stop shop for quality toys and games for all ages.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-300">
              <li><a href="/" className="hover:text-accent transition">Home</a></li>
              <li><a href="/products" className="hover:text-accent transition">Products</a></li>
              <li><a href="/about" className="hover:text-accent transition">About Us</a></li>
              <li><a href="/contact" className="hover:text-accent transition">Contact</a></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-lg font-bold mb-4">Categories</h4>
            <ul className="space-y-2 text-gray-300">
              <li><a href="/products/electronic" className="hover:text-accent transition">Electronic Toys</a></li>
              <li><a href="/products/plush" className="hover:text-accent transition">Plush Toys</a></li>
              <li><a href="/products/boardgame" className="hover:text-accent transition">Board Games</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-bold mb-4">Contact Info</h4>
            <ul className="space-y-2 text-gray-300">
              <li>Email: info@wonderlandtoys.com</li>
              <li>Phone: (555) 123-4567</li>
              <li>Address: 123 Toy Lane, Wonderland City</li>
            </ul>
          </div>
        </div>

        {/* Social Media */}
        <div className="border-t border-gray-700 pt-8">
          <div className="flex justify-center items-center gap-6 mb-4">
            <a href="#" className="text-gray-300 hover:text-accent transition text-2xl">
              <FaFacebook />
            </a>
            <a href="#" className="text-gray-300 hover:text-accent transition text-2xl">
              <FaTwitter />
            </a>
            <a href="#" className="text-gray-300 hover:text-accent transition text-2xl">
              <FaInstagram />
            </a>
            <a href="#" className="text-gray-300 hover:text-accent transition text-2xl">
              <FaLinkedin />
            </a>
          </div>

          {/* Copyright */}
          <div className="text-center text-gray-400 text-sm">
            <p>&copy; {currentYear} Wonderland Toy Store. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

