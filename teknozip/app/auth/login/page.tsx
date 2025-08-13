'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import { useAuth } from '@/context/AuthContext';
import { Icon } from '@iconify/react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
      // Login başarılı, AuthContext otomatik yönlendirme yapacak
    } catch (err: any) {
      setError(err.message || 'Giriş sırasında bir hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main>
      <Header />
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <div className="text-center mb-8">
          <div className="mx-auto bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 mb-4" />
          <h1 className="text-3xl font-bold text-gray-800">TEKNOSİP</h1>
          <p className="text-gray-600 mt-2">Yönetim Paneline Giriş</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="email">
              Email Adresi
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Icon icon="solar:letter-bold" className="text-gray-500" />
              </div>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="email@adresiniz.com"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 mb-2" htmlFor="password">
              Şifre
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Icon icon="solar:lock-password-bold" className="text-gray-500" />
              </div>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                Beni Hatırla
              </label>
            </div>
            <a href="#" className="text-sm text-blue-600 hover:text-blue-800">
              Şifremi Unuttum?
            </a>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-300 flex items-center justify-center"
          >
            {loading ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Giriş Yapılıyor...
              </span>
            ) : (
              'Giriş Yap'
            )}
          </button>
        </form>

        <div className="mt-6 text-center space-y-3">
          <p className="text-gray-600">
            Hesabınız yok mu?
          </p>
          <div className="flex flex-col sm:flex-row gap-2 justify-center">
            <a href="/auth/register" className="text-blue-600 hover:text-blue-800 font-medium px-4 py-2 border border-blue-600 rounded-lg hover:bg-blue-50 transition duration-200">
              Şirket Kaydı
            </a>
            <a href="/auth/register-institution" className="text-green-600 hover:text-green-800 font-medium px-4 py-2 border border-green-600 rounded-lg hover:bg-green-50 transition duration-200">
              Kurum Kaydı
            </a>
          </div>
        </div>
      </div>
      </div>
    </main>
  );
}