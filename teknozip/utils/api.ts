const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5071/api';

import { AuthResponse } from '@/types/response';

export const loginUser = async (email: string, password: string): Promise<AuthResponse> => {
  try {
    const response = await fetch(`${BASE_URL}/Auth/Login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();
    
    // Hata durumunu kontrol et
    if (!response.ok) {
      throw new Error(data.message || 'Giriş başarısız');
    }

    // Yeni yanıt formatına göre düzenleme
    const formattedResponse: AuthResponse = {
      isSuccess: data.isSuccess,
      message: data.message,
      accessToken: data.data.accessToken, // data.Token yerine data.data
      refreshToken: data.data.refreshToken // data.Token yerine data.data
    };

    if (!formattedResponse.accessToken || !formattedResponse.refreshToken) {
      throw new Error("Eksik token bilgisi");
    }

    return formattedResponse;
  } catch (error: any) {
    console.error('Login error:', error);
    throw new Error(error.message || 'Sunucu hatası oluştu. Lütfen tekrar deneyin.');
  }
};

export const registerCompany = async (formData: any) => {
  try {
    const payload = {
      companyName: formData.companyName,
      email: formData.email, // Şirket emaili
      phoneNumber: formData.phoneNumber,
      taxNumber: formData.taxNumber,
      industry: formData.industry,
      expertiseAreas: formData.expertiseAreas,
      experienceYear: Number(formData.experienceYear),
      adminFirstName: formData.adminFirstName,
      adminLastName: formData.adminLastName,
      adminEmail: formData.adminEmail,
      adminPassword: formData.adminPassword,
      city: formData.city,
      district: formData.district,
      addressLine: formData.addressLine,
      postalCode: formData.postalCode
    };

    console.log("Gönderilen veri:", payload);

    const response = await fetch(`${BASE_URL}/Auth/register-Company`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const errorData = await response.json();
      if (errorData?.errors) {
        const errorMessages = Object.entries(errorData.errors)
          .map(([key, values]) => {
            const valueStr = Array.isArray(values) ? values.join(', ') : String(values);
            return `${key}: ${valueStr}`;
          })
          .join('\n');
        throw new Error(errorMessages);
      }
      throw new Error(errorData?.message || 'Kayıt başarısız');
    }

    return { isSuccess: true };
  } catch (error: any) {
    console.error('Registration error:', error);
    return { 
      isSuccess: false, 
      message: error.message || 'Kayıt sırasında bir hata oluştu' 
    };
  }
};

export const registerInstitution = async (formData: any) => {
  try {
    const payload = {
      IntitutionName: formData.institutionName,
      email: formData.email,
      phoneNumber: formData.phoneNumber,
      website: formData.website,
      type: Number(formData.type),
      institutionCode: formData.institutionCode,
      officialTitle: formData.officialTitle,
      authorityName: formData.authorityName,
      authorityTitle: formData.authorityTitle,
      adminFirstName: formData.adminFirstName,
      adminLastName: formData.adminLastName,
      adminEmail: formData.adminEmail,
      adminPassword: formData.adminPassword,
      city: formData.city,
      district: formData.district,
      addressLine: formData.addressLine,
      postalCode: formData.postalCode
    };

    console.log("Gönderilen kurum verisi:", payload);

    const response = await fetch(`${BASE_URL}/auth/register-Institution`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const errorData = await response.json();
      if (errorData?.errors) {
        const errorMessages = Object.entries(errorData.errors)
          .map(([key, values]) => {
            const valueStr = Array.isArray(values) ? values.join(', ') : String(values);
            return `${key}: ${valueStr}`;
          })
          .join('\n');
        throw new Error(errorMessages);
      }
      throw new Error(errorData?.message || 'Kurum kaydı başarısız');
    }

    return { isSuccess: true };
  } catch (error: any) {
    console.error('Institution registration error:', error);
    return { 
      isSuccess: false, 
      message: error.message || 'Kurum kaydı sırasında bir hata oluştu' 
    };
  }
};

// Süper Admin için şirket onaylama
export const approveCompany = async (companyId: string, token: string) => {
  try {
    const response = await fetch(`${BASE_URL}/Companies/${companyId}/approve`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Şirket onaylanamadı');
    }

    return { isSuccess: true, data };
  } catch (error: any) {
    console.error('Approve company error:', error);
    throw new Error(error.message || 'Şirket onaylanırken hata oluştu');
  }
};

// Süper Admin için şirket reddetme
export const rejectCompany = async (companyId: string, token: string) => {
  try {
    const response = await fetch(`${BASE_URL}/Companies/${companyId}/reject`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Şirket reddedilemedi');
    }

    return { isSuccess: true, data };
  } catch (error: any) {
    console.error('Reject company error:', error);
    throw new Error(error.message || 'Şirket reddedilirken hata oluştu');
  }
};

// Süper Admin için bekleyen şirketleri getirme
export const getPendingCompanies = async (token: string) => {
  try {
    const response = await fetch(`${BASE_URL}/Companies/pending`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Bekleyen şirketler getirilemedi');
    }

    return { isSuccess: true, data: data.data || data };
  } catch (error: any) {
    console.error('Get pending companies error:', error);
    throw new Error(error.message || 'Bekleyen şirketler alınırken hata oluştu');
  }
};

// Süper Admin için aktif şirketleri getirme
export const getActiveCompanies = async (token: string) => {
  try {
    const response = await fetch(`${BASE_URL}/Companies/active`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Aktif şirketler getirilemedi');
    }

    return { isSuccess: true, data: data.data || data };
  } catch (error: any) {
    console.error('Get active companies error:', error);
    throw new Error(error.message || 'Aktif şirketler alınırken hata oluştu');
  }
};

// Süper Admin için tüm ilanları getirme
export const getAllJobs = async (token: string) => {
  try {
    const response = await fetch(`${BASE_URL}/Jobs/all`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'İlanlar getirilemedi');
    }

    return { isSuccess: true, data: data.data || data };
  } catch (error: any) {
    console.error('Get all jobs error:', error);
    throw new Error(error.message || 'İlanlar alınırken hata oluştu');
  }
};

// Süper Admin için ilan silme
export const deleteJob = async (jobId: string, token: string) => {
  try {
    const response = await fetch(`${BASE_URL}/Jobs/${jobId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'İlan silinemedi');
    }

    return { isSuccess: true, data };
  } catch (error: any) {
    console.error('Delete job error:', error);
    throw new Error(error.message || 'İlan silinirken hata oluştu');
  }
};

