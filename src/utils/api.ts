import Cookies from 'js-cookie';


// API base URL - you can configure this based on your environment
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000';

// API response types
export interface ApiResponse<T = unknown> {
  data?: T;
  message?: string;
  error?: string;
  status: number;
}

export interface SignupRequest {
  email: string;
  name: string;
  password: string;
  token: string;
}

export interface SignupResponse {
  email: string;
  name: string;
  password: string;
  token: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  companyName?: string;
  token: string;
  user: User;
}

export interface ProviderConnection {
  id: number;
  user_email: string;
  user_name: string;
  provider: string;
  status: 'active' | 'revoked' | 'pending' | 'error';
  created_at: string;
  updated_at: string;
  user: number;
  success_rate?: number;
  last_30_days_volume?: number;
  credentials?: Record<string, string>;
}

export interface CreateProviderRequest {
  provider: string;
  credentials: Record<string, string>;
  status: 'active' | 'revoked' | 'pending';
}

// Generic API client
class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseUrl}${endpoint}`;
    
    // Get token from cookies
    const token = Cookies.get('token');
    
    const defaultHeaders = {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Token ${token}` }),
    };

    const config: RequestInit = {
      ...options,
      headers: {
        ...defaultHeaders,
        ...options.headers,
      },
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        return {
          status: response.status,
          error: data.message || data.error || data.email || 'An error occurred',
        };
      }

      return {
        status: response.status,
        data,
        message: data.message,
      };
    } catch (error) {
      return {
        status: 500,
        error: error instanceof Error ? error.message : 'Network error',
      };
    }
  }

  // GET request
  async get<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'GET' });
  }

  // POST request
  async post<T>(endpoint: string, data: unknown): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // PUT request
  async put<T>(endpoint: string, data: unknown): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  // PATCH request
  async patch<T>(endpoint: string, data: unknown): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  }

  // DELETE request
  async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'DELETE' });
  }
}

// Create API client instance
export const apiClient = new ApiClient(API_BASE_URL);

// Auth API functions
export const authApi = {

  // Signup user
  async signup(data: SignupRequest & { rememberMe?: boolean }): Promise<ApiResponse<SignupResponse>> {
    const response = await apiClient.post<SignupResponse>('/v1/users/', data);

    if (response.data) {
      const cookieOptions = data.rememberMe
        ? { expires: 30 }
        : {};

      Cookies.set('user', JSON.stringify(response.data), cookieOptions);
      Cookies.set('isAuthenticated', 'true', cookieOptions);
      Cookies.set('token', response.data.token, cookieOptions);
      Cookies.set('isNewUser', 'true');
    }

    return response;
  },

  // Login user
  async login(data: { email: string; password: string; rememberMe?: boolean }): Promise<ApiResponse<User>> {
    const response = await apiClient.post<User>('/v1/users/login/', {
      email: data.email,
      password: data.password,
    });

    if (response.data) {
      const cookieOptions = data.rememberMe
        ? { expires: 30 }
        : {};

      Cookies.set('user', JSON.stringify(response?.data?.user), cookieOptions);
      Cookies.set('isAuthenticated', 'true', cookieOptions);
      Cookies.set('token', response.data.token, cookieOptions);
      Cookies.set('isNewUser', 'true');
    }

    return response;
  },

  // Logout user
  logout(): void {
    Cookies.remove('user');
    Cookies.remove('isAuthenticated');
    Cookies.remove('token');
  },

  // Get current user from cookies
  getCurrentUser(): User | null {
    const userStr = Cookies.get('user');
    if (userStr) {
      try {
        return JSON.parse(userStr);
      } catch {
        return null;
      }
    }
    return null;
  },

  // Check if user is authenticated
  isAuthenticated(): boolean {
    return Cookies.get('isAuthenticated') === 'true';
  },
};

// User API functions
export const userApi = {
  // Get user profile
  async getProfile(): Promise<ApiResponse<User>> {
    return apiClient.get<User>('/v1/users/me/');
  },

  // Update user profile
  async updateProfile(data: Partial<User>): Promise<ApiResponse<User>> {
    return apiClient.put<User>('/v1/users/profile/', data);
  },
};

// Provider API functions
export const providerApi = {
  // Get all provider connections
  async getProviderConnections(): Promise<ApiResponse<ProviderConnection[]>> {
    return apiClient.get<ProviderConnection[]>('/v1/provider-connections/');
  },

  // Create new provider connection
  async createProviderConnection(data: CreateProviderRequest): Promise<ApiResponse<ProviderConnection>> {
    return apiClient.post<ProviderConnection>('/v1/provider-connections/', data);
  },

  // Update provider connection
  async updateProviderConnection(id: number, data: Partial<CreateProviderRequest>): Promise<ApiResponse<ProviderConnection>> {
    return apiClient.patch<ProviderConnection>(`/v1/provider-connections/${id}/`, data);
  },

  // Delete provider connection
  async deleteProviderConnection(id: number): Promise<ApiResponse<void>> {
    return apiClient.delete<void>(`/v1/provider-connections/${id}/`);
  },
};

// Export all API functions
const api = {
  auth: authApi,
  user: userApi,
  provider: providerApi,
  client: apiClient,
};

export default api;
