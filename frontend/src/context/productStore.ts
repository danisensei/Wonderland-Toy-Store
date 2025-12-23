import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product, productService, CreateProductData } from '../services/productService';

export interface ProductStore {
  products: Product[];
  isLoading: boolean;
  error: string | null;
  lastFetched: number | null;
  setProducts: (products: Product[]) => void;
  fetchProducts: () => Promise<void>;
  addProduct: (product: CreateProductData) => Promise<Product>;
  updateProduct: (id: string, product: Partial<CreateProductData>) => Promise<Product>;
  deleteProduct: (id: string) => Promise<void>;
  getProduct: (id: string) => Product | undefined;
  updateProductQuantity: (id: string, quantity: number) => void;
  getProductsByCategory: (category: string) => Product[];
  searchProducts: (query: string) => Product[];
  clearError: () => void;
}

export const useProductStore = create<ProductStore>()(
  persist(
    (set, get) => ({
      products: [],
      isLoading: false,
      error: null,
      lastFetched: null,

      setProducts: (products) => {
        set({ products, lastFetched: Date.now() });
      },

      // Fetch products from API
      fetchProducts: async () => {
        // Skip if recently fetched (within 1 minute)
        const lastFetched = get().lastFetched;
        if (lastFetched && Date.now() - lastFetched < 60000 && get().products.length > 0) {
          return;
        }

        set({ isLoading: true, error: null });
        try {
          const products = await productService.getAllProducts();
          set({
            products,
            isLoading: false,
            error: null,
            lastFetched: Date.now()
          });
        } catch (error: any) {
          set({
            isLoading: false,
            error: error.message || 'Failed to fetch products'
          });
          throw error;
        }
      },

      // Add new product via API (admin)
      addProduct: async (productData) => {
        set({ isLoading: true, error: null });
        try {
          const newProduct = await productService.createProduct(productData);
          set((state) => ({
            products: [...state.products, newProduct],
            isLoading: false,
            error: null,
          }));
          return newProduct;
        } catch (error: any) {
          set({ isLoading: false, error: error.message });
          throw error;
        }
      },

      // Update product via API (admin)
      updateProduct: async (id, updates) => {
        set({ isLoading: true, error: null });
        try {
          const updatedProduct = await productService.updateProduct(id, updates);
          set((state) => ({
            products: state.products.map((p) =>
              p.id === id ? updatedProduct : p
            ),
            isLoading: false,
            error: null,
          }));
          return updatedProduct;
        } catch (error: any) {
          set({ isLoading: false, error: error.message });
          throw error;
        }
      },

      // Delete product via API (admin)
      deleteProduct: async (id) => {
        set({ isLoading: true, error: null });
        try {
          await productService.deleteProduct(id);
          set((state) => ({
            products: state.products.filter((p) => p.id !== id),
            isLoading: false,
            error: null,
          }));
        } catch (error: any) {
          set({ isLoading: false, error: error.message });
          throw error;
        }
      },

      // Get single product from store
      getProduct: (id) => {
        return get().products.find((product) => product.id === id);
      },

      // Update product quantity locally (for cart operations)
      updateProductQuantity: (id, quantity) => {
        set((state) => ({
          products: state.products.map((product) =>
            product.id === id ? { ...product, quantity } : product
          ),
        }));
      },

      // Filter products by category locally
      getProductsByCategory: (category) => {
        return get().products.filter((product) => product.category === category);
      },

      // Search products locally
      searchProducts: (query) => {
        const lowerQuery = query.toLowerCase();
        return get().products.filter(
          (product) =>
            product.name.toLowerCase().includes(lowerQuery) ||
            product.brand.toLowerCase().includes(lowerQuery) ||
            product.description.toLowerCase().includes(lowerQuery)
        );
      },

      // Clear error
      clearError: () => {
        set({ error: null });
      },
    }),
    {
      name: 'product-store',
      partialize: (state) => ({
        products: state.products,
        lastFetched: state.lastFetched,
      }),
    }
  )
);
