import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { authService, User, LoginResponse } from '../services/authService';

export interface AuthStore {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, name: string, password: string) => Promise<void>;
  adminLogin: (email: string, password: string) => Promise<void>;
  logout: () => void;
  checkAuth: () => Promise<void>;
  clearError: () => void;
  isAdmin: () => boolean;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      setUser: (user) => {
        set({ user, isAuthenticated: !!user });
      },

      setToken: (token) => {
        if (token) {
          localStorage.setItem('authToken', token);
        } else {
          localStorage.removeItem('authToken');
        }
        set({ token });
      },

      // Customer login
      login: async (email: string, password: string) => {
        set({ isLoading: true, error: null });
        try {
          const response: LoginResponse = await authService.login({ email, password });

          // Store token
          localStorage.setItem('authToken', response.access_token);

          // Update state
          set({
            user: response.user,
            token: response.access_token,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });
        } catch (error: any) {
          set({
            isLoading: false,
            error: error.message || 'Login failed',
            isAuthenticated: false,
          });
          throw error;
        }
      },

      // Register new user
      register: async (email: string, name: string, password: string) => {
        set({ isLoading: true, error: null });
        try {
          const response: LoginResponse = await authService.register({ email, name, password });

          // Store token
          localStorage.setItem('authToken', response.access_token);

          // Update state
          set({
            user: response.user,
            token: response.access_token,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });
        } catch (error: any) {
          set({
            isLoading: false,
            error: error.message || 'Registration failed',
            isAuthenticated: false,
          });
          throw error;
        }
      },

      // Admin login (same API, just check role)
      adminLogin: async (email: string, password: string) => {
        set({ isLoading: true, error: null });
        try {
          const response: LoginResponse = await authService.login({ email, password });

          // Check if user is admin
          if (response.user.role !== 'admin') {
            throw new Error('Access denied. Admin privileges required.');
          }

          // Store token
          localStorage.setItem('authToken', response.access_token);

          // Update state
          set({
            user: response.user,
            token: response.access_token,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });
        } catch (error: any) {
          set({
            isLoading: false,
            error: error.message || 'Admin login failed',
            isAuthenticated: false,
          });
          throw error;
        }
      },

      // Logout
      logout: () => {
        localStorage.removeItem('authToken');
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          error: null,
        });
      },

      // Check auth status on app load
      checkAuth: async () => {
        const token = localStorage.getItem('authToken');
        if (!token) {
          set({ isAuthenticated: false, user: null, token: null });
          return;
        }

        try {
          const user = await authService.getCurrentUser();
          set({
            user,
            isAuthenticated: true,
            token,
          });
        } catch (error) {
          // Token is invalid or expired
          localStorage.removeItem('authToken');
          set({
            user: null,
            token: null,
            isAuthenticated: false,
          });
        }
      },

      // Clear error
      clearError: () => {
        set({ error: null });
      },

      // Check if current user is admin
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

// Re-export User type for convenience
export type { User };
