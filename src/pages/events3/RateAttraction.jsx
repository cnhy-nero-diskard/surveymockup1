import React, { useState, useEffect } from 'react';
import RatingSlider from '../../components/partials/RatingSlider';
import GradientBackground from '../../components/partials/GradientBackground';
import BodyPartial from '../../components/partials/BodyPartial';
import imgOverlay from "../../components/img/sentiment.png";
import useTranslations from '../../components/shared/useTranslations';
import { useNavigate } from 'react-router-dom';

const RateAttraction = () => {
  const [language, setLanguage] = useState(localStorage.getItem('selectedLanguage'));
  const translations = useTranslations('RateAttraction', language);
  const entranslations = useTranslations('RateAttraction', 'en');

  const categories = [
    translations.rateAttractionSecurity,
    translations.rateAttractionCleanliness,
    translations.rateAttractionActivities,
    translations.rateAttractionClientService,
    translations.rateAttractionValueForMoney
  ];
  const encategories = [
    entranslations.rateAttractionSecurity,
    entranslations.rateAttractionCleanliness,
    entranslations.rateAttractionActivities,
    entranslations.rateAttractionClientService,
    entranslations.rateAttractionValueForMoney
  ];
  const navigate = useNavigate();
  const handleRatingComplete = () => {
    console.log("All ratings completed!");
    // Handle any additional logic here (e.g., saving ratings, navigating, etc.)
    navigate('/');
  };

  return (
        <RatingSlider
          title={translations.rateAttractionTitle}
          categories={categories}
          onRatingComplete={handleRatingComplete}
          surveyquestion_refs={'RATT'}
          entranslations={encategories}
          

        />
  );
};

export default RateAttraction;