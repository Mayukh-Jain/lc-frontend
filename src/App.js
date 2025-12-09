import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Layout Components
import Header from './components/Header';
import Footer from './components/Footer';
import ChatBot from './components/ChatBot';

// Pages
import Home from './pages/Home';
import Disease from './pages/Disease';
import Yield from './pages/Yield';
import Crop from './pages/Crop';
import Fertilizer from './pages/Fertilizer';
import ChatPage from './pages/ChatPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />
        
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/disease" element={<Disease />} />
            <Route path="/yield" element={<Yield />} />
            <Route path="/crop" element={<Crop />} />
            <Route path="/fertilizer" element={<Fertilizer />} />
            <Route path="/chat" element={<ChatPage />} />
          </Routes>
        </main>

        <ChatBot /> {/* Floating Widget always visible */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;