import React, { useState } from 'react';
import BMIForm from './BMIForm';
import BMIResult from './BMIResult';
import { BMIData, FormData } from '../types';
import { calculateBMI } from '../utils/bmiCalculator';

const BMICalculator: React.FC = () => {
  const [bmiData, setBmiData] = useState<BMIData | null>(null);
  const [showResults, setShowResults] = useState(false);

  const handleCalculate = (formData: FormData) => {
    const result = calculateBMI(formData);
    setBmiData(result);
    setShowResults(true);
  };

  const handleReset = () => {
    setBmiData(null);
    setShowResults(false);
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Máy Tính Chỉ Số BMI</h1>
        <p className="text-gray-600 mt-2">
          Tính chỉ số BMI và nhận các khuyến nghị sức khỏe phù hợp
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {!showResults ? (
          <div className="md:col-span-2 bg-white rounded-lg shadow-md p-6">
            <BMIForm onCalculate={handleCalculate} />
          </div>
        ) : (
          <>
            <div className="bg-white rounded-lg shadow-md p-6">
              <BMIForm onCalculate={handleCalculate} initialData={bmiData?.formData} />
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <BMIResult data={bmiData} onReset={handleReset} />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default BMICalculator;