import React from 'react';
import ReactDOM from 'react-dom/client';
import './App.css'; // ✅ Make sure file exists and path is correct
import App from './App'; // ✅ Stay inside src

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
