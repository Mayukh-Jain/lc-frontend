import React from 'react';
import { 
  Sprout, 
  MessageSquare, 
  Leaf, 
  Menu,
  X,
  Camera,
  BarChart3,
  TestTube2
} from 'lucide-react';

const Navbar = ({ activeTab, setActiveTab, apiKey, setApiKey, isSidebarOpen, setIsSidebarOpen }) => {
  return (
    <nav className="bg-green-800 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center cursor-pointer" onClick={() => setActiveTab('home')}>
            <Sprout className="h-8 w-8 text-green-300 mr-2" />
            <span className="font-bold text-xl tracking-tight">AgriSmart AI</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-1">
            {[
              { id: 'crop', label: 'Crop Rec', icon: <Leaf className="w-4 h-4" /> },
              { id: 'yield', label: 'Yield Pred', icon: <BarChart3 className="w-4 h-4" /> },
              { id: 'fertilizer', label: 'Fertilizer', icon: <TestTube2 className="w-4 h-4" /> },
              { id: 'detect', label: 'Disease', icon: <Camera className="w-4 h-4" /> },
              { id: 'chat', label: 'Chatbot', icon: <MessageSquare className="w-4 h-4" /> },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center space-x-1 ${
                  activeTab === item.id ? 'bg-green-900 text-white' : 'text-green-100 hover:bg-green-700'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <div className="hidden md:block">
              <input 
                type="password" 
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="Gemini API Key" 
                className="bg-green-900/50 border border-green-600 text-white placeholder-green-300/50 text-xs px-2 py-1 rounded w-32 focus:w-48 transition-all outline-none"
              />
            </div>
            <button className="md:hidden p-2" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
              {isSidebarOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {isSidebarOpen && (
        <div className="md:hidden bg-green-900 p-4 space-y-2">
          {['home', 'crop', 'yield', 'fertilizer', 'detect', 'chat'].map((tab) => (
            <button 
              key={tab}
              onClick={() => { setActiveTab(tab); setIsSidebarOpen(false); }}
              className="block w-full text-left px-4 py-2 hover:bg-green-800 rounded capitalize"
            >
              {tab}
            </button>
          ))}
          <input 
            type="password" 
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="Gemini API Key" 
            className="w-full bg-green-800 p-2 rounded text-white mt-4"
          />
        </div>
      )}
    </nav>
  );
};

export default Navbar;