// Süper Admin için kullanıcı bilgilerini getirme
export const getUserProfile = async (token: string) => {
  try {
    const response = await fetch(`${BASE_URL}/Auth/profile`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Profil bilgileri getirilemedi');
    }

    return { isSuccess: true, data: data.data || data };
  } catch (error: any) {
    console.error('Get profile error:', error);
    throw new Error(error.message || 'Profil bilgileri alınırken hata oluştu');
  }
};

// Token refresh fonksiyonu
export const refreshToken = async (refreshToken: string) => {
  try {
    const response = await fetch(`${BASE_URL}/Auth/refresh-token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ refreshToken })
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Token yenilenemedi');
    }

    return {
      isSuccess: true,
      accessToken: data.data.accessToken,
      refreshToken: data.data.refreshToken
    };
  } catch (error: any) {
    console.error('Refresh token error:', error);
    throw new Error(error.message || 'Token yenilenirken hata oluştu');
  }
};

// Şirket detaylarını getirme
export const getCompanyDetails = async (companyId: string, token: string) => {
  try {
    const response = await fetch(`${BASE_URL}/Companies/${companyId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Şirket detayları getirilemedi');
    }

    return { isSuccess: true, data: data.data || data };
  } catch (error: any) {
    console.error('Get company details error:', error);
    throw new Error(error.message || 'Şirket detayları alınırken hata oluştu');
  }
};

// Şirket istatistiklerini getirme
export const getCompanyStats = async (token: string) => {
  try {
    const response = await fetch(`${BASE_URL}/Companies/stats`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Şirket istatistikleri getirilemedi');
    }

    return { isSuccess: true, data: data.data || data };
  } catch (error: any) {
    console.error('Get company stats error:', error);
    throw new Error(error.message || 'Şirket istatistikleri alınırken hata oluştu');
  }
};

// Şirket profilini güncelleme
export const updateCompanyProfile = async (
  token: string,
  data: {
    companyName?: string;
    contactPerson?: string;
    email?: string;
    password?: string;
  }
) => {
  try {
    const response = await fetch(`${BASE_URL}/Companies/update-profile`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(data)
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || 'Profil güncellenemedi');
    }

    return { isSuccess: true, data: result.data || result };
  } catch (error: any) {
    console.error('Update profile error:', error);
    throw new Error(error.message || 'Profil güncellenirken bir hata oluştu');
  }
};