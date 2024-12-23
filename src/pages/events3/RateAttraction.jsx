import React, { useState, useEffect } from 'react';
import RatingSlider from '../../components/partials/RatingSlider';
import GradientBackground from '../../components/partials/GradientBackground';
import BodyPartial from '../../components/partials/BodyPartial';
import imgOverlay from "../../components/img/sentiment.png";
import useTranslations from '../../components/shared/useTranslations';

const RateAttraction = () => {
  const [language, setLanguage] = useState(localStorage.getItem('selectedLanguage'));
  const translations = useTranslations('RateAttraction', language);

  const categories = [
    translations.rateAttractionSecurity,
    translations.rateAttractionCleanliness,
    translations.rateAttractionActivities,
    translations.rateAttractionClientService,
    translations.rateAttractionValueForMoney
  ];

  const handleRatingComplete = () => {
    console.log("All ratings completed!");
    // Handle any additional logic here (e.g., saving ratings, navigating, etc.)
  };

  return (
        <RatingSlider
          title={translations.rateAttractionTitle}
          categories={categories}
          onRatingComplete={handleRatingComplete}
        />
  );
};

export default RateAttraction;