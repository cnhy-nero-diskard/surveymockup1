// src/pages/TravelQuestion.js
import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { useSpring, animated } from 'react-spring';
import BodyPartial from '../../../components/partials/BodyPartial';
import GradientBackground from '../../../components/partials/GradientBackground';
import imgoverlay from "../../../components/img/persons.png";
import { useNavigate } from 'react-router-dom';
import useTranslations from '../../../components/utils/useTranslations';
import { NextButtonU } from '../../../components/utils/styles1';
import { submitSurveyResponses } from '../../../components/utils/sendInputUtils'; // Import the function
import { useCurrentStepIndex } from '../../../components/utils/useCurrentIndex';
import { UnifiedContext } from '../../../routes/UnifiedContext';
import { goToNextStep } from '../../../components/utils/navigationUtils';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  font-family: Arial, sans-serif;
`;

const QuestionContainer = styled.div`
  padding: 20px;
  text-align: center;
`;

const QuestionText = styled.p`
  font-size: 1.5rem;
  margin-bottom: 20px;
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Input = styled.input`
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-right: 10px;
`;

const NextButton = styled(animated.button)`
  padding: 10px 20px;
  font-size: 1rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

const TravelQuestion = () => {
  const [value, setValue] = useState('');
  const [language, setLanguage] = useState(localStorage.getItem('selectedLanguage'));
  const translations = useTranslations('TravelQuestion', language);

  const { routes } = useContext(UnifiedContext);
  const currentStepIndex = useCurrentStepIndex(routes);
  const { activeBlocks,appendActiveBlocks,removeActiveBlocks } = useContext(UnifiedContext);


  const buttonAnimation = useSpring({
    transform: 'scale(1)',
    from: { transform: 'scale(0)' },
    config: { tension: 200, friction: 12 },
  });

  const handleNext = async () => {
    // Create the survey response object
    const surveyResponse = {
      surveyquestion_ref: 'TRVQ1', // Example 5-character reference
      response_value: value, // The value from the input field
    };

    // Send the response to the backend
    try {
      await submitSurveyResponses([surveyResponse]);
      goToNextStep(currentStepIndex, navigate,routes,activeBlocks); //<---------------------------
    } catch (error) {
      console.error('Error submitting survey response:', error);
    }
  };

  const navigate = useNavigate(); // Initialize useNavigate
  const handleNextClick = () => {
    navigate('/'); // Navigate to the next question
  };

  useEffect(() => {
    setLanguage(localStorage.getItem('selectedLanguage'));
  }, []);

  return (
    <>
      <BodyPartial />
      <GradientBackground overlayImage={imgoverlay} opacity={0.1} blendMode="multiply">
        <QuestionContainer>

            <QuestionContainer>
              <QuestionText>
                {translations.travelQuestionPersonCountText}
              </QuestionText>
              <InputContainer>
                <Input
                  type="number"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  placeholder={translations.travelQuestionInputPlaceholder}
                />
                <NextButtonU style={buttonAnimation} onClick={handleNext}>
                  {translations.travelQuestionNextButtonText}
                </NextButtonU>
              </InputContainer>
            </QuestionContainer>

        </QuestionContainer>
      </GradientBackground>
    </>
  );
};

export default TravelQuestion;