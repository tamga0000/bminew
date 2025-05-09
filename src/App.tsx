import React from 'react';
import BMICalculator from './components/BMICalculator';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <BMICalculator />
      </div>
    </div>
  );
}

export default App;