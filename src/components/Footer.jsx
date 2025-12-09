import React from 'react';
import { Github, Mail, Heart, Linkedin, PhoneCallIcon } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-300 py-8 mt-auto">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          
          <div className="text-center md:text-left">
            <h3 className="text-xl font-bold text-white flex items-center gap-2 justify-center md:justify-start">
              LeafCompass 🌿
            </h3>
            <p className="text-sm mt-2 text-gray-400">
              Empowering farmers with AI-driven insights.
            </p>
          </div>

          <div className="flex gap-6">
            <a href="https://github.com/Mayukh-Jain/Leaf-Compass" className="hover:text-agriGreen transition"><Github size={20} /></a>
            <a href="https://www.linkedin.com/in/mayukh-jain-b4732128a" className="hover:text-agriGreen transition"><Linkedin size={20} /></a>
            <a href="jainmayukh@gmail.com" className="hover:text-agriGreen transition"><Mail size={20} /></a>
            <a href="+91 7007535723" className="hover:text-agriGreen transition"><PhoneCallIcon size={20} /></a>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-6 pt-6 text-center text-sm flex items-center justify-center gap-1">
          <span>Made with</span>
          <Heart size={14} className="text-red-500 fill-current" />
          <span>for the farming community. © {new Date().getFullYear()}</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;