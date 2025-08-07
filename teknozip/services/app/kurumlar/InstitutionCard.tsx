'use client';

interface InstitutionCardProps {
  id: number;
  name: string;
  type: 'kurum';
  logo: string;
  category: string;
  description: string;
}

export default function InstitutionCard({ name, logo, category, description }: InstitutionCardProps) {
  return (
    <div className="bg-gray-50 rounded-lg shadow-md overflow-hidden border border-gray-200 hover:border-gray-300 transition-all duration-300">
      <div className="p-6">
        <div className="flex items-center justify-center mb-4">
          <img
            src={logo}
            alt={`${name} logo`}
            className="h-16 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-300"
          />
        </div>
        <h3 className="text-xl font-serif text-gray-800 text-center mb-2">{name}</h3>
        <div className="text-sm text-gray-600 font-medium text-center mb-3">{category}</div>
        <p className="text-gray-600 text-sm line-clamp-3">{description}</p>
        <div className="mt-4 flex justify-center">
          <button className="inline-flex items-center px-4 py-2 border border-gray-600 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
            Detayları Gör
          </button>
        </div>
      </div>
    </div>
  );
}