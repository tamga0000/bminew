import React from 'react';
import { BMICategory } from '../types';

interface HealthRecommendationsProps {
  category: BMICategory;
  activityLevel: string;
}

const HealthRecommendations: React.FC<HealthRecommendationsProps> = ({ 
  category, 
  activityLevel 
}) => {
  // Recommendations based on BMI category and activity level
  const getRecommendations = (): string[] => {
    const baseRecommendations = [
      'Tham khảo ý kiến bác sĩ để xây dựng kế hoạch quản lý cân nặng an toàn'
    ];

    if (activityLevel === 'sedentary' || activityLevel === 'light') {
      baseRecommendations.push('Tăng dần hoạt động thể chất theo khả năng');
    }

    baseRecommendations.push('Tập trung vào thực phẩm lành mạnh và giảm thực phẩm chế biến sẵn');
    baseRecommendations.push('Cân nhắc tìm kiếm sự hỗ trợ từ chuyên gia dinh dưỡng');
    baseRecommendations.push('Theo dõi các chỉ số sức khỏe như huyết áp và đường huyết');

    const specificRecommendations: { [key in BMICategory]: string[] } = {
      underweight: [
        'Tăng cường tiêu thụ protein và carbohydrate lành mạnh',
        'Xây dựng cơ bắp thông qua bài tập sức mạnh phù hợp',
        'Ăn nhiều bữa nhỏ trong ngày thay vì 3 bữa lớn'
      ],
      normal: [
        'Duy trì chế độ ăn uống cân bằng và đa dạng',
        'Tiếp tục duy trì hoạt động thể chất đều đặn',
        'Tập trung vào việc duy trì sức khỏe tổng thể'
      ],
      overweight: [
        'Giảm lượng calories tiêu thụ một cách từ từ và an toàn',
        'Tập luyện cardio kết hợp với bài tập sức mạnh',
        'Hạn chế thực phẩm có đường và chất béo bão hòa'
      ],
      obese: [
        'Xây dựng kế hoạch giảm cân dài hạn với sự hướng dẫn của chuyên gia',
        'Tăng dần hoạt động thể chất, bắt đầu từ đi bộ',
        'Kiểm tra sức khỏe định kỳ để theo dõi các yếu tố rủi ro liên quan đến béo phì'
      ]
    };

    return [...baseRecommendations, ...specificRecommendations[category]];
  };

  const recommendations = getRecommendations();

  return (
    <div className="mt-6">
      <div className="flex items-center mb-4">
        <div className="w-6 h-6 text-blue-500 mr-2">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
          </svg>
        </div>
        <h3 className="text-lg font-semibold">Khuyến Nghị Sức Khỏe</h3>
      </div>
      
      <div className="space-y-3">
        {recommendations.map((recommendation, index) => (
          <div key={index} className="flex border-l-4 border-blue-200 bg-blue-50 pl-3 py-2 rounded">
            <div className="mr-3 text-blue-500 font-bold">{index + 1}</div>
            <p className="text-sm text-gray-700">{recommendation}</p>
          </div>
        ))}
      </div>
      
      <p className="text-xs text-gray-500 italic mt-4">
        Lưu ý: Đây chỉ là những khuyến nghị chung. Vui lòng tham khảo ý kiến của chuyên gia y tế để có lời khuyến phù hợp với bạn.
      </p>
    </div>
  );
};

export default HealthRecommendations;