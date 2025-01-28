import React, { useState, useEffect } from 'react';
import { useSpring, animated } from 'react-spring';
import './VisitFrequencyForm.css'; // Import the CSS file
import BodyPartial from '../../../components/partials/BodyPartial';
import GradientBackground from '../../../components/partials/GradientBackground';
import { Container, Title, Paragraph, Button, EmojiButton, TextField } from '../../../components/shared/styles1';
import imgOverlay from "../../components/img/city.png";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { VISITFREQUENCYFORM } from '../../../components/shared/componentConstants';
import useTranslations from '../../../components/shared/useTranslations';
import VisitCounterR from '../../../components/partials/VisitCounterR';



const VisitFrequencyForm = () => {
  const [visitCount, setVisitCount] = useState(null);
  const [language, setLanguage] = useState(localStorage.getItem('selectedLanguage'));

  const handleChoice = (value) => {
    setVisitCount(value);
  };

  const handleNext = () => {
    console.log(`Selected visit count: ${visitCount}`);
  };

  const containerAnimation = useSpring({
    from: { opacity: 0, transform: 'translateY(-50px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
    config: { duration: 500 },
  });

  const buttonAnimation = useSpring({
    transform: visitCount ? 'scale(1.05)' : 'scale(1)',
    config: { tension: 300, friction: 10 },
  });

  const navigate = useNavigate(); // Initialize useNavigate
  const handleNextClick = () => {
    navigate('/'); // Navigate to the next question
  };

  const translations = useTranslations(VISITFREQUENCYFORM, language);

  return (
    <VisitCounterR title={translations.VisitFrequencyForm_Title} />
    );
};

export default VisitFrequencyForm;