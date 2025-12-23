import { create } from 'zustand';
<<<<<<< Updated upstream
<<<<<<< Updated upstream
import { persist } from 'zustand/middleware';
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
<<<<<<< Updated upstream
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
=======
  logout: () => void;
  checkAuth: () => Promise<void>;
  clearError: () => void;
}

=======
  logout: () => void;
  checkAuth: () => Promise<void>;
  clearError: () => void;
}

>>>>>>> Stashed changes
export const useAuthStore = create<AuthStore>((set, get) => ({
  user: null,
  token: localStorage.getItem('authToken'),
  isAuthenticated: !!localStorage.getItem('authToken'),
  isLoading: false,
  error: null,
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes

      setUser: (user) => {
        set({ user, isAuthenticated: !!user });
      },

<<<<<<< Updated upstream
      setToken: (token) => {
        if (token) {
          localStorage.setItem('authToken', token);
        } else {
          localStorage.removeItem('authToken');
        }
        set({ token });
      },

      login: async (email: string, password: string) => {
        set({ isLoading: true, error: null });
        try {
          const response: LoginResponse = await authService.login({ email, password });
          localStorage.setItem('authToken', response.access_token);
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

      register: async (email: string, name: string, password: string) => {
        set({ isLoading: true, error: null });
        try {
          const response: LoginResponse = await authService.register({ email, name, password });
          localStorage.setItem('authToken', response.access_token);
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

      adminLogin: async (email: string, password: string) => {
        set({ isLoading: true, error: null });
        try {
          const response: LoginResponse = await authService.login({ email, password });
          if (response.user.role !== 'admin') {
            throw new Error('Access denied. Admin privileges required.');
          }
          localStorage.setItem('authToken', response.access_token);
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

      logout: () => {
        localStorage.removeItem('authToken');
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          error: null,
        });
      },

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
          localStorage.removeItem('authToken');
          set({
            user: null,
            token: null,
            isAuthenticated: false,
          });
        }
      },

      clearError: () => {
        set({ error: null });
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

=======
  setToken: (token) => {
    if (token) {
      localStorage.setItem('authToken', token);
    } else {
      localStorage.removeItem('authToken');
    }
    set({ token });
  },

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

  logout: () => {
    localStorage.removeItem('authToken');
    set({
      user: null,
      token: null,
      isAuthenticated: false,
      error: null,
    });
  },

  checkAuth: async () => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      set({ isAuthenticated: false, user: null });
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

  clearError: () => {
    set({ error: null });
  },
}));

// Export User type for convenience
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
export type { User };
