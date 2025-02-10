import React, { useState, useEffect, useContext } from 'react';
import FeedbackForm from '../../../components/partials/FeedbackForm';
import useTranslations from '../../../components/utils/useTranslations';
import { useNavigate } from 'react-router-dom';
import { useCurrentStepIndex } from '../../../components/utils/useCurrentIndex';
import { UnifiedContext } from '../../../routes/UnifiedContext';
import { goToNextStep } from '../../../components/utils/navigationUtils';

const PackageTourFeedback = ({  }) => {
  const { routes } = useContext(UnifiedContext);
  const currentStepIndex = useCurrentStepIndex(routes);
  const { activeBlocks, appendActiveBlocks, removeActiveBlocks } = useContext(UnifiedContext);


  const [feedback, setFeedback] = useState('');
  const [selectedOption, setSelectedOption] = useState(null);
  const [language, setLanguage] = useState(localStorage.getItem('selectedLanguage'));

  // Fetch translations based on the component and language
  const translations = useTranslations('PackageTourFeedback', language);
  const navigate = useNavigate();
  const handleNext = (option, feedback) => {
    setSelectedOption(option);
    setFeedback(feedback);
    goToNextStep(currentStepIndex, navigate, routes, activeBlocks);
    


  };

  return (
    <FeedbackForm
      title={translations.packageTourFeedbackTitle}
      onNext={handleNext}
      squestion_identifier={'PKG'}
    />
  );
};

export default PackageTourFeedback;