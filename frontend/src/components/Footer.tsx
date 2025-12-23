import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-r from-dark via-gray-900 to-dark text-white py-16 mt-20 relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-40 h-40 bg-blue-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-cyan-400 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* About */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-4xl">🧸</span>
              <div>
                <h3 className="text-xl font-display font-bold">Wonderland</h3>
                <p className="text-xs text-gray-400">Toy Store</p>
              </div>
            </div>
            <p className="text-gray-400 leading-relaxed">
              Your one-stop shop for quality toys and games for all ages.
            </p>
            <div className="mt-4 flex gap-3">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-blue-500/20 hover:bg-blue-500/40 rounded-full text-blue-400 transition transform hover:scale-110">
                <FaFacebook />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-blue-500/20 hover:bg-blue-500/40 rounded-full text-cyan-400 transition transform hover:scale-110">
                <FaTwitter />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-pink-500/20 hover:bg-pink-500/40 rounded-full text-pink-400 transition transform hover:scale-110">
                <FaInstagram />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-blue-500/20 hover:bg-blue-500/40 rounded-full text-cyan-300 transition transform hover:scale-110">
                <FaLinkedin />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-display font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="/" className="text-gray-400 hover:text-blue-400 transition-all flex items-center gap-2 group">
                  <span className="text-blue-400 opacity-0 group-hover:opacity-100 transition">→</span>
                  <span>Home</span>
                </a>
              </li>
              <li>
                <a href="/products" className="text-gray-400 hover:text-blue-400 transition-all flex items-center gap-2 group">
                  <span className="text-blue-400 opacity-0 group-hover:opacity-100 transition">→</span>
                  <span>Products</span>
                </a>
              </li>
              <li>
                <a href="/faq" className="text-gray-400 hover:text-blue-400 transition-all flex items-center gap-2 group">
                  <span className="text-blue-400 opacity-0 group-hover:opacity-100 transition">→</span>
                  <span>FAQ</span>
                </a>
              </li>
              <li>
                <a href="/orders" className="text-gray-400 hover:text-blue-400 transition-all flex items-center gap-2 group">
                  <span className="text-blue-400 opacity-0 group-hover:opacity-100 transition">→</span>
                  <span>Orders</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-lg font-display font-bold mb-4">Categories</h4>
            <ul className="space-y-2">
              <li>
                <a href="/products?category=Electronic" className="text-gray-400 hover:text-blue-400 transition-all flex items-center gap-2 group">
                  <span className="text-2xl">🤖</span>
                  <span>Electronic Toys</span>
                </a>
              </li>
              <li>
                <a href="/products?category=Plush" className="text-gray-400 hover:text-cyan-400 transition-all flex items-center gap-2 group">
                  <span className="text-2xl">🧸</span>
                  <span>Plush Toys</span>
                </a>
              </li>
              <li>
                <a href="/products?category=BoardGame" className="text-gray-400 hover:text-blue-300 transition-all flex items-center gap-2 group">
                  <span className="text-2xl">🎲</span>
                  <span>Board Games</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-1">
            <h4 className="text-lg font-display font-bold mb-4">Get in Touch</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-gray-400 hover:text-primary transition group cursor-pointer">
                <FaPhone className="text-primary mt-1 group-hover:scale-110 transition" />
                <div>
                  <p className="font-semibold">(555) 123-4567</p>
                  <p className="text-xs">Mon-Fri 9am-6pm</p>
                </div>
              </li>
              <li className="flex items-start gap-3 text-gray-400 hover:text-secondary transition group cursor-pointer">
                <FaEnvelope className="text-secondary mt-1 group-hover:scale-110 transition" />
                <div>
                  <p className="font-semibold">info@wonderlandtoys.com</p>
                  <p className="text-xs">We reply within 24h</p>
                </div>
              </li>
              <li className="flex items-start gap-3 text-gray-400 hover:text-accent transition group cursor-pointer">
                <FaMapMarkerAlt className="text-accent mt-1 group-hover:scale-110 transition" />
                <div>
                  <p className="font-semibold">123 Toy Lane</p>
                  <p className="text-xs">Wonderland City</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700/50 pt-8 mb-6">
          {/* Newsletter Signup */}
          <div className="mb-8 max-w-md">
            <h4 className="text-lg font-display font-bold mb-3">Subscribe to our Newsletter</h4>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition"
              />
              <button className="btn btn-primary bg-gradient-to-r from-blue-500 to-blue-600">Subscribe</button>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center md:text-left">
            <div className="text-gray-400 text-sm">
              <p>&copy; {currentYear} Wonderland Toy Store. All rights reserved.</p>
            </div>
            <div className="flex justify-center gap-6 text-gray-400 text-sm">
              <button onClick={() => {}} className="hover:text-blue-400 transition">Privacy Policy</button>
              <button onClick={() => {}} className="hover:text-blue-400 transition">Terms of Service</button>
              <button onClick={() => {}} className="hover:text-blue-400 transition">Sitemap</button>
            </div>
            <div className="text-gray-400 text-sm">
              <p>Made with ❤️ for toy lovers everywhere</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

