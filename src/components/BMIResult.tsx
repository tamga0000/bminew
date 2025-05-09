import React from 'react';
import { BMIData, BMICategory } from '../types';
import HealthRecommendations from './HealthRecommendations';

interface BMIResultProps {
  data: BMIData | null;
  onReset: () => void;
}

const BMIResult: React.FC<BMIResultProps> = ({ data, onReset }) => {
  if (!data) return null;

  const { bmi, category, adjustedBmi } = data;

  // BMI scale colors
  const getColorForCategory = (cat: BMICategory): string => {
    switch (cat) {
      case 'underweight':
        return 'bg-blue-500';
      case 'normal':
        return 'bg-green-500';
      case 'overweight':
        return 'bg-yellow-500';
      case 'obese':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  // Calculate position on scale (0-100%)
  const getBmiPosition = (bmiValue: number): string => {
    // Clamp between 10 and 40 for display purposes
    const clampedBmi = Math.max(10, Math.min(bmiValue, 40));
    const position = ((clampedBmi - 10) / 30) * 100;
    return `${position}%`;
  };

  const getCategoryText = (cat: BMICategory): string => {
    switch (cat) {
      case 'underweight':
        return 'Thiếu cân';
      case 'normal':
        return 'Bình thường';
      case 'overweight':
        return 'Thừa cân';
      case 'obese':
        return 'Béo phì';
      default:
        return '';
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex items-center mb-4">
        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
          <svg className="w-6 h-6 text-blue-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm0 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16zm1-11h-2v6h2V9zm0-4h-2v2h2V5z" fill="currentColor" />
          </svg>
        </div>
        <h2 className="text-xl font-semibold">Kết Quả BMI Của Bạn</h2>
      </div>

      <div className="text-center">
        <div className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-gradient-to-r from-red-400 to-red-600 text-white">
          <div>
            <div className="text-4xl font-bold">{adjustedBmi.toFixed(1)}</div>
            <div className="text-sm mt-1">{getCategoryText(category)}</div>
          </div>
        </div>
        <p className="mt-3 text-sm text-gray-600">
          Dựa trên chiều cao và cân nặng của bạn
        </p>
      </div>

      <div className="mt-6">
        <p className="font-medium mb-2">Thang Đo BMI</p>
        <div className="h-8 flex rounded-md overflow-hidden">
          <div className="flex-1 bg-blue-500 relative" title="Thiếu cân">
            <span className="absolute inset-0 flex items-center justify-center text-xs text-white font-medium">
              Thiếu cân
            </span>
          </div>
          <div className="flex-1 bg-green-500 relative" title="Bình thường">
            <span className="absolute inset-0 flex items-center justify-center text-xs text-white font-medium">
              Bình thường
            </span>
          </div>
          <div className="flex-1 bg-yellow-500 relative" title="Thừa cân">
            <span className="absolute inset-0 flex items-center justify-center text-xs text-white font-medium">
              Thừa cân
            </span>
          </div>
          <div className="flex-1 bg-red-500 relative" title="Béo phì">
            <span className="absolute inset-0 flex items-center justify-center text-xs text-white font-medium">
              Béo phì
            </span>
          </div>
        </div>
        <div className="flex justify-between text-xs text-gray-600 mt-1">
          <span>10</span>
          <span>18.5</span>
          <span>25</span>
          <span>30</span>
          <span>40</span>
        </div>
        <div className="relative h-6 mt-1">
          <div 
            className="absolute w-4 h-4 bg-white border-2 border-gray-800 rounded-full transform -translate-x-1/2 top-0"
            style={{ left: getBmiPosition(adjustedBmi) }}
          >
            <div className="absolute top-full mt-1 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-1 py-0.5 rounded">
              {adjustedBmi.toFixed(1)}
            </div>
          </div>
        </div>
      </div>

      <HealthRecommendations category={category} activityLevel={data.formData.activityLevel} />
    </div>
  );
};

export default BMIResult;