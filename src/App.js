// src/App.js
import React, { useState } from 'react';
import AppRoutes from './AppRoutes';
import { AuthProvider } from './context/AuthContext'; // Import the AuthProvider
import { log } from 'loglevel';


const globalFonts = [
  {
    family: "'Roboto', sans-serif",
    url: "https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap",
  },
  {
    family: "'Montserrat', sans-serif",
    url: "https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap",
  },
];

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <AppRoutes />
      </div>
    </AuthProvider>
  );
}

export default App;