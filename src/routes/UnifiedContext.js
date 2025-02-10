// SurveyRoutesContext.js
import React, { createContext, useState } from 'react';

export const UnifiedContext = createContext();

export const UnifiedProvider = ({ children, routes }) => {
  const [activeBlocks , setActiveBlocks] = useState(['universal']);

  // Function to append new blocks to activeBlocks
  const appendActiveBlocks = (newBlocks) => {
    setActiveBlocks((prevBlocks) => {
      // Ensure no duplicates
      const uniqueBlocks = [...new Set([...prevBlocks, ...newBlocks])];
      return uniqueBlocks;
    });
  };

  return (
    <UnifiedContext.Provider value={{ activeBlocks , setActiveBlocks, appendActiveBlocks , routes}}>
      {children}
    </UnifiedContext.Provider>
  );
};