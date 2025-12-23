import apiClient from './apiClient';

<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
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
=======
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
export interface LoginResponse {
    access_token: string;
    token_type: string;
    user: {
        id: string;
        email: string;
        name: string;
        role: 'customer' | 'admin';
        createdAt: string;
    };
<<<<<<< Updated upstream
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
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

<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
export interface ProfileUpdateData {
    name?: string;
    email?: string;
}

export const authService = {
=======
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
export interface User {
    id: string;
    email: string;
    name: string;
    role: 'customer' | 'admin';
    createdAt: string;
}

export const authService = {
    // Register new user
<<<<<<< Updated upstream
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
    register: async (data: RegisterData): Promise<LoginResponse> => {
        try {
            const response = await apiClient.post('/auth/register', data);
            return response.data;
        } catch (error: any) {
            console.error('Registration error:', error);
            throw new Error(error.message || 'Registration failed');
        }
    },

<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
=======
    // Login with email and password
>>>>>>> Stashed changes
=======
    // Login with email and password
>>>>>>> Stashed changes
=======
    // Login with email and password
>>>>>>> Stashed changes
    login: async (data: LoginData): Promise<LoginResponse> => {
        try {
            const response = await apiClient.post('/auth/login/json', data);
            return response.data;
        } catch (error: any) {
            console.error('Login error:', error);
            throw new Error(error.message || 'Login failed');
        }
    },

<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
=======
    // Get current user info
>>>>>>> Stashed changes
=======
    // Get current user info
>>>>>>> Stashed changes
=======
    // Get current user info
>>>>>>> Stashed changes
    getCurrentUser: async (): Promise<User> => {
        try {
            const response = await apiClient.get('/auth/me');
            return response.data;
        } catch (error: any) {
            console.error('Get current user error:', error);
            throw new Error(error.message || 'Failed to get user info');
        }
    },

<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
    updateProfile: async (data: ProfileUpdateData): Promise<User> => {
        try {
            const response = await apiClient.put('/users/me', data);
=======
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
    // Update user profile
    updateProfile: async (data: { name?: string; email?: string }): Promise<User> => {
        try {
            const response = await apiClient.put('/users/profile', data);
<<<<<<< Updated upstream
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
            return response.data;
        } catch (error: any) {
            console.error('Update profile error:', error);
            throw new Error(error.message || 'Failed to update profile');
        }
    },

<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
=======
    // Logout - clear local storage
>>>>>>> Stashed changes
=======
    // Logout - clear local storage
>>>>>>> Stashed changes
=======
    // Logout - clear local storage
>>>>>>> Stashed changes
    logout: (): void => {
        localStorage.removeItem('authToken');
    },

<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
=======
    // Check if user is authenticated
>>>>>>> Stashed changes
=======
    // Check if user is authenticated
>>>>>>> Stashed changes
=======
    // Check if user is authenticated
>>>>>>> Stashed changes
    isAuthenticated: (): boolean => {
        return !!localStorage.getItem('authToken');
    },

<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
=======
    // Get stored token
>>>>>>> Stashed changes
=======
    // Get stored token
>>>>>>> Stashed changes
=======
    // Get stored token
>>>>>>> Stashed changes
    getToken: (): string | null => {
        return localStorage.getItem('authToken');
    },

<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
=======
    // Store token
>>>>>>> Stashed changes
=======
    // Store token
>>>>>>> Stashed changes
=======
    // Store token
>>>>>>> Stashed changes
    setToken: (token: string): void => {
        localStorage.setItem('authToken', token);
    },
};
