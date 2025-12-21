import React from 'react';
import { FaFilter } from 'react-icons/fa';

interface CategoryFilterProps {
  selectedCategory: string | null;
  onCategoryChange: (category: string | null) => void;
}

const categories = [
  { id: 'all', name: 'All Products', icon: '🎯' },
  { id: 'Electronic', name: 'Electronic Toys', icon: '🤖' },
  { id: 'Plush', name: 'Plush Toys', icon: '🧸' },
  { id: 'BoardGame', name: 'Board Games', icon: '🎲' },
];

const CategoryFilter: React.FC<CategoryFilterProps> = ({ selectedCategory, onCategoryChange }) => {
  return (
    <div className="card">
      <div className="flex items-center gap-2 mb-4">
        <FaFilter className="text-primary" />
        <h3 className="text-lg font-bold">Categories</h3>
      </div>

      <div className="space-y-2">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onCategoryChange(category.id === 'all' ? null : category.id)}
            className={`w-full text-left px-4 py-2 rounded-lg transition flex items-center gap-2 ${
              (category.id === 'all' && !selectedCategory) ||
              (category.id !== 'all' && selectedCategory === category.id)
                ? 'bg-primary text-white font-semibold'
                : 'hover:bg-light'
            }`}
          >
            <span className="text-xl">{category.icon}</span>
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;

