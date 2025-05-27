// index.tsx
// This is the main entry point for the React application.

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // The root component of the application

// Get the root DOM element where the React app will be mounted.
const rootElement = document.getElementById('root');

// Ensure the root element exists before trying to mount the app.
if (!rootElement) {
  throw new Error("Could not find root element to mount to. Ensure an element with id='root' exists in your HTML.");
}

// Create a React root for the main application container.
const root = ReactDOM.createRoot(rootElement);

// Render the App component into the root.
// React.StrictMode is a wrapper that helps with identifying potential problems in an application.
// It activates additional checks and warnings for its descendants.
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);