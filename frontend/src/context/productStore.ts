import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from '../services/productService';

export interface ProductStore {
  products: Product[];
  setProducts: (products: Product[]) => void;
  addProduct: (product: Product) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  getProduct: (id: string) => Product | undefined;
  updateProductQuantity: (id: string, quantity: number) => void;
  getProductsByCategory: (category: string) => Product[];
  searchProducts: (query: string) => Product[];
}

// Sample products data - same as in ProductsPage
const INITIAL_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Robot Explorer',
    brand: 'TechToys',
    price: 4999.99,
    quantity: 15,
    description: 'Advanced robot with AI learning capabilities',
    category: 'Electronic',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSK1teoV9A4Ruk4aCQ7E4606n0_uYrdAEfgLQ&s',
    categoryAttributes: { batteryType: 'AA', voltage: '6V' },
  },
  {
    id: '2',
    name: 'Soft Teddy Bear',
    brand: 'CozyToys',
    price: 1000.0,
    quantity: 25,
    description: 'Ultra-soft plush teddy bear with embroidered details',
    category: 'Plush',
    image: 'https://theflowerstudio.pk/wp-content/uploads/2017/02/high-quality-80cm-huge-teddy-bear-stuffed-plush-kids-toys-cute-wear-sweater-bear-baby-appearse.jpg_640x640.jpg',
    categoryAttributes: { material: 'Polyester', size: 'Medium' },
  },
  {
    id: '3',
    name: 'Chess Master',
    brand: 'GamePro',
    price: 3200,
    quantity: 10,
    description: 'Classic chess set with magnetic pieces',
    category: 'BoardGame',
    image: 'https://m.media-amazon.com/images/I/81l0QFknYcL._AC_UF894,1000_QL80_.jpg',
    categoryAttributes: { ageRange: '8+', numberOfPlayers: '2' },
  },
  {
    id: '4',
    name: 'Smart Robot',
    brand: 'TechToys',
    price: 4999,
    quantity: 15,
    description: 'Interactive robot with voice commands and LED display',
    category: 'Electronic',
    image: 'https://via.placeholder.com/300?text=Smart+Robot',
    categoryAttributes: { batteryType: 'AA', voltage: '3V' },
  },
  {
    id: '5',
    name: 'Cuddly Teddy Bear',
    brand: 'SoftCare',
    price: 2499,
    quantity: 30,
    description: 'Super soft teddy bear perfect for hugs',
    category: 'Plush',
    image: 'https://via.placeholder.com/300?text=Teddy+Bear',
    categoryAttributes: { material: 'Plush', size: 'Large' },
  },
  {
    id: '6',
    name: 'Chess Set',
    brand: 'GameMaster',
    price: 3499,
    quantity: 10,
    description: 'Professional chess set with premium wooden pieces',
    category: 'BoardGame',
    image: 'https://via.placeholder.com/300?text=Chess',
    categoryAttributes: { ageRange: '10+', numberOfPlayers: '2' },
  },
];

export const useProductStore = create<ProductStore>(
  persist(
    (set, get) => ({
      products: INITIAL_PRODUCTS,

      setProducts: (products) => {
        set({ products });
      },

      addProduct: (product) => {
        set((state) => ({
          products: [...state.products, product],
        }));
      },

      updateProduct: (id, updates) => {
        set((state) => ({
          products: state.products.map((product) =>
            product.id === id ? { ...product, ...updates } : product
          ),
        }));
      },

      deleteProduct: (id) => {
        set((state) => ({
          products: state.products.filter((product) => product.id !== id),
        }));
      },

      getProduct: (id) => {
        return get().products.find((product) => product.id === id);
      },

      updateProductQuantity: (id, quantity) => {
        set((state) => ({
          products: state.products.map((product) =>
            product.id === id ? { ...product, quantity } : product
          ),
        }));
      },

      getProductsByCategory: (category) => {
        return get().products.filter((product) => product.category === category);
      },

      searchProducts: (query) => {
        const lowerQuery = query.toLowerCase();
        return get().products.filter(
          (product) =>
            product.name.toLowerCase().includes(lowerQuery) ||
            product.brand.toLowerCase().includes(lowerQuery) ||
            product.description.toLowerCase().includes(lowerQuery)
        );
      },
    }),
    {
      name: 'product-store',
    }
  )
);

