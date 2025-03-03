import React, { createContext, useState } from 'react';

export const UnifiedContext = createContext();

export const UnifiedProvider = ({ children, routes }) => {
  const [activeBlocks, setActiveBlocks] = useState(['universal']);

  // Function to append new blocks to activeBlocks
  const appendActiveBlocks = (newBlocks) => {
    setActiveBlocks((prevBlocks) => {
      // Ensure no duplicates
      const uniqueBlocks = [...new Set([...prevBlocks, ...newBlocks])];
      return uniqueBlocks;
    });
  };

  // Function to remove a specific block from activeBlocks
  const removeActiveBlocks = (blockToRemove) => {
    setActiveBlocks((prevBlocks) => {
      // Filter out the block to be removed
      const updatedBlocks = prevBlocks.filter((block) => block !== blockToRemove);
      return updatedBlocks;
    });
  };

  return (
    <UnifiedContext.Provider value={{ activeBlocks, setActiveBlocks, appendActiveBlocks, removeActiveBlocks, routes }}>
      {children}
    </UnifiedContext.Provider>
  );
};