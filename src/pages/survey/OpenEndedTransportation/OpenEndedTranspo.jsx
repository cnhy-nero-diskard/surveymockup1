import React, { useState, useEffect, useContext } from 'react';
import { motion } from 'framer-motion';
import BodyPartial from '../../../components/partials/BodyPartial';
import GradientBackground from '../../../components/partials/GradientBackground';
import {
  Container,
  Title,
  Paragraph,
  Button,
  EmojiButton,
  TextField,
  NextButtonU
} from '../../../components/utils/styles1';
import imgoverlay from "../../../components/img/review.png";
import { useNavigate } from 'react-router-dom';
import useTranslations from '../../../components/utils/useTranslations';
import { submitSurveyResponses } from '../../../components/utils/sendInputUtils';
import { goToNextStep } from '../../../components/utils/navigationUtils';
import { useCurrentStepIndex } from '../../../components/utils/useCurrentIndex';
import { UnifiedContext } from '../../../routes/UnifiedContext';

const OpenEndedTranspo = () => {
  const { routes } = useContext(UnifiedContext);
  const currentStepIndex = useCurrentStepIndex(routes);
  const { activeBlocks } = useContext(UnifiedContext);

  const [selectedButton, setSelectedButton] = useState(null);
  const [textFieldValue, setTextFieldValue] = useState('');
  const [language, setLanguage] = useState(localStorage.getItem('selectedLanguage'));
  const translations = useTranslations('OpenEnded1', language);

  const navigate = useNavigate();

  // Map user’s string response to corresponding number
  const getSatisfactionCode = (option) => {
    switch (option) {
      case 'Dissatisfied':
        return 1;
      case 'Neutral':
        return 2;
      case 'Satisfied':
        return 3;
      case 'VerySatisfied':
        return 4;
      default:
        return null;
    }
  };

  const handleButtonClick = (button) => {
    setSelectedButton(button);
    console.log(`Selected: ${button}`);
  };

  const handleNextClick = async () => {
    // Convert selectedButton to an integer code before sending
    const satisfactionCode = getSatisfactionCode(selectedButton);

    const surveyResponses = [
      { surveyquestion_ref: 'SATLVTRN', response_value: satisfactionCode },
      { surveyquestion_ref: 'FDBKTRN', response_value: textFieldValue}
    ];
    console.log("textFieldValue length:", textFieldValue.length);
    try {
      await submitSurveyResponses(surveyResponses);
      goToNextStep(currentStepIndex, navigate, routes, activeBlocks);
    } catch (error) {
      console.error('Error submitting responses:', error);
    }
  };

  useEffect(() => {
    setLanguage(localStorage.getItem('selectedLanguage'));
  }, [localStorage.getItem('selectedLanguage')]);

  // Condition to check if all inputs are valid
  const isFormValid = selectedButton !== null && textFieldValue.trim().length > 10;

  return (
    <>
      <BodyPartial />
      <GradientBackground
        overlayImage={imgoverlay}
        opacity={0.2}
        handleNextClick={handleNextClick}
        buttonAppear={isFormValid} // Set buttonAppear based on form validity
      >
        <Container
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Title>{translations.openEndedTranspoTitle}</Title>

          <div>
            {['Dissatisfied', 'Neutral', 'Satisfied', 'VerySatisfied'].map((option) => (
              <EmojiButton
                key={option}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => handleButtonClick(option)}
                selected={selectedButton === option}
                tabIndex={0}
                aria-label={option}
              >
                {translations[`openEnded1${option}`]}
              </EmojiButton>
            ))}
          </div>

          <Paragraph>{translations.openEnded1FeedbackRequest}</Paragraph>
          <TextField
            placeholder={translations.openEnded1TextFieldPlaceholder}
            value={textFieldValue}
            onChange={(e) => setTextFieldValue(e.target.value)}
            minLength={11} // Optional: Enforce minimum length in the input field
          />
        </Container>
      </GradientBackground>
    </>
  );
};

export default OpenEndedTranspo;
