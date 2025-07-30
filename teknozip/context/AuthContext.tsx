'use client';
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { jwtDecode } from 'jwt-decode';
import { AuthResponse } from '@/types/response';
import { updateCompanyProfile } from '@/utils/api';

interface AuthContextType {
  user: any;
  role: string | null;
  token: string | null;
  refreshToken: string | null;
  login: (authData: AuthResponse) => void;
  logout: () => void;
  refreshAuth: () => Promise<void>;
  loading: boolean;
  isAuthenticated: boolean;
  updateProfile: (data: {
    companyName?: string;
    contactPerson?: string;
    email?: string;
    password?: string;
  }) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem('accessToken');
    const storedRefreshToken = localStorage.getItem('refreshToken');
    
    if (storedToken && storedRefreshToken) {
      try {
        const decoded = jwtDecode(storedToken);
        setToken(storedToken);
        setRefreshToken(storedRefreshToken);
        setUser(decoded);
      } catch (err) {
        console.error("Token decode error:", err);
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
      }
    }
    setLoading(false);
  }, []);

  const login = (authData: AuthResponse) => {
    try {
      const { accessToken, refreshToken } = authData;
      
      if (!accessToken || !refreshToken) {
        throw new Error("Token bilgileri eksik");
      }

      const decodedAccess = jwtDecode(accessToken);
      
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      
      setToken(accessToken);
      setRefreshToken(refreshToken);
      setUser(decodedAccess);
      setLoading(false);
    } catch (err) {
      console.error("Token işleme hatası:", err);
      throw new Error("Oturum açma işlemi başarısız oldu");
    }
  };

  const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    setToken(null);
    setRefreshToken(null);
    setUser(null);
    setLoading(false);
  };

  const refreshAuth = async () => {
    try {
      if (!refreshToken) throw new Error("Refresh token bulunamadı");
      
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/Auth/refresh-token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${refreshToken}`
        },
        body: JSON.stringify({ refreshToken })
      });

      const data = await response.json();
      
      if (response.ok && data.isSuccess) {
        login({
          isSuccess: true,
          message: data.message,
          accessToken: data.data.accessToken,
          refreshToken: data.data.refreshToken
        });
      } else {
        logout();
      }
    } catch (err) {
      console.error("Token yenileme hatası:", err);
      logout();
    }
  };

  const updateProfile = async ( {
    companyName,
    contactPerson,
    email,
    password,
  }: {
    companyName?: string;
    contactPerson?: string;
    email?: string;
    password?: string;
  }) => {
    if (!token) {
      throw new Error("Yetkilendirme hatası: Erişim token'ı bulunamadı");
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/Company/update-profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          companyName,
          contactPerson,
          email,
          password,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Profil güncellenemedi");
      }

      // Kullanıcı bilgilerini güncelle
      setUser((prevUser: any) => ({
        ...prevUser,
        companyName: companyName || prevUser.companyName,
        contactPerson: contactPerson || prevUser.contactPerson,
        email: email || prevUser.email,
      }));

      // Opsiyonel: Eğer JWT içinde bu bilgiler varsa, yeni token alınmalı
      // Şimdilik sadece frontend state’i güncelliyoruz
    } catch (err) {
      console.error("Profil güncelleme hatası:", err);
      throw err;
    }
  };

  const isAuthenticated = !!token && !!refreshToken;
  const role = user?.role || null;

  return (
    <AuthContext.Provider
      value={{
        user,
        role,
        token,
        refreshToken,
        login,
        logout,
        refreshAuth,
        loading,
        isAuthenticated,
        updateProfile, // ✅ Provider'a ekledik
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export { AuthContext };