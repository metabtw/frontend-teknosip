'use client';

import Link from 'next/link';

export default function SolutionCard({ solution }) {
  const getServiceTypeColor = (serviceType) => {
    switch(serviceType) {
      case 'Tam Hizmet': return 'bg-blue-100 text-blue-800';
      case 'Danışmanlık': return 'bg-green-100 text-green-800';
      case 'Geliştirme': return 'bg-purple-100 text-purple-800';
      case 'Teknik Destek': return 'bg-orange-100 text-orange-800';
      case 'Eğitim': return 'bg-indigo-100 text-indigo-800';
      case 'Sistem Entegrasyonu': return 'bg-teal-100 text-teal-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCompanySizeIcon = (size) => {
    if (size?.includes('1-10')) return 'ri-team-line';
    if (size?.includes('11-50')) return 'ri-group-line';
    if (size?.includes('51-200')) return 'ri-building-line';
    if (size?.includes('201-1000')) return 'ri-building-2-line';
    if (size?.includes('1000+')) return 'ri-building-4-line';
    return 'ri-building-line';
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
      <div className="relative">
        <img 
          src={solution.image} 
          alt={solution.title}
          className="w-full h-48 object-cover object-top"
        />
        <div className="absolute top-4 left-4">
          <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getServiceTypeColor(solution.serviceType)}`}>
            {solution.serviceType}
          </span>
        </div>
        <div className="absolute top-4 right-4">
          <span className="bg-white bg-opacity-90 text-gray-800 px-2 py-1 text-xs font-medium rounded-full">
            {solution.category}
          </span>
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
            {solution.title}
          </h3>
        </div>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {solution.description}
        </p>

        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-500">
            <div className="w-4 h-4 flex items-center justify-center mr-2">
              <i className="ri-building-line"></i>
            </div>
            <span className="font-medium">{solution.company}</span>
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <div className="w-4 h-4 flex items-center justify-center mr-2">
              <i className={getCompanySizeIcon(solution.companySize)}></i>
            </div>
            <span>{solution.companySize}</span>
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <div className="w-4 h-4 flex items-center justify-center mr-2">
              <i className="ri-time-line"></i>
            </div>
            <span>Teslim: {solution.timeline}</span>
          </div>
          {solution.budget && (
            <div className="flex items-center text-sm text-gray-500">
              <div className="w-4 h-4 flex items-center justify-center mr-2">
                <i className="ri-money-dollar-circle-line"></i>
              </div>
              <span>{solution.budget}</span>
            </div>
          )}
        </div>

        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            {solution.technologies.slice(0, 3).map((tech, index) => (
              <span 
                key={index}
                className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
              >
                {tech}
              </span>
            ))}
            {solution.technologies.length > 3 && (
              <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                +{solution.technologies.length - 3} daha
              </span>
            )}
          </div>
        </div>

        <div className="mb-4">
          <p className="text-xs text-gray-500 mb-2">Hedef Sektörler:</p>
          <div className="flex flex-wrap gap-1">
            {solution.targetSectors.slice(0, 4).map((sector, index) => (
              <span 
                key={index}
                className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full"
              >
                {sector}
              </span>
            ))}
            {solution.targetSectors.length > 4 && (
              <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                +{solution.targetSectors.length - 4}
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500">
            {new Date(solution.createdAt).toLocaleDateString('tr-TR', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </span>
          <div className="flex space-x-2">
            <button className="p-2 text-gray-400 hover:text-blue-500 transition-colors">
              <div className="w-4 h-4 flex items-center justify-center">
                <i className="ri-bookmark-line"></i>
              </div>
            </button>
            <Link 
              href={`/cozumler/${solution.id}`}
              className="px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors whitespace-nowrap"
            >
              Detaylar
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}