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
    
    const defaultHeaders = {
      'Content-Type': 'application/json',
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

// Export all API functions
const api = {
  auth: authApi,
  user: userApi,
  client: apiClient,
};

export default api;
