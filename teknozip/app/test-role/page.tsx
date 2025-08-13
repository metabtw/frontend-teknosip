'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';

export default function TestRolePage() {
  const { user } = useAuth();
  const [testResults, setTestResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const testEndpoint = async (endpoint: string, expectedStatus: number) => {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5071/api'}/TestRole/${endpoint}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();
      
      return {
        endpoint,
        status: response.status,
        expectedStatus,
        success: response.status === expectedStatus,
        data: response.ok ? data : data.message || 'Hata oluştu',
        timestamp: new Date().toLocaleTimeString()
      };
    } catch (error) {
      return {
        endpoint,
        status: 0,
        expectedStatus,
        success: false,
        data: `Network Error: ${error}`,
        timestamp: new Date().toLocaleTimeString()
      };
    }
  };

  const runAllTests = async () => {
    setLoading(true);
    setTestResults([]);

    const tests = [
      // Herkese açık endpoint - her zaman 200 dönmeli
      { endpoint: 'public', expectedStatus: 200 },
      
      // Kullanıcı rolüne göre test senaryoları
      ...(user?.role === 'superadmin' ? [
        { endpoint: 'superadmin-only', expectedStatus: 200 },
        { endpoint: 'admin-only', expectedStatus: 200 },
        { endpoint: 'user-access', expectedStatus: 200 }
      ] : []),
      
      ...(user?.role === 'companyadmin' ? [
        { endpoint: 'superadmin-only', expectedStatus: 403 },
        { endpoint: 'admin-only', expectedStatus: 200 },
        { endpoint: 'user-access', expectedStatus: 200 }
      ] : []),
      
      ...(user?.role === 'employee' ? [
        { endpoint: 'superadmin-only', expectedStatus: 403 },
        { endpoint: 'admin-only', expectedStatus: 403 },
        { endpoint: 'user-access', expectedStatus: 200 }
      ] : [])
    ];

    const results = [];
    for (const test of tests) {
      const result = await testEndpoint(test.endpoint, test.expectedStatus);
      results.push(result);
      setTestResults([...results]);
      await new Promise(resolve => setTimeout(resolve, 500)); // Test aralarında kısa bekleme
    }

    setLoading(false);
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Giriş Yapmanız Gerekiyor</h1>
          <p className="text-gray-600">Bu sayfayı görüntülemek için lütfen giriş yapın.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Rol Kontrolü Test Sayfası</h1>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <h2 className="text-lg font-semibold text-blue-800 mb-2">Mevcut Kullanıcı Bilgileri</h2>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div><strong>Email:</strong> {user.email}</div>
              <div><strong>Rol:</strong> <span className="px-2 py-1 bg-blue-100 rounded">{user.role}</span></div>
              <div><strong>ID:</strong> {user.id}</div>
              <div><strong>İsim:</strong> {user.name}</div>
            </div>
          </div>

          <div className="mb-6">
            <button
              onClick={runAllTests}
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-6 py-2 rounded-lg font-medium transition-colors"
            >
              {loading ? 'Testler Çalışıyor...' : 'Rol Kontrolü Testlerini Başlat'}
            </button>
          </div>

          {testResults.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-800">Test Sonuçları</h2>
              
              {testResults.map((result, index) => (
                <div
                  key={index}
                  className={`border rounded-lg p-4 ${
                    result.success 
                      ? 'border-green-200 bg-green-50' 
                      : 'border-red-200 bg-red-50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-gray-800">
                      Endpoint: <code className="bg-gray-100 px-2 py-1 rounded">/api/TestRole/{result.endpoint}</code>
                    </h3>
                    <span className={`px-2 py-1 rounded text-sm font-medium ${
                      result.success 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {result.success ? '✓ BAŞARILI' : '✗ BAŞARISIZ'}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 text-sm text-gray-600 mb-2">
                    <div><strong>Beklenen:</strong> {result.expectedStatus}</div>
                    <div><strong>Alınan:</strong> {result.status}</div>
                    <div><strong>Zaman:</strong> {result.timestamp}</div>
                  </div>
                  
                  <div className="text-sm">
                    <strong>Yanıt:</strong>
                    <pre className="mt-1 p-2 bg-gray-100 rounded text-xs overflow-x-auto">
                      {typeof result.data === 'object' ? JSON.stringify(result.data, null, 2) : result.data}
                    </pre>
                  </div>
                </div>
              ))}
              
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold text-gray-800 mb-2">Test Özeti</h3>
                <div className="text-sm text-gray-600">
                  <div>Toplam Test: {testResults.length}</div>
                  <div className="text-green-600">Başarılı: {testResults.filter(r => r.success).length}</div>
                  <div className="text-red-600">Başarısız: {testResults.filter(r => !r.success).length}</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}