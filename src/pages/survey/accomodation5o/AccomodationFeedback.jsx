import React, { useState, useEffect, useContext } from 'react';
import FeedbackForm from '../../../components/partials/FeedbackForm';
import { useNavigate } from 'react-router-dom';
import useTranslations from '../../../components/utils/useTranslations';
import { useCurrentStepIndex } from '../../../components/utils/useCurrentIndex';
import { UnifiedContext } from '../../../routes/UnifiedContext';
import { goToNextStep } from '../../../components/utils/navigationUtils';

/**
 * AccomodationFeedback Component
 * This component renders a feedback form for accommodation experiences.
 * It uses context to manage routing and active blocks, and translations for localization.
 */
const AccomodationFeedback = () => {
  // Access the routes from the UnifiedContext
  const { routes } = useContext(UnifiedContext);
  
  // Get the current step index based on the routes
  const currentStepIndex = useCurrentStepIndex(routes);
  
  // Access activeBlocks, appendActiveBlocks, and removeActiveBlocks from the UnifiedContext
  const { activeBlocks, appendActiveBlocks, removeActiveBlocks } = useContext(UnifiedContext);

  // Hook to navigate between routes
  const navigate = useNavigate();
  
  // State to manage the selected language, defaulting to the value stored in localStorage
  const [language, setLanguage] = useState(localStorage.getItem('selectedLanguage'));
  
  // Fetch translations for the 'estabFeedBack' section in the selected language
  const translations = useTranslations('estabFeedBack', language);


  const handleNext = (selectedOptionValue, feedback) => {
    console.log('Selected Option:', selectedOptionValue, 'Feedback:', feedback);
    
    // Navigate to the next step
    goToNextStep(currentStepIndex, navigate, routes, activeBlocks);
  };

  // Log the translations object for debugging purposes
  console.log(JSON.stringify(translations));

  /**
   * Render the FeedbackForm component with the appropriate props.
   * - title: The title of the feedback form, fetched from translations.
   * - onNext: The function to handle the next action.
   * - squestion_identifier: A unique identifier for the feedback form.
   */
  return (
    <FeedbackForm
      title={translations.estabFeedBackTitle} // Use the translation variable for the title
      onNext={handleNext} // Pass the handleNext function to the FeedbackForm
      squestion_identifier={"TPNTF"} // Unique identifier for the feedback form
    />
  );
};

export default AccomodationFeedback;