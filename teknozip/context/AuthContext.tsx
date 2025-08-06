'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { loginUser, registerCompany as registerCompanyAPI } from '@/utils/api';

type User = {
  id: string;
  name: string;
  email: string;
  role: 'super-admin' | 'company-admin' | 'employee';
  companyId?: string;
  companyName?: string;
  status?: 'approved' | 'pending' | 'rejected';
  position?: string;
  permissions?: string[];
};

type AuthContextType = {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  registerCompany: (companyData: CompanyRegistration) => Promise<any>;
  addEmployee: (employeeData: EmployeeRegistration) => Promise<void>;
  loading: boolean;
  isTokenValid: () => boolean;
  refreshToken: () => Promise<boolean>;
};

type CompanyRegistration = {
  type: string;
  companyName: string;
  email: string;
  phoneNumber: string;
  taxNumber: string;
  industry: string;
  expertiseAreas: string;
  experienceYear: number;
  adminFirstName: string;
  adminLastName: string;
  adminEmail: string;
  adminPassword: string;
  city: string;
  district: string;
  addressLine: string;
  postalCode?: string;
};

type EmployeeRegistration = {
  name: string;
  email: string;
  password: string;
  position: string;
  permissions: string[];
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Token geçerliliğini kontrol et
  const isTokenValid = (): boolean => {
    const token = localStorage.getItem('accessToken');
    if (!token) return false;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const currentTime = Date.now() / 1000;
      return payload.exp > currentTime;
    } catch {
      return false;
    }
  };

  // Kullanıcı bilgilerini token'dan çıkar
  const getUserFromToken = (token: string): User | null => {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      console.log('Token payload:', payload);
      
      // Role mapping: Backend'den gelen sayısal değerleri map et
      let role = payload.role;
      console.log('Original role from token:', role, 'Type:', typeof role);
      
      // String ise sayıya çevir
      if (typeof role === 'string') {
        role = parseInt(role);
      }
      
      // Sayısal değerleri frontend rol isimlerine map et
      switch (role) {
        case 1:
          role = 'super-admin';  // Backend: SuperAdmin=1
          break;
        case 2:
          role = 'company-admin';  // Backend: Admin=2 (company admin)
          break;
        case 3:
          role = 'employee';  // Backend: User=3 (employee)
          break;
        default:
          role = 'unknown';
      }
      
      console.log('Mapped role:', role);
      
      const user = {
        id: payload.sub || payload.userId,
        name: payload.name || payload.given_name + ' ' + payload.family_name,
        email: payload.email,
        role: role,
        companyId: payload.companyId,
        companyName: payload.companyName,
        position: payload.position,
        permissions: payload.permissions ? payload.permissions.split(',') : []
      };
      
      console.log('Final user object:', user);
      return user;
    } catch (error) {
      console.error('Error parsing token:', error);
      return null;
    }
  };

  // Refresh token ile yeni access token al
  const refreshToken = async (): Promise<boolean> => {
    const refreshTokenValue = localStorage.getItem('refreshToken');
    if (!refreshTokenValue) return false;

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5071/api'}/Auth/RefreshToken`, {
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
        
        const userData = getUserFromToken(data.data.accessToken);
        if (userData) {
          setUser(userData);
          return true;
        }
      }
    } catch (error) {
      console.error('Token refresh failed:', error);
    }

    return false;
  };

  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem('accessToken');
      
      if (token) {
        if (isTokenValid()) {
          const userData = getUserFromToken(token);
          if (userData) {
            setUser(userData);
          }
        } else {
          // Token süresi dolmuş, refresh token dene
          const refreshed = await refreshToken();
          if (!refreshed) {
            // Refresh token da başarısız, logout yap
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            router.push('/auth/login');
          }
        }
      }
      
      setLoading(false);
    };

    initAuth();
  }, [router]);

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      
      // API'ye login isteği gönder
      const response = await loginUser(email, password);
      
      if (response.isSuccess && response.accessToken && response.refreshToken) {
        // Token'ları localStorage'a kaydet
        localStorage.setItem('accessToken', response.accessToken);
        localStorage.setItem('refreshToken', response.refreshToken);
        
        // Token'dan kullanıcı bilgilerini çıkar
        const userData = getUserFromToken(response.accessToken);
        
        if (userData) {
          setUser(userData);
          
          // Role based routing
          switch (userData.role) {
            case 'super-admin':
              router.push('/admin/dashboard');
              break;
            case 'company-admin':
              router.push('/company-admin/dashboard');
              break;
            case 'employee':
              router.push('/employee/dashboard');
              break;
            case 'unknown':
              throw new Error('Tanımlanmamış kullanıcı rolü. Lütfen sistem yöneticisi ile iletişime geçin.');
            default:
              throw new Error(`Geçersiz kullanıcı rolü: ${userData.role}`);
          }
        } else {
          throw new Error('Kullanıcı bilgileri alınamadı');
        }
      } else {
        throw new Error(response.message || 'Giriş başarısız');
      }
    } catch (error: any) {
      console.error('Login error:', error);
      throw new Error(error.message || 'Giriş sırasında bir hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    router.push('/auth/login');
  };

  const registerCompany = async (companyData: CompanyRegistration) => {
    try {
      const result = await registerCompanyAPI(companyData);
      return result;
    } catch (error: any) {
      throw new Error(error.message || 'Şirket kaydı sırasında bir hata oluştu');
    }
  };

  const addEmployee = async (employeeData: EmployeeRegistration) => {
    // Mock employee registration
    return new Promise<void>((resolve, reject) => {
      if (!user || user.role !== 'company-admin') {
        reject(new Error('Çalışan ekleme yetkisi yok'));
        return;
      }

      setTimeout(() => {
        const newEmployee = {
          id: `emp-${Date.now()}`,
          name: employeeData.name,
          email: employeeData.email,
          role: 'employee',
          companyId: user.companyId,
          companyName: user.companyName,
          position: employeeData.position,
          permissions: employeeData.permissions,
        };
        console.log('Çalışan eklendi:', newEmployee);
        resolve();
      }, 1500);
    });
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      logout, 
      registerCompany, 
      addEmployee,
      loading,
      isTokenValid,
      refreshToken
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};