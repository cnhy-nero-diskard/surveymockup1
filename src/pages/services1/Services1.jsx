import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useTransition, animated } from 'react-spring';
import GradientBackground from '../../components/partials/GradientBackground';
import BodyPartial from '../../components/partials/BodyPartial';
import { Container, EmojiButton, Title } from '../../components/shared/styles1';
import imgOverlay from "../../components/img/sentiment.png";
import { useNavigate } from 'react-router-dom';
import useTranslations from '../../components/shared/useTranslations';
import RatingSlider from '../../components/partials/RatingSlider';
import axios from 'axios';

const Services1 = () => {
  const [language, setLanguage] = useState(localStorage.getItem('selectedLanguage'));
  const translations = useTranslations('Services2', language);
  const [ratings, setRatings] = useState({});
  const navigate = useNavigate();

  const categories = [
    translations.services1CategoryAccomodation,
    translations.services1CategoryRestaurant,
    translations.services1CategoryShopping,
    translations.services1CategoryLocalTransportation,
    translations.services1CategoryTourismActivities,
    translations.services1CategoryEntertainment,
  ];

  const handleRatingChange = (category, rating) => {
    setRatings(prevRatings => ({
      ...prevRatings,
      [category]: rating
    }));
  };

  useEffect(() => {
    console.log('Ratings updated:', ratings);
  }, [ratings]); // This will log the updated ratings whenever it changes

  const handleRatingComplete = () => {
    console.log(translations.services2AllRatingsCompleted);
    handleSubmit();
  };

  const handleSubmit = async () => {
    // Prepare the survey response data
    const surveyResponse = {
      component_name: 'SERVICES1',
      question_key: '------',
      response_value: JSON.stringify(ratings),
      language_code: language,
      is_open_ended: false,
      category: 'Services',
    };

    try {
      // Submit the survey response to the backend
      const response = await axios.post(`${process.env.REACT_APP_API_HOST}/api/survey/submit`, surveyResponse, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });

      const result = response;
      navigate('/');
    } catch (err) {
      alert('Failed to submit survey response. Please try again.', err);
    }
  };

  return (
    <RatingSlider
      title={translations.services1PricingTitle}
      categories={categories}
      onRatingChange={handleRatingChange}
      onRatingComplete={handleRatingComplete}
    />
  );
};

export default Services1;