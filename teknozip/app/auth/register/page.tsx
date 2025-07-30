"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { registerCompany } from "@/utils/api";

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    companyName: "",
    email: "", // Şirket emaili eklendi
    phoneNumber: "",
    taxNumber: "",
    industry: "",
    expertiseAreas: "",
    experienceYear: 1, // Varsayılan değer 1 olarak ayarlandı
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
      "companyName",
      "email", // Şirket emaili eklendi
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
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Şirket Kayıt Formu</h1>

      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6">
          <p>{error}</p>
        </div>
      )}

<form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Şirket Bilgileri */}
          <div className="space-y-4">
            <h2 className="font-semibold text-lg">Şirket Bilgileri</h2>

            <div>
              <label className="block mb-1">Şirket Adı*</label>
              <input
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded"
              />
            </div>
            
            <div>
              <label className="block mb-1">Şirket E-posta*</label>
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded"
              />
            </div>
            

            <div>
              <label className="block mb-1">Vergi No*</label>
              <input
                name="taxNumber"
                value={formData.taxNumber}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded"
              />
            </div>

            <div>
              <label className="block mb-1">Sektör*</label>
              <input
                name="industry"
                value={formData.industry}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded"
              />
            </div>

            <div>
              <label className="block mb-1">Uzmanlık Alanları*</label>
              <input
                name="expertiseAreas"
                value={formData.expertiseAreas}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded"
              />
            </div>

            <div>
              <label className="block mb-1">Deneyim Yılı*</label>
              <input
                name="experienceYear"
                type="number"
                min="1"
                value={formData.experienceYear}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded"
              />
            </div>
          </div>

          {/* Adres ve Admin Bilgileri */}
          <div className="space-y-4">
            <h2 className="font-semibold text-lg">Adres Bilgileri</h2>
            <div>
              <label className="block mb-1">Şehir*</label>
              <input
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block mb-1">İlçe*</label>
              <input
                name="district"
                value={formData.district}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block mb-1">Adres Satırı*</label>
              <input
                name="addressLine"
                value={formData.addressLine}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block mb-1">Posta Kodu</label>
              <input
                name="postalCode"
                value={formData.postalCode}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
            </div>
            <h2 className="font-semibold text-lg pt-4">Yönetici Bilgileri</h2>
            <div>
              <label className="block mb-1">Ad*</label>
              <input
                name="adminFirstName"
                value={formData.adminFirstName}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block mb-1">Soyad*</label>
              <input
                name="adminLastName"
                value={formData.adminLastName}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block mb-1">E-posta*</label>
              <input
                name="adminEmail"
                type="email"
                value={formData.adminEmail}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded"
              />
            </div>
            
            <div>
              <label className="block mb-1">Telefon Numarası*</label>
              <input
                name="phoneNumber"
                type="tel"
                value={formData.phoneNumber}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded"
                placeholder="5XXXXXXXXX"
              />
            </div>
            <div>
              <label className="block mb-1">Admin Şifresi*</label>
              <input
                name="adminPassword"
                type="password"
                value={formData.adminPassword}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded"
                placeholder="En az bir büyük harf içermeli"
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {isLoading ? "Kayıt Olunuyor..." : "Kayıt Ol"}
        </button>
      </form>
    </div>
  );
}
