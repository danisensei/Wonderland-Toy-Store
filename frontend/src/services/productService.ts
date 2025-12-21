import apiClient from './apiClient';

export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  quantity: number;
  description: string;
  category: 'Electronic' | 'Plush' | 'BoardGame';
  image: string;
  categoryAttributes?: {
    // For Electronic
    batteryType?: string;
    voltage?: string;
    // For Plush
    material?: string;
    size?: string;
    // For BoardGame
    ageRange?: string;
    numberOfPlayers?: string;
  };
}

export const productService = {
  // Get all products
  getAllProducts: async (): Promise<Product[]> => {
    try {
      const response = await apiClient.get('/products');
      return response.data;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  },

  // Get product by ID
  getProductById: async (id: string): Promise<Product> => {
    try {
      const response = await apiClient.get(`/products/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching product:', error);
      throw error;
    }
  },

  // Get products by category
  getProductsByCategory: async (category: string): Promise<Product[]> => {
    try {
      const response = await apiClient.get(`/products?category=${category}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching products by category:', error);
      throw error;
    }
  },

  // Search products
  searchProducts: async (query: string): Promise<Product[]> => {
    try {
      const response = await apiClient.get(`/products/search?q=${query}`);
      return response.data;
    } catch (error) {
      console.error('Error searching products:', error);
      throw error;
    }
  },
};

