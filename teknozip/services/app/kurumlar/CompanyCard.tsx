'use client';

export default function CompanyCard({ company }) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
            <img
              src={company.logo}
              alt={company.name}
              className="w-full h-full object-contain"
            />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{company.name}</h3>
            <p className="text-gray-600 text-sm">{company.sector}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          <span className="text-sm text-gray-600">Aktif</span>
        </div>
      </div>
      
      <p className="text-gray-700 text-sm mb-4 line-clamp-2">
        {company.description}
      </p>
      
      <div className="space-y-3 mb-4">
        <div className="flex items-center text-sm text-gray-600">
          <i className="ri-building-line w-4 h-4 flex items-center justify-center mr-2"></i>
          <span>{company.size} çalışan</span>
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <i className="ri-map-pin-line w-4 h-4 flex items-center justify-center mr-2"></i>
          <span>{company.location}</span>
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <i className="ri-calendar-line w-4 h-4 flex items-center justify-center mr-2"></i>
          <span>{company.foundedYear} yılından beri</span>
        </div>
      </div>
      
      <div className="mb-4">
        <p className="text-sm text-gray-600 mb-2">Uzmanlık Alanları:</p>
        <div className="flex flex-wrap gap-2">
          {company.expertise.slice(0, 3).map((skill, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full"
            >
              {skill}
            </span>
          ))}
          {company.expertise.length > 3 && (
            <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
              +{company.expertise.length - 3} daha
            </span>
          )}
        </div>
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4 text-sm text-gray-600">
          <div className="flex items-center">
            <i className="ri-briefcase-line w-4 h-4 flex items-center justify-center mr-1"></i>
            <span>{company.projectCount} proje</span>
          </div>
          <div className="flex items-center">
            <i className="ri-star-line w-4 h-4 flex items-center justify-center mr-1"></i>
            <span>{company.rating}</span>
          </div>
        </div>
        <button className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors whitespace-nowrap">
          Profili Gör
        </button>
      </div>
    </div>
  );
}