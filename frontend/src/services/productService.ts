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
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
  in_stock?: boolean;
=======
  in_stock: boolean;
>>>>>>> Stashed changes
=======
  in_stock: boolean;
>>>>>>> Stashed changes
=======
  in_stock: boolean;
>>>>>>> Stashed changes
  categoryAttributes?: {
    batteryType?: string;
    voltage?: string;
    material?: string;
    size?: string;
    ageRange?: string;
    numberOfPlayers?: string;
  };
  created_at?: string;
  updated_at?: string;
}

export interface ProductFilters {
  category?: string;
  search?: string;
  minPrice?: number;
  maxPrice?: number;
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
}

export interface CreateProductData {
  name: string;
  brand: string;
  price: number;
  quantity: number;
  description: string;
  category: 'Electronic' | 'Plush' | 'BoardGame';
  image: string;
  categoryAttributes?: Record<string, string>;
}

export const productService = {
=======
}

export const productService = {
  // Get all products with optional filtering
>>>>>>> Stashed changes
=======
}

export const productService = {
  // Get all products with optional filtering
>>>>>>> Stashed changes
=======
}

export const productService = {
  // Get all products with optional filtering
>>>>>>> Stashed changes
  getAllProducts: async (filters?: ProductFilters): Promise<Product[]> => {
    try {
      let url = '/products';
      const params = new URLSearchParams();

      if (filters?.category) {
        params.append('category', filters.category);
      }
      if (filters?.search) {
        params.append('q', filters.search);
      }

      if (params.toString()) {
        url += `?${params.toString()}`;
      }

      const response = await apiClient.get(url);
      return response.data;
    } catch (error: any) {
      console.error('Error fetching products:', error);
      throw new Error(error.message || 'Failed to fetch products');
    }
  },

  getProductById: async (id: string): Promise<Product> => {
    try {
      const response = await apiClient.get(`/products/${id}`);
      return response.data;
    } catch (error: any) {
      console.error('Error fetching product:', error);
      throw new Error(error.message || 'Failed to fetch product');
    }
  },

  getProductsByCategory: async (category: string): Promise<Product[]> => {
    try {
      const response = await apiClient.get(`/products?category=${category}`);
      return response.data;
    } catch (error: any) {
      console.error('Error fetching products by category:', error);
      throw new Error(error.message || 'Failed to fetch products');
    }
  },

  searchProducts: async (query: string): Promise<Product[]> => {
    try {
      const response = await apiClient.get(`/products/search?q=${encodeURIComponent(query)}`);
      return response.data;
    } catch (error: any) {
      console.error('Error searching products:', error);
      throw new Error(error.message || 'Failed to search products');
    }
  },

<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
  createProduct: async (productData: CreateProductData): Promise<Product> => {
=======
  // Create product (admin only)
  createProduct: async (productData: Omit<Product, 'id' | 'in_stock' | 'created_at' | 'updated_at'>): Promise<Product> => {
>>>>>>> Stashed changes
=======
  // Create product (admin only)
  createProduct: async (productData: Omit<Product, 'id' | 'in_stock' | 'created_at' | 'updated_at'>): Promise<Product> => {
>>>>>>> Stashed changes
=======
  // Create product (admin only)
  createProduct: async (productData: Omit<Product, 'id' | 'in_stock' | 'created_at' | 'updated_at'>): Promise<Product> => {
>>>>>>> Stashed changes
    try {
      const response = await apiClient.post('/products', productData);
      return response.data;
    } catch (error: any) {
      console.error('Error creating product:', error);
      throw new Error(error.message || 'Failed to create product');
    }
  },

<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
  updateProduct: async (id: string, productData: Partial<CreateProductData>): Promise<Product> => {
=======
  // Update product (admin only)
  updateProduct: async (id: string, productData: Partial<Product>): Promise<Product> => {
>>>>>>> Stashed changes
=======
  // Update product (admin only)
  updateProduct: async (id: string, productData: Partial<Product>): Promise<Product> => {
>>>>>>> Stashed changes
=======
  // Update product (admin only)
  updateProduct: async (id: string, productData: Partial<Product>): Promise<Product> => {
>>>>>>> Stashed changes
    try {
      const response = await apiClient.put(`/products/${id}`, productData);
      return response.data;
    } catch (error: any) {
      console.error('Error updating product:', error);
      throw new Error(error.message || 'Failed to update product');
    }
  },

<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
=======
  // Delete product (admin only)
>>>>>>> Stashed changes
=======
  // Delete product (admin only)
>>>>>>> Stashed changes
=======
  // Delete product (admin only)
>>>>>>> Stashed changes
  deleteProduct: async (id: string): Promise<void> => {
    try {
      await apiClient.delete(`/products/${id}`);
    } catch (error: any) {
      console.error('Error deleting product:', error);
      throw new Error(error.message || 'Failed to delete product');
    }
  },
};
