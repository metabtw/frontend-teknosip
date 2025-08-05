"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { registerCompany } from "@/utils/api";
import Header from '@/components/Header';


export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    type: "", // Kurum veya şirket seçimi
    companyName: "",
    email: "",
    phoneNumber: "",
    taxNumber: "",
    industry: "",
    expertiseAreas: "",
    experienceYear: 1,
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "experienceYear" ? parseInt(value) || 0 : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const passwordRegex = /^(?=.*[A-Z]).{6,}$/;
    if (!passwordRegex.test(formData.adminPassword)) {
      setError('Şifre en az bir büyük harf ve minimum 6 karakter olmalıdır');
      return;
    }
  
    // Güncellenmiş zorunlu alan listesi
    const requiredFields = [
      "type",
      "companyName",
      "email",
      "phoneNumber",
      "taxNumber",
      "industry",
      "expertiseAreas",
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
  
    if (formData.experienceYear <= 0) {
      setError("Deneyim yılı 0'dan büyük olmalıdır");
      return;
    }

    setIsLoading(true);
    try {
      const result = await registerCompany(formData);

      if (result?.isSuccess) {
        router.push("/auth/login?registered=true");
      } else {
        setError(
          result?.message ||
            "Kayıt başarısız. Lütfen bilgilerinizi kontrol edin."
        );
      }
    } catch (err: any) {
      console.error("Registration error:", err);
      setError(
        "Sunucuyla iletişim kurulurken bir hata oluştu. Lütfen tekrar deneyin."
      );
    } finally {
      setIsLoading(false);
    }
  };


   
  

  return (
    <form onSubmit={handleSubmit} className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-7xl mx-auto p-6 my-8">
        <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">Şirket Kayıt Formu</h1>
        <div className="max-w-7xl mx-auto">
        <div className="space-y-12">
          {/* Şirket Bilgileri */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4 pb-2 border-b border-gray-200 text-gray-700 col-span-full">Kuruluş Bilgileri</h2>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">Kuruluş Tipi*</label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                required
                className="w-full p-3 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200"
              >
                <option value="">Kuruluş tipini seçin</option>
                <option value="şirket">Şirket/Firma</option>
                <option value="kurum">Kurum</option>
              </select>
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">{formData.type === "kurum" ? "Kurum" : "Şirket"} Adı*</label>
              <input
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                required
                className="w-full p-3 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200"
              />
            </div>
            
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">Şirket E-posta*</label>
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
              <label className="block mb-2 text-sm font-medium text-gray-700">Vergi No*</label>
              <input
                name="taxNumber"
                value={formData.taxNumber}
                onChange={handleChange}
                required
                className="w-full p-3 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">Sektör*</label>
              <input
                name="industry"
                value={formData.industry}
                onChange={handleChange}
                required
                className="w-full p-3 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">Uzmanlık Alanları*</label>
              <input
                name="expertiseAreas"
                value={formData.expertiseAreas}
                onChange={handleChange}
                required
                className="w-full p-3 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">Deneyim Yılı*</label>
              <input
                name="experienceYear"
                type="number"
                min="1"
                value={formData.experienceYear}
                onChange={handleChange}
                required
                className="w-full p-3 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200"
              />
            </div>
          </div>
          {/* Adres ve Admin Bilgileri */}
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
              <label className="block mb-2 text-sm font-medium text-gray-700">Admin Şifresi*</label>
              <input
                name="adminPassword"
                type="password"
                value={formData.adminPassword}
                onChange={handleChange}
                required
                className="w-full p-3 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200"
                placeholder="En az bir büyük harf içermeli"
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 flex items-center justify-center text-lg font-semibold transition-colors duration-200 mt-8"
        >
          {isLoading ? "Kayıt Olunuyor..." : "Kayıt Ol"}
        </button>
        </div>
      </div>
    </form>
  );
}
