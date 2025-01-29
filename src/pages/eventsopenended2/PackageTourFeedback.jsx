import React, { useState, useEffect } from 'react';
import FeedbackForm from '../../components/partials/FeedbackForm';
import useTranslations from '../../components/shared/useTranslations';
import { useNavigate } from 'react-router-dom';

const PackageTourFeedback = ({  }) => {
  const [feedback, setFeedback] = useState('');
  const [selectedOption, setSelectedOption] = useState(null);
  const [language, setLanguage] = useState(localStorage.getItem('selectedLanguage'));

  // Fetch translations based on the component and language
  const translations = useTranslations('PackageTourFeedback', language);
  const navigate = useNavigate();
  const handleNext = (option, feedback) => {
    setSelectedOption(option);
    setFeedback(feedback);
    // onNext(option, feedback);
    navigate('/');
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