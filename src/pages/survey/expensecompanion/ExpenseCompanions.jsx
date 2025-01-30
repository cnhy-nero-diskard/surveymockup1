import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useSpring, animated } from 'react-spring';
import BodyPartial from '../../../components/partials/BodyPartial';
import GradientBackground from '../../../components/partials/GradientBackground';
import imgOverlay from "../../../components/img/peoples.png";
import { useNavigate } from "react-router-dom";
import useTranslations from '../../../components/shared/useTranslations';

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
  border-radius: 10px;
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

const ExpenseCompanions = () => {
  const [value, setValue] = useState('');
  const [language, setLanguage] = useState(localStorage.getItem('selectedLanguage'));
  const translations = useTranslations('ExpenseCompanions', language);

  const buttonAnimation = useSpring({
    transform: 'scale(1)',
    from: { transform: 'scale(0)' },
    config: { tension: 200, friction: 12 },
  });

  const navigate = useNavigate();

  const handleNext = () => {
    // Handle next action here
    navigate('/');
  };

  useEffect(() => {
    setLanguage(localStorage.getItem('selectedLanguage'));
  }, []);

  return (
    <>
      <BodyPartial />
      <GradientBackground overlayImage={imgOverlay} opacity={0.3} blendMode="screen">
        <QuestionContainer>
          <QuestionText>
            {translations.expenseCompanionsQuestionText}
          </QuestionText>
          <InputContainer>
            <Input
              type="number"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder={translations.expenseCompanionsInputPlaceholder}
            />
            <NextButton style={buttonAnimation} onClick={handleNext}>
              {translations.expenseCompanionsNextButtonText}
            </NextButton>
          </InputContainer>
        </QuestionContainer>
      </GradientBackground>
    </>
  );
};

export default ExpenseCompanions;