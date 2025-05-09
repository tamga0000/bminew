import { FormData, BMIData, BMICategory } from '../types';

// Calculate standard BMI
const calculateStandardBMI = (weight: number, height: number): number => {
  // Height in meters (convert from cm)
  const heightInMeters = height / 100;
  return weight / (heightInMeters * heightInMeters);
};

// Calculate BMI with imperial units
const calculateImperialBMI = (weight: number, height: number): number => {
  // Formula: (weight in pounds * 703) / (height in inches)^2
  return (weight * 703) / (height * height);
};

// Determine BMI category
const getBMICategory = (bmi: number): BMICategory => {
  if (bmi < 18.5) return 'underweight';
  if (bmi < 25) return 'normal';
  if (bmi < 30) return 'overweight';
  return 'obese';
};

// Adjust BMI based on gender, age and activity level
const adjustBMI = (
  standardBmi: number,
  gender: string,
  age: number,
  activityLevel: string
): number => {
  let adjustedBmi = standardBmi;

  // Gender adjustment (women typically have higher body fat %)
  if (gender === 'female') {
    adjustedBmi *= 0.95; // Slight downward adjustment for women
  }

  // Age adjustment (as we age, BMI interpretation changes)
  if (age > 65) {
    adjustedBmi *= 0.95; // Older adults can have slightly higher BMI
  }

  // Activity level adjustment
  const activityAdjustment: Record<string, number> = {
    sedentary: 1.05, // Sedentary people may have higher body fat at same BMI
    light: 1.02,
    moderate: 1.0, // Reference point
    active: 0.98,
    veryActive: 0.95 // Very active people may have more muscle mass
  };

  adjustedBmi *= activityAdjustment[activityLevel] || 1;

  return adjustedBmi;
};

export const calculateBMI = (formData: FormData): BMIData => {
  const { 
    weight: weightStr, 
    height: heightStr, 
    gender, 
    age: ageStr, 
    activityLevel, 
    unit 
  } = formData;

  const weight = parseFloat(weightStr);
  const height = parseFloat(heightStr);
  const age = parseInt(ageStr, 10);

  // Calculate standard BMI based on unit system
  let standardBmi: number;
  if (unit === 'metric') {
    standardBmi = calculateStandardBMI(weight, height);
  } else {
    standardBmi = calculateImperialBMI(weight, height);
  }

  // Get BMI category
  const category = getBMICategory(standardBmi);

  // Adjust BMI based on other factors
  const adjustedBmi = adjustBMI(standardBmi, gender, age, activityLevel);

  return {
    bmi: standardBmi,
    adjustedBmi,
    category,
    formData
  };
};