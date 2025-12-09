import React from "react";
import PredictionForm from "../components/PredictionForm";
import { recommendCrop } from "../services/api";

const Crop = () => {
  // List of Indian States for the dropdown
  const indianStates = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
    "Andaman and Nicobar Islands",
    "Chandigarh",
    "Dadra and Nagar Haveli",
    "Daman and Diu",
    "Delhi",
    "Lakshadweep",
    "Puducherry",
    "Jammu and Kashmir",
    "Ladakh",
  ];

  const fields = [
    {
      name: "N",
      label: "Nitrogen (N)",
      type: "number",
      placeholder: "e.g. 90",
    },
    {
      name: "P",
      label: "Phosphorus (P)",
      type: "number",
      placeholder: "e.g. 42",
    },
    {
      name: "K",
      label: "Potassium (K)",
      type: "number",
      placeholder: "e.g. 43",
    },
    {
      name: "temperature",
      label: "Temperature (°C)",
      type: "number",
      placeholder: "e.g. 20.8",
    },
    {
      name: "humidity",
      label: "Humidity (%)",
      type: "number",
      placeholder: "e.g. 82",
    },
    { name: "ph", label: "Soil pH", type: "number", placeholder: "e.g. 6.5" },
    {
      name: "rainfall",
      label: "Rainfall (mm)",
      type: "number",
      placeholder: "e.g. 202",
    },

    // Updated State Field -> Dropdown
    {
      name: "state",
      label: "State",
      type: "select",
      options: indianStates,
    },
  ];

  return (
    <PredictionForm
      title="🌱 Crop Recommendation"
      fields={fields}
      onSubmit={recommendCrop}
      resultKey="recommended_crop"
    />
  );
};

export default Crop;
