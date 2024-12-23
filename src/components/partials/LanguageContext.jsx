import React, { createContext, useState, useContext, useEffect } from 'react';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [selectedLanguage, setSelectedLanguage] = useState(() => {
    // Retrieve the language from localStorage on initial load
    console.log(`LANGUAGECONTEXT ${localStorage.getItem('selectedLanguage')}`);
    return localStorage.getItem('selectedLanguage') || 'en'; // Default to 'en' if no language is found
  });

  useEffect(() => {
    // Save the selected language to localStorage whenever it changes
    localStorage.setItem('selectedLanguage', selectedLanguage);
  }, [selectedLanguage]);

  return (
    <LanguageContext.Provider value={{ selectedLanguage, setSelectedLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);