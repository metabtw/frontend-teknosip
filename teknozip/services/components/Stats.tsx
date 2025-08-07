
'use client';

import { useState, useEffect } from 'react';

export default function Stats() {
  const [counts, setCounts] = useState({
    projects: 0,
    companies: 0,
    solutions: 0
  });

  const finalCounts = {
    projects: 247,
    companies: 156,
    solutions: 389
  };

  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const stepDuration = duration / steps;

    const interval = setInterval(() => {
      setCounts(prev => ({
        projects: prev.projects < finalCounts.projects ? 
          Math.min(prev.projects + Math.ceil(finalCounts.projects / steps), finalCounts.projects) : 
          finalCounts.projects,
        companies: prev.companies < finalCounts.companies ? 
          Math.min(prev.companies + Math.ceil(finalCounts.companies / steps), finalCounts.companies) : 
          finalCounts.companies,
        solutions: prev.solutions < finalCounts.solutions ? 
          Math.min(prev.solutions + Math.ceil(finalCounts.solutions / steps), finalCounts.solutions) : 
          finalCounts.solutions
      }));
    }, stepDuration);

    return () => clearInterval(interval);
  }, []);

  const stats = [
    {
      number: counts.projects,
      label: "Aktif Proje",
      icon: "ri-folder-line"
    },
    {
      number: counts.companies,
      label: "Kayıtlı Kurum",
      icon: "ri-building-line"
    },
    {
      number: counts.solutions,
      label: "Sunulan Çözüm",
      icon: "ri-lightbulb-line"
    }
  ];

  return (
    <div className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Platform İstatistikleri
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            TEKNOSİP platformunda gerçekleşen işbirliği ve başarı hikayelerinin sayısal gösterimi
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl p-8 text-center shadow-sm hover:shadow-md transition-shadow">
              <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
                <i className={`${stat.icon} text-2xl text-blue-600`}></i>
              </div>
              <div className="text-4xl font-bold text-gray-900 mb-2">
                {stat.number}
              </div>
              <div className="text-gray-600 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}