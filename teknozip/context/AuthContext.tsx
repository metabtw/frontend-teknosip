'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';

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
  registerCompany: (companyData: CompanyRegistration) => Promise<void>;
  addEmployee: (employeeData: EmployeeRegistration) => Promise<void>;
  loading: boolean;
};

type CompanyRegistration = {
  name: string;
  email: string;
  password: string;
  companyName: string;
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

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser) as User;
      setUser(parsedUser);
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    // Mock API call
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        const mockUsers = [
          {
            id: '1',
            name: 'Super Admin',
            email: 'admin@example.com',
            role: 'super-admin',
          },
          {
            id: '2',
            name: 'Company Admin',
            email: 'company@example.com',
            role: 'company-admin',
            companyId: 'comp-123',
            companyName: 'Technology Solutions Inc.',
            status: 'approved'
          },
          {
            id: '3',
            name: 'Employee',
            email: 'employee@example.com',
            role: 'employee',
            companyId: 'comp-123',
            companyName: 'Technology Solutions Inc.',
            position: 'Software Developer',
            permissions: ['task_view', 'task_update']
          }
        ];

        const foundUser = mockUsers.find(
          u => u.email === email && password === 'password123'
        );

        if (foundUser) {
          setUser({...foundUser});
          localStorage.setItem('user', JSON.stringify(foundUser));
          
          // Role based routing
          switch (foundUser.role) {
            case 'super-admin':
              router.push('/admin/dashboard');
              break;
            case 'company-admin':
              if (foundUser.status === 'approved') {
                router.push('/company-admin/dashboard');
              } else {
                reject(new Error('Şirket hesabınız henüz onaylanmamış'));
                return;
              }
              break;
            case 'employee':
              router.push('/employee/dashboard');
              break;
            default:
              reject(new Error('Geçersiz kullanıcı rolü'));
              return;
          }
          
          resolve();
        } else {
          reject(new Error('Geçersiz e-posta veya şifre'));
        }
      }, 1000);
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    router.push('/auth/login');
  };

  const registerCompany = async (companyData: CompanyRegistration) => {
    // Mock registration
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        // Şirket kaydı oluştur (pending statüsünde)
        const newCompany = {
          id: `comp-${Date.now()}`,
          name: companyData.name,
          email: companyData.email,
          role: 'company-admin',
          companyName: companyData.companyName,
          status: 'pending',
        };
        console.log('Şirket kaydı oluşturuldu (onay bekliyor):', newCompany);
        resolve();
      }, 1500);
    });
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
      loading 
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