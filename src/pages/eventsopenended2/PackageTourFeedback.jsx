import React, { useState, useEffect } from 'react';
import FeedbackForm from '../../components/partials/FeedbackForm';
import useTranslations from '../../components/shared/useTranslations';

const PackageTourFeedback = ({ onNext }) => {
  const [feedback, setFeedback] = useState('');
  const [selectedOption, setSelectedOption] = useState(null);
  const [language, setLanguage] = useState(localStorage.getItem('selectedLanguage'));

  // Fetch translations based on the component and language
  const translations = useTranslations('PackageTourFeedback', language);

  const handleNext = (option, feedback) => {
    setSelectedOption(option);
    setFeedback(feedback);
    onNext(option, feedback);
  };

  return (
    <FeedbackForm
      title={translations.packageTourFeedbackTitle}
      onNext={handleNext}
    />
  );
};

export default PackageTourFeedback;