'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Icon } from '@iconify/react';

interface OrganizationCardProps {
  id: string;
  logo: string;
  name: string;
  sector: string;
  status: 'active' | 'inactive';
  employeeCount: number;
  city: string;
  foundedYear: number;
  expertise: string[];
  projectCount: number;
  rating: number;
  type: 'company' | 'institution';
}

export default function OrganizationCard({
  id,
  logo,
  name,
  sector,
  status,
  employeeCount,
  city,
  foundedYear,
  expertise,
  projectCount,
  rating,
  type
}: OrganizationCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border hover:shadow-md transition-shadow">
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="relative w-12 h-12">
              <Image
                src={logo}
                alt={`${name} logo`}
                fill
                className="object-contain"
              />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">{name}</h3>
              <p className="text-sm text-gray-600">{sector}</p>
            </div>
          </div>
          <span 
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              status === 'active' 
                ? 'bg-green-100 text-green-800'
                : 'bg-gray-100 text-gray-800'
            }`}
          >
            {status === 'active' ? 'Aktif' : 'Pasif'}
          </span>
        </div>

        <div className="space-y-3 mb-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Icon icon="solar:users-group-rounded-linear" className="w-5 h-5" />
            <span>{employeeCount} Çalışan</span>
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Icon icon="solar:map-point-linear" className="w-5 h-5" />
            <span>{city}</span>
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Icon icon="solar:calendar-linear" className="w-5 h-5" />
            <span>{foundedYear} yılında kuruldu</span>
          </div>
        </div>

        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            {expertise.map((skill, index) => (
              <span 
                key={index}
                className="px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Icon icon="solar:folder-with-files-linear" className="w-5 h-5 text-gray-600" />
              <span className="text-sm text-gray-600">{projectCount} proje</span>
            </div>
            <div className="flex items-center gap-1">
              <Icon icon="solar:star-bold" className="w-5 h-5 text-yellow-400" />
              <span className="text-sm text-gray-600">{rating.toFixed(1)}</span>
            </div>
          </div>
          
          <Link
            href={`/${type === 'company' ? 'sirketler' : 'kurumlar'}/${id}`}
            className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
          >
            Profil Gör
          </Link>
        </div>
      </div>
    </div>
  );
}