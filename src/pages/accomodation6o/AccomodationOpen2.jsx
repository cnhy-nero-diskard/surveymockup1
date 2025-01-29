import React, { useState, useEffect } from 'react';
import FeedbackForm from '../../components/partials/FeedbackForm';
import { useNavigate } from 'react-router-dom';
import useTranslations from '../../components/shared/useTranslations';

const AccomodationOpen2 = () => {
  const navigate = useNavigate();
  const [language, setLanguage] = useState(localStorage.getItem('selectedLanguage'));
  const translations = useTranslations('AccomodationOpen2', language); // Fetch translations for this component

  const handleNext = (selectedOptionValue, feedback) => {
    // Handle the next action based on the selected option and feedback
    navigate('/'); // Navigate to the next question
  };

  return (
    <FeedbackForm
      title={translations.accomodationOpen2Title} // Use translation variable
      onNext={handleNext}
      squestion_identifier={"ACC2"}
    />
  );
};

export default AccomodationOpen2;