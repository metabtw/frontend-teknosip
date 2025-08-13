"use client";

  import { useState } from "react";
  import { useRouter } from "next/navigation";
  import { registerInstitution } from "@/utils/api";
  import Header from '@/components/Header';

  export default function RegisterInstitutionPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
      institutionName: "",
      email: "",
      phoneNumber: "",
      website: "",
      type: 0, // University
      institutionCode: "",
      officialTitle: "",
      authorityName: "",
      authorityTitle: "",
      adminFirstName: "",
      adminLastName: "",
      adminEmail: "",
      adminPassword: "",
      city: "",
      district: "",
      addressLine: "",
      postalCode: "",
    });
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    const institutionTypes = [
      { value: 0, label: "Üniversite" },
      { value: 1, label: "Belediye" },
      { value: 2, label: "Devlet Kurumu" },
      { value: 3, label: "Kamu Kurumu" },
      { value: 4, label: "Diğer" }
    ];

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]: name === "type" ? parseInt(value) || 0 : value,
      }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setError(null);

      const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{6,}$/;
      if (!passwordRegex.test(formData.adminPassword)) {
        setError('Şifre en az bir büyük harf, bir özel karakter ve minimum 6 karakter olmalıdır');
        return;
      }
    
      // Zorunlu alan listesi
      const requiredFields = [
        "institutionName",
        "email",
        "phoneNumber",
        "officialTitle",
        "authorityName",
        "authorityTitle",
        "adminFirstName",
        "adminLastName",
        "adminEmail",
        "adminPassword",
        "city",
        "district",
        "addressLine"
      ];
    
      const missingFields = requiredFields.filter(
        (field) => !formData[field as keyof typeof formData]
      );
    
      if (missingFields.length > 0) {
        setError(`Zorunlu alanlar eksik: ${missingFields.join(", ")}`);
        return;
      }

      setIsLoading(true);
      try {
        const result = await registerInstitution(formData);

        if (result?.isSuccess) {
          setShowSuccessModal(true);
        } else {
          setError(
            result?.message ||
              "Kayıt başarısız. Lütfen bilgilerinizi kontrol edin."
          );
        }
      } catch (err: any) {
        console.error("Institution registration error:", err);
        setError(
          "Sunucuyla iletişim kurulurken bir hata oluştu. Lütfen tekrar deneyin."
        );
      } finally {
        setIsLoading(false);
      }
    };

    const handleModalClose = () => {
      setShowSuccessModal(false);
      router.push("/auth/login");
    };

    return (
      <>
        <form onSubmit={handleSubmit} className="min-h-screen bg-gray-50">
          <Header />
        <div className="max-w-7xl mx-auto p-6 my-8">
          <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">Kurum Kayıt Formu</h1>
          
          {error && (
            <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
              {error}
            </div>
          )}
          
          <div className="max-w-7xl mx-auto">
            <div className="space-y-12">
              {/* Kurum Bilgileri */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 bg-white p-6 rounded-lg shadow-sm">
                <h2 className="text-xl font-semibold mb-4 pb-2 border-b border-gray-200 text-gray-700 col-span-full">Kurum Bilgileri</h2>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Kurum Adı*</label>
                  <input
                    name="institutionName"
                    value={formData.institutionName}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200"
                  />
                </div>
                
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Kurum E-posta*</label>
                  <input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200"
                  />
                </div>
                
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Telefon Numarası*</label>
                  <input
                    name="phoneNumber"
                    type="tel"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200"
                    placeholder="5XXXXXXXXX"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Web Sitesi</label>
                  <input
                    name="website"
                    type="url"
                    value={formData.website}
                    onChange={handleChange}
                    className="w-full p-3 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200"
                    placeholder="https://example.com"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Kurum Türü*</label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200"
                  >
                    {institutionTypes.map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Kurum Kodu</label>
                  <input
                    name="institutionCode"
                    value={formData.institutionCode}
                    onChange={handleChange}
                    className="w-full p-3 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200"
                    placeholder="YÖK Kodu, Belediye Kodu vb."
                  />
                </div>

                <div className="col-span-full">
                  <label className="block mb-2 text-sm font-medium text-gray-700">Resmi Unvan*</label>
                  <input
                    name="officialTitle"
                    value={formData.officialTitle}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200"
                    placeholder="T.C. Ankara Üniversitesi, T.C. Çankaya Belediyesi vb."
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Yetkili Adı*</label>
                  <input
                    name="authorityName"
                    value={formData.authorityName}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200"
                    placeholder="Rektör, Başkan, Vali adı"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Yetkili Unvanı*</label>
                  <input
                    name="authorityTitle"
                    value={formData.authorityTitle}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200"
                    placeholder="Rektör, Belediye Başkanı, Vali vb."
                  />
                </div>
              </div>

              {/* Adres Bilgileri */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 bg-white p-6 rounded-lg shadow-sm">
                <h2 className="text-xl font-semibold mb-4 pb-2 border-b border-gray-200 text-gray-700 col-span-full">Adres Bilgileri</h2>
                
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Şehir*</label>
                  <input
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200"
                  />
                </div>
                
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">İlçe*</label>
                  <input
                    name="district"
                    value={formData.district}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200"
                  />
                </div>
                
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Adres Satırı*</label>
                  <input
                    name="addressLine"
                    value={formData.addressLine}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200"
                  />
                </div>
                
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Posta Kodu</label>
                  <input
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleChange}
                    className="w-full p-3 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200"
                  />
                </div>
              </div>

              {/* Yönetici Bilgileri */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 bg-white p-6 rounded-lg shadow-sm">
                <h2 className="text-xl font-semibold mb-4 pb-2 border-b border-gray-200 text-gray-700 col-span-full">Yönetici Bilgileri</h2>
                
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Ad*</label>
                  <input
                    name="adminFirstName"
                    value={formData.adminFirstName}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200"
                  />
                </div>
                
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Soyad*</label>
                  <input
                    name="adminLastName"
                    value={formData.adminLastName}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200"
                  />
                </div>
                
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">E-posta*</label>
                  <input
                    name="adminEmail"
                    type="email"
                    value={formData.adminEmail}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200"
                  />
                </div>
                
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Admin Şifresi*</label>
                  <input
                    name="adminPassword"
                    type="password"
                    value={formData.adminPassword}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200"
                    placeholder="En az bir büyük harf ve özel karakter içermeli"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 flex items-center justify-center text-lg font-semibold transition-colors duration-200 mt-8"
            >
              {isLoading ? "Kaydediliyor..." : "Kurum Kaydı Yap"}
            </button>
          </div>
        </div>
        </form>

        {/* Başarı Modalı */}
        {showSuccessModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
              <div className="text-center">
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
                  <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Kayıt Başarılı!</h3>
                <p className="text-sm text-gray-500 mb-6">
                  Kurum kaydınız başarıyla alınmıştır. Süper admin tarafından onaylandıktan sonra sisteme giriş yapabileceksiniz.
                </p>
                <button
                  onClick={handleModalClose}
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Tamam
                </button>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }