
'use client';

import Link from 'next/link';
import { Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="text-2xl font-bold text-white mb-4">
              TEKNOSİP
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Kurumsal işbirliği platformu olarak, KOSGEB destekli projeler ve şirketler arası 
              çözüm ortaklıklarını bir araya getiriyoruz. Teknolojik yeniliklerin ve iş dünyasının 
              buluşma noktası.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <div className="w-6 h-6 flex items-center justify-center">
                  <Facebook className={cn("w-6", "h-6")} />
                </div>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <div className="w-6 h-6 flex items-center justify-center">
                  <Twitter className={cn("w-6", "h-6")} />
                </div>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <div className="w-6 h-6 flex items-center justify-center">
                  <Linkedin className={cn("w-6", "h-6")} />
                </div>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <div className="w-6 h-6 flex items-center justify-center">
                  <Instagram className={cn("w-6", "h-6")} />
                </div>
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Hızlı Linkler</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/projeler" className="text-gray-400 hover:text-white transition-colors">
                  Projeler
                </Link>
              </li>
              <li>
                <Link href="/sorunlar" className="text-gray-400 hover:text-white transition-colors">
                  Sorunlar
                </Link>
              </li>
              <li>
                <Link href="/cozumler" className="text-gray-400 hover:text-white transition-colors">
                  Çözümler
                </Link>
              </li>
              <li>
                <Link href="/kurumlar" className="text-gray-400 hover:text-white transition-colors">
                  Kurumlar
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">İletişim</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-5 h-5 flex items-center justify-center">
                  <i className="ri-map-pin-line text-blue-400"></i>
                </div>
                <span className="text-gray-400 text-sm">
                  Maslak, İstanbul, Türkiye
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-5 h-5 flex items-center justify-center">
                  <i className="ri-phone-line text-blue-400"></i>
                </div>
                <span className="text-gray-400 text-sm">
                  +90 (212) 123 45 67
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-5 h-5 flex items-center justify-center">
                  <i className="ri-mail-line text-blue-400"></i>
                </div>
                <span className="text-gray-400 text-sm">
                  info@teknosip.com
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-400 text-sm">
            © 2024 TEKNOSİP. Tüm hakları saklıdır.
          </div>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/gizlilik-politikasi" className="text-gray-400 hover:text-white transition-colors text-sm">
              Gizlilik Politikası
            </Link>
            <Link href="/kullanim-kosullari" className="text-gray-400 hover:text-white transition-colors text-sm">
              Kullanım Koşulları
            </Link>
            <Link href="/cerez-politikasi" className="text-gray-400 hover:text-white transition-colors text-sm">
              Çerez Politikası
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}