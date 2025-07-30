'use client';
import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';

const Announcements = () => {
  const { user } = useAuth();
  const [announcements, setAnnouncements] = useState([
    { id: 1, title: 'Yeni İş İlanı', description: 'Açık Pozisyonlar' },
    { id: 2, title: 'Stajyer Aranıyor', description: 'Yaz Stajı' },
  ]);

  const handleAddAnnouncement = () => {
    // Yeni ilan ekleme mantığı buraya gelecek
    alert('Yeni ilan eklendi!');
  };

  const handleEditAnnouncement = (id: number) => {
    // İlan düzenleme mantığı buraya gelecek
    alert(`İlan ${id} düzenleniyor.`);
  };

  const handleDeleteAnnouncement = (id: number) => {
    // İlan silme mantığı buraya gelecek
    alert(`İlan ${id} silindi.`);
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4">İlan Yönetimi</h2>
      <div className="mb-4">
        <button
          onClick={handleAddAnnouncement}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Yeni İlan Ekle
        </button>
      </div>
      <table className="w-full table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Başlık</th>
            <th className="px-4 py-2">Açıklama</th>
            <th className="px-4 py-2">İşlemler</th>
          </tr>
        </thead>
        <tbody>
          {announcements.map((announcement) => (
            <tr key={announcement.id}>
              <td className="border px-4 py-2">{announcement.id}</td>
              <td className="border px-4 py-2">{announcement.title}</td>
              <td className="border px-4 py-2">{announcement.description}</td>
              <td className="border px-4 py-2">
                <button
                  onClick={() => handleEditAnnouncement(announcement.id)}
                  className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                >
                  Düzenle
                </button>
                <button
                  onClick={() => handleDeleteAnnouncement(announcement.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Sil
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Announcements;