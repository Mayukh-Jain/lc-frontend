import React from "react";
import PredictionForm from "../components/PredictionForm";
import { predictYield } from "../services/api";

const Yield = () => {
  const fields = [
    {
      name: "Rainfall_mm",
      label: "Rainfall (mm)",
      type: "number",
      placeholder: "e.g. 120",
    },
    {
      name: "Temperature_Celsius",
      label: "Temperature (°C)",
      type: "number",
      placeholder: "e.g. 30",
    },
    {
      name: "Days_to_Harvest",
      label: "Days to Harvest",
      type: "number",
      placeholder: "e.g. 90",
    },
    {
      name: "Region",
      label: "Region",
      type: "select",
      options: ["North", "South", "East", "West", "Central"],
    },
    {
      name: "Soil_Type",
      label: "Soil Type",
      type: "select",
      options: ["Clay", "Sandy", "Loam", "Silt", "Peaty", "Chalky", "Black"],
    },
    {
      name: "Crop",
      label: "Crop",
      type: "select",
      options: [
        "Wheat",
        "Rice",
        "Maize",
        "Barley",
        "Cotton",
        "Sugarcane",
        "Potato",
        "Tomato",
        "Onion",
        "Soybean",
      ],
    },
    {
      name: "Weather_Condition",
      label: "Weather Condition",
      type: "select",
      options: ["Sunny", "Rainy", "Cloudy", "Stormy"],
    },
    {
      name: "Fertilizer_Used",
      label: "Fertilizer Used?",
      type: "select",
      options: ["True", "False"],
    },
    {
      name: "Irrigation_Used",
      label: "Irrigation Used?",
      type: "select",
      options: ["True", "False"],
    },
  ];

  return (
    <PredictionForm
      title="🌾 Crop Yield Prediction"
      fields={fields}
      onSubmit={predictYield}
      resultKey="predicted_yield"
      unit="kg/ha" // <--- Added Unit Here
    />
  );
};

export default Yield;
