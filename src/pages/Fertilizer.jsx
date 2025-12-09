import React from 'react';
import PredictionForm from '../components/PredictionForm';
import { recommendFertilizer } from '../services/api';

const Fertilizer = () => {
  const fields = [
    { name: 'Temperature', label: 'Temperature (°C)', type: 'number' },
    { name: 'Humidity', label: 'Humidity (%)', type: 'number' },
    { name: 'Moisture', label: 'Soil Moisture', type: 'number' },
    { 
      name: 'Soil_Type', 
      label: 'Soil Type', 
      type: 'select', 
      options: ['Sandy', 'Loamy', 'Black', 'Red', 'Clayey'] 
    },
    { 
      name: 'Crop_Type', 
      label: 'Crop Type', 
      type: 'select', 
      options: ['Maize', 'Sugarcane', 'Cotton', 'Tobacco', 'Paddy', 'Barley', 'Wheat', 'Millets', 'Oil seeds', 'Pulses', 'Ground Nuts'] 
    },
    { name: 'Nitrogen', label: 'Nitrogen (N)', type: 'number' },
    { name: 'Phosphorous', label: 'Phosphorous (P)', type: 'number' },
    { name: 'Potassium', label: 'Potassium (K)', type: 'number' },
  ];

  return (
    <PredictionForm 
      title="🧪 Fertilizer Recommendation" 
      fields={fields} 
      onSubmit={recommendFertilizer} 
      resultKey="recommended_fertilizer" 
    />
  );
};

export default Fertilizer;