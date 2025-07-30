'use client';
import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';

const Employees = () => {
  const { user } = useAuth();
  const [employees, setEmployees] = useState([
    { id: 1, name: 'Ahmet Yılmaz', email: 'ahmet@example.com', role: 'Yönetici' },
    { id: 2, name: 'Mehmet Öztürk', email: 'mehmet@example.com', role: 'Üst düzey yönetici' },
  ]);

  const handleAddEmployee = () => {
    // Yeni çalışan ekleme mantığı buraya gelecek
    alert('Yeni çalışan eklendi!');
  };

  const handleEditEmployee = (id: number) => {
    // Çalışan düzenleme mantığı buraya gelecek
    alert(`Çalışan ${id} düzenleniyor.`);
  };

  const handleDeleteEmployee = (id: number) => {
    // Çalışan silme mantığı buraya gelecek
    alert(`Çalışan ${id} silindi.`);
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4">Çalışan Yönetimi</h2>
      <div className="mb-4">
        <button
          onClick={handleAddEmployee}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Yeni Çalışan Ekle
        </button>
      </div>
      <table className="w-full table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">İsim</th>
            <th className="px-4 py-2">E-posta</th>
            <th className="px-4 py-2">Görev</th>
            <th className="px-4 py-2">İşlemler</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td className="border px-4 py-2">{employee.id}</td>
              <td className="border px-4 py-2">{employee.name}</td>
              <td className="border px-4 py-2">{employee.email}</td>
              <td className="border px-4 py-2">{employee.role}</td>
              <td className="border px-4 py-2">
                <button
                  onClick={() => handleEditEmployee(employee.id)}
                  className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                >
                  Düzenle
                </button>
                <button
                  onClick={() => handleDeleteEmployee(employee.id)}
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

export default Employees;