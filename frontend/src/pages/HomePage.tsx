import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';

const HomePage: React.FC = () => {
  const features = [
    {
      icon: '🚀',
      title: 'Fast Delivery',
      description: 'Quick and reliable shipping to your doorstep',
    },
    {
      icon: '🛡️',
      title: 'Secure Checkout',
      description: 'Safe and secure payment processing',
    },
    {
      icon: '⭐',
      title: 'Quality Guaranteed',
      description: 'Only the best toys and games available',
    },
    {
      icon: '💬',
      title: '24/7 Support',
      description: 'Customer support whenever you need it',
    },
  ];

  const categories = [
    {
      id: 'Electronic',
      name: 'Electronic Toys',
      icon: '🤖',
      description: 'Interactive and tech-filled toys for tech enthusiasts',
      image: 'https://images.unsplash.com/photo-1594787318286-3d835c1cab83?w=500&h=300&fit=crop',
    },
    {
      id: 'Plush',
      name: 'Plush Toys',
      icon: '🧸',
      description: 'Soft and cuddly companions for all ages',
      image: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=500&h=300&fit=crop',
    },
    {
      id: 'BoardGame',
      name: 'Board Games',
      icon: '🎲',
      description: 'Fun games for families and friends',
      image: 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=500&h=300&fit=crop',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-light to-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-secondary text-white py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-5xl font-bold mb-4">
                Welcome to Wonderland Toy Store
              </h1>
              <p className="text-xl mb-6 text-gray-100">
                Discover the magic of play with our exclusive collection of toys, games, and interactive entertainment for all ages.
              </p>
              <Link
                to="/products"
                className="inline-flex items-center gap-2 btn btn-outline text-white border-white hover:bg-white hover:text-primary text-lg"
              >
                Shop Now <FaArrowRight />
              </Link>
            </div>
            <div className="text-center">
              <span className="text-9xl">🧸</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Why Choose Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="card text-center">
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Shop by Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {categories.map((category) => (
              <Link
                key={category.id}
                to={`/products?category=${category.id}`}
                className="card overflow-hidden hover:shadow-xl transition-shadow cursor-pointer group"
              >
                <div className="h-48 bg-light rounded-lg overflow-hidden mb-4">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                  />
                </div>
                <div className="text-4xl mb-2">{category.icon}</div>
                <h3 className="text-2xl font-bold mb-2">{category.name}</h3>
                <p className="text-gray-600 mb-4">{category.description}</p>
                <div className="flex items-center gap-2 text-primary font-semibold">
                  Explore <FaArrowRight />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Special Offers Coming Soon!</h2>
          <p className="text-xl mb-8 text-gray-100">
            Subscribe to our newsletter and get exclusive deals and new product alerts
          </p>
          <div className="flex gap-2 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg text-dark focus:outline-none"
            />
            <button className="btn bg-accent text-primary hover:bg-yellow-400">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;

