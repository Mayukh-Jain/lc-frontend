import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Activity, LineChart, Sprout, Droplets, MessageSquare, ArrowRight, 
  Sun, CloudRain, Wind, TrendingUp, AlertCircle, Calendar 
} from 'lucide-react';

const Home = () => {
  // 1. Mock Data for Widgets (In a real app, fetch this from an API)
  const weatherData = {
    temp: 28,
    condition: "Sunny",
    humidity: 65,
    wind: 12,
    location: "Prayagraj, India"
  };

  const marketRates = [
    { crop: "Wheat", price: "₹2,125/qt", trend: "up" },
    { crop: "Rice", price: "₹2,900/qt", trend: "stable" },
    { crop: "Cotton", price: "₹6,200/qt", trend: "down" },
  ];

  const dailyTip = "💡 Tip: Water your crops early in the morning (6-9 AM) to minimize evaporation and prevent fungal diseases.";

  const features = [
    { 
      title: "Disease Detection", 
      desc: "Upload photo of leaf to detect diseases instantly.", 
      link: "/disease", 
      icon: Activity,
      color: "bg-red-100 text-red-600"
    },
    { 
      title: "Yield Prediction", 
      desc: "Estimate crop production based on weather parameters.", 
      link: "/yield", 
      icon: LineChart,
      color: "bg-blue-100 text-blue-600" 
    },
    { 
      title: "Crop Recommendation", 
      desc: "Find the most suitable crop for your soil type.", 
      link: "/crop", 
      icon: Sprout,
      color: "bg-green-100 text-green-600"
    },
    { 
      title: "Fertilizer Adviser", 
      desc: "Get nutrient recommendations for healthy growth.", 
      link: "/fertilizer", 
      icon: Droplets,
      color: "bg-yellow-100 text-yellow-600"
    },
    { 
      title: "AgroBot AI", 
      desc: "Chat with our expert AI for instant farming advice.", 
      link: "/chat", 
      icon: MessageSquare,
      color: "bg-purple-100 text-purple-600"
    },
  ];

  return (
    <div className="animate-fade-in pb-20">
      
      {/* --- HERO SECTION --- */}
      <div className="bg-agriGreen text-white py-12 px-6 rounded-b-[3rem] shadow-xl relative overflow-hidden">
        <div className="container mx-auto relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
            Welcome to <span className="text-yellow-300">LeafCompass</span>
          </h1>
          <p className="text-lg text-green-100 max-w-2xl mx-auto mb-8">
            Your all-in-one smart farming companion. Diagnose crops, predict yields, and get expert advice instantly.
          </p>
          <div className="flex justify-center gap-4">
            <Link to="/disease" className="bg-white text-agriGreen px-6 py-3 rounded-full font-bold hover:bg-gray-100 transition shadow-lg flex items-center gap-2">
              <Activity size={20} /> Diagnose Now
            </Link>
            <Link to="/chat" className="bg-green-700 text-white border border-green-500 px-6 py-3 rounded-full font-bold hover:bg-green-600 transition flex items-center gap-2">
              <MessageSquare size={20} /> Ask AI
            </Link>
          </div>
        </div>
        
        {/* Background Pattern */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <Sprout size={400} className="absolute -top-20 -left-20" />
          <CloudRain size={300} className="absolute top-20 right-0" />
        </div>
      </div>

      {/* --- DASHBOARD WIDGETS --- */}
      <div className="container mx-auto px-6 -mt-10 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* 1. Weather Card */}
          <div className="bg-white p-6 rounded-2xl shadow-lg border-l-4 border-blue-500 flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-gray-500 text-sm font-semibold flex items-center gap-2">
                  <Sun size={16} className="text-orange-500" /> WEATHER
                </h3>
                <p className="text-2xl font-bold text-gray-800 mt-1">{weatherData.temp}°C</p>
                <p className="text-sm text-gray-500">{weatherData.condition} • {weatherData.location}</p>
              </div>
              <Sun size={40} className="text-yellow-500 animate-pulse" />
            </div>
            <div className="mt-4 flex gap-4 text-sm text-gray-600 bg-blue-50 p-3 rounded-lg">
              <div className="flex items-center gap-1"><Droplets size={14} /> {weatherData.humidity}% Hum</div>
              <div className="flex items-center gap-1"><Wind size={14} /> {weatherData.wind} km/h</div>
            </div>
          </div>

          {/* 2. Farming Tip Card */}
          <div className="bg-white p-6 rounded-2xl shadow-lg border-l-4 border-yellow-500 flex flex-col justify-between">
            <div>
              <h3 className="text-gray-500 text-sm font-semibold flex items-center gap-2">
                <Calendar size={16} className="text-green-600" /> DAILY TIP
              </h3>
              <p className="text-gray-800 font-medium mt-3 italic">
                "{dailyTip}"
              </p>
            </div>
            <Link to="/chat" className="text-agriGreen text-sm font-bold mt-4 flex items-center gap-1 hover:underline">
              Get more tips <ArrowRight size={14} />
            </Link>
          </div>

          {/* 3. Market Rates Card */}
          <div className="bg-white p-6 rounded-2xl shadow-lg border-l-4 border-green-500">
            <h3 className="text-gray-500 text-sm font-semibold flex items-center gap-2 mb-3">
              <TrendingUp size={16} className="text-green-600" /> MARKET RATES
            </h3>
            <div className="space-y-3">
              {marketRates.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center border-b border-gray-100 pb-2 last:border-0 last:pb-0">
                  <span className="font-medium text-gray-700">{item.crop}</span>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-gray-900">{item.price}</span>
                    {item.trend === 'up' && <TrendingUp size={14} className="text-green-500" />}
                    {item.trend === 'down' && <TrendingUp size={14} className="text-red-500 rotate-180" />}
                    {item.trend === 'stable' && <span className="text-gray-400 text-xs">─</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* --- FEATURES GRID --- */}
      <div className="container mx-auto px-6 py-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-8 flex items-center gap-2">
          <AlertCircle size={24} className="text-agriGreen" /> Tools & Services
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, idx) => (
            <Link 
              key={idx} 
              to={feature.link} 
              className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group flex flex-col"
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${feature.color} group-hover:scale-110 transition-transform`}>
                <feature.icon size={24} />
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">{feature.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed mb-4 flex-grow">{feature.desc}</p>
              <div className="text-agriGreen font-semibold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                Try Tool <ArrowRight size={16} />
              </div>
            </Link>
          ))}
        </div>
      </div>

    </div>
  );
};

export default Home;