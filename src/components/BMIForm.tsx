import React, { useState, useEffect } from 'react';
import { FormData } from '../types';

interface BMIFormProps {
  onCalculate: (data: FormData) => void;
  initialData?: FormData;
}

const BMIForm: React.FC<BMIFormProps> = ({ onCalculate, initialData }) => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    gender: 'male',
    height: '',
    weight: '',
    age: '',
    activityLevel: 'sedentary',
    unit: 'metric'
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCalculate(formData);
  };

  const handleUnitChange = (unit: 'metric' | 'imperial') => {
    setFormData(prev => ({ ...prev, unit }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex items-center mb-4">
        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
          <svg className="w-6 h-6 text-blue-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM6 8a6 6 0 1 1 12 0A6 6 0 0 1 6 8zm2 10a3 3 0 0 0-3 3 1 1 0 1 1-2 0 5 5 0 0 1 5-5h8a5 5 0 0 1 5 5 1 1 0 1 1-2 0 3 3 0 0 0-3-3H8z" fill="currentColor" />
          </svg>
        </div>
        <h2 className="text-xl font-semibold">Nhập Thông Tin</h2>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Họ và tên
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Nguyễn Văn A"
            required
          />
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
            Số điện thoại
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="0912345678"
            required
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Giới tính</label>
          <div className="flex space-x-4">
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="gender"
                value="male"
                checked={formData.gender === 'male'}
                onChange={handleChange}
                className="h-4 w-4 text-green-600 focus:ring-green-500"
              />
              <span className="ml-2">Nam</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="gender"
                value="female"
                checked={formData.gender === 'female'}
                onChange={handleChange}
                className="h-4 w-4 text-green-600 focus:ring-green-500"
              />
              <span className="ml-2">Nữ</span>
            </label>
          </div>
        </div>
        <div>
          <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-1">
            Tuổi
          </label>
          <input
            type="number"
            id="age"
            name="age"
            value={formData.age}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="30"
            min="1"
            max="120"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Hệ Đơn Vị</label>
        <div className="inline-flex rounded-md shadow-sm" role="group">
          <button
            type="button"
            className={`px-4 py-2 text-sm font-medium rounded-l-md ${
              formData.unit === 'metric'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            onClick={() => handleUnitChange('metric')}
          >
            Mét
          </button>
          <button
            type="button"
            className={`px-4 py-2 text-sm font-medium rounded-r-md ${
              formData.unit === 'imperial'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            onClick={() => handleUnitChange('imperial')}
          >
            Inch
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="height" className="block text-sm font-medium text-gray-700 mb-1">
            Chiều cao {formData.unit === 'metric' ? '(cm)' : '(inch)'}
          </label>
          <input
            type="number"
            id="height"
            name="height"
            value={formData.height}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder={formData.unit === 'metric' ? '170' : '67'}
            min="1"
            step="any"
            required
          />
        </div>
        <div>
          <label htmlFor="weight" className="block text-sm font-medium text-gray-700 mb-1">
            Cân nặng {formData.unit === 'metric' ? '(kg)' : '(lb)'}
          </label>
          <input
            type="number"
            id="weight"
            name="weight"
            value={formData.weight}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder={formData.unit === 'metric' ? '65' : '143'}
            min="1"
            step="any"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Mức độ hoạt động
        </label>
        <select
          name="activityLevel"
          value={formData.activityLevel}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          required
        >
          <option value="sedentary">Ít vận động (ít hoặc không tập thể dục)</option>
          <option value="light">Vận động nhẹ (Tập thể dục 1 – 3 ngày/tuần)</option>
          <option value="moderate">Vận động vừa phải (Tập thể dục 3 – 5 ngày/tuần)</option>
          <option value="active">Vận động nhiều (Tập thể dục 6 – 7 ngày/tuần)</option>
          <option value="veryActive">Vận động cường độ cao (Tập thể dục 7 ngày/tuần)</option>
        </select>
      </div>

      <button
        type="submit"
        className="w-full py-3 px-4 bg-[#32A949] hover:bg-[#2C9642] text-white font-medium rounded-md transition duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
      >
        Tính BMI
      </button>
    </form>
  );
};

export default BMIForm;