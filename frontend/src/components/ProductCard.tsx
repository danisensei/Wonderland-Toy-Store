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

  return (
    <div
      onClick={handleCardClick}
      className="card cursor-pointer overflow-hidden h-full flex flex-col"
    >
      {/* Product Image Container */}
      <div className="relative bg-light mb-4 rounded-lg overflow-hidden h-48 flex items-center justify-center">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform"
        />
        <div className="absolute top-2 right-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsFavorite(!isFavorite);
            }}
            className={`p-2 rounded-full ${
              isFavorite
                ? 'bg-red-500 text-white'
                : 'bg-white text-primary'
            } transition hover:scale-110`}
          >
            <FaHeart />
          </button>
        </div>
        <div className="absolute top-2 left-2 badge badge-primary flex items-center gap-1">
          <span className="text-lg">{getCategoryEmoji(product.category)}</span>
          {product.category}
        </div>
      </div>

      {/* Product Info */}
      <div className="flex-1 flex flex-col">
        <h3 className="font-bold text-lg mb-2 line-clamp-2">{product.name}</h3>

        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-3">
          {[...Array(5)].map((_, i) => (
            <FaStar key={i} className="text-accent" />
          ))}
          <span className="text-xs text-gray-500 ml-2">(4.8)</span>
        </div>

        {/* Stock Status */}
        <div className="text-sm mb-3">
          {product.quantity > 10 ? (
            <span className="badge badge-success">In Stock</span>
          ) : product.quantity > 0 ? (
            <span className="badge badge-warning">Low Stock ({product.quantity})</span>
          ) : (
            <span className="badge bg-gray-500 text-white">Out of Stock</span>
          )}
        </div>

        {/* Price & Add to Cart */}
        <div className="mt-auto space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-primary">
              ${product.price.toFixed(2)}
            </span>
            {product.quantity > 0 && (
              <span className="text-sm text-gray-500">Brand: {product.brand}</span>
            )}
          </div>

          {/* Quantity Selector & Add Button */}
          {product.quantity > 0 && (
            <div className="flex gap-2">
              <select
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value))}
                onClick={(e) => e.stopPropagation()}
                className="flex-1 px-2 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
              >
                {[...Array(Math.min(product.quantity, 10))].map((_, i) => (
                  <option key={i + 1} value={i + 1}>
                    Qty: {i + 1}
                  </option>
                ))}
              </select>
              <button
                onClick={handleAddToCart}
                className="flex-1 btn btn-primary flex items-center justify-center gap-2"
              >
                <FaShoppingCart /> Add
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

