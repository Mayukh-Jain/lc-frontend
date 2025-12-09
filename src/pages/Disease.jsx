import React, { useState } from 'react';
import { Upload, AlertCircle, CheckCircle } from 'lucide-react';
import { predictDisease } from '../services/api';

const Disease = () => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
    setResult(null);
  };

  const handleSubmit = async () => {
    if (!image) return;
    setLoading(true);
    const formData = new FormData();
    formData.append('file', image);

    try {
      const { data } = await predictDisease(formData);
      setResult(data);
    } catch (err) {
      console.error(err);
      alert("Prediction failed.");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        🍃 Plant Disease Detection
      </h2>

      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:bg-gray-50 transition relative">
        <input 
          type="file" 
          onChange={handleFileChange} 
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          accept="image/*"
        />
        {preview ? (
          <img src={preview} alt="Preview" className="max-h-64 mx-auto rounded-md shadow-sm" />
        ) : (
          <div className="text-gray-500">
            <Upload className="mx-auto h-12 w-12 text-gray-400 mb-3" />
            <p>Click or Drag image to upload</p>
          </div>
        )}
      </div>

      <button 
        onClick={handleSubmit} 
        disabled={loading || !image}
        className="w-full mt-6 bg-agriGreen text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition disabled:opacity-50"
      >
        {loading ? "Scanning..." : "Analyze Plant"}
      </button>

      {result && (
        <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
          <h3 className="text-lg font-bold text-green-800 flex items-center gap-2">
            <CheckCircle size={20} /> Analysis Result
          </h3>
          <p className="mt-2 text-gray-700">Disease: <span className="font-bold text-lg">{result.class}</span></p>
          <p className="text-sm text-gray-500">Confidence: {(result.confidence * 100).toFixed(2)}%</p>
        </div>
      )}
    </div>
  );
};

export default Disease;