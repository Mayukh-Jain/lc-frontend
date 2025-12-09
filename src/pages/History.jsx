import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { Clock, Database } from 'lucide-react';

const History = () => {
  const [history, setHistory] = useState([]);
  const { token } = useContext(AuthContext);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await axios.get('http://localhost:8000/history', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setHistory(res.data);
      } catch (err) {
        console.error("Failed to fetch history");
      }
    };
    if (token) fetchHistory();
  }, [token]);

  if (!token) return <div className="text-center mt-20">Please login to view history.</div>;

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <Clock /> Prediction History
      </h2>
      <div className="grid gap-4">
        {history.map((item) => (
          <div key={item.id} className="bg-white p-4 rounded-lg shadow border-l-4 border-agriGreen">
            <div className="flex justify-between">
              <span className="font-bold text-lg">{item.prediction_type}</span>
              <span className="text-gray-500 text-sm">{new Date(item.timestamp).toLocaleDateString()}</span>
            </div>
            <div className="mt-2 text-sm text-gray-600">
              <p><strong>Result:</strong> {JSON.stringify(item.result)}</p>
              <details className="mt-1 cursor-pointer text-blue-600">
                <summary>View Inputs</summary>
                <pre className="text-xs text-gray-800 bg-gray-100 p-2 rounded mt-1">
                  {JSON.stringify(item.input_data, null, 2)}
                </pre>
              </details>
            </div>
          </div>
        ))}
        {history.length === 0 && <p>No history found.</p>}
      </div>
    </div>
  );
};

export default History;