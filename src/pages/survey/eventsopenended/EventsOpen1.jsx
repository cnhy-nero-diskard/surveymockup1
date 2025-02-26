// EventsOpen1.jsx
import React, { useContext, useEffect, useState } from 'react';
import FeedbackForm from '../../../components/partials/FeedbackForm';
import useTranslations from '../../../components/utils/useTranslations';
import { useNavigate } from 'react-router-dom';
import { useCurrentStepIndex } from '../../../components/utils/useCurrentIndex';
import { UnifiedContext } from '../../../routes/UnifiedContext';
import { goToNextStep } from '../../../components/utils/navigationUtils';

const EventsOpen1 = () => {
  const { routes } = useContext(UnifiedContext);
  const currentStepIndex = useCurrentStepIndex(routes);
  const { activeBlocks, appendActiveBlocks, removeActiveBlocks } = useContext(UnifiedContext);

  
  const [language, setLanguage] = useState(localStorage.getItem('selectedLanguage'));
  const translations = useTranslations('EventsOpen1', language);

  useEffect(() => {
    setLanguage(localStorage.getItem('selectedLanguage'));
  }, []);

  const navigate = useNavigate();

  const handleNext = (selectedOption, feedback) => {
    console.log('Selected Option:', selectedOption);
    console.log('Feedback:', feedback);
    goToNextStep(currentStepIndex, navigate, routes, activeBlocks);

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