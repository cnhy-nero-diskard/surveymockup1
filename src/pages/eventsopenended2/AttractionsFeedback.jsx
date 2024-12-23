import React, { useState, useEffect } from 'react';
import FeedbackForm from '../../components/partials/FeedbackForm';
import BodyPartial from '../../components/partials/BodyPartial';
import useTranslations from '../../components/shared/useTranslations';

const AttractionsFeedback = ({ onNext }) => {
  const [feedback, setFeedback] = useState('');
  const [selectedOption, setSelectedOption] = useState(null);
  const [language, setLanguage] = useState(localStorage.getItem('selectedLanguage'));

  // Fetch translations based on the language
  const translations = useTranslations('AttractionsFeedback', language);

  const handleNext = (option, feedback) => {
    setSelectedOption(option);
    setFeedback(feedback);
    onNext(option, feedback);
  };

  return (
    <>
      <BodyPartial />
      <FeedbackForm
        title={translations.attractionsFeedbackTitle}
        onNext={handleNext}
      />
    </>
  );
};

export default AttractionsFeedback;