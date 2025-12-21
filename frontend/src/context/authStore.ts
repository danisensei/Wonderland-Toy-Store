import { create } from 'zustand';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'customer' | 'admin';
  createdAt: string;
}

export interface AuthStore {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,

  setUser: (user) => {
    set({ user, isAuthenticated: !!user });
  },

  setToken: (token) => {
    set({ token });
  },

  login: async (email: string, password: string) => {
    try {
      // Placeholder for API call
      // const response = await fetch('/api/auth/login', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email, password }),
      // });
      // const data = await response.json();
      // set({ user: data.user, token: data.token, isAuthenticated: true });
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  },

  logout: () => {
    set({ user: null, token: null, isAuthenticated: false });
  },
}));

