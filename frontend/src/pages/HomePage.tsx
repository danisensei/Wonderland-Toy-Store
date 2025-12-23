import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';

const HomePage: React.FC = () => {
  const features = [
    {
      icon: '🚀',
      title: 'Fast Delivery',
      description: 'Quick and reliable shipping to your doorstep',
      color: 'from-blue-400 to-blue-600',
    },
    {
      icon: '🛡️',
      title: 'Secure Checkout',
      description: 'Safe and secure payment processing',
      color: 'from-green-400 to-green-600',
    },
    {
      icon: '⭐',
      title: 'Quality Guaranteed',
      description: 'Only the best toys and games available',
      color: 'from-yellow-400 to-orange-600',
    },
    {
      icon: '💬',
      title: '24/7 Support',
      description: 'Customer support whenever you need it',
      color: 'from-purple-400 to-purple-600',
    },
  ];

  const categories = [
    {
      id: 'Electronic',
      name: 'Electronic Toys',
      icon: '🤖',
      description: 'Interactive and tech-filled toys for tech enthusiasts',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTy7uWFD_UpRjwaPEX-oeLyJNfhn43n3Fa62g&s',
      gradient: 'from-cyan-400 to-blue-600',
    },
    {
      id: 'Plush',
      name: 'Plush Toys',
      icon: '🧸',
      description: 'Soft and cuddly companions for all ages',
      image: 'https://www.eurokidsindia.com/blog/wp-content/uploads/2024/03/plush-toys.jpg',
      gradient: 'from-pink-400 to-red-600',
    },
    {
      id: 'BoardGame',
      name: 'Board Games',
      icon: '🎲',
      description: 'Fun games for families and friends',
      image: 'https://m.media-amazon.com/images/I/6112nCtg60L._SS400_.jpg',
      gradient: 'from-purple-400 to-indigo-600',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="hero-section bg-gradient-to-br from-blue-600 via-blue-500 to-blue-700 text-white py-32 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <h1 className="text-6xl md:text-7xl font-display font-bold mb-6 leading-tight">
                Welcome to <span className="gradient-text">Wonderland</span>
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-gray-100 leading-relaxed">
                Discover the magic of play with our exclusive collection of toys, games, and interactive entertainment for all ages.
              </p>
              <Link
                to="/products"
                className="inline-flex items-center gap-3 btn btn-outline text-white border-2 border-white hover:bg-white hover:text-primary text-lg px-8 py-4 font-bold rounded-xl"
              >
                Shop Now <FaArrowRight />
              </Link>
            </div>
            <div className="text-center animate-float">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary blur-3xl opacity-50 rounded-full"></div>
                <span className="text-9xl md:text-[200px] relative block">🧸</span>
              </div>
            </div>
          </div>
        </div>

        {/* Animated shapes */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-secondary to-accent"></div>
      </section>

      {/* Features Section */}
      <section className="py-24 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-display font-bold mb-4 gradient-text">
              Why Choose Us?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We're committed to providing the best shopping experience for toy enthusiasts everywhere
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="card relative overflow-hidden group h-full"
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                <div className="text-6xl mb-6 group-hover:scale-125 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-display font-bold mb-3 group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-display font-bold mb-4 gradient-text">
              Shop by Category
            </h2>
            <p className="text-xl text-gray-600">
              Explore our curated collections for every toy lover
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <Link
                key={category.id}
                to={`/products?category=${category.id}`}
                className="group cursor-pointer"
              >
                <div className={`bg-gradient-to-br ${category.gradient} p-8 rounded-2xl overflow-hidden mb-6 relative h-48 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow`}>
                  <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity"></div>
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 absolute inset-0"
                  />
                  <div className="relative z-10 text-center">
                    <span className="text-8xl block group-hover:animate-bounce">{category.icon}</span>
                  </div>
                </div>
                <div className="card bg-white rounded-xl border-2 border-gray-100 group-hover:border-primary transition-all">
                  <h3 className="text-2xl font-display font-bold mb-3 group-hover:text-primary transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-gray-600 mb-4 group-hover:text-gray-700 transition-colors">
                    {category.description}
                  </p>
                  <div className="flex items-center gap-2 text-primary font-bold group-hover:gap-4 transition-all">
                    Explore <FaArrowRight className="group-hover:translate-x-2 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-gradient-to-r from-primary/5 to-secondary/5">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex gap-4">
              <div className="text-4xl flex-shrink-0">📦</div>
              <div>
                <h4 className="text-xl font-bold mb-2">Free Shipping</h4>
                <p className="text-gray-600">On orders over $50</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="text-4xl flex-shrink-0">↩️</div>
              <div>
                <h4 className="text-xl font-bold mb-2">Easy Returns</h4>
                <p className="text-gray-600">30-day money back guarantee</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="text-4xl flex-shrink-0">✨</div>
              <div>
                <h4 className="text-xl font-bold mb-2">Premium Quality</h4>
                <p className="text-gray-600">All products certified & tested</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-500 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-20 w-40 h-40 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-20 w-40 h-40 bg-white rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center">
          <h2 className="text-5xl md:text-6xl font-display font-bold mb-4">
            Special Offers Coming Soon! 🎉
          </h2>
          <p className="text-xl mb-8 text-gray-100 max-w-2xl mx-auto">
            Subscribe to our newsletter and get exclusive deals, new product alerts, and special discounts
          </p>
          <div className="flex gap-2 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-3 rounded-xl text-dark focus:outline-none focus:ring-2 focus:ring-accent font-semibold"
            />
            <button className="btn bg-accent text-primary hover:shadow-glow font-bold px-8 rounded-xl">
              Subscribe
            </button>
          </div>
          <p className="text-sm mt-4 text-gray-100">✓ No spam, unsubscribe anytime</p>
        </div>
      </section>
    </div>
  );
};

export default HomePage;

