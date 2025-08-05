'use client';

interface CompanyCardProps {
  id: number;
  name: string;
  type: 'şirket';
  logo: string;
  sector: string;
  description: string;
}

export default function CompanyCard({ name, logo, sector, description }: CompanyCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1">
      <div className="p-6">
        <div className="flex items-center justify-center mb-4">
          <img
            src={logo}
            alt={`${name} logo`}
            className="h-16 w-auto object-contain"
          />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 text-center mb-2">{name}</h3>
        <div className="text-sm text-blue-600 font-medium text-center mb-3">{sector}</div>
        <p className="text-gray-600 text-sm line-clamp-3">{description}</p>
        <div className="mt-4 flex justify-center">
          <button className="inline-flex items-center px-4 py-2 border border-blue-600 text-sm font-medium rounded-md text-blue-600 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            Detayları Gör
          </button>
        </div>
      </div>
    </div>
  );
}