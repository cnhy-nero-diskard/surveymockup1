// EventsOpen1.jsx
import React, { useEffect, useState } from 'react';
import FeedbackForm from '../../../components/partials/FeedbackForm';
import useTranslations from '../../../components/shared/useTranslations';
import { useNavigate } from 'react-router-dom';

const EventsOpen1 = () => {
  const [language, setLanguage] = useState(localStorage.getItem('selectedLanguage'));
  const translations = useTranslations('EventsOpen1', language);

  useEffect(() => {
    setLanguage(localStorage.getItem('selectedLanguage'));
  }, []);

  const navigate = useNavigate();

  const handleNext = (selectedOption, feedback) => {
    console.log('Selected Option:', selectedOption);
    console.log('Feedback:', feedback);
    navigate('/'); // Navigate to the next question or page

    // Handle the next action, e.g., send data to the server
  };

  return (
    <FeedbackForm
      title={translations.eventsOpen1AttractionsExpectations}
      squestion_identifier={'EV'}
      onNext={handleNext}
    />
  );
};

export default EventsOpen1;