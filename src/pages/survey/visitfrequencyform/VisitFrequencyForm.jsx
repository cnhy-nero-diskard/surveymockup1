import React, { useState, useEffect } from 'react';
import { useSpring, animated } from 'react-spring';
import BodyPartial from '../../../components/partials/BodyPartial';
import GradientBackground from '../../../components/partials/GradientBackground';
import { Container, Title, Paragraph, Button, EmojiButton, TextField } from '../../../components/utils/styles1';
import imgOverlay from "../../../components/img/city.png";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { VISITFREQUENCYFORM } from '../../../components/utils/componentConstants';
import useTranslations from '../../../components/utils/useTranslations';
import VisitCounterR from '../../../components/partials/VisitCounterR';
import { useContext } from 'react';
import { useCurrentStepIndex } from '../../../components/utils/useCurrentIndex';
import { UnifiedContext } from '../../../routes/UnifiedContext';
import { goToNextStep } from '../../../components/utils/navigationUtils';


const VisitFrequencyForm = () => {
  const [visitCount, setVisitCount] = useState(null);
  const [language, setLanguage] = useState(localStorage.getItem('selectedLanguage'));
  const { routes } = useContext(UnifiedContext);
  const currentStepIndex = useCurrentStepIndex(routes);
  const { activeBlocks, appendActiveBlocks, removeActiveBlocks } = useContext(UnifiedContext);



  const handleChoice = (value) => {
    setVisitCount(value);
  };

  const handleNextClick = () => {
    goToNextStep(currentStepIndex, navigate, routes, activeBlocks); //<-------------------

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


  const translations = useTranslations(VISITFREQUENCYFORM, language);

  return (
    <VisitCounterR title={translations.VisitFrequencyForm_Title}
     surveyquestion_ref={'VSFRM'} 
     handNext={handleNextClick}/>);
};

export default VisitFrequencyForm;