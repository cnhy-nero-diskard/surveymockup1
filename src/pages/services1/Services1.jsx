import React, { useState } from 'react';
import styled from 'styled-components';
import { useTransition, animated } from 'react-spring';
import GradientBackground from '../../components/partials/GradientBackground';
import BodyPartial from '../../components/partials/BodyPartial';
import { Container, EmojiButton, Title } from '../../components/shared/styles1';
import imgOverlay from "../../components/img/sentiment.png";
import { useNavigate } from 'react-router-dom';
import useTranslations from '../../components/shared/useTranslations';
import RatingSlider from '../../components/partials/RatingSlider';

const Services1 = () => {
  const [language, setLanguage] = useState(localStorage.getItem('selectedLanguage'));
  const translations = useTranslations('Services2', language);

  const categories = [
    translations.services1CategoryAccomodation,
    translations.services1CategoryRestaurant,
    translations.services1CategoryShopping,
    translations.services1CategoryLocalTransportation,
    translations.services1CategoryTourismActivities,
    translations.services1CategoryEntertainment,
  ];



  const handleRatingComplete = () => {
    console.log(translations.services2AllRatingsCompleted);
  };

  return (
    <RatingSlider
      title={translations.services1PricingTitle}
      categories={categories}
      onRatingComplete={handleRatingComplete}
    />
  );
};

export default Services1;