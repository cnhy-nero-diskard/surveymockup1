import React, { useState, useEffect, useContext } from 'react';
import FeedbackForm from '../../../components/partials/FeedbackForm';
import { useNavigate } from 'react-router-dom';
import useTranslations from '../../../components/utils/useTranslations';
import { useCurrentStepIndex } from '../../../components/utils/useCurrentIndex';
import { UnifiedContext } from '../../../routes/UnifiedContext';
import { goToNextStep } from '../../../components/utils/navigationUtils';

const AccomodationFeedback = () => {
  const { routes } = useContext(UnifiedContext);
  const currentStepIndex = useCurrentStepIndex(routes);
  const { activeBlocks, appendActiveBlocks, removeActiveBlocks } = useContext(UnifiedContext);


  const navigate = useNavigate();
  const [language, setLanguage] = useState(localStorage.getItem('selectedLanguage'));
  const translations = useTranslations('AccomodationOpen1', language); // Fetch translations for this component

  const handleNext = (selectedOptionValue, feedback) => {
    // Handle the next action based on the selected option and feedback
    console.log('Selected Option:', selectedOptionValue, 'Feedback:', feedback);
    goToNextStep(currentStepIndex, navigate, routes, activeBlocks);
  };

  return (
    <FeedbackForm
      title={translations.accomodationOpen1Title} // Use the translation variable
      onNext={handleNext}
      squestion_identifier={"TPNTF"}
    />
  );
};

export default AccomodationFeedback;



