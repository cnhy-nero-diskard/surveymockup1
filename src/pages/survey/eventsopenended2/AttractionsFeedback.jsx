import React, { useState, useEffect } from 'react';
import FeedbackForm from '../../../components/partials/FeedbackForm';
import BodyPartial from '../../../components/partials/BodyPartial';
import useTranslations from '../../../components/shared/useTranslations';
import { useNavigate } from 'react-router-dom';

const AttractionsFeedback = ({  }) => {
  const [feedback, setFeedback] = useState('');
  const [selectedOption, setSelectedOption] = useState(null);
  const [language, setLanguage] = useState(localStorage.getItem('selectedLanguage'));

  // Fetch translations based on the language
  const translations = useTranslations('AttractionsFeedback', language);
  const navigate = useNavigate();
  const handleNext = (option, feedback) => {
    setSelectedOption(option);
    setFeedback(feedback);

    navigate('/');
    // onNext(option, feedback);
  };

  return (
    <>
      <BodyPartial />
      <FeedbackForm
        title={translations.attractionsFeedbackTitle}
        onNext={handleNext}
        squestion_identifier={'ATT'}
      />
    </>
  );
};

export default AttractionsFeedback;