'use client';

import * as React from 'react';
import Link from 'next/link';
import { Building2, Users, Star } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function MainHero() {
  return (
    <div className={cn("bg-gradient-to-r", "from-purple-900", "to-indigo-900", "text-white", "py-16")}>
      <div className={cn("max-w-7xl", "mx-auto", "px-4", "sm:px-6", "lg:px-8")}>
        <div className={cn("text-center")}>
          <h1 className={cn("text-4xl", "md:text-5xl", "font-bold", "mb-6")}>
            Kurumlar Arası Destek Ağı ve İşbirliği Platformu
          </h1>
          <p className={cn("text-lg", "md:text-xl", "text-gray-200", "mb-8", "max-w-3xl", "mx-auto")}>
            Üniversite-sanayi iş birliği projeleri ve KOSGEB TÜBİTAK ortak projeler için
            Türkiye'nin en kapsamlı platformu.
          </p>
          
          <div className={cn("mt-10", "flex", "flex-wrap", "justify-center", "gap-4")}>
            <Link 
              href="/projeler" 
              className={cn("bg-white", "text-purple-600", "px-8", "py-3", "rounded-lg", "font-semibold", "hover:bg-purple-100", "transition-colors", "whitespace-nowrap")}
            >
              Projeleri İncele
            </Link>
            <Link 
              href="/cozumler" 
              className={cn("border-2", "border-white", "text-white", "px-8", "py-3", "rounded-lg", "font-semibold", "hover:bg-white", "hover:text-purple-600", "transition-colors", "whitespace-nowrap")}
            >
              Çözümleri Gör
            </Link>
          </div>

          <div className={cn("grid", "grid-cols-1", "md:grid-cols-3", "gap-8", "max-w-4xl", "mx-auto", "mt-16")}>
            <div className={cn("text-center")}>
              <div className={cn("w-16 h-16 flex items-center justify-center mx-auto mb-4 bg-white bg-opacity-20 rounded-full")}>
                <Building2 className={cn("w-8", "h-8")} />
              </div>
              <h3 className={cn("text-lg", "font-semibold", "mb-2")}>500+ Kurum</h3>
              <p className={cn("text-purple-100", "text-sm")}>
                Farklı sektörlerden güvenilir kurumlar
              </p>
            </div>
            
            <div className={cn("text-center")}>
              <div className={cn("w-16 h-16 flex items-center justify-center mx-auto mb-4 bg-white bg-opacity-20 rounded-full")}>
                <Users className={cn("w-8", "h-8")} />
              </div>
              <h3 className={cn("text-lg", "font-semibold", "mb-2")}>1000+ Ortaklık</h3>
              <p className={cn("text-purple-100", "text-sm")}>
                Başarılı proje ortaklıkları
              </p>
            </div>

            <div className={cn("text-center")}>
              <div className={cn("w-16 h-16 flex items-center justify-center mx-auto mb-4 bg-white bg-opacity-20 rounded-full")}>
                <Star className={cn("w-8", "h-8")} />
              </div>
              <h3 className={cn("text-lg", "font-semibold", "mb-2")}>%95 Başarı</h3>
              <p className={cn("text-purple-100", "text-sm")}>
                Tamamlanan projelerde başarı oranı
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}