// API Client with automatic token management
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5071/api';

class ApiClient {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  private getAuthHeaders(): HeadersInit {
    const token = localStorage.getItem('accessToken');
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    return headers;
  }

  private async handleResponse(response: Response) {
    console.log('API Response:', {
      status: response.status,
      statusText: response.statusText,
      url: response.url,
      headers: Object.fromEntries(response.headers.entries())
    });

    if (response.status === 401) {
      // Token süresi dolmuş, refresh token dene
      const refreshed = await this.refreshToken();
      if (!refreshed) {
        // Refresh token da başarısız, logout yap
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        window.location.href = '/auth/login';
        throw new Error('Oturum süresi doldu. Lütfen tekrar giriş yapın.');
      }
      // Refresh başarılı, orijinal isteği tekrar dene
      return null; // Caller should retry
    }

    if (response.status === 403) {
      window.location.href = '/403';
      throw new Error('Bu işlem için yetkiniz bulunmamaktadır.');
    }

    if (!response.ok) {
      let errorData = {};
      try {
        const responseText = await response.text();
        console.log('Raw response text:', responseText);
        if (responseText) {
          errorData = JSON.parse(responseText);
        }
      } catch (parseError) {
        console.log('Failed to parse error response:', parseError);
      }
      
      console.error('API Error:', {
        status: response.status,
        statusText: response.statusText,
        url: response.url,
        errorData
      });
      throw new Error(errorData.message || `HTTP Error: ${response.status}`);
    }

    const responseText = await response.text();
    console.log('Success response text:', responseText);
    
    if (!responseText) {
      return {};
    }
    
    try {
      return JSON.parse(responseText);
    } catch (parseError) {
      console.error('Failed to parse success response:', parseError);
      return {};
    }
  }

  private async refreshToken(): Promise<boolean> {
    const refreshTokenValue = localStorage.getItem('refreshToken');
    if (!refreshTokenValue) return false;

    try {
      const response = await fetch(`${this.baseURL}/Auth/RefreshToken`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refreshToken: refreshTokenValue })
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('accessToken', data.data.accessToken);
        localStorage.setItem('refreshToken', data.data.refreshToken);
        return true;
      }
    } catch (error) {
      console.error('Token refresh failed:', error);
    }

    return false;
  }

  async get(endpoint: string, retryCount = 0): Promise<any> {
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method: 'GET',
      headers: this.getAuthHeaders()
    });

    const result = await this.handleResponse(response);
    
    // Eğer 401 hatası aldık ve refresh token başarılı olduysa, tekrar dene
    if (result === null && retryCount === 0) {
      return this.get(endpoint, 1);
    }

    return result;
  }

  async post(endpoint: string, data: any, retryCount = 0): Promise<any> {
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(data)
    });

    const result = await this.handleResponse(response);
    
    // Eğer 401 hatası aldık ve refresh token başarılı olduysa, tekrar dene
    if (result === null && retryCount === 0) {
      return this.post(endpoint, data, 1);
    }

    return result;
  }

  async put(endpoint: string, data: any, retryCount = 0): Promise<any> {
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method: 'PUT',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(data)
    });

    const result = await this.handleResponse(response);
    
    // Eğer 401 hatası aldık ve refresh token başarılı olduysa, tekrar dene
    if (result === null && retryCount === 0) {
      return this.put(endpoint, data, 1);
    }

    return result;
  }

  async delete(endpoint: string, retryCount = 0): Promise<any> {
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method: 'DELETE',
      headers: this.getAuthHeaders()
    });

    const result = await this.handleResponse(response);
    
    // Eğer 401 hatası aldık ve refresh token başarılı olduysa, tekrar dene
    if (result === null && retryCount === 0) {
      return this.delete(endpoint, 1);
    }

    return result;
  }
}

// Singleton instance
export const apiClient = new ApiClient(BASE_URL);
export default apiClient;