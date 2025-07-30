'use client';

import Link from 'next/link';

export default function ForbiddenPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-red-600 mb-4">403 - Erişim Reddedildi</h1>
        <p className="text-lg text-gray-600 mb-8">
          Bu sayfayı görüntülemek için gerekli izinlere sahip değilsiniz.
        </p>
        <Link href="/" className="text-blue-600 hover:underline">
          Anasayfaya Dön
        </Link>
      </div>
    </div>
  );
}