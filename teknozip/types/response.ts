export interface AuthResponse {
    isSuccess: boolean;
    message?: string;
    accessToken: string;
    refreshToken: string;
  }