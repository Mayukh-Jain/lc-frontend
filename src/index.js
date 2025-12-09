import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// 1. Find the root element in your HTML
const rootElement = document.getElementById('root');

// 2. Create the React Root
const root = ReactDOM.createRoot(rootElement);

// 3. Render the App
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);