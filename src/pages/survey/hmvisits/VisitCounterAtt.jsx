import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import VisitCounterR from '../../../components/partials/VisitCounterR';
import useTranslations from '../../../components/shared/useTranslations';

const VisitCounterAtt = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const navigate = useNavigate(); // Initialize useNavigate

  const handleNextClick = () => {
    navigate('/'); // Navigate to the next question
  };

  // Retrieve the selected language from localStorage
  const [language, setLanguage] = useState(localStorage.getItem('selectedLanguage'));

  // Fetch translations using the useTranslations hook
  const translations = useTranslations('VisitCounterAtt', language);

  // Use the translations in the component
  const visitCounterTitle = translations.visitCounterAttTitle;

  return (
    <VisitCounterR 
      title={visitCounterTitle} 
      selectedOption={selectedOption} 
      setSelectedOption={setSelectedOption} 
      handleNextClick={handleNextClick} 
      surveyquestion_ref={'VSCATT'}
    />
  );
};

export default VisitCounterAtt;