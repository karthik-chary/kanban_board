import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';  // Import global CSS if required
import App from './services/App.js';  // Ensure App is imported from the correct location

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
