// EventsOpen1.jsx
import React, { useEffect, useState } from 'react';
import FeedbackForm from '../../components/partials/FeedbackForm';
import useTranslations from '../../components/shared/useTranslations';

const EventsOpen1 = () => {
  const [language, setLanguage] = useState(localStorage.getItem('selectedLanguage'));
  const translations = useTranslations('EventsOpen1', language);

  useEffect(() => {
    setLanguage(localStorage.getItem('selectedLanguage'));
  }, []);

  const handleNext = (selectedOption, feedback) => {
    console.log('Selected Option:', selectedOption);
    console.log('Feedback:', feedback);
    // Handle the next action, e.g., send data to the server
  };

  return (
    <FeedbackForm
      title={translations.eventsOpen1AttractionsExpectations}
      onNext={handleNext}
    />
  );
};

export default EventsOpen1;