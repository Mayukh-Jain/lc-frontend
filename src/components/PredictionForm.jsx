import React, { useState } from 'react';

const PredictionForm = ({ title, fields, onSubmit, resultKey, unit }) => { // <--- Added 'unit' prop
  const [formData, setFormData] = useState({});
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); // Added error state handling

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);
    
    try {
      const { data } = await onSubmit(formData);
      
      // Check if backend sent an error message
      if (data.error) {
        setError(data.error);
      } else {
        setResult(data);
      }
    } catch (err) {
      console.error(err);
      setError("Failed to connect to server.");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-8 bg-white rounded-2xl shadow-xl">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2 border-gray-100">{title}</h2>
      
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {fields.map((field) => (
          <div key={field.name} className={field.fullWidth ? "md:col-span-2" : ""}>
            <label className="block text-sm font-medium text-gray-600 mb-1">{field.label}</label>
            {field.type === 'select' ? (
              <select name={field.name} onChange={handleChange} className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-green-500 bg-gray-50" required>
                <option value="">Select {field.label}</option>
                {field.options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
              </select>
            ) : (
              <input
                type={field.type}
                name={field.name}
                step="any"
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-green-500 bg-gray-50"
                onChange={handleChange}
                placeholder={field.placeholder || ""}
                required={field.required !== false}
              />
            )}
          </div>
        ))}
        
        <button type="submit" className="md:col-span-2 bg-agriGreen text-white py-3 rounded-lg font-bold hover:bg-green-700 transition shadow-md" disabled={loading}>
          {loading ? "Calculating..." : "Predict"}
        </button>
      </form>

      {/* Error Message Display */}
      {error && (
        <div className="mt-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
          <strong>Error:</strong> {error}
        </div>
      )}

      {/* Result Display */}
      {result && (
        <div className="mt-8 p-6 bg-agriLight rounded-xl text-center border border-green-200 animate-fade-in">
          <p className="text-gray-500 uppercase text-xs tracking-wider font-bold">Prediction Result</p>
          <div className="text-3xl font-extrabold text-agriGreen mt-2 flex justify-center items-baseline gap-2">
            <span>{result[resultKey] || JSON.stringify(result)}</span>
            {unit && <span className="text-lg text-gray-600 font-medium">{unit}</span>} {/* <--- Shows unit here */}
          </div>
        </div>
      )}
    </div>
  );
};

export default PredictionForm;