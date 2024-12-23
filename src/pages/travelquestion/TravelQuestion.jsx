// src/pages/TravelQuestion.js
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useSpring, animated } from 'react-spring';
import BodyPartial from '../../components/partials/BodyPartial';
import GradientBackground from '../../components/partials/GradientBackground';
import imgoverlay from "../../components/img/persons.png";
import { useNavigate } from 'react-router-dom';
import useTranslations from '../../components/shared/useTranslations';

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
  const [showNextPage, setShowNextPage] = useState(false); // State to control navigation
  const [language, setLanguage] = useState(localStorage.getItem('selectedLanguage'));
  const translations = useTranslations('TravelQuestion', language);

  const buttonAnimation = useSpring({
    transform: 'scale(1)',
    from: { transform: 'scale(0)' },
    config: { tension: 200, friction: 12 },
  });

  const handleNext = () => {
    // Navigate to the next page by updating the state
    setShowNextPage(true);
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
          {showNextPage ? (
            <p>{translations.travelQuestionNextStepPlaceholder}</p>
            // Render the next page placeholder
          ) : (
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
                <NextButton style={buttonAnimation} onClick={handleNextClick}>
                  {translations.travelQuestionNextButtonText}
                </NextButton>
              </InputContainer>
            </QuestionContainer>
          )}
        </QuestionContainer>
      </GradientBackground>
    </>
  );
};

export default TravelQuestion;