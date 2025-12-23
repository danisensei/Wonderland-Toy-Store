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
  in_stock?: boolean;
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

  createProduct: async (productData: CreateProductData): Promise<Product> => {
    try {
      const response = await apiClient.post('/products', productData);
      return response.data;
    } catch (error: any) {
      console.error('Error creating product:', error);
      throw new Error(error.message || 'Failed to create product');
    }
  },

  updateProduct: async (id: string, productData: Partial<CreateProductData>): Promise<Product> => {
    try {
      const response = await apiClient.put(`/products/${id}`, productData);
      return response.data;
    } catch (error: any) {
      console.error('Error updating product:', error);
      throw new Error(error.message || 'Failed to update product');
    }
  },

  deleteProduct: async (id: string): Promise<void> => {
    try {
      await apiClient.delete(`/products/${id}`);
    } catch (error: any) {
      console.error('Error deleting product:', error);
      throw new Error(error.message || 'Failed to delete product');
    }
  },
};

