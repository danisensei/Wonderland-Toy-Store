import React, { useState } from 'react';
import { FaShoppingCart, FaStar, FaHeart } from 'react-icons/fa';
import { Product } from '../services/productService';
import { useCartStore } from '../context/cartStore';

interface ProductCardProps {
  product: Product;
  onProductClick?: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onProductClick }) => {
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity,
      image: product.image,
      category: product.category,
    });
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
    setQuantity(1);
  };

  const handleCardClick = () => {
    if (onProductClick) {
      onProductClick(product);
    }
  };

  const getCategoryEmoji = (category: string) => {
    const emojis: { [key: string]: string } = {
      Electronic: '🤖',
      Plush: '🧸',
      BoardGame: '🎲',
    };
    return emojis[category] || '🎁';
  };

  const getRating = () => Math.floor(Math.random() * 2) + 4;

  return (
    <div
      onClick={handleCardClick}
      className="card cursor-pointer overflow-hidden h-full flex flex-col group bg-gradient-to-br from-white to-gray-50 hover:from-gray-50 hover:to-white"
    >
      {/* Product Image Container */}
      <div className="relative bg-gradient-to-br from-gray-100 to-gray-50 mb-4 rounded-xl overflow-hidden h-48 flex items-center justify-center group-hover:shadow-neon transition-shadow">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-white/10 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity"></div>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />

        {/* Favorite Button */}
        <div className="absolute top-3 right-3 z-10">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsFavorite(!isFavorite);
            }}
            className={`p-3 rounded-full backdrop-blur-md transition-all duration-300 ${
              isFavorite
                ? 'bg-red-500 text-white shadow-lg'
                : 'bg-white/80 text-blue-600 hover:bg-white'
            }`}
          >
            <FaHeart className="text-lg" />
          </button>
        </div>

        {/* Category Badge */}
        <div className="absolute top-3 left-3 badge badge-primary flex items-center gap-2 backdrop-blur-md">
          <span className="text-lg">{getCategoryEmoji(product.category)}</span>
          <span className="hidden sm:inline">{product.category}</span>
        </div>

        {/* Sale Badge (if applicable) */}
        {product.quantity > 20 && (
          <div className="absolute bottom-3 right-3 bg-green-500 text-white px-3 py-1 rounded-full font-bold text-sm">
            Popular
          </div>
        )}
      </div>

        <h3 className="font-display font-bold text-lg mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
          {product.name}
        </h3>

        <p className="text-gray-600 text-sm mb-3 line-clamp-2 group-hover:text-gray-700 transition-colors">
          {product.description}
        </p>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <FaStar
                key={i}
                className={`text-sm ${i < getRating() ? 'text-accent' : 'text-gray-300'}`}
              />
            ))}
          </div>
          <span className="text-xs text-gray-500 font-semibold">({getRating()}.0)</span>
        </div>

        {/* Stock Status */}
        <div className="mb-3">
          {product.quantity > 10 ? (
            <span className="badge badge-success text-xs font-semibold">✓ In Stock</span>
          ) : product.quantity > 0 ? (
            <span className="badge badge-warning text-xs font-semibold">⚠ Low Stock ({product.quantity})</span>
          ) : (
            <span className="badge bg-gray-500 text-white text-xs font-semibold">Out of Stock</span>
          )}
        </div>

        {/* Price & Add to Cart */}
        <div className="mt-auto space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-3xl font-display font-bold gradient-text">
              ${product.price.toFixed(2)}
            </span>
            {product.quantity > 0 && (
              <span className="text-xs text-gray-500 font-semibold">{product.brand}</span>
            )}
          </div>

          {/* Quantity Selector & Add Button */}
          {product.quantity > 0 && (
            <div className="flex gap-2">
              <select
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value))}
                onClick={(e) => e.stopPropagation()}
                className="flex-1 px-3 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-primary bg-white text-sm font-semibold"
              >
                {[...Array(Math.min(product.quantity, 10))].map((_, i) => (
                  <option key={i + 1} value={i + 1}>
                    Qty: {i + 1}
                  </option>
                ))}
              </select>
              <button
                onClick={handleAddToCart}
                className={`flex-1 btn transition-all duration-300 flex items-center justify-center gap-2 font-bold ${
                  isAdded
                    ? 'btn-secondary shadow-neon'
                    : 'btn-primary hover:shadow-glow'
                }`}
              >
                <FaShoppingCart /> {isAdded ? 'Added!' : 'Add'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

