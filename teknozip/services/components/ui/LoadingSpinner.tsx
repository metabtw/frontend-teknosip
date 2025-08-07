'use client';

import { useEffect, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

const LOADING_DELAY = 2000; // 2 saniye simülasyon süresi

export default function LoadingSpinner() {
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Sayfa değişiminde loading'i aktifleştir
    setIsLoading(true);

    // Simülasyon için gecikme
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, LOADING_DELAY);

    // Cleanup
    return () => clearTimeout(timer);
  }, [pathname, searchParams]);

  if (!isLoading) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm dark:bg-black/70 transition-opacity duration-300"
      role="alert"
      aria-live="polite"
    >
      <div className="relative flex flex-col items-center bg-white p-8 rounded-xl shadow-2xl dark:bg-gray-800 transform transition-transform duration-300">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500 dark:border-blue-400"></div>
        <p className="mt-4 text-sm text-gray-600 dark:text-gray-300 animate-pulse">Yükleniyor...</p>
      </div>
    </div>
  );
}