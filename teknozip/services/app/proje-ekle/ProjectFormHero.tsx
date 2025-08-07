'use client';

export default function ProjectFormHero() {
  return (
    <div className="relative bg-gradient-to-br from-blue-50 to-indigo-100 py-16">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-10"
        style={{
          backgroundImage: `url('https://readdy.ai/api/search-image?query=modern%20business%20professional%20working%20on%20computer%20with%20project%20documents%2C%20office%20environment%20with%20charts%20and%20graphs%2C%20corporate%20workspace%20with%20innovative%20technology%2C%20clean%20minimalist%20design%2C%20professional%20project%20management%20setting%2C%20bright%20natural%20lighting%2C%20contemporary%20office%20furniture&width=1920&height=800&seq=project-form-hero&orientation=landscape')`
        }}
      ></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Projenizi <span className="text-blue-600">Paylaşın</span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            KOSGEB destekli projenizi platforma ekleyin ve işbirliği ortakları bulun. 
            Projenizi detaylarıyla paylaşarak sektörünüzde güçlü bağlantılar kurun.
          </p>
          
          <div className="flex items-center justify-center space-x-8 text-sm text-gray-600">
            <div className="flex items-center space-x-2">
              <div className="w-5 h-5 flex items-center justify-center">
                <i className="ri-shield-check-line text-blue-600"></i>
              </div>
              <span>Güvenli Platform</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-5 h-5 flex items-center justify-center">
                <i className="ri-eye-line text-blue-600"></i>
              </div>
              <span>Geniş Görünürlük</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-5 h-5 flex items-center justify-center">
                <i className="ri-handshake-line text-blue-600"></i>
              </div>
              <span>Hızlı Eşleşme</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}