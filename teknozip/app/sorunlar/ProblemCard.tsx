'use client';

import Link from 'next/link';

export default function ProblemCard({ problem }) {
  const getUrgencyColor = (urgency) => {
    switch(urgency) {
      case 'Acil': return 'bg-red-100 text-red-800';
      case 'Orta': return 'bg-yellow-100 text-yellow-800';
      case 'Normal': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('tr-TR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
      <div className="relative">
        <img 
          src={problem.image} 
          alt={problem.title}
          className="w-full h-48 object-cover object-top"
        />
        <div className="absolute top-4 left-4">
          <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getUrgencyColor(problem.urgency)}`}>
            {problem.urgency}
          </span>
        </div>
        <div className="absolute top-4 right-4">
          <span className="bg-white bg-opacity-90 text-gray-800 px-2 py-1 text-xs font-medium rounded-full">
            {problem.category}
          </span>
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
            {problem.title}
          </h3>
        </div>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {problem.description}
        </p>

        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-500">
            <div className="w-4 h-4 flex items-center justify-center mr-2">
              <i className="ri-building-line"></i>
            </div>
            <span>{problem.company}</span>
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <div className="w-4 h-4 flex items-center justify-center mr-2">
              <i className="ri-map-pin-line"></i>
            </div>
            <span>{problem.location}</span>
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <div className="w-4 h-4 flex items-center justify-center mr-2">
              <i className="ri-money-dollar-circle-line"></i>
            </div>
            <span>{problem.budget}</span>
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <div className="w-4 h-4 flex items-center justify-center mr-2">
              <i className="ri-calendar-line"></i>
            </div>
            <span>Son Tarih: {formatDate(problem.deadline)}</span>
          </div>
        </div>

        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            {problem.skills.slice(0, 3).map((skill, index) => (
              <span 
                key={index}
                className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
              >
                {skill}
              </span>
            ))}
            {problem.skills.length > 3 && (
              <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                +{problem.skills.length - 3} daha
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500">
            {formatDate(problem.createdAt)}
          </span>
          <div className="flex space-x-2">
            <button className="p-2 text-gray-400 hover:text-red-500 transition-colors">
              <div className="w-4 h-4 flex items-center justify-center">
                <i className="ri-heart-line"></i>
              </div>
            </button>
            <Link 
              href={`/sorunlar/${problem.id}`}
              className="px-4 py-2 bg-red-600 text-white text-sm rounded-md hover:bg-red-700 transition-colors whitespace-nowrap"
            >
              Detaylar
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}