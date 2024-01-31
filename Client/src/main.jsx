// Import necessary modules from React and ReactDOM
import React from 'react';
import ReactDOM from 'react-dom/client';

// Import the main App component and the associated CSS file
import App from './App.jsx';
import './index.css';

// Use React 18's createRoot API to render the App component into the root element
// document.getElementById('root') is the root DOM element in your HTML file
ReactDOM.createRoot(document.getElementById('root')).render(
  // Wrap the App component with React StrictMode
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
