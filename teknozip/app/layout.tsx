'use client';

import type { Metadata } from "next";
import { Geist, Geist_Mono, Pacifico } from "next/font/google";
import "./globals.css";
import { AuthProvider } from '@/context/AuthContext';
import 'iconify-icon/dist/iconify-icon.min.js';
import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

const pacifico = Pacifico({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-pacifico',
})

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Route değişimini izle
  }, [pathname, searchParams]);

  return (
    <html lang="tr">
      <body className="w-full">
        <AuthProvider>
          <LoadingSpinner />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
