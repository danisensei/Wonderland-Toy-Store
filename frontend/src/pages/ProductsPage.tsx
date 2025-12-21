import React, { useState, useEffect } from 'react';
import { FaSearch, FaSpinner } from 'react-icons/fa';
import ProductCard from '../components/ProductCard';
import CategoryFilter from '../components/CategoryFilter';
import { Product, productService } from '../services/productService';

const ProductsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('name');

  // Mock data for demo purposes
  const mockProducts: Product[] = [
    {
      id: '1',
      name: 'Robot Explorer',
      brand: 'TechToys',
      price: 49.99,
      quantity: 15,
      description: 'Advanced robot with AI learning capabilities',
      category: 'Electronic',
      image: 'https://images.unsplash.com/photo-1550355291-bbee04a92027?w=300&h=300&fit=crop',
      categoryAttributes: { batteryType: 'AA', voltage: '6V' },
    },
    {
      id: '2',
      name: 'Soft Teddy Bear',
      brand: 'CozyToys',
      price: 24.99,
      quantity: 25,
      description: 'Ultra-soft plush teddy bear with embroidered details',
      category: 'Plush',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=300&fit=crop',
      categoryAttributes: { material: 'Polyester', size: 'Medium' },
    },
    {
      id: '3',
      name: 'Chess Master',
      brand: 'GamePro',
      price: 34.99,
      quantity: 10,
      description: 'Classic chess set with magnetic pieces',
      category: 'BoardGame',
      image: 'https://images.unsplash.com/photo-1551088716-bba5ba7ce546?w=300&h=300&fit=crop',
      categoryAttributes: { ageRange: '8+', numberOfPlayers: '2' },
    },
    {
      id: '4',
      name: 'LED Light Robot',
      brand: 'FutureTech',
      price: 59.99,
      quantity: 8,
      description: 'Robot with LED lights and sound effects',
      category: 'Electronic',
      image: 'https://images.unsplash.com/photo-1594787318286-3d835c1cab83?w=300&h=300&fit=crop',
      categoryAttributes: { batteryType: 'AAA', voltage: '4.5V' },
    },
    {
      id: '5',
      name: 'Plush Bunny',
      brand: 'CuddleCare',
      price: 19.99,
      quantity: 30,
      description: 'Adorable plush bunny perfect for children',
      category: 'Plush',
      image: 'https://images.unsplash.com/photo-1588196749597-9ff075ce5b51?w=300&h=300&fit=crop',
      categoryAttributes: { material: 'Cotton', size: 'Small' },
    },
    {
      id: '6',
      name: 'Family Board Game Night',
      brand: 'FunGames',
      price: 44.99,
      quantity: 12,
      description: 'Entertainment for the whole family',
      category: 'BoardGame',
      image: 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=300&h=300&fit=crop',
      categoryAttributes: { ageRange: '6+', numberOfPlayers: '2-6' },
    },
    {
      id: '7',
      name: 'Smart Drone',
      brand: 'SkyTech',
      price: 79.99,
      quantity: 5,
      description: 'Mini drone with HD camera and app control',
      category: 'Electronic',
      image: 'https://images.unsplash.com/photo-1505228395891-9a51e7e86e81?w=300&h=300&fit=crop',
      categoryAttributes: { batteryType: 'Li-Po', voltage: '7.7V' },
    },
    {
      id: '8',
      name: 'Dinosaur Plush',
      brand: 'JurassicToys',
      price: 29.99,
      quantity: 18,
      description: 'Soft and huggable dinosaur toy',
      category: 'Plush',
      image: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=300&h=300&fit=crop',
      categoryAttributes: { material: 'Fleece', size: 'Large' },
    },
  ];

  useEffect(() => {
    // Simulate API call
    setLoading(true);
    setTimeout(() => {
      setProducts(mockProducts);
      setLoading(false);
    }, 500);
  }, []);

  useEffect(() => {
    let filtered = products;

    // Filter by category
    if (selectedCategory) {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }

    // Filter by search
    if (searchQuery.trim()) {
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Sort
    switch (sortBy) {
      case 'price-asc':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'name':
      default:
        filtered.sort((a, b) => a.name.localeCompare(b.name));
    }

    setFilteredProducts(filtered);
  }, [products, selectedCategory, searchQuery, sortBy]);

  return (
    <div className="min-h-screen bg-light py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">Shop Our Products</h1>
          <p className="text-gray-600 text-lg">
            Explore our amazing collection of toys and games
          </p>
        </div>

        {/* Search & Sort */}
        <div className="mb-8 space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <FaSearch className="absolute left-4 top-3.5 text-gray-400" />
            <input
              type="text"
              placeholder="Search products by name, brand, or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
            />
          </div>

          {/* Sort Dropdown */}
          <div className="flex justify-between items-center">
            <span className="text-gray-600">
              Showing {filteredProducts.length} products
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
            >
              <option value="name">Sort by Name</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Sidebar */}
          <aside className="md:col-span-1">
            <CategoryFilter
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
            />
          </aside>

          {/* Products Grid */}
          <main className="md:col-span-3">
            {loading ? (
              <div className="flex justify-center items-center h-96">
                <FaSpinner className="text-4xl text-primary animate-spin" />
              </div>
            ) : filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                  />
                ))}
              </div>
            ) : (
              <div className="card text-center py-12">
                <p className="text-2xl text-gray-500 mb-4">No products found</p>
                <p className="text-gray-400">
                  Try adjusting your search or filter criteria
                </p>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;

