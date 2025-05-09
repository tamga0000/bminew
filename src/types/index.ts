export type BMICategory = 'underweight' | 'normal' | 'overweight' | 'obese';

export interface FormData {
  name: string;
  phone: string;
  gender: string;
  height: string;
  weight: string;
  age: string;
  activityLevel: string;
  unit: 'metric' | 'imperial';
}

export interface BMIData {
  bmi: number;
  adjustedBmi: number;
  category: BMICategory;
  formData: FormData;
}