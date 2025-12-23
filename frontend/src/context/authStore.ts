import { create } from 'zustand';
import { persist } from 'zustand/middleware';

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
  adminLogin: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAdmin: () => boolean;
}

export const useAuthStore = create<AuthStore>(
  persist(
    (set, get) => ({
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

      adminLogin: async (email: string, password: string) => {
        try {
          console.log('adminLogin called with:', { email, password });
          // Admin hardcoded credentials for demo (replace with API call in production)
          const adminEmail = 'admin@wonderland.com';
          const adminPassword = 'admin123';

          if (email === adminEmail && password === adminPassword) {
            const adminUser: User = {
              id: 'admin-001',
              name: 'Admin User',
              email: adminEmail,
              role: 'admin',
              createdAt: new Date().toISOString(),
            };
            console.log('Credentials valid, setting user:', adminUser);
            set({
              user: adminUser,
              token: 'admin-token-' + Date.now(),
              isAuthenticated: true,
            });
            console.log('User set successfully');
          } else {
            console.log('Invalid credentials');
            throw new Error('Invalid admin credentials');
          }
        } catch (error) {
          console.error('Admin login failed:', error);
          throw error;
        }
      },

      logout: () => {
        set({ user: null, token: null, isAuthenticated: false });
      },

      isAdmin: () => {
        const state = get();
        return state.user?.role === 'admin' && state.isAuthenticated;
      },
    }),
    {
      name: 'auth-store',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

