import apiClient from './apiClient';

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

export const authService = {
    register: async (data: RegisterData): Promise<LoginResponse> => {
        try {
            const response = await apiClient.post('/auth/register', data);
            return response.data;
        } catch (error: any) {
            console.error('Registration error:', error);
            throw new Error(error.message || 'Registration failed');
        }
    },

    login: async (data: LoginData): Promise<LoginResponse> => {
        try {
            const response = await apiClient.post('/auth/login/json', data);
            return response.data;
        } catch (error: any) {
            console.error('Login error:', error);
            throw new Error(error.message || 'Login failed');
        }
    },

    getCurrentUser: async (): Promise<User> => {
        try {
            const response = await apiClient.get('/auth/me');
            return response.data;
        } catch (error: any) {
            console.error('Get current user error:', error);
            throw new Error(error.message || 'Failed to get user info');
        }
    },

    updateProfile: async (data: ProfileUpdateData): Promise<User> => {
        try {
            const response = await apiClient.put('/users/me', data);
            return response.data;
        } catch (error: any) {
            console.error('Update profile error:', error);
            throw new Error(error.message || 'Failed to update profile');
        }
    },

    logout: (): void => {
        localStorage.removeItem('authToken');
    },

    isAuthenticated: (): boolean => {
        return !!localStorage.getItem('authToken');
    },

    getToken: (): string | null => {
        return localStorage.getItem('authToken');
    },

    setToken: (token: string): void => {
        localStorage.setItem('authToken', token);
    },
};
