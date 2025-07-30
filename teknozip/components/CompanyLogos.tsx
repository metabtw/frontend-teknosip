
'use client';

import { useEffect, useState } from 'react';

export default function CompanyLogos() {
  const [currentTransform, setCurrentTransform] = useState(0);

  const companies = [
    {
      name: "TechCorp Solutions",
      logo: "https://readdy.ai/api/search-image?query=modern%20technology%20company%20logo%20design%2C%20minimalist%20corporate%20brand%20identity%2C%20clean%20professional%20tech%20logo%2C%20blue%20and%20white%20color%20scheme%2C%20simple%20geometric%20shapes%2C%20contemporary%20business%20logo&width=120&height=60&seq=company-1&orientation=landscape"
    },
    {
      name: "InnovateTech",
      logo: "https://readdy.ai/api/search-image?query=innovative%20technology%20startup%20logo%2C%20modern%20digital%20company%20branding%2C%20sleek%20professional%20logo%20design%2C%20geometric%20abstract%20shapes%2C%20corporate%20identity%20design%2C%20clean%20minimalist%20style&width=120&height=60&seq=company-2&orientation=landscape"
    },
    {
      name: "FutureSoft",
      logo: "https://readdy.ai/api/search-image?query=software%20development%20company%20logo%2C%20modern%20tech%20brand%20identity%2C%20professional%20corporate%20logo%20design%2C%20clean%20contemporary%20style%2C%20blue%20gradient%20colors%2C%20minimalist%20geometric%20design&width=120&height=60&seq=company-3&orientation=landscape"
    },
    {
      name: "SmartSolutions",
      logo: "https://readdy.ai/api/search-image?query=smart%20solutions%20company%20logo%2C%20modern%20business%20brand%20identity%2C%20clean%20professional%20corporate%20logo%2C%20minimalist%20design%20style%2C%20contemporary%20geometric%20shapes%2C%20blue%20and%20gray%20colors&width=120&height=60&seq=company-4&orientation=landscape"
    },
    {
      name: "DataFlow Systems",
      logo: "https://readdy.ai/api/search-image?query=data%20systems%20company%20logo%2C%20modern%20corporate%20brand%20identity%2C%20professional%20tech%20logo%20design%2C%20clean%20minimalist%20style%2C%20contemporary%20geometric%20design%2C%20blue%20corporate%20colors&width=120&height=60&seq=company-5&orientation=landscape"
    },
    {
      name: "CloudTech",
      logo: "https://readdy.ai/api/search-image?query=cloud%20technology%20company%20logo%2C%20modern%20digital%20brand%20identity%2C%20professional%20corporate%20logo%20design%2C%20clean%20contemporary%20style%2C%20minimalist%20geometric%20shapes%2C%20blue%20and%20white%20colors&width=120&height=60&seq=company-6&orientation=landscape"
    },
    {
      name: "NextGen Industries",
      logo: "https://readdy.ai/api/search-image?query=next%20generation%20industrial%20company%20logo%2C%20modern%20corporate%20brand%20identity%2C%20professional%20business%20logo%20design%2C%20clean%20minimalist%20style%2C%20contemporary%20geometric%20design%2C%20blue%20industrial%20colors&width=120&height=60&seq=company-7&orientation=landscape"
    },
    {
      name: "Advanced Analytics",
      logo: "https://readdy.ai/api/search-image?query=analytics%20company%20logo%20design%2C%20modern%20data%20company%20branding%2C%20professional%20corporate%20logo%2C%20clean%20minimalist%20style%2C%20contemporary%20geometric%20shapes%2C%20blue%20and%20green%20colors&width=120&height=60&seq=company-8&orientation=landscape"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTransform(prev => prev - 1);
    }, 50);

    return () => clearInterval(interval);
  }, []);

  const resetTransform = () => {
    setCurrentTransform(0);
  };

  return (
    <div className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Kayıtlı Kurumlar
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Platformumuza güvenen ve aktif olarak işbirliği yapan kurumlar
          </p>
        </div>

        <div className="overflow-hidden">
          <div 
            className="flex items-center space-x-12 transition-transform duration-1000 ease-linear"
            style={{ 
              transform: `translateX(${currentTransform}px)`,
              width: `${companies.length * 200}px`
            }}
            onTransitionEnd={() => {
              if (currentTransform <= -200) {
                resetTransform();
              }
            }}
          >
            {[...companies, ...companies].map((company, index) => (
              <div
                key={`${company.name}-${index}`}
                className="flex-shrink-0 w-48 h-24 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow flex items-center justify-center p-4"
              >
                <img
                  src={company.logo}
                  alt={company.name}
                  className="max-w-full max-h-full object-contain opacity-70 hover:opacity-100 transition-opacity"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}