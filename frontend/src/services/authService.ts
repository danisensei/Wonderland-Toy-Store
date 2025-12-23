import apiClient from './apiClient';

// Types
export interface User {
    id: string;
    email: string;
    name: string;
    role: 'customer' | 'admin';
    createdAt: string;
}

export interface LoginResponse {
    access_token: string;
    token_type: string;
    user: User;
}

export interface RegisterData {
    email: string;
    name: string;
    password: string;
}

export interface LoginData {
    email: string;
    password: string;
}

export interface ProfileUpdateData {
    name?: string;
    email?: string;
}

// Auth Service
export const authService = {
    /**
     * Register a new user
     */
    register: async (data: RegisterData): Promise<LoginResponse> => {
        try {
            const response = await apiClient.post('/auth/register', data);
            return response.data;
        } catch (error: any) {
            console.error('Registration error:', error);
            throw new Error(error.message || 'Registration failed');
        }
    },

    /**
     * Login with email and password
     */
    login: async (data: LoginData): Promise<LoginResponse> => {
        try {
            const response = await apiClient.post('/auth/login/json', data);
            return response.data;
        } catch (error: any) {
            console.error('Login error:', error);
            throw new Error(error.message || 'Login failed');
        }
    },

    /**
     * Get current user info (requires valid token)
     */
    getCurrentUser: async (): Promise<User> => {
        try {
            const response = await apiClient.get('/auth/me');
            return response.data;
        } catch (error: any) {
            console.error('Get current user error:', error);
            throw new Error(error.message || 'Failed to get user info');
        }
    },

    /**
     * Update user profile
     */
    updateProfile: async (data: ProfileUpdateData): Promise<User> => {
        try {
            const response = await apiClient.put('/users/profile', data);
            return response.data;
        } catch (error: any) {
            console.error('Update profile error:', error);
            throw new Error(error.message || 'Failed to update profile');
        }
    },

    /**
     * Logout - clear token from local storage
     */
    logout: (): void => {
        localStorage.removeItem('authToken');
    },

    /**
     * Check if user is authenticated (has token)
     */
    isAuthenticated: (): boolean => {
        return !!localStorage.getItem('authToken');
    },

    /**
     * Get stored token
     */
    getToken: (): string | null => {
        return localStorage.getItem('authToken');
    },

    /**
     * Store token in local storage
     */
    setToken: (token: string): void => {
        localStorage.setItem('authToken', token);
    },
};
