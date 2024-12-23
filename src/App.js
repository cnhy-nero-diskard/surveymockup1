// src/App.js
import React from 'react';
import AppRoutes from './AppRoutes';


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
    <div className="App">
      <AppRoutes />
      {/* <ItemList /> */}
    </div>
  );
}


export default App;